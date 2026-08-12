// ════════════════════════════════════════════════════
//  班表匯入 — 原始檔解析
//
//  把科內既有的 NI Word 與 EVT Excel 轉成班表系統的資料結構。
//  這裡的解析規則以 2026-08 的實際檔案驗證過：除了人工潤飾過的備註文字
//  與來源檔本身缺漏的日期外，各區塊與雲端資料完全吻合。
// ════════════════════════════════════════════════════

const IMPORT_DOWS = ['週一', '週二', '週三', '週四', '週五'];
const W_NS = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';

// ── 共用小工具 ──────────────────────────────────────

// 「黃俊肇8/11士揚8/18 士揚」→ { base: '黃俊肇', annot: '8/11士揚8/18 士揚' }
function splitAnnot(raw) {
  const s = (raw || '').trim();
  if (!s) return { base: '', annot: '' };
  const i = [...s].findIndex(c => c >= '0' && c <= '9');
  if (i <= 0) return { base: s, annot: '' };
  return { base: s.slice(0, i).trim(), annot: s.slice(i).trim() };
}

// 號碼欄「00-23 8/07-17棖智」→ { nums: '00-23', annot: '8/07-17棖智' }
// 欄位本身以數字開頭，不能用 splitAnnot
const NUM_RE = /^\s*(\d{1,2}\s*[-–]\s*\d{1,2}(?:\s*,\s*\d{1,2}\s*[-–]\s*\d{1,2})*)\s*(.*)$/;
function splitNumbers(raw) {
  const m = NUM_RE.exec(raw || '');
  return m ? { nums: m[1].trim(), annot: m[2].trim() } : { nums: (raw || '').trim(), annot: '' };
}

// 「AM黃主任 PM魏士揚」→「AM 黃主任 / PM 魏士揚」
// 渲染時需要斜線才會正確分開上下午，不是單純美化
const AMPM_RE = /^\s*AM\s*(.+?)\s*PM\s*(.+?)\s*$/;
function normalizePerson(raw) {
  const m = AMPM_RE.exec(raw || '');
  return m ? `AM ${m[1].trim()} / PM ${m[2].trim()}` : (raw || '').trim();
}

function joinNotes(list) {
  return [...new Set(list.filter(Boolean))].join('; ');
}

// ── .docx ───────────────────────────────────────────

async function readDocx(file) {
  const zip = await JSZip.loadAsync(file);
  const xml = await zip.file('word/document.xml').async('string');
  const doc = new DOMParser().parseFromString(xml, 'application/xml');

  const textOf = el => [...el.getElementsByTagNameNS(W_NS, 't')]
    .map(t => t.textContent || '').join('').trim();

  const tables = [...doc.getElementsByTagNameNS(W_NS, 'tbl')].map(tbl =>
    [...tbl.getElementsByTagNameNS(W_NS, 'tr')].map(tr =>
      [...tr.getElementsByTagNameNS(W_NS, 'tc')].map(textOf)
    )
  );

  const body = doc.getElementsByTagNameNS(W_NS, 'body')[0];
  const paras = [...body.children]
    .filter(el => el.localName === 'p')
    .map(textOf)
    .filter(Boolean);

  return { tables, paras };
}

// ── .xlsx ───────────────────────────────────────────

function colIndex(ref) {
  const m = /^([A-Z]+)/.exec(ref || '');
  if (!m) return 0;
  return [...m[1]].reduce((n, c) => n * 26 + (c.charCodeAt(0) - 64), 0) - 1;
}

async function readXlsxGrid(file) {
  const zip = await JSZip.loadAsync(file);
  const parse = s => new DOMParser().parseFromString(s, 'application/xml');

  let shared = [];
  const ssFile = zip.file('xl/sharedStrings.xml');
  if (ssFile) {
    const ss = parse(await ssFile.async('string'));
    shared = [...ss.getElementsByTagName('si')].map(si =>
      [...si.getElementsByTagName('t')].map(t => t.textContent || '').join(''));
  }

  // 取第一張工作表
  const sheetName = Object.keys(zip.files)
    .filter(n => /^xl\/worksheets\/sheet\d+\.xml$/.test(n))
    .sort()[0];
  const sheet = parse(await zip.file(sheetName).async('string'));

  const grid = [];
  for (const row of sheet.getElementsByTagName('row')) {
    const cells = [];
    for (const c of row.getElementsByTagName('c')) {
      const idx = colIndex(c.getAttribute('r'));
      const type = c.getAttribute('t');
      const vEl = c.getElementsByTagName('v')[0];
      let val = '';
      if (type === 's' && vEl) val = shared[parseInt(vEl.textContent, 10)] || '';
      else if (type === 'inlineStr') val = (c.getElementsByTagName('t')[0] || {}).textContent || '';
      else if (vEl) val = vEl.textContent || '';
      cells[idx] = String(val).trim();
    }
    for (let i = 0; i < cells.length; i++) if (cells[i] === undefined) cells[i] = '';
    grid.push(cells);
  }
  return grid;
}

// ── NI 解析 ─────────────────────────────────────────

function parseNi(tables, paras) {
  const ni = {}, review = [];

  const cell = (raw, where) => {
    const { base, annot } = splitAnnot(raw);
    if (annot) review.push(`${where}：「${raw}」→ 人員 ${base}，註記 ${annot}`);
    return { base, annot };
  };

  // 表1 血管攝影
  ni.angio = [];
  for (const r of tables[0] || []) {
    if (!r.length || !IMPORT_DOWS.includes(r[0])) continue;
    const labels = ['台北DSA', '台北TAE', '淡水DSA', '淡水TAE'];
    const v = [], n = [];
    for (let i = 0; i < 4; i++) {
      const { base, annot } = cell(r[i + 1], `血管攝影 ${r[0]} ${labels[i]}`);
      v.push(base); n.push(annot);
    }
    ni.angio.push({ dow: r[0], tp_dsa: v[0], tp_tae: v[1], ds_dsa: v[2], ds_tae: v[3], note: joinNotes(n) });
  }

  // 表2 淡水健檢 / 神經 MRI 解釋（每列第 4 欄）
  ni.ds_mri_daily = [];
  for (const r of tables[1] || []) {
    if (!r.length || !IMPORT_DOWS.includes(r[0])) continue;
    const { base, annot } = cell(r[3] || '', `淡水健檢MRI ${r[0]}`);
    ni.ds_mri_daily.push({ dow: r[0], person: base, note: annot });
  }

  // 表3 急診 CT + 門住 CT 號碼
  ni.erct = []; ni.routine_ct = [];
  for (const r of tables[2] || []) {
    if (!r.length || !IMPORT_DOWS.includes(r[0])) continue;
    const tp = cell(r[1], `急診CT ${r[0]} 台北`);
    const ds = cell(r[2], `急診CT ${r[0]} 淡水`);
    ni.erct.push({ dow: r[0], tp: tp.base, ds: ds.base, note: joinNotes([tp.annot, ds.annot]) });

    if (r.length >= 6 && r[3]) {
      const a = splitNumbers(r[4]);
      const b = splitNumbers(r[5]);
      if (a.annot) review.push(`門住CT ${r[3]} 台北號碼：「${a.annot}」`);
      if (b.annot) review.push(`門住CT ${r[3]} 淡水號碼：「${b.annot}」`);
      ni.routine_ct.push({ person: r[3], tp: a.nums, ds: b.nums, note: joinNotes([a.annot, b.annot]) });
    }
  }

  // 表4 門住急 MRI
  ni.mri = { tp: [], ds: [] };
  for (const r of tables[3] || []) {
    const side = { '台北': 'tp', '淡水': 'ds' }[r[0]];
    if (!side) continue;
    for (let i = 0; i < 5; i++) {
      const { base, annot } = cell(r[i + 1], `門住急MRI ${r[0]} W${i + 1}`);
      ni.mri[side].push({ week: `W${i + 1}`, person: normalizePerson(base), note: annot });
    }
  }

  // 表5 週六班 / 週日 MRI：儲存格形如「8/01謝棖智」
  ni.saturday = []; ni.mri_sunday = [];
  for (const r of tables[4] || []) {
    const head = r[0] || '';
    const target = /[周週]六/.test(head) ? ni.saturday : (/[周週]日/.test(head) ? ni.mri_sunday : null);
    if (!target) continue;
    for (const v of r.slice(1)) {
      const m = /^(\d{1,2})\/(\d{1,2})\s*(.+)$/.exec((v || '').trim());
      if (m) target.push({ date: `${+m[1]}/${+m[2]}`, person: m[3].trim(), note: '' });
    }
  }

  // 表6 PICC
  const picc = {};
  for (const r of tables[5] || []) {
    const side = { '台北': 'tp', '淡水': 'ds' }[r[0]];
    if (!side) continue;
    for (let i = 0; i < 5; i++) {
      const { base, annot } = cell(r[i + 1], `PICC ${IMPORT_DOWS[i]} ${r[0]}`);
      picc[i] = picc[i] || { dow: IMPORT_DOWS[i], tp: '', ds: '', note: '' };
      picc[i][side] = base;
      if (annot) picc[i].note = joinNotes([picc[i].note, annot]);
    }
  }
  ni.picc = Object.keys(picc).sort((a, b) => a - b).map(k => picc[k]);

  ni.notes = paras.filter(p => !/^\d{4}-\d{2}月$/.test(p)).join('\n');
  return { ni, review };
}

// ── EVT 解析 ────────────────────────────────────────
// 版面為週曆：日期列 → 台北列 → 空列 → 淡水列
function parseEvt(grid, monthKey) {
  const evt = {};
  const daysInMonth = (() => {
    const [y, m] = (monthKey || '').split('-').map(Number);
    return (y && m) ? new Date(y, m, 0).getDate() : 31;
  })();

  for (let i = 0; i < grid.length; i++) {
    const days = (grid[i] || []).slice(0, 7);
    if (!days.some(c => /^\d+$/.test(c || ''))) continue;
    const tpRow = grid[i + 1] || [];
    const dsRow = grid[i + 3] || [];

    for (let col = 0; col < 7; col++) {
      const dv = days[col] || '';
      if (!/^\d+$/.test(dv)) continue;
      const day = parseInt(dv, 10);
      if (day < 1 || day > daysInMonth) continue;

      let tp = (tpRow[col] || '').trim();
      let ds = (dsRow[col] || '').trim();
      if (tp === '台北' || tp === '淡水') tp = '';
      if (ds === '台北' || ds === '淡水') ds = '';
      if (!tp && !ds) continue;

      // 第一週若出現月底日期，代表是上個月的尾巴
      if (i < 4 && day > 20) continue;
      evt[String(day)] = { tp, ds };
    }
  }
  return evt;
}

// ── 語意比對 ────────────────────────────────────────
// 連字號樣式、多餘空白、列的順序都不算差異
function normText(v) {
  return String(v == null ? '' : v).replace(/[–—]/g, '-').replace(/\s+/g, ' ').trim();
}

function rowsByKey(rows, keyName) {
  const out = {};
  (rows || []).forEach(r => {
    const copy = {};
    Object.keys(r).filter(k => k !== keyName).sort().forEach(k => { copy[k] = normText(r[k]); });
    out[r[keyName]] = copy;
  });
  return out;
}

function diffSection(label, parsed, cloud, keyName) {
  const a = rowsByKey(parsed, keyName);
  const b = rowsByKey(cloud, keyName);
  const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])];
  const rows = [];
  keys.forEach(k => {
    const x = a[k], y = b[k];
    if (!y) { rows.push({ key: k, kind: 'added', detail: '新增' }); return; }
    if (!x) return;
    const changed = Object.keys(x).filter(f => x[f] !== (y[f] || ''));
    if (changed.length) {
      rows.push({
        key: k, kind: 'changed',
        detail: changed.map(f => `${f}：<span class="old">${y[f] || '(空)'}</span> → <span class="new">${x[f] || '(空)'}</span>`).join('　')
      });
    }
  });
  return { label, rows };
}

function buildDiff(parsed, cloudNi, parsedEvt, cloudEvt, monthKey) {
  const blocks = [
    diffSection('血管攝影', parsed.angio, cloudNi.angio, 'dow'),
    diffSection('急診 CT', parsed.erct, cloudNi.erct, 'dow'),
    diffSection('門住 CT 號碼', parsed.routine_ct, cloudNi.routine_ct, 'person'),
    diffSection('門住急 MRI（台北）', parsed.mri.tp, (cloudNi.mri || {}).tp, 'week'),
    diffSection('門住急 MRI（淡水）', parsed.mri.ds, (cloudNi.mri || {}).ds, 'week'),
    diffSection('淡水健檢 MRI', parsed.ds_mri_daily, cloudNi.ds_mri_daily, 'dow'),
    diffSection('週六班', parsed.saturday, cloudNi.saturday, 'date'),
    diffSection('週日 MRI', parsed.mri_sunday, cloudNi.mri_sunday, 'date'),
    diffSection('PICC', parsed.picc, cloudNi.picc, 'dow')
  ];

  // 備註
  if (normText(parsed.notes) !== normText(cloudNi.notes || '')) {
    blocks.push({ label: '本月備註', rows: [{ key: '', kind: 'changed',
      detail: `<span class="old">${cloudNi.notes || '(空)'}</span> → <span class="new">${parsed.notes}</span>` }] });
  }

  // EVT：只比對台北（依專案規則，淡水不呈現）
  const [y, m] = monthKey.split('-').map(Number);
  const dim = new Date(y, m, 0).getDate();
  const evtRows = [], missing = [];
  for (let d = 1; d <= dim; d++) {
    const k = String(d);
    const pv = normText((parsedEvt[k] || {}).tp);
    const cv = normText((cloudEvt[k] || {}).tp);
    if (!pv) { missing.push(d); continue; }
    if (pv !== cv) {
      evtRows.push({ key: `${m}/${d}`, kind: cv ? 'changed' : 'added',
        detail: cv ? `<span class="old">${cv}</span> → <span class="new">${pv}</span>` : `<span class="new">${pv}</span>` });
    }
  }
  blocks.push({ label: '中風取栓（台北）', rows: evtRows });
  return { blocks, missingEvtDays: missing };
}
