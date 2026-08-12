// ════════════════════════════════════════════════════
//  神經放射線班表 — schedule-save.js（第 6 / 7 個載入）
//  登入與雲端寫入、中風取栓 (EVT) 月曆渲染
//
//  ⚠️ 這些檔案是同一支程式拆開的，共用全域範圍，載入順序不可調換。
//     順序定義於 tools/schedule.html，新增檔案時也要一併加入 sw.js 的 APP_SHELL。
// ════════════════════════════════════════════════════

// ════════════════════════════════════════════════════
//  管理權限與雲端寫入事件
// ════════════════════════════════════════════════════
function loginAdmin() {
  if (typeof firebase !== 'undefined' && provider) {
    firebase.auth().signInWithPopup(provider).catch(e => alert("登入失敗: " + e.message));
  }
}

function logoutAdmin() {
  if (typeof firebase !== 'undefined') {
    firebase.auth().signOut().catch(e => console.error("登出失敗:", e));
  }
}


function showNotesEditMode() {
  const display = document.getElementById('notesDisplayMode');
  const edit = document.getElementById('notesEditMode');
  if (display && edit) {
    display.style.display = 'none';
    edit.style.display = 'flex';
    document.getElementById('notesInput').focus();
  }
}

function hideNotesEditMode() {
  const display = document.getElementById('notesDisplayMode');
  const edit = document.getElementById('notesEditMode');
  if (display && edit) {
    display.style.display = 'block';
    edit.style.display = 'none';
  }
}


async function saveNotes() {
  const key = MONTH_KEYS[currentIdx];
  const notesVal = document.getElementById('notesInput').value;

  if (!getDb()) {
    alert("雲端資料庫尚未初始化");
    return;
  }

  const saveBtn = document.getElementById('saveNotesBtn');
  try {
    saveBtn.disabled = true;
    saveBtn.textContent = "儲存中...";

    // 更新 Firestore 中的 ni.notes
    await db.collection("schedules").doc(key).update({
      "ni.notes": notesVal
    });

    // 同步更新本地記憶體並重新渲染
    if (NI_DATA[key]) {
      NI_DATA[key].notes = notesVal;
    }
    render();
    alert("備註已成功同步至雲端！");
  } catch (error) {
    console.error("雲端儲存失敗:", error);
    alert("儲存失敗：" + error.message);
  } finally {
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.textContent = "儲存";
    }
  }
}

async function saveAllSchedules() {
  const key = MONTH_KEYS[currentIdx];
  if (!getDb()) {
    alert("雲端資料庫尚未初始化");
    return;
  }
  
  const saveBtn = document.getElementById('saveEditBtn');
  
  try {
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.textContent = "儲存中...";
    }
    
    // 1. 收集日班 (NI) 資料
    // Angio (5 days)
    const angio = [];
    const originalAngio = NI_DATA[key] ? (NI_DATA[key].angio || []) : [];
    for (let i = 0; i < 5; i++) {
      const el_tp_dsa = document.getElementById(`ni-angio-${i}-tp_dsa`);
      const el_tp_tae = document.getElementById(`ni-angio-${i}-tp_tae`);
      const el_ds_dsa = document.getElementById(`ni-angio-${i}-ds_dsa`);
      const el_ds_tae = document.getElementById(`ni-angio-${i}-ds_tae`);
      const el_note = document.getElementById(`ni-angio-${i}-note`);
      if (el_tp_dsa && el_tp_tae && el_ds_dsa && el_ds_tae && el_note) {
        angio.push({
          dow: ['週一', '週二', '週三', '週四', '週五'][i],
          tp_dsa: el_tp_dsa.value,
          tp_tae: el_tp_tae.value,
          ds_dsa: el_ds_dsa.value,
          ds_tae: el_ds_tae.value,
          note: el_note.value
        });
      } else {
        if (originalAngio[i]) {
          angio.push(originalAngio[i]);
        } else {
          angio.push({ dow: ['週一', '週二', '週三', '週四', '週五'][i], tp_dsa: '', tp_tae: '', ds_dsa: '', ds_tae: '', note: '' });
        }
      }
    }
    
    // ERCT (5 days)
    const erct = [];
    const originalErct = NI_DATA[key] ? (NI_DATA[key].erct || []) : [];
    for (let i = 0; i < 5; i++) {
      const el_tp = document.getElementById(`ni-erct-${i}-tp`);
      const el_ds = document.getElementById(`ni-erct-${i}-ds`);
      const el_note = document.getElementById(`ni-erct-${i}-note`);
      if (el_tp && el_ds && el_note) {
        erct.push({
          dow: ['週一', '週二', '週三', '週四', '週五'][i],
          tp: el_tp.value,
          ds: el_ds.value,
          note: el_note.value
        });
      } else {
        if (originalErct[i]) {
          erct.push(originalErct[i]);
        } else {
          erct.push({ dow: ['週一', '週二', '週三', '週四', '週五'][i], tp: '', ds: '', note: '' });
        }
      }
    }
    
    // Routine CT
    const routine_ct = [];
    const originalCt = NI_DATA[key] ? (NI_DATA[key].routine_ct || []) : [];
    originalCt.forEach((row, i) => {
      const el_tp = document.getElementById(`ni-ct-${i}-tp`);
      const el_ds = document.getElementById(`ni-ct-${i}-ds`);
      const el_note = document.getElementById(`ni-ct-${i}-note`);
      if (el_tp && el_ds && el_note) {
        routine_ct.push({
          person: row.person,
          tp: el_tp.value,
          ds: el_ds.value,
          note: el_note.value
        });
      } else {
        routine_ct.push(row);
      }
    });
    
    // MRI (tp and ds)
    const mri = { tp: [], ds: [] };
    const originalMri = NI_DATA[key] ? (NI_DATA[key].mri || { tp: [], ds: [] }) : { tp: [], ds: [] };
    ['tp', 'ds'].forEach(side => {
      for (let i = 0; i < 5; i++) {
        const el_person = document.getElementById(`ni-mri-${side}-${i}-person`);
        const el_note = document.getElementById(`ni-mri-${side}-${i}-note`);
        if (el_person && el_note) {
          mri[side].push({
            week: `W${i+1}`,
            person: el_person.value,
            note: el_note.value
          });
        } else {
          if (originalMri[side] && originalMri[side][i]) {
            mri[side].push(originalMri[side][i]);
          } else {
            mri[side].push({ week: `W${i+1}`, person: '', note: '' });
          }
        }
      }
    });
    
    // Ds MRI Daily (5 days)
    const ds_mri_daily = [];
    const originalDsMri = NI_DATA[key] ? (NI_DATA[key].ds_mri_daily || []) : [];
    for (let i = 0; i < 5; i++) {
      const el_person = document.getElementById(`ni-dsmri-${i}-person`);
      const el_note = document.getElementById(`ni-dsmri-${i}-note`);
      if (el_person && el_note) {
        ds_mri_daily.push({
          dow: ['週一', '週二', '週三', '週四', '週五'][i],
          person: el_person.value,
          note: el_note.value
        });
      } else {
        if (originalDsMri[i]) {
          ds_mri_daily.push(originalDsMri[i]);
        } else {
          ds_mri_daily.push({ dow: ['週一', '週二', '週三', '週四', '週五'][i], person: '', note: '' });
        }
      }
    }
    
    // Saturday (varies)
    const saturday = [];
    const originalSat = NI_DATA[key] ? (NI_DATA[key].saturday || []) : [];
    originalSat.forEach((row, i) => {
      const el_person = document.getElementById(`ni-sat-${i}-person`);
      const el_note = document.getElementById(`ni-sat-${i}-note`);
      if (el_person && el_note) {
        saturday.push({
          date: row.date,
          person: el_person.value,
          note: el_note.value
        });
      } else {
        saturday.push(row);
      }
    });

    // Sunday MRI Overtime (varies)
    const mri_sunday = [];
    let originalSun = NI_DATA[key] ? (NI_DATA[key].mri_sunday || []) : [];
    // 若雲端沒有 mri_sunday 欄位（舊文件），重新從月份計算出所有週日日期
    if (originalSun.length === 0 && key && /^\d{4}-\d{2}$/.test(key)) {
      const [ys, ms] = key.split('-');
      const yr = parseInt(ys), mo = parseInt(ms);
      const days = new Date(yr, mo, 0).getDate();
      for (let d = 1; d <= days; d++) {
        if (new Date(yr, mo - 1, d).getDay() === 0) {
          originalSun.push({ date: `${mo}/${d}`, person: '', note: '' });
        }
      }
    }
    originalSun.forEach((row, i) => {
      const el_person = document.getElementById(`ni-sun-${i}-person`);
      const el_note = document.getElementById(`ni-sun-${i}-note`);
      if (el_person && el_note) {
        mri_sunday.push({
          date: row.date,
          person: el_person.value,
          note: el_note.value
        });
      } else {
        mri_sunday.push(row);
      }
    });
    
    // PICC (5 days)
    const picc = [];
    const originalPicc = NI_DATA[key] ? (NI_DATA[key].picc || []) : [];
    for (let i = 0; i < 5; i++) {
      const el_tp = document.getElementById(`ni-picc-${i}-tp`);
      const el_ds = document.getElementById(`ni-picc-${i}-ds`);
      const el_note = document.getElementById(`ni-picc-${i}-note`);
      if (el_tp && el_ds && el_note) {
        picc.push({
          dow: ['週一', '週二', '週三', '週四', '週五'][i],
          tp: el_tp.value,
          ds: el_ds.value,
          note: el_note.value
        });
      } else {
        if (originalPicc[i]) {
          picc.push(originalPicc[i]);
        } else {
          picc.push({ dow: ['週一', '週二', '週三', '週四', '週五'][i], tp: '', ds: '', note: '' });
        }
      }
    }
    
    // Leaves
    const leaves = {};
    const hasLeavesDom = PEOPLE.some(p => document.getElementById(`ni-leaves-${p.name}`));
    if (hasLeavesDom) {
      PEOPLE.forEach(p => {
        const inputEl = document.getElementById(`ni-leaves-${p.name}`);
        if (inputEl) {
          const val = inputEl.value;
          const parts = val.split(',').map(x => x.trim()).filter(Boolean);
          if (parts.length > 0) {
            leaves[p.name] = parts;
          }
        }
      });
    } else {
      if (NI_DATA[key] && NI_DATA[key].leaves) {
        Object.assign(leaves, NI_DATA[key].leaves);
      }
    }
    
    // Covers (Visual Table Parsing)
    let covers = {};
    const visualCovers = getCoversFromVisualTable();
    if (visualCovers !== null) {
      covers = visualCovers;
    } else {
      // 雙向 Fallback 鎖：若 DOM 未渲染，則使用記憶體中的資料
      if (NI_DATA[key] && NI_DATA[key].covers) {
        covers = NI_DATA[key].covers;
      }
    }
    
    // Holidays
    const holidays = [];
    const holInput = document.getElementById('holidayInput');
    if (holInput) {
      holInput.value.split(',').forEach(p => {
        p = p.trim();
        if (!p) return;
        const match = p.match(/^(\d{1,2})\/(\d{1,2})$/);
        if (match) {
          holidays.push(`${parseInt(match[1])}/${parseInt(match[2])}`);
        }
      });
    } else {
      holidays.push(...(NI_DATA[key].holidays || []));
    }
    
    // Notes
    const notesInput = document.getElementById('notesInput');
    const notes = notesInput ? notesInput.value : (NI_DATA[key].notes || '');
    
    // 2. 收集中風值班 (EVT) 資料
    const [yearStr, monthStr] = key.split('-');
    const year = parseInt(yearStr);
    const month = parseInt(monthStr);
    const daysInMonth = new Date(year, month, 0).getDate();
    
    const evt = {};
    const originalEvt = ALL_SCHEDULES[key] || {};
    for (let day = 1; day <= daysInMonth; day++) {
      const tpEl = document.getElementById(`evt-tp-${day}`);
      if (tpEl) {
        const tpVal = tpEl.value;
        if (tpVal) {
          evt[day] = {
            tp: tpVal,
            ds: ''
          };
        }
      } else {
        if (originalEvt[day]) {
          evt[day] = originalEvt[day];
        }
      }
    }
    
    // 3. 上傳雲端 Firestore
    const ni = {
      angio,
      erct,
      routine_ct,
      mri,
      ds_mri_daily,
      saturday,
      mri_sunday,
      picc,
      leaves,
      covers,
      holidays,
      notes
    };

    // 這裡是整份覆寫，需把不在編輯表單內的欄位帶回來，否則會被清掉
    const prevNi = NI_DATA[key] || {};
    if (prevNi.ignoredGaps) ni.ignoredGaps = prevNi.ignoredGaps;

    await db.collection("schedules").doc(key).set({
      ni,
      evt
    });
    
    // 4. 同步更新記憶體
    NI_DATA[key] = ni;
    ALL_SCHEDULES[key] = evt;
    
    // 自動退出編輯與代班模式
    isEditMode = false;
    activeEditSection = null;
    activeCoverSection = null;
    toggleEditUiState();
    render();
    applyPendingSnapshot();
    alert("🎉 整個班表已成功儲存並同步至雲端資料庫！");
  } catch (error) {
    console.error("儲存班表失敗:", error);
    alert("❌ 儲存失敗：" + error.message);
  } finally {
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.textContent = "💾 儲存修改";
    }
  }
}

// ════════════════════════════════════════════════════
//  中風取栓班表 (EVT) Tab 渲染
// ════════════════════════════════════════════════════
const evtLegendPeople = PEOPLE.filter(p => p.name !== '劉家義' && p.name !== '黃崇堯');

function toggleAllFilters(showAll) {
  const pills = legendEl.querySelectorAll('.legend-pill');
  evtLegendPeople.forEach((p, idx) => {
    const pill = pills[idx];
    if (showAll) {
      hiddenPeople.delete(p.key);
      if (pill) pill.classList.remove('dimmed');
    } else {
      hiddenPeople.add(p.key);
      if (pill) pill.classList.add('dimmed');
    }
  });
  renderEvtCalendar();
}

const legendEl = document.getElementById('legend');
if (legendEl) {
  legendEl.innerHTML = '';
  evtLegendPeople.forEach(p => {
    const pill = document.createElement('div');
    pill.className = 'legend-pill';
    pill.innerHTML = `<span class="legend-dot" style="background:${p.color}"></span>${p.name}`;
    pill.addEventListener('click', () => {
      if (hiddenPeople.has(p.key)) {
        hiddenPeople.delete(p.key);
        pill.classList.remove('dimmed');
      } else {
        hiddenPeople.add(p.key);
        pill.classList.add('dimmed');
      }
      renderEvtCalendar();
    });
    legendEl.appendChild(pill);
  });
}

function renderEvtCalendar() {
  const key = MONTH_KEYS[currentIdx];
  const [yearStr, monthStr] = key.split('-');
  const year  = parseInt(yearStr);
  const month = parseInt(monthStr);
  const schedule = ALL_SCHEDULES[key] || {};

  const daysInMonth = new Date(year, month, 0).getDate();
  const startOffset = ((new Date(year, month - 1, 1).getDay()) + 6) % 7; // Mon=0
  // 用當下時間判斷「今天」，避免頁面開著跨日後仍標在舊的日期
  const nowReal = new Date();
  const todayDay = (nowReal.getFullYear() === year && nowReal.getMonth() + 1 === month) ? nowReal.getDate() : -1;

  const grid = document.getElementById('calGrid');
  grid.innerHTML = '';

  for (let i = 0; i < startOffset; i++) {
    const e = document.createElement('div');
    e.className = 'day-cell empty';
    grid.appendChild(e);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dow = new Date(year, month - 1, day).getDay();
    const isWeekend = (dow === 0 || dow === 6);
    const isToday   = (day === todayDay);

    const cell = document.createElement('div');
    let cls = 'day-cell';
    if (isWeekend) cls += ' weekend-cell';
    if (isToday)   cls += ' today';
    cell.className = cls;

    const numEl = document.createElement('div');
    numEl.className = 'day-num';
    numEl.innerHTML = `${day}<span class="dow-mini">週${DOW_NAMES_TW[dow]}</span>`;
    if (isToday) {
      const dot = document.createElement('span');
      dot.className = 'today-dot';
      numEl.appendChild(dot);
    }
    cell.appendChild(numEl);

    if (isEditMode) {
      const editDiv = document.createElement('div');
      editDiv.style.display = 'flex';
      editDiv.style.flexDirection = 'column';
      editDiv.style.gap = '4px';
      editDiv.style.marginTop = '4px';
      
      const duty = schedule[day] || {};
      const currentTp = (typeof duty === 'string') ? duty : (duty.tp || '');
      
      const selectTp = document.createElement('select');
      selectTp.id = `evt-tp-${day}`;
      selectTp.style.fontSize = '0.72rem';
      selectTp.style.padding = '1px 2px';
      selectTp.style.width = '100%';
      let tpOpts = evtLegendPeople.map(p => `<option value="${p.name}" ${p.name === currentTp ? 'selected' : ''}>${p.name}</option>`).join('');
      if (currentTp && !evtLegendPeople.some(p => p.name === currentTp)) {
        tpOpts += `<option value="${currentTp}" selected>${currentTp}</option>`;
      }
      selectTp.innerHTML = `<option value="">-</option>` + tpOpts;
      editDiv.appendChild(selectTp);
      
      cell.appendChild(editDiv);
    } else {
      const duty = schedule[day];
      if (duty) {
        const list = document.createElement('div');
        list.className = 'oncall-list';
        list.style.display = 'flex';
        list.style.flexDirection = 'column';
        list.style.gap = '3px';
        
        const tpName = (typeof duty === 'string') ? duty : (duty ? duty.tp : '');
        
        if (tpName) {
          const p = personByName[tpName];
          if (p) {
            const chip = document.createElement('div');
            chip.className = `oncall-chip ${p.cls}`;
            if (hiddenPeople.has(p.key)) chip.classList.add('dimmed');
            chip.textContent = tpName;
            list.appendChild(chip);
          }
        }
        
        if (list.children.length > 0) {
          cell.appendChild(list);
        }
      }
    }

    grid.appendChild(cell);
  }
}

