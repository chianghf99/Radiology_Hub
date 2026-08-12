// ════════════════════════════════════════════════════
//  班表匯入 — 介面與雲端寫入
//
//  設計原則：匯入只覆蓋「班表本體」（各區塊的人員與號碼）。
//  請假 leaves、代班 covers、已忽略的缺口 ignoredGaps 都是人工判斷的成果，
//  來源檔案裡沒有這些資訊，因此一律保留雲端既有內容。
// ════════════════════════════════════════════════════

const firebaseConfig = {
  apiKey: "AIzaSyBFKkYhLe_s4R10wuP80T1OHkGLFLn2epE",
  authDomain: "radiology-hub-80908.firebaseapp.com",
  projectId: "radiology-hub-80908",
  storageBucket: "radiology-hub-80908.firebasestorage.app",
  messagingSenderId: "508499242885",
  appId: "1:508499242885:web:885a5f469fe30bf32f9eec"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

let pending = null;   // { monthKey, ni, evt, cloudDoc, review }

const $ = id => document.getElementById(id);

function setStatus(el, msg, kind) {
  el.className = 'status show ' + (kind || '');
  el.innerHTML = msg;
}

// ── 解析與預覽 ──────────────────────────────────────

$('parseBtn').addEventListener('click', async () => {
  const box = $('parseStatus');
  const monthKey = $('monthKey').value.trim();
  const niFile = $('niFile').files[0];
  const evtFile = $('evtFile').files[0];

  if (!/^\d{4}-\d{2}$/.test(monthKey)) return setStatus(box, '月份格式錯誤，請用 YYYY-MM，例如 2026-09', 'err');
  if (!niFile && !evtFile) return setStatus(box, '請至少選擇一個檔案', 'err');

  setStatus(box, '解析中…', '');
  try {
    let ni = null, review = [], evt = null;

    if (niFile) {
      const { tables, paras } = await readDocx(niFile);
      if (tables.length < 6) throw new Error(`NI 文件的表格數量不符（讀到 ${tables.length} 個，預期 6 個）。請確認選到的是 NI 日班工作分配檔。`);
      const r = parseNi(tables, paras);
      ni = r.ni; review = r.review;
    }
    if (evtFile) {
      const grid = await readXlsxGrid(evtFile);
      evt = parseEvt(grid, monthKey);
      if (!Object.keys(evt).length) throw new Error('EVT 檔案沒有解析到任何值班資料，請確認選到的是中風取栓班表。');
    }

    // 取雲端現況作為比對基準
    const snap = await db.collection('schedules').doc(monthKey).get();
    const cloudDoc = snap.exists ? snap.data() : null;
    const cloudNi = (cloudDoc && cloudDoc.ni) || {};
    const cloudEvt = (cloudDoc && cloudDoc.evt) || {};

    const isNew = !cloudDoc;
    const diff = ni || evt
      ? buildDiff(ni || cloudNi, cloudNi, evt || cloudEvt, cloudEvt, monthKey)
      : { blocks: [], missingEvtDays: [] };

    renderPreview(diff, isNew, monthKey, !!ni, !!evt);
    renderReview(review);

    pending = { monthKey, ni, evt, cloudDoc, review };
    $('importCard').style.display = '';

    const changed = diff.blocks.reduce((n, b) => n + b.rows.length, 0);
    setStatus(box,
      isNew
        ? `✅ 解析完成。雲端尚無 ${monthKey}，將<strong>建立新月份</strong>。`
        : `✅ 解析完成。與雲端現況共有 <strong>${changed}</strong> 處差異，請於下方確認。`,
      changed || isNew ? 'ok' : 'warn');
    if (!changed && !isNew) setStatus(box, '✅ 解析完成，內容與雲端現況一致，沒有需要更新的地方。', 'ok');

  } catch (err) {
    console.error(err);
    setStatus(box, '❌ 解析失敗：' + err.message, 'err');
    $('previewCard').style.display = 'none';
    $('importCard').style.display = 'none';
    pending = null;
  }
});

function renderPreview(diff, isNew, monthKey, hasNi, hasEvt) {
  const out = $('diffOutput');
  let html = '';

  html += `<div class="keep-note">
    ${isNew ? `雲端尚無 <strong>${monthKey}</strong>，這次會建立新的月份。` :
              `只會更新班表本體。<strong>既有的請假、代班與已忽略的缺口都會原樣保留</strong>，不受這次匯入影響。`}
    ${hasNi ? '' : '<br>（未選 NI 檔案，班表本體維持雲端原樣）'}
    ${hasEvt ? '' : '<br>（未選 EVT 檔案，中風取栓班表維持雲端原樣）'}
  </div>`;

  if (diff.missingEvtDays.length) {
    html += `<div class="status show warn" style="margin-top:12px;">
      ⚠️ 來源 EVT 檔案沒有這幾天的值班：<strong>${diff.missingEvtDays.join('、')}</strong> 日。
      這些日子在雲端的原有內容會保留不動，請確認是否需要另外補上。
    </div>`;
  }

  const blocks = diff.blocks.filter(b => b.rows.length);
  if (!blocks.length) {
    html += `<div class="diff-row same" style="margin-top:12px;">各區塊與雲端現況一致，沒有差異。</div>`;
  } else {
    blocks.forEach(b => {
      html += `<div class="diff-block"><div class="diff-title">${b.label}（${b.rows.length}）</div>`;
      b.rows.forEach(r => {
        html += `<div class="diff-row ${r.kind}"><strong>${r.key}</strong>　${r.detail}</div>`;
      });
      html += `</div>`;
    });
  }

  out.innerHTML = html;
  $('previewCard').style.display = '';
}

function renderReview(review) {
  const card = $('reviewCard'), list = $('reviewList');
  if (!review.length) { card.style.display = 'none'; return; }
  list.innerHTML = review.map(r => `<li>${r}</li>`).join('');
  card.style.display = '';
}

// ── 登入 ────────────────────────────────────────────

auth.onAuthStateChanged(user => {
  $('authArea').style.display = user ? 'none' : '';
  $('importArea').style.display = user ? '' : 'none';
  if (user) $('userName').textContent = user.displayName || user.email;
});

$('loginBtn').addEventListener('click', () => {
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .catch(e => setStatus($('importStatus'), '❌ 登入失敗：' + e.message, 'err'));
});
$('logoutBtn').addEventListener('click', () => auth.signOut());

// ── 寫入雲端 ────────────────────────────────────────

$('importBtn').addEventListener('click', async () => {
  const box = $('importStatus');
  if (!pending) return setStatus(box, '請先解析檔案', 'err');

  const { monthKey, ni, evt, cloudDoc } = pending;
  if (!confirm(`確定將 ${monthKey} 的班表寫入雲端嗎？\n\n班表本體會被覆蓋；請假、代班與已忽略的缺口會保留。`)) return;

  setStatus(box, '寫入中…', '');
  try {
    const cloudNi = (cloudDoc && cloudDoc.ni) || {};

    // 班表本體用新解析的內容；人工判斷的結果一律沿用雲端既有值
    const merged = ni ? { ...ni } : { ...cloudNi };
    merged.leaves = cloudNi.leaves || {};
    merged.covers = cloudNi.covers || {};
    merged.holidays = cloudNi.holidays || [];
    if (cloudNi.ignoredGaps) merged.ignoredGaps = cloudNi.ignoredGaps;
    if (!ni && cloudNi.notes !== undefined) merged.notes = cloudNi.notes;

    // EVT：以解析結果為主，來源缺漏的日子保留雲端原值
    const mergedEvt = { ...((cloudDoc && cloudDoc.evt) || {}) };
    if (evt) Object.keys(evt).forEach(d => { mergedEvt[d] = evt[d]; });

    await db.collection('schedules').doc(monthKey).set({ ni: merged, evt: mergedEvt });

    setStatus(box,
      `🎉 <strong>${monthKey}</strong> 已成功寫入雲端。<br>` +
      `班表頁面會即時更新，不需要重新整理。` +
      (pending.review.length
        ? `<br>別忘了到班表的「排班編輯模式」處理上面列出的 ${pending.review.length} 筆換班註記。`
        : ''),
      'ok');
  } catch (err) {
    console.error(err);
    setStatus(box, '❌ 寫入失敗：' + err.message +
      '<br>（若顯示權限不足，表示這個帳號不在管理者名單中）', 'err');
  }
});
