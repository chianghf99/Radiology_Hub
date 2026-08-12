// ════════════════════════════════════════════════════
//  神經放射線班表 — schedule-admin.js（第 3 / 7 個載入）
//  管理設定視窗、新月份建立、排班範本、編輯模式與 DOM→記憶體同步
//
//  ⚠️ 這些檔案是同一支程式拆開的，共用全域範圍，載入順序不可調換。
//     順序定義於 tools/schedule.html，新增檔案時也要一併加入 sw.js 的 APP_SHELL。
// ════════════════════════════════════════════════════

// ════════════════════════════════════════════════════
//  管理設定彈出視窗與新月份建立控制
// ════════════════════════════════════════════════════
function openSettingsModal() {
  const modal = document.getElementById('adminSettingsModal');
  if (modal) {
    modal.style.display = 'block';
    updateModalAuthStatus();
  }
}

function closeSettingsModal() {
  const modal = document.getElementById('adminSettingsModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// 點擊 Modal 外部時關閉 Modal
window.addEventListener('click', (event) => {
  const modal = document.getElementById('adminSettingsModal');
  if (event.target === modal) {
    closeSettingsModal();
  }
});

function updateModalAuthStatus() {
  const loggedOutDiv = document.getElementById('modal-logged-out');
  const loggedInDiv = document.getElementById('modal-logged-in');
  const adminNameSpan = document.getElementById('modal-admin-name');
  const adminFunctionsDiv = document.getElementById('adminFunctions');
  
  if (!loggedOutDiv || !loggedInDiv) return;
  
  if (currentUser) {
    loggedOutDiv.style.display = 'none';
    loggedInDiv.style.display = 'flex';
    if (adminNameSpan) {
      adminNameSpan.textContent = currentUser.displayName || currentUser.email;
    }
    if (adminFunctionsDiv) {
      adminFunctionsDiv.style.display = 'block';
      loadTemplatesList();
    }
    
    // 更新排班編輯按鈕文字
    const editBtn = document.getElementById('modalToggleEditBtn');
    if (editBtn) {
      if (isEditMode) {
        editBtn.textContent = "❌ 關閉排班編輯模式";
        editBtn.style.background = "#ef4444";
      } else {
        editBtn.textContent = "🔧 開啟排班編輯模式";
        editBtn.style.background = "var(--accent-color)";
      }
    }
    
    // 填入本月放假日期
    const key = MONTH_KEYS[currentIdx];
    const d = NI_DATA[key];
    const activeHolidays = (d && d.holidays) ? d.holidays : [];
    const holidayInput = document.getElementById('modalHolidayInput');
    if (holidayInput) {
      holidayInput.value = activeHolidays.join(', ');
    }
  } else {
    loggedOutDiv.style.display = 'block';
    loggedInDiv.style.display = 'none';
    if (adminFunctionsDiv) {
      adminFunctionsDiv.style.display = 'none';
    }
    if (isEditMode) {
      cancelEditMode();
    }
  }
}

function toggleEditModeFromModal() {
  if (!currentUser) {
    alert("請先登入管理帳號！");
    return;
  }
  
  if (!isEditMode) {
    toggleEditMode();
    closeSettingsModal();
  } else {
    cancelEditMode();
    closeSettingsModal();
  }
}

async function saveHolidaysFromModal() {
  const key = MONTH_KEYS[currentIdx];
  const holidayInput = document.getElementById('modalHolidayInput');
  if (!holidayInput) return;
  
  const inputVal = holidayInput.value;
  const rawParts = inputVal.split(',');
  const parsed = [];
  
  rawParts.forEach(p => {
    p = p.trim();
    if (!p) return;
    const match = p.match(/^(\d{1,2})\/(\d{1,2})$/);
    if (match) {
      parsed.push(`${parseInt(match[1])}/${parseInt(match[2])}`);
    }
  });

  if (!getDb()) {
    alert("雲端資料庫尚未初始化");
    return;
  }

  const saveBtn = document.querySelector('button[onclick="saveHolidaysFromModal()"]');
  const originalText = saveBtn ? saveBtn.textContent : "💾 儲存休假日設定";
  try {
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.textContent = "儲存中...";
    }
    
    await db.collection("schedules").doc(key).update({
      "ni.holidays": parsed
    });
    
    if (!NI_DATA[key]) {
      NI_DATA[key] = {};
    }
    NI_DATA[key].holidays = parsed;
    
    render();
    alert("休假日已成功同步至雲端！");
    closeSettingsModal();
  } catch (error) {
    alert("休假日儲存失敗: " + error.message);
  } finally {
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.textContent = originalText;
    }
  }
}

async function handleCreateNewMonth() {
  const input = document.getElementById('newMonthInput');
  if (!input) return;
  
  const monthKey = input.value.trim();
  if (!monthKey) {
    alert("請輸入月份，例如: 2026-08");
    return;
  }
  
  if (!/^\d{4}-\d{2}$/.test(monthKey)) {
    alert("月份格式錯誤，請使用 YYYY-MM 格式，例如: 2026-08");
    return;
  }
  
  if (NI_DATA[monthKey]) {
    alert(`月份 ${monthKey} 的班表已存在！`);
    return;
  }
  
  const [yearStr, monthStr] = monthKey.split('-');
  const year = parseInt(yearStr);
  const month = parseInt(monthStr);
  
  // 計算星期六與星期日的日期列表
  const saturdays = [];
  const sundays = [];
  const daysInMonth = new Date(year, month, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month - 1, d);
    const dow = date.getDay();
    if (dow === 6) { // 6 是星期六
      saturdays.push(`${month}/${d}`);
    } else if (dow === 0) { // 0 是星期日
      sundays.push(`${month}/${d}`);
    }
  }
  
  const saturdayList = saturdays.map(dateStr => ({
    date: dateStr,
    person: '',
    note: ''
  }));

  const sundayList = sundays.map(dateStr => ({
    date: dateStr,
    person: '',
    note: ''
  }));
  
  const ni = {
    angio: [
      { dow: '週一', tp_dsa: '', tp_tae: '', ds_dsa: '', ds_tae: '', note: '' },
      { dow: '週二', tp_dsa: '', tp_tae: '', ds_dsa: '', ds_tae: '', note: '' },
      { dow: '週三', tp_dsa: '', tp_tae: '', ds_dsa: '', ds_tae: '', note: '' },
      { dow: '週四', tp_dsa: '', tp_tae: '', ds_dsa: '', ds_tae: '', note: '' },
      { dow: '週五', tp_dsa: '', tp_tae: '', ds_dsa: '', ds_tae: '', note: '' }
    ],
    erct: [
      { dow: '週一', tp: '', ds: '', note: '' },
      { dow: '週二', tp: '', ds: '', note: '' },
      { dow: '週三', tp: '', ds: '', note: '' },
      { dow: '週四', tp: '', ds: '', note: '' },
      { dow: '週五', tp: '', ds: '', note: '' }
    ],
    routine_ct: [
      { person: '黃俊肇', tp: '', ds: '', note: '' },
      { person: '謝棖智', tp: '', ds: '', note: '' },
      { person: '姜信帆', tp: '', ds: '', note: '' },
      { person: '魏士揚', tp: '', ds: '', note: '' },
      { person: '鄭宇凡', tp: '', ds: '', note: '' }
    ],
    mri: {
      tp: [
        { week: 'W1', person: '', note: '' },
        { week: 'W2', person: '', note: '' },
        { week: 'W3', person: '', note: '' },
        { week: 'W4', person: '', note: '' },
        { week: 'W5', person: '', note: '' }
      ],
      ds: [
        { week: 'W1', person: '', note: '' },
        { week: 'W2', person: '', note: '' },
        { week: 'W3', person: '', note: '' },
        { week: 'W4', person: '', note: '' },
        { week: 'W5', person: '', note: '' }
      ]
    },
    ds_mri_daily: [
      { dow: '週一', person: '', note: '' },
      { dow: '週二', person: '', note: '' },
      { dow: '週三', person: '', note: '' },
      { dow: '週四', person: '', note: '' },
      { dow: '週五', person: '', note: '' }
    ],
    saturday: saturdayList,
    mri_sunday: sundayList,
    picc: [
      { dow: '週一', tp: '', ds: '', note: '' },
      { dow: '週二', tp: '', ds: '', note: '' },
      { dow: '週三', tp: '', ds: '', note: '' },
      { dow: '週四', tp: '', ds: '', note: '' },
      { dow: '週五', tp: '', ds: '', note: '' }
    ],
    leaves: {},
    covers: {},
    holidays: [],
    notes: ''
  };

  // 判斷是否帶入前一個月份的工作分配（備註除外）
  const copyCheckbox = document.getElementById('copyPrevMonthCheckbox');
  const shouldCopy = copyCheckbox ? copyCheckbox.checked : false;
  
  if (shouldCopy) {
    let prevY = year;
    let prevM = month - 1;
    if (prevM === 0) {
      prevM = 12;
      prevY = year - 1;
    }
    const prevMonthKey = `${prevY}-${String(prevM).padStart(2, '0')}`;
    const prevData = NI_DATA[prevMonthKey];
    
    if (prevData) {
      const cleanNote = (arr) => {
        if (!arr) return [];
        return arr.map(item => {
          const copy = { ...item };
          if ('note' in copy) copy.note = '';
          return copy;
        });
      };
      
      if (prevData.angio) ni.angio = cleanNote(prevData.angio);
      if (prevData.erct) ni.erct = cleanNote(prevData.erct);
      if (prevData.routine_ct) ni.routine_ct = cleanNote(prevData.routine_ct);
      if (prevData.mri) {
        ni.mri = {
          tp: cleanNote(prevData.mri.tp),
          ds: cleanNote(prevData.mri.ds)
        };
      }
      if (prevData.ds_mri_daily) ni.ds_mri_daily = cleanNote(prevData.ds_mri_daily);
      if (prevData.picc) ni.picc = cleanNote(prevData.picc);
    }
  }
  
  const evt = {};
  
  if (!getDb()) {
    alert("雲端資料庫尚未初始化");
    return;
  }
  
  const createBtn = document.querySelector('button[onclick="handleCreateNewMonth()"]');
  const originalText = createBtn ? createBtn.textContent : "建立";
  
  try {
    if (createBtn) {
      createBtn.disabled = true;
      createBtn.textContent = "建立中...";
    }
    
    await db.collection("schedules").doc(monthKey).set({ ni, evt });
    
    alert(`月份 ${monthKey} 的空白班表已成功建立！`);
    input.value = "";
    
    // 立即套用到記憶體，不必等雲端訂閱回傳（稍後 onSnapshot 會再確認一次）
    applyScheduleDoc(monthKey, { ni, evt });
    refreshMonthKeys();
    if (MONTH_KEYS.includes(monthKey)) {
      currentIdx = MONTH_KEYS.indexOf(monthKey);
      render();
    }
    
    closeSettingsModal();
  } catch (error) {
    alert("建立新月份失敗: " + error.message);
  } finally {
    if (createBtn) {
      createBtn.disabled = false;
      createBtn.textContent = originalText;
    }
  }
}

function getCoversFromVisualTable() {
  const covers = {};
  const tbody = document.getElementById('visual-covers-tbody');
  // 表格不存在、或存在但尚未填入資料（見 renderLeavesAndCoversEditorSection
  // 的延後填入）時，一律回傳 null 表示「無法判讀」，讓呼叫端保留原有代班。
  if (!tbody || tbody.dataset.populated !== '1') return null;
  
  const rows = tbody.querySelectorAll('tr');
  rows.forEach(tr => {
    const dateInput = tr.querySelector('.cover-date-input');
    const absentSelect = tr.querySelector('.cover-absent-select');
    const taskSelect = tr.querySelector('.cover-task-select');
    const modeSelect = tr.querySelector('.cover-mode-select');
    if (!dateInput || !absentSelect || !taskSelect || !modeSelect) return;
    
    const dateVal = dateInput.value.trim();
    const absentVal = absentSelect.value.trim();
    const taskVal = taskSelect.value.trim();
    const modeVal = modeSelect.value.trim();
    if (!dateVal || !absentVal) return;
    
    if (!covers[dateVal]) covers[dateVal] = {};
    if (!covers[dateVal][absentVal]) covers[dateVal][absentVal] = {};
    
    let coverPayload = null;
    if (modeVal === 'single') {
      const singleSelect = tr.querySelector('.cover-single-select');
      const singleVal = singleSelect ? singleSelect.value.trim() : '';
      if (singleVal) {
        coverPayload = singleVal;
      }
    } else {
      const tpSelect = tr.querySelector('.cover-tp-select');
      const dsSelect = tr.querySelector('.cover-ds-select');
      const tpVal = tpSelect ? tpSelect.value.trim() : '';
      const dsVal = dsSelect ? dsSelect.value.trim() : '';
      if (tpVal || dsVal) {
        coverPayload = {};
        if (tpVal) coverPayload.tp = tpVal;
        if (dsVal) coverPayload.ds = dsVal;
      }
    }
    
    if (coverPayload !== null) {
      if (taskVal === 'all') {
        covers[dateVal][absentVal] = coverPayload;
      } else {
        if (typeof covers[dateVal][absentVal] === 'string') {
          const prev = covers[dateVal][absentVal];
          covers[dateVal][absentVal] = { all: prev };
        }
        covers[dateVal][absentVal][taskVal] = coverPayload;
      }
    }
  });
  
  // 清理空項目，保持 JSON 結構清爽
  Object.keys(covers).forEach(dVal => {
    Object.keys(covers[dVal]).forEach(aVal => {
      const item = covers[dVal][aVal];
      if (typeof item === 'object' && item !== null) {
        if (Object.keys(item).length === 0) {
          delete covers[dVal][aVal];
        }
      }
    });
    if (Object.keys(covers[dVal]).length === 0) {
      delete covers[dVal];
    }
  });
  
  return covers;
}

// 讀取編輯欄位的現值；欄位不存在時（例如該區塊沒被渲染出來）保留原值。
// 這裡絕對不能退回空字串 —— 否則畫面上沒顯示的區塊會被整個清空。
function readEditValue(id, fallback) {
  const el = document.getElementById(id);
  if (el) return el.value;
  return (fallback === undefined || fallback === null) ? '' : fallback;
}

function syncDomToMemory(key) {
  if (!NI_DATA[key]) return;
  const data = NI_DATA[key];
  const DOWS = ['週一', '週二', '週三', '週四', '週五'];

  // 1. 血管攝影
  const origAngio = data.angio || [];
  data.angio = DOWS.map((dow, i) => {
    const o = origAngio[i] || {};
    return {
      dow,
      tp_dsa: readEditValue(`ni-angio-${i}-tp_dsa`, o.tp_dsa),
      tp_tae: readEditValue(`ni-angio-${i}-tp_tae`, o.tp_tae),
      ds_dsa: readEditValue(`ni-angio-${i}-ds_dsa`, o.ds_dsa),
      ds_tae: readEditValue(`ni-angio-${i}-ds_tae`, o.ds_tae),
      note:   readEditValue(`ni-angio-${i}-note`,   o.note)
    };
  });

  // 2. 急診 CT
  const origErct = data.erct || [];
  data.erct = DOWS.map((dow, i) => {
    const o = origErct[i] || {};
    return {
      dow,
      tp:   readEditValue(`ni-erct-${i}-tp`,   o.tp),
      ds:   readEditValue(`ni-erct-${i}-ds`,   o.ds),
      note: readEditValue(`ni-erct-${i}-note`, o.note)
    };
  });

  // 3. 門住 CT 號碼
  data.routine_ct = (data.routine_ct || []).map((row, i) => ({
    person: row.person,
    tp:   readEditValue(`ni-ct-${i}-tp`,   row.tp),
    ds:   readEditValue(`ni-ct-${i}-ds`,   row.ds),
    note: readEditValue(`ni-ct-${i}-note`, row.note)
  }));

  // 4. 門住急 MRI
  const origMri = data.mri || { tp: [], ds: [] };
  const mri = { tp: [], ds: [] };
  ['tp', 'ds'].forEach(side => {
    for (let i = 0; i < 5; i++) {
      const o = (origMri[side] || [])[i] || {};
      mri[side].push({
        week:   `W${i + 1}`,
        person: readEditValue(`ni-mri-${side}-${i}-person`, o.person),
        note:   readEditValue(`ni-mri-${side}-${i}-note`,   o.note)
      });
    }
  });
  data.mri = mri;

  // 5. 淡水健檢 / 神經 MRI
  const origDsMri = data.ds_mri_daily || [];
  data.ds_mri_daily = DOWS.map((dow, i) => {
    const o = origDsMri[i] || {};
    return {
      dow,
      person: readEditValue(`ni-dsmri-${i}-person`, o.person),
      note:   readEditValue(`ni-dsmri-${i}-note`,   o.note)
    };
  });

  // 6. 週六班
  data.saturday = (data.saturday || []).map((row, i) => ({
    date:   row.date,
    person: readEditValue(`ni-sat-${i}-person`, row.person),
    note:   readEditValue(`ni-sat-${i}-note`,   row.note)
  }));

  // 週日 MRI 加班：雲端舊文件可能沒有這個欄位，需依月份補出所有週日
  const origSun = data.mri_sunday || [];
  if (origSun.length === 0 && key && /^\d{4}-\d{2}$/.test(key)) {
    const [ys, ms] = key.split('-');
    const yr = parseInt(ys), mo = parseInt(ms);
    const days = new Date(yr, mo, 0).getDate();
    for (let d = 1; d <= days; d++) {
      if (new Date(yr, mo - 1, d).getDay() === 0) {
        origSun.push({ date: `${mo}/${d}`, person: '', note: '' });
      }
    }
  }
  data.mri_sunday = origSun.map((row, i) => ({
    date:   row.date,
    person: readEditValue(`ni-sun-${i}-person`, row.person),
    note:   readEditValue(`ni-sun-${i}-note`,   row.note)
  }));

  // 7. PICC
  const origPicc = data.picc || [];
  data.picc = DOWS.map((dow, i) => {
    const o = origPicc[i] || {};
    return {
      dow,
      tp:   readEditValue(`ni-picc-${i}-tp`,   o.tp),
      ds:   readEditValue(`ni-picc-${i}-ds`,   o.ds),
      note: readEditValue(`ni-picc-${i}-note`, o.note)
    };
  });

  // 8. 請假：只有在請假欄位確實渲染出來時才重建。
  //    否則（例如目前是今日精簡模式）整份請假紀錄會被清空。
  const leavesRendered = PEOPLE.some(p => document.getElementById(`ni-leaves-${p.name}`));
  if (leavesRendered) {
    const leaves = {};
    PEOPLE.forEach(p => {
      const inputEl = document.getElementById(`ni-leaves-${p.name}`);
      if (!inputEl) return;
      const parts = inputEl.value.split(',').map(x => x.trim()).filter(Boolean);
      if (parts.length > 0) leaves[p.name] = parts;
    });
    data.leaves = leaves;
  }

  // 9. 代班（表格未渲染時回傳 null，維持原值）
  const visualCovers = getCoversFromVisualTable();
  if (visualCovers !== null) data.covers = visualCovers;

  // 10. 醫院休假日
  const holInput = document.getElementById('holidayInput');
  if (holInput) {
    const holidays = [];
    holInput.value.split(',').forEach(p => {
      p = p.trim();
      if (!p) return;
      const match = p.match(/^(\d{1,2})\/(\d{1,2})$/);
      if (match) holidays.push(`${parseInt(match[1])}/${parseInt(match[2])}`);
    });
    data.holidays = holidays;
  }

  // 11. 本月備註
  const notesInput = document.getElementById('notesInput');
  if (notesInput) data.notes = notesInput.value;
}

function applyTemplateToMemory(key, templateData) {
  if (!NI_DATA[key]) return;
  const temp = templateData || {};
  
  // 1. Angio
  if (temp.angio && NI_DATA[key].angio) {
    NI_DATA[key].angio = NI_DATA[key].angio.map((item, i) => {
      const tempItem = temp.angio[i] || {};
      return {
        ...item,
        tp_dsa: tempItem.tp_dsa !== undefined ? tempItem.tp_dsa : item.tp_dsa,
        tp_tae: tempItem.tp_tae !== undefined ? tempItem.tp_tae : item.tp_tae,
        ds_dsa: tempItem.ds_dsa !== undefined ? tempItem.ds_dsa : item.ds_dsa,
        ds_tae: tempItem.ds_tae !== undefined ? tempItem.ds_tae : item.ds_tae
      };
    });
  }
  
  // 2. ERCT
  if (temp.erct && NI_DATA[key].erct) {
    NI_DATA[key].erct = NI_DATA[key].erct.map((item, i) => {
      const tempItem = temp.erct[i] || {};
      return {
        ...item,
        tp: tempItem.tp !== undefined ? tempItem.tp : item.tp,
        ds: tempItem.ds !== undefined ? tempItem.ds : item.ds
      };
    });
  }
  
  // 3. Routine CT
  if (temp.routine_ct && NI_DATA[key].routine_ct) {
    NI_DATA[key].routine_ct = NI_DATA[key].routine_ct.map((item) => {
      const tempItem = temp.routine_ct.find(t => t.person === item.person) || {};
      return {
        ...item,
        tp: tempItem.tp !== undefined ? tempItem.tp : item.tp,
        ds: tempItem.ds !== undefined ? tempItem.ds : item.ds
      };
    });
  }
  
  // 4. MRI
  if (temp.mri && NI_DATA[key].mri) {
    if (temp.mri.tp && NI_DATA[key].mri.tp) {
      NI_DATA[key].mri.tp = NI_DATA[key].mri.tp.map((item, i) => {
        const tempItem = temp.mri.tp[i] || {};
        return {
          ...item,
          person: tempItem.person !== undefined ? tempItem.person : item.person
        };
      });
    }
    if (temp.mri.ds && NI_DATA[key].mri.ds) {
      NI_DATA[key].mri.ds = NI_DATA[key].mri.ds.map((item, i) => {
        const tempItem = temp.mri.ds[i] || {};
        return {
          ...item,
          person: tempItem.person !== undefined ? tempItem.person : item.person
        };
      });
    }
  }
  
  // 5. Ds MRI Daily
  if (temp.ds_mri_daily && NI_DATA[key].ds_mri_daily) {
    NI_DATA[key].ds_mri_daily = NI_DATA[key].ds_mri_daily.map((item, i) => {
      const tempItem = temp.ds_mri_daily[i] || {};
      return {
        ...item,
        person: tempItem.person !== undefined ? tempItem.person : item.person
      };
    });
  }
  
  // 6. PICC
  if (temp.picc && NI_DATA[key].picc) {
    NI_DATA[key].picc = NI_DATA[key].picc.map((item, i) => {
      const tempItem = temp.picc[i] || {};
      return {
        ...item,
        tp: tempItem.tp !== undefined ? tempItem.tp : item.tp,
        ds: tempItem.ds !== undefined ? tempItem.ds : item.ds
      };
    });
  }
}

async function loadTemplatesList() {
  if (!getDb()) return;
  const selectEl = document.getElementById('templateSelect');
  if (!selectEl) return;
  
  try {
    const querySnapshot = await db.collection("schedules").get();
    selectEl.innerHTML = "";
    
    let hasTemplates = false;
    const templates = [];
    
    querySnapshot.forEach((doc) => {
      if (doc.id.startsWith("template:")) {
        const templateName = doc.id.substring("template:".length);
        templates.push(templateName);
        hasTemplates = true;
      }
    });
    
    if (!hasTemplates) {
      const opt = document.createElement('option');
      opt.value = "";
      opt.textContent = "無現有自訂範本";
      selectEl.appendChild(opt);
      return;
    }
    
    const defaultOpt = document.createElement('option');
    defaultOpt.value = "";
    defaultOpt.textContent = "-- 請選擇範本 --";
    selectEl.appendChild(defaultOpt);
    
    templates.forEach((name) => {
      const opt = document.createElement('option');
      opt.value = name;
      opt.textContent = name;
      selectEl.appendChild(opt);
    });
  } catch (error) {
    console.error("載入範本列表失敗:", error);
    selectEl.innerHTML = '<option value="">載入失敗</option>';
  }
}

async function saveCurrentAsTemplate() {
  if (!getDb()) {
    alert("雲端資料庫尚未初始化");
    return;
  }
  
  const key = MONTH_KEYS[currentIdx];
  if (!key) {
    alert("無法取得當前月份");
    return;
  }
  
  const templateName = prompt("請輸入新範本的名稱（例如：常規班 A）：");
  if (templateName === null) return;
  
  const trimmedName = templateName.trim();
  if (!trimmedName) {
    alert("範本名稱不可為空值！");
    return;
  }
  
  const docId = `template:${trimmedName}`;
  
  let isOverwrite = true;
  try {
    const docSnap = await db.collection("schedules").doc(docId).get();
    if (docSnap.exists) {
      isOverwrite = confirm(`範本「${trimmedName}」已存在。確定要覆寫它嗎？`);
      if (!isOverwrite) return;
    }
  } catch (e) {}

  let templateData = {};
  const cleanNote = (arr) => {
    if (!arr) return [];
    return arr.map(item => {
      const copy = { ...item };
      if ('note' in copy) copy.note = '';
      return copy;
    });
  };

  try {
    // 編輯中先把輸入框的現值收回記憶體，之後與非編輯模式走同一條路徑。
    // 原本這裡有一份各區塊逐格讀 DOM 的重複實作，且欄位不存在時會寫入空字串，
    // 在今日精簡模式下開啟編輯會存出一份空白範本。
    if (isEditMode) syncDomToMemory(key);

    const data = NI_DATA[key];
    if (!data) {
      alert("無當前月份資料可供儲存為範本");
      return;
    }
    templateData = {
      angio: cleanNote(data.angio),
      erct: cleanNote(data.erct),
      routine_ct: cleanNote(data.routine_ct),
      mri: data.mri ? {
        tp: cleanNote(data.mri.tp),
        ds: cleanNote(data.mri.ds)
      } : { tp: [], ds: [] },
      ds_mri_daily: cleanNote(data.ds_mri_daily),
      picc: cleanNote(data.picc)
    };
    
    await db.collection("schedules").doc(docId).set(templateData);
    alert(`自訂範本「${trimmedName}」儲存成功！`);
    
    await loadTemplatesList();
    const selectEl = document.getElementById('templateSelect');
    if (selectEl) {
      selectEl.value = trimmedName;
    }
  } catch (error) {
    alert("儲存範本失敗: " + error.message);
  }
}

async function applyTemplateToCurrent() {
  if (!getDb()) {
    alert("雲端資料庫尚未初始化");
    return;
  }
  
  const key = MONTH_KEYS[currentIdx];
  if (!key) {
    alert("無法取得當前月份");
    return;
  }
  
  const selectEl = document.getElementById('templateSelect');
  if (!selectEl) return;
  
  const selectedTemplate = selectEl.value;
  if (!selectedTemplate) {
    alert("請先選取一個自訂範本！");
    return;
  }
  
  const docId = `template:${selectedTemplate}`;
  
  try {
    const docSnap = await db.collection("schedules").doc(docId).get();
    if (!docSnap.exists) {
      alert(`找不到指定的範本「${selectedTemplate}」！`);
      return;
    }
    const templateData = docSnap.data();
    
    if (isEditMode) {
      syncDomToMemory(key);
      applyTemplateToMemory(key, templateData);
      // 記憶體已是套用範本後的結果，這次重繪不可再從舊的輸入框收回
      skipEditSyncOnce = true;
      render();
      alert(`已成功在編輯模式中帶入範本「${selectedTemplate}」！（請記得點選上方的「💾 儲存修改」以儲存至雲端，或按「❌ 取消編輯」還原）`);
      closeSettingsModal();
    } else {
      const confirmApply = confirm(`您目前不在編輯模式。套用範本「${selectedTemplate}」將會「直接覆寫」本月線上班表（但會保留原有的備註）。確定要直接套用並上傳嗎？`);
      if (!confirmApply) return;
      
      const currentDocSnap = await db.collection("schedules").doc(key).get();
      if (currentDocSnap.exists) {
        const currentData = currentDocSnap.data();
        NI_DATA[key] = currentData.ni || {};
        applyTemplateToMemory(key, templateData);
        
        await db.collection("schedules").doc(key).set({
          ni: NI_DATA[key],
          evt: currentData.evt || {}
        });
      } else {
        NI_DATA[key] = {
          angio: [], erct: [], routine_ct: [], mri: { tp: [], ds: [] }, ds_mri_daily: [], picc: [],
          saturday: [], leaves: {}, covers: {}, holidays: [], notes: ''
        };
        applyTemplateToMemory(key, templateData);
        await db.collection("schedules").doc(key).set({
          ni: NI_DATA[key],
          evt: {}
        });
      }
      
      render();
      alert(`已成功套用範本「${selectedTemplate}」並儲存至雲端！`);
      closeSettingsModal();
    }
  } catch (error) {
    alert("套用範本失敗: " + error.message);
  }
}

async function deleteSelectedTemplate() {
  if (!getDb()) return;
  
  const selectEl = document.getElementById('templateSelect');
  if (!selectEl) return;
  
  const selectedTemplate = selectEl.value;
  if (!selectedTemplate) {
    alert("請先選取一個想要刪除的自訂範本！");
    return;
  }
  
  const confirmDelete = confirm(`確定要「永久刪除」自訂範本「${selectedTemplate}」嗎？此操作無法還原。`);
  if (!confirmDelete) return;
  
  const docId = `template:${selectedTemplate}`;
  
  try {
    await db.collection("schedules").doc(docId).delete();
    alert(`已成功刪除範本「${selectedTemplate}」！`);
    await loadTemplatesList();
  } catch (error) {
    alert("刪除範本失敗: " + error.message);
  }
}

// 進入編輯模式時保存一份原始資料。
// render() 會在編輯途中把輸入框的值收回 NI_DATA（否則重繪會清掉未存內容），
// 因此「取消編輯」必須靠這份快照還原，不能只是退出編輯狀態。
let editSnapshot = null;

function beginEditSnapshot() {
  const key = MONTH_KEYS[currentIdx];
  editSnapshot = { key, data: JSON.parse(JSON.stringify(NI_DATA[key] || {})) };
}

function clearEditSnapshot() {
  editSnapshot = null;
}

function toggleEditMode() {
  beginEditSnapshot();
  activeEditSection = 'all';
  isEditMode = true;
  toggleEditUiState();
  render();
}

function cancelEditMode() {
  // 還原進入編輯前的內容，丟棄所有未儲存的修改
  if (editSnapshot && editSnapshot.key && NI_DATA[editSnapshot.key]) {
    NI_DATA[editSnapshot.key] = editSnapshot.data;
  }
  clearEditSnapshot();
  activeEditSection = null;
  isEditMode = false;
  toggleEditUiState();
  render();
  applyPendingSnapshot();
}

function toggleEditUiState() {
  const editBar = document.getElementById('floating-edit-bar');
  if (!editBar) return;
  
  if (isEditMode) {
    editBar.style.display = 'flex';
    const secNameMap = {
      'angio': '🏥 血管攝影室（神經介入）',
      'erct': '🚨 急診 CT',
      'routine_ct': '📋 門住 CT 號碼',
      'mri': '🧲 門住急 MRI',
      'ds_mri': '🏥 淡水健檢 / 神經 MRI',
      'saturday': '📅 週六班',
      'sunday': '📅 週日 MRI 加班',
      'picc': '💉 PICC',
      'leaves_covers': '⚙️ 請假與代班設定',
      'covers': '請假代班設定'
    };
    const name = secNameMap[activeEditSection] || '此區塊';
    const titleText = activeEditSection === 'all'
      ? '⚠️ 正在全域排班編輯模式中...'
      : `⚠️ 正在局部編輯：${name}...`;
      
    editBar.innerHTML = `
      <span style="font-weight: 700; color: #b45309; margin-right: 12px;">${titleText}</span>
      <button id="saveEditBtn" onclick="saveAllSchedules()" style="padding: 4px 12px; font-size: 0.78rem; font-weight: 700; border-radius: 4px; border: none; background: #10b981; color: white; cursor: pointer; margin-right: 6px;">💾 儲存修改</button>
      <button id="cancelEditBtn" onclick="cancelEditMode()" style="padding: 4px 12px; font-size: 0.78rem; font-weight: 700; border-radius: 4px; border: 1px solid #cbd5e1; background: white; color: #475569; cursor: pointer;">❌ 取消編輯</button>
    `;
  } else if (activeCoverSection) {
    editBar.style.display = 'flex';
    editBar.innerHTML = `
      <span style="font-weight: 700; color: #16a34a; font-size: 0.88rem; display: flex; align-items: center; gap: 6px; margin-right: 12px;">
        🔄 正在設定「請假代班」模式：點選以下醫師名字旁邊的 🔄 按鈕即可進行代班設定
      </span>
      <button onclick="exitSectionCover()" style="padding: 4px 12px; font-size: 0.78rem; font-weight: 700; border-radius: 4px; border: none; background: #ef4444; color: white; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='#dc2626'" onmouseout="this.style.background='#ef4444'">
        ❌ 取消設定
      </button>
    `;
  } else {
    editBar.style.display = 'none';
    editBar.innerHTML = '';
  }
}

window.startSectionEdit = function(sectionKey) {
  beginEditSnapshot();
  activeEditSection = sectionKey;
  isEditMode = true;
  toggleEditUiState();
  render();
};

window.saveSectionEdit = function(sectionKey) {
  saveAllSchedules();
};

window.cancelSectionEdit = function() {
  cancelEditMode();
};

