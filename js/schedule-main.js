// ════════════════════════════════════════════════════
//  神經放射線班表 — schedule-main.js（第 7 / 7 個載入）
//  主渲染控制、自動更新、頁面初始化與儲存格代班視窗
//
//  ⚠️ 這些檔案是同一支程式拆開的，共用全域範圍，載入順序不可調換。
//     順序定義於 tools/schedule.html，新增檔案時也要一併加入 sw.js 的 APP_SHELL。
// ════════════════════════════════════════════════════

// ════════════════════════════════════════════════════
//  主渲染控制
// ════════════════════════════════════════════════════
// 套用範本時已先把範本寫進記憶體，該次重繪不可再從（仍顯示舊值的）DOM 收回
let skipEditSyncOnce = false;

function render() {
  const key = MONTH_KEYS[currentIdx];

  // 編輯中的未存內容原本只存在於輸入框裡，任何重繪都會直接清掉。
  // 這裡先把現值收回記憶體，重繪後輸入框會以記憶體的值重新填回，
  // 使用者就能在編輯途中自由切換日期、展開明細等而不會遺失內容。
  // （syncDomToMemory 在欄位未渲染時會保留原值，故此處呼叫是安全的）
  if ((isEditMode || activeEditSection) && !skipEditSyncOnce) {
    try {
      syncDomToMemory(key);
    } catch (e) {
      console.warn('[Edit] 收回編輯內容失敗，維持記憶體原值:', e);
    }
  }
  skipEditSyncOnce = false;

  const [y, m] = key.split('-');
  document.getElementById('monthLabel').textContent = `${y} 年 ${parseInt(m)} 月`;
  document.getElementById('prevBtn').disabled = currentIdx === 0;
  document.getElementById('nextBtn').disabled = currentIdx === MONTH_KEYS.length - 1;

  // Render combined today card
  const container = document.getElementById('today-card-container');
  container.innerHTML = '';
  const todayCard = renderTodayCard(key);
  if (todayCard) container.appendChild(todayCard);

  renderTabContent();
}

function renderTabContent() {
  const key = MONTH_KEYS[currentIdx];
  if (activeTab === 'ni') {
    const d = NI_DATA[key];
    if (d) renderNiTab(d);
  } else {
    renderEvtCalendar();
  }
}

// ════════════════════════════════════════════════════
//  自動更新：時段切換 / 跨日時免手動重新整理
// ════════════════════════════════════════════════════
// 頁面常被整天掛在瀏覽器分頁裡，但 08:30、17:00 的時段切換與跨日
// 原本都要重新整理才會反映，這裡定期比對「邏輯日期 + 時段」有無變化。
function currentTickSignature() {
  const logicalDate = getLogicalDate();
  return `${logicalDate.toDateString()}|${getAutoFilterStatus(logicalDate)}`;
}

let lastTickSignature = currentTickSignature();

function refreshIfTimeSliceChanged() {
  // 編輯模式下的未存內容存在 DOM 裡，重繪會直接清掉，因此跳過
  if (isEditMode || activeEditSection || activeCoverSection) return;
  const sig = currentTickSignature();
  if (sig === lastTickSignature) return;
  lastTickSignature = sig;
  render();
}

setInterval(refreshIfTimeSliceChanged, 30000);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) refreshIfTimeSliceChanged();
});

// ════════════════════════════════════════════════════
//  初始化
// ════════════════════════════════════════════════════
render();
setViewMode(viewMode);

// ════════════════════════════════════════════════════
//  儲存格快速設定請假代班 UI 邏輯
// ════════════════════════════════════════════════════
window.enterSectionCover = function(key) {
  if (activeEditSection || activeCoverSection) {
    alert("請先完成或取消目前的編輯狀態！");
    return;
  }
  activeCoverSection = key;
  toggleEditUiState();
  render();
};

window.exitSectionCover = function() {
  activeCoverSection = null;
  toggleEditUiState();
  render();
};

let currentCellCoverData = null; // 暫存當前點選的格子資訊

const originalTaskNames = TASK_NAMES;

window.openCellCoverModal = function(taskKey, location, name, targetDate, dow) {
  currentCellCoverData = { taskKey, location, name, targetDate, dow };
  
  const modal = document.getElementById('cellCoverModal');
  const title = document.getElementById('cellCoverModalTitle');
  const absentDocInput = document.getElementById('cellCoverAbsentDoc');
  const dateSelect = document.getElementById('cellCoverDateSelect');
  const doctorSelect = document.getElementById('cellCoverDoctorSelect');
  
  const singleSec = document.getElementById('cellCoverSingleSection');
  const doubleSec = document.getElementById('cellCoverDoubleSection');
  const doctorSelectTp = document.getElementById('cellCoverDoctorSelectTp');
  const doctorSelectDs = document.getElementById('cellCoverDoctorSelectDs');
  
  const dateSelectContainer = document.getElementById('cellCoverDateSelectContainer');
  const dateMultiContainer = document.getElementById('cellCoverDateMultiContainer');
  const dateGrid = document.getElementById('cellCoverDateGrid');
  
  if (!modal || !title || !absentDocInput || !dateSelect || !doctorSelect) return;
  
  title.textContent = `🔄 設定請假代班 [${originalTaskNames[taskKey] || taskKey}]`;
  absentDocInput.value = name;
  
  const monthKey = MONTH_KEYS[currentIdx];
  const isDoubleSelect = taskKey === 'routine_ct';
  
  // 1. 初始化日期部分 (單選 vs 複選)
  if (isDoubleSelect) {
    if (dateSelectContainer) dateSelectContainer.style.display = 'none';
    if (dateMultiContainer) dateMultiContainer.style.display = 'block';
    
    if (dateGrid) {
      dateGrid.innerHTML = '';
      
      // 1-1. 插入「一」到「日」的星期 Header
      const daysOfWeekText = ['一', '二', '三', '四', '五', '六', '日'];
      daysOfWeekText.forEach(dayText => {
        const cell = document.createElement('div');
        cell.style = 'text-align: center; font-size: 0.75rem; font-weight: bold; color: #64748b; padding: 4px 0; border-bottom: 2px solid #e2e8f0; margin-bottom: 4px;';
        cell.textContent = dayText;
        dateGrid.appendChild(cell);
      });

      // 1-2. 根據 monthKey 取得該月 1 號是星期幾，以計算前方空白天數
      const [year, month] = monthKey.split('-').map(Number);
      const firstDayOfWeek = new Date(year, month - 1, 1).getDay(); // 0 是日，1 是一
      const emptyDays = (firstDayOfWeek === 0) ? 6 : (firstDayOfWeek - 1);

      // 1-3. 插入空白格使 1 號能對齊正確的星期
      for (let i = 0; i < emptyDays; i++) {
        const emptyCell = document.createElement('div');
        dateGrid.appendChild(emptyCell);
      }

      // 1-4. 渲染每個月的日期格子
      const dates = getAllDatesInMonth(monthKey);
      dates.forEach(dStr => {
        const [m, d] = dStr.split('/');
        const label = document.createElement('label');
        label.className = 'date-pill-checkbox';
        
        // 檢查此日期是否已有此醫師的 CT 代班
        let isChecked = false;
        const curData = NI_DATA[monthKey];
        if (curData && curData.covers && curData.covers[dStr] && curData.covers[dStr][name]) {
          const cover = curData.covers[dStr][name];
          if (cover && typeof cover === 'object' && cover[taskKey]) {
            isChecked = true;
          } else if (typeof cover === 'string' && taskKey === 'all') {
            isChecked = true;
          }
        }
        
        // 根據星期幾為週末日期加上紅色/藍色配色
        const dNum = Number(d);
        const curDateObj = new Date(year, month - 1, dNum);
        const curDow = curDateObj.getDay(); // 0=日, 6=六
        let textColor = '#1e293b';
        if (curDow === 6) {
          textColor = '#2563eb'; // 藍色
        } else if (curDow === 0) {
          textColor = '#dc2626'; // 紅色
        }

        label.style = `display: flex; flex-direction: column; align-items: center; justify-content: center; aspect-ratio: 1; padding: 4px; border: 1px solid #e2e8f0; border-radius: 6px; background: white; cursor: pointer; font-size: 0.85rem; font-weight: 700; color: ${textColor}; transition: all 0.2s ease; position: relative; user-select: none; min-height: 38px;`;
        
        label.innerHTML = `
          <input type="checkbox" value="${dStr}" ${isChecked ? 'checked' : ''} style="display: none;">
          <span style="font-size: 0.95rem;">${d}</span>
        `;
        
        const checkbox = label.querySelector('input');
        const updateStyle = () => {
          if (checkbox.checked) {
            label.style.background = 'var(--primary-color, #2563eb)';
            label.style.borderColor = 'var(--primary-color, #2563eb)';
            label.style.color = 'white';
            label.style.boxShadow = '0 2px 4px rgba(37, 99, 235, 0.2)';
          } else {
            label.style.background = 'white';
            label.style.borderColor = '#e2e8f0';
            label.style.color = textColor;
            label.style.boxShadow = 'none';
          }
        };

        label.addEventListener('mouseenter', () => {
          if (!checkbox.checked) {
            label.style.background = '#f1f5f9';
            label.style.borderColor = '#cbd5e1';
          }
        });

        label.addEventListener('mouseleave', () => {
          if (!checkbox.checked) {
            label.style.background = 'white';
            label.style.borderColor = '#e2e8f0';
          }
        });
        
        checkbox.onchange = updateStyle;
        updateStyle();
        
        dateGrid.appendChild(label);
      });
    }
  } else {
    if (dateSelectContainer) dateSelectContainer.style.display = 'block';
    if (dateMultiContainer) dateMultiContainer.style.display = 'none';
    
    dateSelect.innerHTML = '';
    if (targetDate) {
      const opt = document.createElement('option');
      opt.value = targetDate;
      opt.textContent = targetDate;
      dateSelect.appendChild(opt);
      dateSelect.disabled = true;
    } else {
      dateSelect.disabled = false;
      const dates = dow ? getDatesForDayOfWeek(monthKey, dow) : getAllDatesInMonth(monthKey);
      
      dates.forEach(dStr => {
        const opt = document.createElement('option');
        opt.value = dStr;
        opt.textContent = dStr;
        dateSelect.appendChild(opt);
      });
    }
  }
  
  // 2. 初始化代班選單（單一與雙院區）
  doctorSelect.innerHTML = '<option value="">- (無代班/取消)</option>';
  if (doctorSelectTp && doctorSelectDs) {
    doctorSelectTp.innerHTML = '<option value="">- (無代班/取消)</option>';
    doctorSelectDs.innerHTML = '<option value="">- (無代班/取消)</option>';
  }
  
  CORE_DOCTORS.forEach(docName => {
    if (docName !== name) {
      const opt = document.createElement('option');
      opt.value = docName;
      opt.textContent = docName;
      doctorSelect.appendChild(opt);
      
      if (doctorSelectTp && doctorSelectDs) {
        const opt1 = document.createElement('option');
        opt1.value = docName;
        opt1.textContent = docName;
        doctorSelectTp.appendChild(opt1);
        
        const opt2 = document.createElement('option');
        opt2.value = docName;
        opt2.textContent = docName;
        doctorSelectDs.appendChild(opt2);
      }
    }
  });
  
  // 3. 根據 taskKey 決定單/雙選單的顯示與預載
  if (isDoubleSelect) {
    if (singleSec) singleSec.style.display = 'none';
    if (doubleSec) doubleSec.style.display = 'block';
  } else {
    if (singleSec) singleSec.style.display = 'block';
    if (doubleSec) doubleSec.style.display = 'none';
  }
  
  const preselectCover = () => {
    if (isDoubleSelect) {
      let existingTp = '';
      let existingDs = '';
      const dates = getAllDatesInMonth(monthKey);
      for (let dStr of dates) {
        const curData = NI_DATA[monthKey];
        if (curData && curData.covers && curData.covers[dStr] && curData.covers[dStr][name]) {
          const cover = curData.covers[dStr][name];
          if (cover && typeof cover === 'object' && cover[taskKey]) {
            const taskCover = cover[taskKey];
            if (typeof taskCover === 'string') {
              existingTp = taskCover;
              existingDs = taskCover;
            } else if (typeof taskCover === 'object') {
              existingTp = taskCover.tp || '';
              existingDs = taskCover.ds || '';
            }
            break;
          }
        }
      }
      if (doctorSelectTp && doctorSelectDs) {
        doctorSelectTp.value = existingTp;
        doctorSelectDs.value = existingDs;
      }
    } else {
      const selDate = dateSelect.value;
      const d = NI_DATA[monthKey];
      let existingCover = '';
      if (d && d.covers && d.covers[selDate] && d.covers[selDate][name]) {
        const cover = d.covers[selDate][name];
        if (typeof cover === 'string') {
          if (taskKey === 'all') existingCover = cover;
        } else if (typeof cover === 'object') {
          const taskCover = pickTaskCover(cover, taskKey);
          if (taskCover) {
            if (typeof taskCover === 'string') {
              existingCover = taskCover;
            } else if (typeof taskCover === 'object') {
              if (location === 'tp' && taskCover.tp) {
                existingCover = taskCover.tp;
              } else if (location === 'ds' && taskCover.ds) {
                existingCover = taskCover.ds;
              }
            }
          }
        }
      }
      doctorSelect.value = existingCover;
    }
  };
  
  dateSelect.onchange = preselectCover;
  preselectCover();
  
  modal.style.display = 'block';
};

window.closeCellCoverModal = function() {
  const modal = document.getElementById('cellCoverModal');
  if (modal) modal.style.display = 'none';
  currentCellCoverData = null;
};

window.submitCellCover = function() {
  if (!currentCellCoverData) return;
  const { taskKey, location, name, targetDate, dow } = currentCellCoverData;
  
  const dateSelect = document.getElementById('cellCoverDateSelect');
  if (!dateSelect) return;
  
  const monthKey = MONTH_KEYS[currentIdx];
  
  if (!NI_DATA[monthKey]) NI_DATA[monthKey] = {};
  if (!NI_DATA[monthKey].covers) NI_DATA[monthKey].covers = {};
  if (!NI_DATA[monthKey].leaves) NI_DATA[monthKey].leaves = {};
  
  const covers = NI_DATA[monthKey].covers;
  const leaves = NI_DATA[monthKey].leaves;
  
  const isDoubleSelect = taskKey === 'routine_ct';
  
  if (isDoubleSelect) {
    const doctorSelectTp = document.getElementById('cellCoverDoctorSelectTp');
    const doctorSelectDs = document.getElementById('cellCoverDoctorSelectDs');
    if (!doctorSelectTp || !doctorSelectDs) return;
    
    const coverTp = doctorSelectTp.value;
    const coverDs = doctorSelectDs.value;
    
    // 獲取網格中所有的勾選狀態
    const dateGrid = document.getElementById('cellCoverDateGrid');
    const checkboxes = dateGrid ? dateGrid.querySelectorAll('input[type="checkbox"]') : [];
    
    checkboxes.forEach(cb => {
      const dateVal = cb.value;
      const isChecked = cb.checked;
      
      if (isChecked) {
        if (!coverTp && !coverDs) {
          // 勾選了但沒指派人，視為取消該日期的 CT 代班
          removeCtCover(dateVal);
        } else {
          // 新增或更新該日期的 CT 代班
          if (!covers[dateVal]) covers[dateVal] = {};
          if (!covers[dateVal][name]) covers[dateVal][name] = {};
          
          let targetObj = covers[dateVal][name];
          if (!targetObj) {
            targetObj = {};
            covers[dateVal][name] = targetObj;
          } else if (typeof targetObj === 'string') {
            targetObj = { all: targetObj };
            covers[dateVal][name] = targetObj;
          }
          targetObj[taskKey] = { tp: coverTp, ds: coverDs };
          // 注意：這裡刻意不動 leaves。單項工作換班不代表整天請假，
          // 若一併寫進 leaves，該醫師當天其他工作會被誤標成「(休)」。
          // 真正的請假請於「醫師請假日期設定」欄位維護。
        }
      } else {
        // 未勾選，視為取消該日期的 CT 代班
        removeCtCover(dateVal);
      }
    });
    
    // 輔助函數：從指定日期移除該醫師的 CT 代班
    function removeCtCover(dateVal) {
      if (covers[dateVal] && covers[dateVal][name]) {
        const item = covers[dateVal][name];
        if (typeof item === 'object') {
          delete item[taskKey];
          if (Object.keys(item).length === 0) {
            delete covers[dateVal][name];
          }
        }
        if (Object.keys(covers[dateVal]).length === 0) {
          delete covers[dateVal];
        }
      }
      
      // 這裡同樣不動 leaves：取消某一項代班不代表當天的請假記錄要一併刪掉，
      // 否則真正休假的醫師會被悄悄改成沒請假。
    }
  } else {
    // 一般單選流程
    const doctorSelect = document.getElementById('cellCoverDoctorSelect');
    if (!doctorSelect) return;
    const coverDoc = doctorSelect.value;
    const dateVal = dateSelect.value;
    
    if (!coverDoc) {
      // 刪除此單一代班
      if (covers[dateVal] && covers[dateVal][name]) {
        const item = covers[dateVal][name];
        if (typeof item === 'string') {
          if (taskKey === 'all') {
            delete covers[dateVal][name];
          }
        } else if (typeof item === 'object') {
          if (taskKey && item[taskKey]) {
            if (typeof item[taskKey] === 'string') {
              delete item[taskKey];
            } else if (typeof item[taskKey] === 'object') {
              if (location === 'tp' || location === 'ds') {
                delete item[taskKey][location];
                if (Object.keys(item[taskKey]).length === 0) {
                  delete item[taskKey];
                }
              } else {
                delete item[taskKey];
              }
            }
          }
          if (Object.keys(item).length === 0) {
            delete covers[dateVal][name];
          }
        }
        if (Object.keys(covers[dateVal]).length === 0) {
          delete covers[dateVal];
        }
      }
      
      // 同上：不連動刪除 leaves
    } else {
      // 新增或更新單一代班
      if (!covers[dateVal]) covers[dateVal] = {};
      if (!covers[dateVal][name]) covers[dateVal][name] = {};
      
      const existing = covers[dateVal][name];
      if (taskKey === 'all') {
        covers[dateVal][name] = coverDoc;
      } else {
        let targetObj = existing;
        if (!targetObj) {
          targetObj = {};
          covers[dateVal][name] = targetObj;
        } else if (typeof existing === 'string') {
          targetObj = { all: existing };
          covers[dateVal][name] = targetObj;
        }
        
        if (location === 'tp' || location === 'ds') {
          if (!targetObj[taskKey]) targetObj[taskKey] = {};
          if (typeof targetObj[taskKey] === 'string') {
            targetObj[taskKey] = { tp: targetObj[taskKey] };
          }
          targetObj[taskKey][location] = coverDoc;
        } else {
          targetObj[taskKey] = coverDoc;
        }
      }
      // 同上：單項工作換班不寫入 leaves，避免當天其他工作被誤標成「(休)」
    }
  }
  
  // 直接自動儲存到雲端
  if (getDb()) {
    db.collection("schedules").doc(monthKey).update({
      "ni.covers": covers,
      "ni.leaves": leaves
    }).then(() => {
      console.log("代班資料已自動儲存至雲端");
    }).catch(err => {
      console.error("同步至雲端失敗:", err);
      alert("⚠️ 儲存至雲端失敗：" + err.message);
    });
  } else {
    alert("⚠️ 雲端資料庫尚未初始化（您可能尚未登入），代班修改僅暫存於本機。");
  }
  
  closeCellCoverModal();
  activeCoverSection = null;
  toggleEditUiState();
  render();
  alert("🎉 代班設定已成功儲存並完成同步！");
};

function getDatesForDayOfWeek(monthKey, dowString) {
  if (!monthKey) return [];
  const [year, month] = monthKey.split('-').map(Number);
  const dowMap = { '週一': 1, '週二': 2, '週三': 3, '週四': 4, '週五': 5, '週六': 6, '週日': 0, '周一': 1, '周二': 2, '周三': 3, '周四': 4, '周五': 5, '周六': 6, '周日': 0 };
  const targetDay = dowMap[dowString];
  if (targetDay === undefined) return [];
  
  const dates = [];
  const daysInMonth = new Date(year, month, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(year, month - 1, d);
    if (dateObj.getDay() === targetDay) {
      dates.push(`${month}/${d}`);
    }
  }
  return dates;
}

function getAllDatesInMonth(monthKey) {
  if (!monthKey) return [];
  const [year, month] = monthKey.split('-').map(Number);
  const dates = [];
  const daysInMonth = new Date(year, month, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    dates.push(`${month}/${d}`);
  }
  return dates;
}

// ════════════════════════════════════════════════════
//  頁面初始化（必須是最後執行的一段）
// ════════════════════════════════════════════════════
// 主動初始化 Firebase：確保 db 在頁面載入時即刻就緒。
// 必須等到所有程式檔載入完成才做，否則 onAuthStateChanged 回呼可能在
// render() 等函式尚未定義時就觸發。
getDb();

// 原本寫在 schedule-cloud.js 末尾，但 initSchedulePage() 會呼叫 render()，
// 而 render() 依賴後續檔案才宣告的變數（如 autoFilterTime、evtLegendPeople）。
// 放在最後載入的檔案，才不會因載入時機不同而踩到 TDZ。
if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initSchedulePage);
} else {
  initSchedulePage();
}
