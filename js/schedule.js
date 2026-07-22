// ════════════════════════════════════════════════════
//  資料庫：NI 日班工作分配
// ════════════════════════════════════════════════════
const NI_DATA = {
  '2026-06': {
    angio: [
      { dow: '週一', tp_dsa: '謝棖智',    tp_tae: '謝棖智',              ds_dsa: '魏士揚',   ds_tae: '魏士揚/黃俊肇', note: '淡水DSA：神外醫師協助；6/8 淡水DSA→俊肇' },
      { dow: '週二', tp_dsa: '姜信帆',    tp_tae: '姜信帆',              ds_dsa: '黃俊肇',   ds_tae: '黃俊肇',        note: '' },
      { dow: '週三', tp_dsa: '黃俊肇',    tp_tae: '黃俊肇',              ds_dsa: '謝棖智',   ds_tae: '謝棖智',        note: '' },
      { dow: '週四', tp_dsa: '謝棖智',    tp_tae: '謝棖智',              ds_dsa: '姜信帆',   ds_tae: '魏士揚/姜信帆', note: '6/4 台北DSA→俊肇；淡水DSA→棖智' },
      { dow: '週五', tp_dsa: '魏士揚',    tp_tae: '魏士揚/謝棖智',       ds_dsa: '姜信帆',   ds_tae: '姜信帆',        note: '6/5 台北DSA→棖智；淡水DSA→俊肇' },
    ],
    erct: [
      { dow: '週一', tp: '謝棖智', ds: '謝棖智', note: '' },
      { dow: '週二', tp: '姜信帆', ds: '姜信帆', note: '' },
      { dow: '週三', tp: '黃俊肇', ds: '黃俊肇', note: '6/10 →魏士揚' },
      { dow: '週四', tp: '謝棖智', ds: '姜信帆', note: '6/4 淡水→棖智；6/11 台北→信帆代棖智' },
      { dow: '週五', tp: '魏士揚', ds: '魏士揚', note: '6/5 →俊肇' },
    ],
    routine_ct: [
      { person: '黃俊肇', tp: '00–19',         ds: '00–19',  note: '' },
      { person: '謝棖智', tp: '20–39',         ds: '20–39',  note: '' },
      { person: '姜信帆', tp: '40–59',         ds: '80–99',  note: '6/4–6 →俊肇代' },
      { person: '魏士揚', tp: '60–67, 89–99',  ds: '40–59',  note: '6/4–6 →俊肇代' },
      { person: '郭律志', tp: '68–88',         ds: '60–79',  note: '' },
    ],
    mri: {
      tp: [
        { week: 'W1', person: '謝棖智',                 note: '' },
        { week: 'W2', person: 'AM 黃主任 / PM 魏士揚',  note: '' },
        { week: 'W3', person: '姜信帆',                 note: '' },
        { week: 'W4', person: '黃俊肇',                 note: '' },
        { week: 'W5', person: 'AM 黃主任 / PM 魏士揚',  note: '6/5 PM→棖智' },
      ],
      ds: [
        { week: 'W1', person: '黃俊肇', note: '' },
        { week: 'W2', person: '黃俊肇', note: '6/9 →信帆' },
        { week: 'W3', person: '魏士揚', note: '' },
        { week: 'W4', person: '謝棖智', note: '6/11 →士揚' },
        { week: 'W5', person: '姜信帆', note: '6/5 →俊肇' },
      ],
    },
    ds_mri_daily: [
      { dow: '週一', person: '魏士揚', note: '' },
      { dow: '週二', person: '黃俊肇', note: '' },
      { dow: '週三', person: '謝棖智', note: '' },
      { dow: '週四', person: '姜信帆', note: '6/4 →棖智' },
      { dow: '週五', person: '姜信帆', note: '6/5 →俊肇' },
    ],
    saturday: [
      { date: '6/06', person: '謝棖智', note: '' },
      { date: '6/13', person: '魏士揚', note: '' },
      { date: '6/20', person: '姜信帆', note: '假日 — 僅 MRI' },
      { date: '6/27', person: '姜信帆', note: '' },
    ],
    picc: [
      { dow: '週一', tp: '謝棖智', ds: '劉家義', note: '' },
      { dow: '週二', tp: '黃崇堯', ds: '黃俊肇', note: '' },
      { dow: '週三', tp: '魏士揚', ds: '謝棖智', note: '' },
      { dow: '週四', tp: '劉家義', ds: '姜信帆', note: '6/4 淡水→棖智' },
      { dow: '週五', tp: '魏士揚', ds: '黃崇堯', note: '' },
    ],
    leaves: {
      '姜信帆': ['6/4', '6/5', '6/6', '6/7', '6/8'],
      '魏士揚': ['6/4', '6/5', '6/6', '6/7', '6/8']
    },
    covers: {
      '6/4': {
        '姜信帆': { angio: '謝棖智', erct: '謝棖智', mri: '謝棖智', picc: '謝棖智', ct: '黃俊肇' },
        '魏士揚': { angio: '謝棖智', erct: '謝棖智', mri: '謝棖智', picc: '謝棖智', ct: '黃俊肇' }
      },
      '6/5': {
        '姜信帆': '黃俊肇',
        '魏士揚': { angio: '謝棖智', erct: '黃俊肇', mri: '謝棖智', picc: '謝棖智', ct: '黃俊肇' }
      },
      '6/6': {
        '姜信帆': '黃俊肇',
        '魏士揚': '謝棖智'
      }
    },
    holidays: [],
    notes: '休假：姜信帆、魏士揚（6/4–6/8）\nPF 代班：6/4–6 信帆→俊肇，士揚→棖智\n線上會議：神內放射討論會 6/?? (五) 15:30 — 魏士揚',
  },
  '2026-08': {
    angio: [
      { dow: '週一', tp_dsa: '鄭宇凡',            tp_tae: '謝棖智',              ds_dsa: '魏士揚',                   ds_tae: '魏士揚/黃俊肇', note: '' },
      { dow: '週二', tp_dsa: '姜信帆',            tp_tae: '姜信帆',              ds_dsa: '黃俊肇8/11士揚8/18 士揚',   ds_tae: '黃俊肇8/11信帆8/18 信帆', note: '' },
      { dow: '週三', tp_dsa: '黃俊肇8/12信帆',    tp_tae: '黃俊肇8/12信帆',      ds_dsa: '謝棖智',                   ds_tae: '謝棖智',        note: '' },
      { dow: '週四', tp_dsa: '謝棖智',            tp_tae: '謝棖智',              ds_dsa: '鄭宇凡',                   ds_tae: '魏士揚/姜信帆', note: '' },
      { dow: '週五', tp_dsa: '魏士揚',            tp_tae: '魏士揚/謝棖智',       ds_dsa: '姜信帆',                   ds_tae: '姜信帆',        note: '' },
    ],
    body_mri: [
      { dow: '週一', tp: '', ds: '魏士揚', note: '' },
      { dow: '週二', tp: '', ds: '黃俊肇8/11士揚', note: '' },
      { dow: '週三', tp: '', ds: '謝棖智', note: '' },
      { dow: '週四', tp: '', ds: '姜信帆', note: '' },
      { dow: '週五', tp: '', ds: '姜信帆', note: '' },
    ],
    erct: [
      { dow: '週一', tp: '謝棖智', ds: '謝棖智', note: '' },
      { dow: '週二', tp: '姜信帆', ds: '姜信帆', note: '' },
      { dow: '週三', tp: '黃俊肇8/12士揚', ds: '黃俊肇8/12士揚', note: '' },
      { dow: '週四', tp: '鄭宇凡', ds: '鄭宇凡', note: '' },
      { dow: '週五', tp: '魏士揚8/21俊肇', ds: '魏士揚8/21俊肇', note: '' },
    ],
    routine_ct: [
      { person: '黃俊肇', tp: '00-23 8/07-17棖智', ds: '00-23 8/07-17士揚', note: '' },
      { person: '謝棖智', tp: '24-47', ds: '24-47', note: '' },
      { person: '魏士揚', tp: '48-71', ds: '48-71', note: '' },
      { person: '鄭宇凡', tp: '72-75', ds: '72-75', note: '' },
      { person: '姜信帆', tp: '76-99', ds: '76-99', note: '' },
    ],
    mri: {
      tp: [
        { week: 'W1', person: '謝棖智', note: '' },
        { week: 'W2', person: 'AM黃主任 PM魏士揚', note: '' },
        { week: 'W3', person: '姜信帆8/19 俊肇', note: '' },
        { week: 'W4', person: '黃俊肇8/13 信帆', note: '' },
        { week: 'W5', person: 'AM黃主任PM 魏士揚', note: '' },
      ],
      ds: [
        { week: 'W1', person: '黃俊肇8/10信帆  8/17棖智', note: '' },
        { week: 'W2', person: '黃俊肇8/11, 8/18士揚', note: '' },
        { week: 'W3', person: '魏士揚8/05, 8/19俊肇', note: '' },
        { week: 'W4', person: '謝棖智8/20俊肇', note: '' },
        { week: 'W5', person: '姜信帆8/21俊肇', note: '' },
      ]
    },
    saturday: [
      { date: '8/1', person: '謝棖智', note: '' },
      { date: '8/8', person: '魏士揚', note: '' },
      { date: '8/15', person: '鄭宇凡', note: '' },
      { date: '8/22', person: '黃俊肇', note: '' },
      { date: '8/29', person: '姜信帆', note: '' },
    ],
    mri_sunday: [
      { date: '8/2', person: '黃俊肇', note: '' },
      { date: '8/9', person: '謝棖智', note: '' },
      { date: '8/16', person: '姜信帆', note: '' },
      { date: '8/23', person: '魏士揚', note: '' },
      { date: '8/30', person: '鄭宇凡', note: '' },
    ],
    picc: [
      { dow: '週一', tp: '謝棖智', ds: '劉家義', note: '' },
      { dow: '週二', tp: '黃崇堯', ds: '黃俊肇8/11,18士揚', note: '' },
      { dow: '週三', tp: '魏士揚', ds: '謝棖智', note: '' },
      { dow: '週四', tp: '劉家義', ds: '姜信帆', note: '' },
      { dow: '週五', tp: '魏士揚', ds: '黃崇堯', note: '' },
    ],
    leaves: {
      '黃俊肇': ['8/7', '8/8', '8/9', '8/10', '8/11', '8/12', '8/13', '8/14', '8/15', '8/16', '8/17', '8/18']
    },
    covers: {
      '8/7': { '黃俊肇': { routine_ct: { tp: '謝棖智', ds: '魏士揚' } } },
      '8/10': { '黃俊肇': { ds_mri: '姜信帆' } },
      '8/11': { '黃俊肇': { angio: { ds: '魏士揚' }, picc: { ds: '魏士揚' }, ds_mri: '魏士揚' } },
      '8/12': { '黃俊肇': { angio: { tp: '姜信帆' }, erct: '魏士揚' } },
      '8/13': { '黃俊肇': { mri: '姜信帆' } },
      '8/17': { '黃俊肇': { ds_mri: '謝棖智' } },
      '8/18': { '黃俊肇': { angio: { ds: '魏士揚' }, picc: { ds: '魏士揚' }, ds_mri: '魏士揚' } }
    },
    holidays: [],
    notes: '線上會議：神內放射討論會08/??(五)15:30俊肇\n休假：俊肇(8/07-8/18) PF：8/07-17 俊肇信帆 淡水BMD 8/10信帆, 8/11棖智,  8/17士揚'
  },

  '2026-07': {
    angio: [
      { dow: '週一', tp_dsa: '鄭宇凡',  tp_tae: '謝棖智',        ds_dsa: '魏士揚',  ds_tae: '魏士揚/黃俊肇', note: '' },
      { dow: '週二', tp_dsa: '姜信帆',  tp_tae: '姜信帆',        ds_dsa: '黃俊肇',  ds_tae: '黃俊肇',        note: '7/21 淡水DSA→棖智' },
      { dow: '週三', tp_dsa: '黃俊肇',  tp_tae: '黃俊肇',        ds_dsa: '謝棖智',  ds_tae: '謝棖智',        note: '' },
      { dow: '週四', tp_dsa: '謝棖智',  tp_tae: '謝棖智',        ds_dsa: '鄭宇凡',  ds_tae: '魏士揚/姜信帆', note: '' },
      { dow: '週五', tp_dsa: '魏士揚',  tp_tae: '魏士揚/謝棖智', ds_dsa: '姜信帆',  ds_tae: '姜信帆',        note: '' },
    ],
    erct: [
      { dow: '週一', tp: '謝棖智', ds: '謝棖智', note: '' },
      { dow: '週二', tp: '姜信帆', ds: '姜信帆', note: '' },
      { dow: '週三', tp: '黃俊肇', ds: '黃俊肇', note: '' },
      { dow: '週四', tp: '鄭宇凡', ds: '鄭宇凡', note: '' },
      { dow: '週五', tp: '魏士揚', ds: '魏士揚', note: '' },
    ],
    routine_ct: [
      { person: '黃俊肇', tp: '00–23', ds: '00–23', note: '7/17–20 台北→棖智 / 淡水→信帆' },
      { person: '謝棖智', tp: '24–47', ds: '24–47', note: '' },
      { person: '魏士揚', tp: '48–71', ds: '48–71', note: '' },
      { person: '鄭宇凡', tp: '72–75', ds: '72–75', note: '' },
      { person: '姜信帆', tp: '76–99', ds: '76–99', note: '' },
    ],
    mri: {
      tp: [
        { week: 'W1', person: '謝棖智',                 note: '' },
        { week: 'W2', person: 'AM 黃主任 / PM 魏士揚',  note: '' },
        { week: 'W3', person: '姜信帆',                 note: '' },
        { week: 'W4', person: '黃俊肇',                 note: '' },
        { week: 'W5', person: 'AM 黃主任 / PM 魏士揚',  note: '' },
      ],
      ds: [
        { week: 'W1', person: '黃俊肇', note: '7/20 →信帆' },
        { week: 'W2', person: '黃俊肇', note: '7/21 →棖智' },
        { week: 'W3', person: '魏士揚', note: '' },
        { week: 'W4', person: '謝棖智', note: '7/23 →俊肇' },
        { week: 'W5', person: '姜信帆', note: '7/24 →俊肇' },
      ],
    },
    ds_mri_daily: [
      { dow: '週一', person: '魏士揚', note: '' },
      { dow: '週二', person: '黃俊肇', note: '7/21 →棖智' },
      { dow: '週三', person: '謝棖智', note: '' },
      { dow: '週四', person: '姜信帆', note: '' },
      { dow: '週五', person: '姜信帆', note: '' },
    ],
    saturday: [
      { date: '7/04', person: '鄭宇凡', note: '' },
      { date: '7/11', person: '魏士揚', note: '' },
      { date: '7/18', person: '姜信帆', note: '' },
      { date: '7/25', person: '謝棖智', note: '' },
    ],
    picc: [
      { dow: '週一', tp: '謝棖智', ds: '劉家義', note: '' },
      { dow: '週二', tp: '黃崇堯', ds: '黃俊肇', note: '7/21 淡水→棖智' },
      { dow: '週三', tp: '魏士揚', ds: '謝棖智', note: '' },
      { dow: '週四', tp: '劉家義', ds: '姜信帆', note: '' },
      { dow: '週五', tp: '魏士揚', ds: '黃崇堯', note: '' },
    ],
    leaves: {
      '黃俊肇': ['7/17', '7/18', '7/19', '7/20', '7/21']
    },
    covers: {
      '7/17': {
        '黃俊肇': {
          ct: { tp: '謝棖智', ds: '姜信帆' },
          angio: '姜信帆',
          erct: '姜信帆',
          mri: '姜信帆',
          picc: '姜信帆',
          ds_mri: '姜信帆'
        }
      },
      '7/18': { '黃俊肇': '姜信帆' },
      '7/19': { '黃俊肇': '姜信帆' },
      '7/20': {
        '黃俊肇': {
          ct: { tp: '謝棖智', ds: '姜信帆' },
          angio: '姜信帆',
          erct: '姜信帆',
          mri: '姜信帆',
          picc: '姜信帆',
          ds_mri: '姜信帆'
        }
      },
      '7/21': {
        '黃俊肇': {
          angio: '謝棖智',
          mri: '謝棖智',
          picc: '謝棖智',
          ds_mri: '謝棖智'
        }
      },
      '7/23': {
        '謝棖智': {
          mri: '黃俊肇'
        }
      },
      '7/24': {
        '姜信帆': {
          mri: '黃俊肇'
        }
      }
    },
    holidays: [],
    notes: '休假：黃俊肇（7/17–7/21）\nPF 代班：7/17–20 俊肇→信帆；淡水BMD 7/20→信帆，7/21→棖智\n線上會議：神內放射討論會 7/?? (五) 15:30 — 黃俊肇',
  },
};

// ════════════════════════════════════════════════════
//  資料庫：中風取栓班表 (EVT On-Call)
// ════════════════════════════════════════════════════
const ALL_SCHEDULES = {
  '2026-06': {
     1: { tp: '姜信帆', ds: '謝棖智' },
     2: { tp: '姜信帆', ds: '謝棖智' },
     3: { tp: '黃俊肇', ds: '周兆亮' },
     4: { tp: '黃勇評', ds: '姜信帆' },
     5: { tp: '黃勇評', ds: '姜信帆' },
     6: { tp: '黃勇評', ds: '姜信帆' },
     7: { tp: '黃勇評', ds: '姜信帆' },
     8: { tp: '黃勇評', ds: '姜信帆' },
     9: { tp: '黃俊肇', ds: '周兆亮' },
    10: { tp: '魏士揚', ds: '黃俊肇' },
    11: { tp: '魏士揚', ds: '黃俊肇' },
    12: { tp: '魏士揚', ds: '黃俊肇' },
    13: { tp: '魏士揚', ds: '黃俊肇' },
    14: { tp: '魏士揚', ds: '黃俊肇' },
    15: { tp: '謝棖智', ds: '魏士揚' },
    16: { tp: '謝棖智', ds: '魏士揚' },
    17: { tp: '謝棖智', ds: '魏士揚' },
    18: { tp: '謝棖智', ds: '魏士揚' },
    19: { tp: '謝棖智', ds: '魏士揚' },
    20: { tp: '姜信帆', ds: '謝棖智' },
    21: { tp: '黃俊肇', ds: '周兆亮' },
    22: { tp: '黃俊肇', ds: '周兆亮' },
    23: { tp: '黃俊肇', ds: '周兆亮' },
    24: { tp: '姜信帆', ds: '謝棖智' },
    25: { tp: '姜信帆', ds: '謝棖智' },
    26: { tp: '周兆亮', ds: '黃勇評' },
    27: { tp: '周兆亮', ds: '黃勇評' },
    28: { tp: '周兆亮', ds: '黃勇評' },
    29: { tp: '周兆亮', ds: '黃勇評' },
    30: { tp: '周兆亮', ds: '黃勇評' },
  },
  '2026-07': {
     1: { tp: '黃俊肇', ds: '周兆亮' },
     2: { tp: '黃俊肇', ds: '周兆亮' },
     3: { tp: '黃俊肇', ds: '周兆亮' },
     4: { tp: '周兆亮', ds: '黃勇評' },
     5: { tp: '周兆亮', ds: '黃勇評' },
     6: { tp: '周兆亮', ds: '黃勇評' },
     7: { tp: '周兆亮', ds: '黃勇評' },
     8: { tp: '魏士揚', ds: '黃俊肇' },
     9: { tp: '魏士揚', ds: '黃俊肇' },
    10: { tp: '魏士揚', ds: '黃俊肇' },
    11: { tp: '魏士揚', ds: '黃俊肇' },
    12: { tp: '魏士揚', ds: '黃俊肇' },
    13: { tp: '姜信帆', ds: '謝棖智' },
    14: { tp: '姜信帆', ds: '謝棖智' },
    15: { tp: '姜信帆', ds: '謝棖智' },
    16: { tp: '黃勇評', ds: '姜信帆' },
    17: { tp: '黃勇評', ds: '姜信帆' },
    18: { tp: '黃勇評', ds: '姜信帆' },
    19: { tp: '黃勇評', ds: '姜信帆' },
    20: { tp: '黃勇評', ds: '姜信帆' },
    21: { tp: '姜信帆', ds: '謝棖智' },
    22: { tp: '姜信帆', ds: '謝棖智' },
    23: { tp: '姜信帆', ds: '謝棖智' },
    24: { tp: '謝棖智', ds: '魏士揚' },
    25: { tp: '謝棖智', ds: '魏士揚' },
    26: { tp: '謝棖智', ds: '魏士揚' },
    27: { tp: '謝棖智', ds: '魏士揚' },
    28: { tp: '謝棖智', ds: '魏士揚' },
    29: { tp: '黃俊肇', ds: '周兆亮' },
    30: { tp: '黃俊肇', ds: '周兆亮' },
    31: { tp: '黃俊肇', ds: '周兆亮' },
  },
  '2026-08': {
     1: { tp: '謝棖智', ds: '魏士揚' },
     2: { tp: '謝棖智', ds: '魏士揚' },
     3: { tp: '謝棖智', ds: '魏士揚' },
     4: { tp: '謝棖智', ds: '魏士揚' },
     5: { tp: '謝棖智', ds: '魏士揚' },
     6: { tp: '周兆亮', ds: '黃勇評' },
     7: { tp: '周兆亮', ds: '黃勇評' },
     8: { tp: '周兆亮', ds: '黃勇評' },
     9: { tp: '周兆亮', ds: '黃勇評' },
    10: { tp: '周兆亮', ds: '黃勇評' },
    11: { tp: '魏士揚', ds: '謝棖智' },
    12: { tp: '魏士揚', ds: '謝棖智' },
    13: { tp: '黃勇評', ds: '姜信帆' },
    14: { tp: '黃勇評', ds: '姜信帆' },
    15: { tp: '黃勇評', ds: '姜信帆' },
    16: { tp: '黃勇評', ds: '姜信帆' },
    17: { tp: '黃勇評', ds: '姜信帆' },
    18: { tp: '魏士揚', ds: '謝棖智' },
    19: { tp: '魏士揚', ds: '謝棖智' },
    20: { tp: '魏士揚', ds: '謝棖智' },
    21: { tp: '魏士揚', ds: '謝棖智' },
    22: { tp: '黃俊肇', ds: '周兆亮' },
    23: { tp: '黃俊肇', ds: '周兆亮' },
    24: { tp: '黃俊肇', ds: '周兆亮' },
    25: { tp: '黃俊肇', ds: '周兆亮' },
    26: { tp: '黃俊肇', ds: '周兆亮' },
    27: { tp: '姜信帆', ds: '黃俊肇' },
    28: { tp: '姜信帆', ds: '黃俊肇' },
    29: { tp: '姜信帆', ds: '黃俊肇' },
    30: { tp: '姜信帆', ds: '黃俊肇' },
    31: { tp: '姜信帆', ds: '黃俊肇' }
  }
};

// ════════════════════════════════════════════════════
//  人員與配色設定
// ════════════════════════════════════════════════════
const PEOPLE = [
  { key: 'jiang',    name: '姜信帆', cls: 'chip-jiang',    color: '#059669' },
  { key: 'huang_jz', name: '黃俊肇', cls: 'chip-huang-jz', color: '#d97706' },
  { key: 'zhou',     name: '周兆亮', cls: 'chip-zhou',     color: '#7c3aed' },
  { key: 'huang_yp', name: '黃勇評', cls: 'chip-huang-yp', color: '#c2410c' },
  { key: 'xie',      name: '謝棖智', cls: 'chip-xie',      color: '#be185d' },
  { key: 'wei',      name: '魏士揚', cls: 'chip-wei',      color: '#0e7490' },
  { key: 'zheng',    name: '鄭宇凡', cls: 'chip-zheng',    color: '#6d28d9' },
];

const PERSON_CLASS = {
  '姜信帆': 'p-jiang',
  '黃俊肇': 'p-huang-jz',
  '周兆亮': 'p-zhou',
  '黃勇評': 'p-huang-yp',
  '謝棖智': 'p-xie',
  '魏士揚': 'p-wei',
  '鄭宇凡': 'p-zheng',
};

const personByName = {};
PEOPLE.forEach(p => { personByName[p.name] = p; });

function personCls(name) {
  return PERSON_CLASS[name] || 'p-other';
}

// ════════════════════════════════════════════════════
//  全域狀態
// ════════════════════════════════════════════════════
let MONTH_KEYS = Array.from(new Set([...Object.keys(NI_DATA), ...Object.keys(ALL_SCHEDULES)])).sort();
const now = new Date();
const todayKey = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
let currentIdx = MONTH_KEYS.includes(todayKey)
  ? MONTH_KEYS.indexOf(todayKey)
  : MONTH_KEYS.length - 1;

let todayCardTab = 'today';
let todayCardCustomDate = null;
let activeTab = 'ni'; // 'ni' or 'evt'
const hiddenPeople = new Set();
let viewMode = window.innerWidth <= 768 ? 'today' : 'month';

// ════════════════════════════════════════════════════
//  Firebase 雲端資料庫初始化 (第一階段唯讀)
// ════════════════════════════════════════════════════
const firebaseConfig = {
    apiKey: "AIzaSyBFKkYhLe_s4R10wuP80T1OHkGLFLn2epE",
    authDomain: "radiology-hub-80908.firebaseapp.com",
    projectId: "radiology-hub-80908",
    storageBucket: "radiology-hub-80908.firebasestorage.app",
    messagingSenderId: "508499242885",
    appId: "1:508499242885:web:885a5f469fe30bf32f9eec",
    measurementId: "G-14TEJRN2LT"
};

let db = null;

function getDb() {
  if (db) return db;
  if (typeof firebase !== 'undefined' && firebaseConfig.apiKey !== "YOUR_API_KEY") {
    try {
      if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
      }
      db = firebase.firestore();
      if (!provider) {
        provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().onAuthStateChanged((user) => {
          currentUser = user;
          updateAdminControlBar();
          render();
        });
      }
      return db;
    } catch (e) {
      console.error("Firebase Lazy Init Error:", e);
    }
  }
  return null;
}
let currentUser = window.currentUser || null;
let provider = null;

let isEditMode = false;
let activeEditSection = null;

function isSectionEditing(key) {
  if (activeEditSection === null) return false;
  return activeEditSection === 'all' || activeEditSection === key;
}

// 主動初始化 Firebase（確保 db 在頁面載入時即刻就緒，避免 getDb() lazy-init race condition）
getDb();

function updateAdminControlBar() {
  updateModalAuthStatus();
}

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
    
    await loadCloudSchedules();
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
  if (!tbody) return null;
  
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

function syncDomToMemory(key) {
  if (!NI_DATA[key]) return;
  
  // 1. Angio (5 days)
  const angio = [];
  for (let i = 0; i < 5; i++) {
    const el_tp_dsa = document.getElementById(`ni-angio-${i}-tp_dsa`);
    const el_tp_tae = document.getElementById(`ni-angio-${i}-tp_tae`);
    const el_ds_dsa = document.getElementById(`ni-angio-${i}-ds_dsa`);
    const el_ds_tae = document.getElementById(`ni-angio-${i}-ds_tae`);
    const el_note = document.getElementById(`ni-angio-${i}-note`);
    angio.push({
      dow: ['週一', '週二', '週三', '週四', '週五'][i],
      tp_dsa: el_tp_dsa ? el_tp_dsa.value : '',
      tp_tae: el_tp_tae ? el_tp_tae.value : '',
      ds_dsa: el_ds_dsa ? el_ds_dsa.value : '',
      ds_tae: el_ds_tae ? el_ds_tae.value : '',
      note: el_note ? el_note.value : ''
    });
  }
  NI_DATA[key].angio = angio;
  
  // 2. ERCT (5 days)
  const erct = [];
  for (let i = 0; i < 5; i++) {
    const el_tp = document.getElementById(`ni-erct-${i}-tp`);
    const el_ds = document.getElementById(`ni-erct-${i}-ds`);
    const el_note = document.getElementById(`ni-erct-${i}-note`);
    erct.push({
      dow: ['週一', '週二', '週三', '週四', '週五'][i],
      tp: el_tp ? el_tp.value : '',
      ds: el_ds ? el_ds.value : '',
      note: el_note ? el_note.value : ''
    });
  }
  NI_DATA[key].erct = erct;
  
  // 3. Routine CT
  const routine_ct = [];
  const originalCt = NI_DATA[key].routine_ct || [];
  originalCt.forEach((row, i) => {
    const el_tp = document.getElementById(`ni-ct-${i}-tp`);
    const el_ds = document.getElementById(`ni-ct-${i}-ds`);
    const el_note = document.getElementById(`ni-ct-${i}-note`);
    routine_ct.push({
      person: row.person,
      tp: el_tp ? el_tp.value : '',
      ds: el_ds ? el_ds.value : '',
      note: el_note ? el_note.value : ''
    });
  });
  NI_DATA[key].routine_ct = routine_ct;
  
  // 4. MRI (tp and ds)
  const mri = { tp: [], ds: [] };
  ['tp', 'ds'].forEach(side => {
    for (let i = 0; i < 5; i++) {
      const el_person = document.getElementById(`ni-mri-${side}-${i}-person`);
      const el_note = document.getElementById(`ni-mri-${side}-${i}-note`);
      mri[side].push({
        week: `W${i+1}`,
        person: el_person ? el_person.value : '',
        note: el_note ? el_note.value : ''
      });
    }
  });
  NI_DATA[key].mri = mri;
  
  // 5. Ds MRI Daily (5 days)
  const ds_mri_daily = [];
  for (let i = 0; i < 5; i++) {
    const el_person = document.getElementById(`ni-dsmri-${i}-person`);
    const el_note = document.getElementById(`ni-dsmri-${i}-note`);
    ds_mri_daily.push({
      dow: ['週一', '週二', '週三', '週四', '週五'][i],
      person: el_person ? el_person.value : '',
      note: el_note ? el_note.value : ''
    });
  }
  NI_DATA[key].ds_mri_daily = ds_mri_daily;
  
  // 6. Saturday (varies)
  const saturday = [];
  const originalSat = NI_DATA[key].saturday || [];
  originalSat.forEach((row, i) => {
    const el_person = document.getElementById(`ni-sat-${i}-person`);
    const el_note = document.getElementById(`ni-sat-${i}-note`);
    saturday.push({
      date: row.date,
      person: el_person ? el_person.value : '',
      note: el_note ? el_note.value : ''
    });
  });
  NI_DATA[key].saturday = saturday;

  // Sunday MRI Overtime (varies)
  const mri_sunday = [];
  let originalSun = NI_DATA[key].mri_sunday || [];
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
    mri_sunday.push({
      date: row.date,
      person: el_person ? el_person.value : '',
      note: el_note ? el_note.value : ''
    });
  });
  NI_DATA[key].mri_sunday = mri_sunday;
  
  // 7. PICC (5 days)
  const picc = [];
  for (let i = 0; i < 5; i++) {
    const el_tp = document.getElementById(`ni-picc-${i}-tp`);
    const el_ds = document.getElementById(`ni-picc-${i}-ds`);
    const el_note = document.getElementById(`ni-picc-${i}-note`);
    picc.push({
      dow: ['週一', '週二', '週三', '週四', '週五'][i],
      tp: el_tp ? el_tp.value : '',
      ds: el_ds ? el_ds.value : '',
      note: el_note ? el_note.value : ''
    });
  }
  NI_DATA[key].picc = picc;
  
  // 8. Leaves
  const leaves = {};
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
  NI_DATA[key].leaves = leaves;
  
  // 9. Covers
  const visualCovers = getCoversFromVisualTable();
  if (visualCovers !== null) {
    NI_DATA[key].covers = visualCovers;
  }
  
  // 10. Holidays
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
    NI_DATA[key].holidays = holidays;
  }
  
  // 11. Notes
  const notesInput = document.getElementById('notesInput');
  if (notesInput) {
    NI_DATA[key].notes = notesInput.value;
  }
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
    if (isEditMode) {
      // 1. Angio
      const angio = [];
      for (let i = 0; i < 5; i++) {
        const el_tp_dsa = document.getElementById(`ni-angio-${i}-tp_dsa`);
        const el_tp_tae = document.getElementById(`ni-angio-${i}-tp_tae`);
        const el_ds_dsa = document.getElementById(`ni-angio-${i}-ds_dsa`);
        const el_ds_tae = document.getElementById(`ni-angio-${i}-ds_tae`);
        angio.push({
          dow: ['週一', '週二', '週三', '週四', '週五'][i],
          tp_dsa: el_tp_dsa ? el_tp_dsa.value : '',
          tp_tae: el_tp_tae ? el_tp_tae.value : '',
          ds_dsa: el_ds_dsa ? el_ds_dsa.value : '',
          ds_tae: el_ds_tae ? el_ds_tae.value : '',
          note: ''
        });
      }
      
      // 2. ERCT
      const erct = [];
      for (let i = 0; i < 5; i++) {
        const el_tp = document.getElementById(`ni-erct-${i}-tp`);
        const el_ds = document.getElementById(`ni-erct-${i}-ds`);
        erct.push({
          dow: ['週一', '週二', '週三', '週四', '週五'][i],
          tp: el_tp ? el_tp.value : '',
          ds: el_ds ? el_ds.value : '',
          note: ''
        });
      }
      
      // 3. Routine CT
      const routine_ct = [];
      const originalCt = NI_DATA[key].routine_ct || [];
      originalCt.forEach((row, i) => {
        const el_tp = document.getElementById(`ni-ct-${i}-tp`);
        const el_ds = document.getElementById(`ni-ct-${i}-ds`);
        routine_ct.push({
          person: row.person,
          tp: el_tp ? el_tp.value : '',
          ds: el_ds ? el_ds.value : '',
          note: ''
        });
      });
      
      // 4. MRI
      const mri = { tp: [], ds: [] };
      ['tp', 'ds'].forEach(side => {
        for (let i = 0; i < 5; i++) {
          const el_person = document.getElementById(`ni-mri-${side}-${i}-person`);
          mri[side].push({
            week: `W${i+1}`,
            person: el_person ? el_person.value : '',
            note: ''
          });
        }
      });
      
      // 5. Ds MRI Daily
      const ds_mri_daily = [];
      for (let i = 0; i < 5; i++) {
        const el_person = document.getElementById(`ni-dsmri-${i}-person`);
        ds_mri_daily.push({
          dow: ['週一', '週二', '週三', '週四', '週五'][i],
          person: el_person ? el_person.value : '',
          note: ''
        });
      }
      
      // 6. PICC
      const picc = [];
      for (let i = 0; i < 5; i++) {
        const el_tp = document.getElementById(`ni-picc-${i}-tp`);
        const el_ds = document.getElementById(`ni-picc-${i}-ds`);
        picc.push({
          dow: ['週一', '週二', '週三', '週四', '週五'][i],
          tp: el_tp ? el_tp.value : '',
          ds: el_ds ? el_ds.value : '',
          note: ''
        });
      }
      
      templateData = { angio, erct, routine_ct, mri, ds_mri_daily, picc };
    } else {
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
    }
    
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

function toggleEditMode() {
  activeEditSection = 'all';
  isEditMode = true;
  toggleEditUiState();
  render();
}

function cancelEditMode() {
  activeEditSection = null;
  isEditMode = false;
  toggleEditUiState();
  render();
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
        ❌ 完成設定
      </button>
    `;
  } else {
    editBar.style.display = 'none';
    editBar.innerHTML = '';
  }
}

window.startSectionEdit = function(sectionKey) {
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

// 非同步載入雲端班表資料
async function loadCloudSchedules() {
  if (!getDb()) return;
  try {
    // 等待 compat SDK 的登入狀態恢復（避免 session 尚未恢復時被 Firestore rules 拒絕）
    await new Promise((resolve) => {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      });
    });

    const querySnapshot = await db.collection("schedules").get();
    let hasNewData = false;
    querySnapshot.forEach((doc) => {
      const monthKey = doc.id; // 例如 '2026-07'
      if (monthKey.startsWith("template")) return;
      const data = doc.data();
      if (data.ni) {
        if (data.ni.covers) {
          Object.keys(data.ni.covers).forEach(dateStr => {
            const dayCovers = data.ni.covers[dateStr];
            if (dayCovers && typeof dayCovers === 'object') {
              Object.keys(dayCovers).forEach(absentDoc => {
                const coverVal = dayCovers[absentDoc];
                if (coverVal && typeof coverVal === 'object') {
                  if ('ct' in coverVal) {
                    if (!coverVal.routine_ct) {
                      coverVal.routine_ct = coverVal.ct;
                    }
                    delete coverVal.ct;
                  }
                }
              });
            }
          });
        }
        NI_DATA[monthKey] = data.ni;
        hasNewData = true;
      }
      if (data.evt) {
        const hasCloudEvt = Object.keys(data.evt).length > 0;
        const hasLocalEvt = ALL_SCHEDULES[monthKey] && Object.keys(ALL_SCHEDULES[monthKey]).length > 0;
        if (!hasCloudEvt && hasLocalEvt) {
          console.log(`[Sync] 雲端 ${monthKey} 的 evt 為空，保留本地預設中風取栓班表`);
        } else {
          ALL_SCHEDULES[monthKey] = data.evt;
        }
        hasNewData = true;
      }
    });
    
    if (hasNewData) {
      // 重新整理月份鍵值（確保包含本機預設的所有月份，如 2026-08）
      const oldMonthKey = MONTH_KEYS[currentIdx];
      MONTH_KEYS = Array.from(new Set([...Object.keys(NI_DATA), ...Object.keys(ALL_SCHEDULES)])).sort();
      if (MONTH_KEYS.includes(oldMonthKey)) {
        currentIdx = MONTH_KEYS.indexOf(oldMonthKey);
      } else {
        const todayKey = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
        currentIdx = MONTH_KEYS.includes(todayKey)
          ? MONTH_KEYS.indexOf(todayKey)
          : MONTH_KEYS.length - 1;
      }
      // 重新渲染畫面
      render();
      console.log("☁️ 已成功載入並更新最新的雲端班表資料！", MONTH_KEYS);
    }
  } catch (error) {
    console.error("讀取雲端班表失敗，將維持使用本地班表:", error);
  }
}

function initSchedulePage() {
  // 初始化全域氣泡 Tooltip 容器
  const gt = document.createElement('div');
  gt.id = 'global-tooltip';
  gt.className = 'global-note-tooltip';
  document.body.appendChild(gt);

  // 全域 Hover 監聽器 (自適應防遮擋與邊界修正)
  document.addEventListener('mouseover', function(e) {
    const trigger = e.target.closest('.note-tooltip-trigger');
    if (!trigger) return;
    
    const textEl = trigger.querySelector('.note-tooltip-text');
    if (!textEl) return;
    
    const noteText = textEl.textContent ? textEl.textContent.trim() : '';
    if (!noteText) return;
    
    const tooltip = document.getElementById('global-tooltip');
    if (!tooltip) return;
    
    tooltip.innerHTML = noteText;
    tooltip.style.display = 'block';
    
    const rect = trigger.getBoundingClientRect();
    
    const tooltipHeight = tooltip.offsetHeight;
    const tooltipWidth = tooltip.offsetWidth;
    
    // 自適應防遮擋：若上方高度不足以容納 tooltip 加上安全邊距 15px，則向下彈出
    let showBelow = false;
    if (rect.top < tooltipHeight + 15) {
      showBelow = true;
    }
    
    // position:fixed → 直接用 viewport 座標，不加 scroll offset
    let leftPos = rect.left + rect.width / 2 - tooltipWidth / 2;
    const maxLeft = document.documentElement.clientWidth - tooltipWidth - 10;
    if (leftPos < 10) {
      leftPos = 10;
    } else if (leftPos > maxLeft) {
      leftPos = maxLeft;
    }
    
    // 表格最右邊的備註欄氣泡 (帶有 tooltip-right class)，改用靠右對齊 (防止超出右邊界被裁剪)
    if (trigger.classList.contains('tooltip-right')) {
      leftPos = rect.right - tooltipWidth;
      if (leftPos < 10) leftPos = 10;
    }
    
    let topPos = 0;
    if (showBelow) {
      topPos = rect.bottom + 8;
      tooltip.className = 'global-note-tooltip arrow-top';
    } else {
      topPos = rect.top - tooltipHeight - 8;
      tooltip.className = 'global-note-tooltip arrow-bottom';
    }
    
    tooltip.style.left = leftPos + 'px';
    tooltip.style.top = topPos + 'px';
    
    // 動態修正箭頭位置，精準指向 trigger 中心
    const triggerCenterRelative = rect.left + rect.width / 2 - leftPos;
    const arrowStyle = document.getElementById('global-tooltip-arrow-style') || document.createElement('style');
    arrowStyle.id = 'global-tooltip-arrow-style';
    arrowStyle.innerHTML = `
      .global-note-tooltip::after {
        left: ${triggerCenterRelative}px !important;
      }
    `;
    if (!arrowStyle.parentNode) {
      document.head.appendChild(arrowStyle);
    }
    
    tooltip.style.opacity = '1';
  });

  document.addEventListener('mouseout', function(e) {
    const trigger = e.target.closest('.note-tooltip-trigger');
    if (!trigger) return;
    
    const tooltip = document.getElementById('global-tooltip');
    if (tooltip) {
      tooltip.style.opacity = '0';
      tooltip.style.display = 'none';
    }
  });

  loadCloudSchedules();
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initSchedulePage);
} else {
  initSchedulePage();
}

let autoFilterTime = true;
try {
  autoFilterTime = localStorage.getItem('autoFilterTime') !== 'false';
} catch (e) {}

function toggleAutoFilter(checked) {
  autoFilterTime = checked;
  try {
    localStorage.setItem('autoFilterTime', checked ? 'true' : 'false');
  } catch (e) {}
  render();
}

function getLogicalDate() {
  const now = new Date();
  const hour = now.getHours();
  const min = now.getMinutes();
  const timeInMinutes = hour * 60 + min;
  
  const logicalDate = new Date(now.getTime());
  // 凌晨 00:00 到 08:30 之間，屬於前一天的 On-Call 時段延續，邏輯日期設為昨天
  if (timeInMinutes < 8 * 60 + 30) {
    logicalDate.setDate(logicalDate.getDate() - 1);
  }
  return logicalDate;
}

function getAutoFilterStatus(targetDate) {
  if (!autoFilterTime) return 'show_all';
  
  const now = new Date();
  const logicalDate = getLogicalDate();
  // 時段篩選僅適用於邏輯上的今天
  if (targetDate.toDateString() !== logicalDate.toDateString()) {
    return 'show_all';
  }
  
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth() + 1;
  const day = targetDate.getDate();
  const key = `${year}-${String(month).padStart(2, '0')}`;
  const d = NI_DATA[key];
  const dateStr = `${month}/${day}`;
  const isHoliday = d && d.holidays && d.holidays.includes(dateStr);
  
  const dow = targetDate.getDay(); // 0: Sunday, 6: Saturday
  
  if (dow === 0 || isHoliday) {
    return 'evt_only';
  }
  
  const hour = now.getHours();
  const min = now.getMinutes();
  const timeInMinutes = hour * 60 + min;
  
  const startDaytime = 8 * 60 + 30; // 08:30
  
  if (dow === 6) {
    // 週六
    const endDaytimeSat = 12 * 60; // 12:00
    if (timeInMinutes >= startDaytime && timeInMinutes < endDaytimeSat) {
      return 'daytime_only';
    } else {
      return 'evt_only';
    }
  } else {
    // 週一至週五
    const endDaytimeWeekday = 17 * 60; // 17:00
    if (timeInMinutes >= startDaytime && timeInMinutes < endDaytimeWeekday) {
      return 'daytime_only';
    } else {
      return 'evt_only';
    }
  }
}

const DOW_NAMES_TW = ['日','一','二','三','四','五','六'];
const DOW_LABEL    = { 1:'週一', 2:'週二', 3:'週三', 4:'週四', 5:'週五', 6:'週六' };

// ════════════════════════════════════════════════════
//  換月與換 Tab 邏輯
// ════════════════════════════════════════════════════
function changeMonth(dir) {
  if (isEditMode) {
    if (!confirm("您有未儲存的排班或代班修改，切換月份將會遺失這些修改，確定要切換嗎？")) {
      return;
    }
    cancelEditMode();
  }
  currentIdx = Math.max(0, Math.min(MONTH_KEYS.length - 1, currentIdx + dir));
  activeCoverSection = null;
  isLeavesCoversExpanded = false;
  render();
}

function setTodayTab(tab) {
  todayCardTab = tab;
  if (tab !== 'custom') {
    todayCardCustomDate = null;
  }
  render();
}

function onCustomDateChange(val) {
  if (!val) return;
  todayCardTab = 'custom';
  const [y, m, d] = val.split('-').map(Number);
  todayCardCustomDate = new Date(y, m - 1, d);
  render();
}

function setViewMode(mode) {
  viewMode = mode;
  document.getElementById('mode-today-btn').classList.toggle('active', mode === 'today');
  document.getElementById('mode-month-btn').classList.toggle('active', mode === 'month');

  // 控制月份切換與月度班表容器顯示/隱藏
  document.querySelector('.month-switcher').style.display = mode === 'today' ? 'none' : 'flex';
  document.querySelector('.tabs-container').style.display = mode === 'today' ? 'none' : '';

  const niContent = document.getElementById('ni-content');
  const evtContent = document.getElementById('evt-content');
  if (mode === 'today') {
    niContent.style.display = 'none';
    evtContent.style.display = 'none';
  } else {
    niContent.classList.toggle('active', activeTab === 'ni');
    evtContent.classList.toggle('active', activeTab === 'evt');
    niContent.style.display = activeTab === 'ni' ? 'block' : 'none';
    evtContent.style.display = activeTab === 'evt' ? 'block' : 'none';
    renderTabContent();
  }
}

function switchTab(tab) {
  activeTab = tab;
  document.getElementById('tab-ni-btn').classList.toggle('active', tab === 'ni');
  document.getElementById('tab-evt-btn').classList.toggle('active', tab === 'evt');
  
  const niContent = document.getElementById('ni-content');
  const evtContent = document.getElementById('evt-content');
  if (viewMode === 'today') {
    niContent.style.display = 'none';
    evtContent.style.display = 'none';
  } else {
    niContent.classList.toggle('active', tab === 'ni');
    evtContent.classList.toggle('active', tab === 'evt');
    niContent.style.display = tab === 'ni' ? 'block' : 'none';
    evtContent.style.display = tab === 'evt' ? 'block' : 'none';
    renderTabContent();
  }
}

// ════════════════════════════════════════════════════
//  今日分配邏輯
// ════════════════════════════════════════════════════
function getWeekNum(year, month, day) {
  const firstDow = new Date(year, month - 1, 1).getDay();
  const monOffset = (firstDow + 6) % 7;
  return Math.ceil((day + monOffset) / 7);
}

function getTodayAssignments(key, targetDate = new Date()) {
  const [y, m] = key.split('-').map(Number);
  const day = targetDate.getDate();
  const dowNum = targetDate.getDay();
  const dowLabel = DOW_LABEL[dowNum];
  const dateStr = `${y}/${String(m).padStart(2,'0')}/${String(day).padStart(2,'0')} （週${DOW_NAMES_TW[dowNum]}）`;

  // 取得 EVT On-Call
  const evtSched = ALL_SCHEDULES[key];
  const evtDuty = evtSched ? evtSched[day] : null;
  const evtDoctor = evtDuty ? (typeof evtDuty === 'string' ? evtDuty : evtDuty.tp) : '';

  const baseResult = {
    dateStr,
    year: y,
    month: m,
    day: day,
    targetDate: targetDate,
    key: key
  };

  if (dowNum === 0) {
    const d = NI_DATA[key];
    const sunMri = (d && d.mri_sunday) ? d.mri_sunday.find(r => {
      const [sm, sd] = r.date.split('/').map(Number);
      return sm === m && sd === day;
    }) : null;
    return { ...baseResult, isSunday: true, sunMri, evtDoctor };
  }

  const d = NI_DATA[key];
  if (!d) return null;

  if (dowNum === 6) {
    const sat = d.saturday && d.saturday.find(r => {
      const [sm, sd] = r.date.split('/').map(Number);
      return sm === m && sd === day;
    });
    return { ...baseResult, isSat: true, sat, evtDoctor };
  }

  // 門住急 MRI 班表的 W1 ~ W5 對應週一至週五（dowNum 1 ~ 5）
  const weekLabel = `W${dowNum}`;

  return {
    ...baseResult, isSat: false, weekLabel, evtDoctor,
    angio:       d.angio       && d.angio.find(r => r.dow === dowLabel),
    erct:        d.erct        && d.erct.find(r => r.dow === dowLabel),
    routine_ct:  d.routine_ct,
    mri_tp:      d.mri         && d.mri.tp.find(r => r.week === weekLabel),
    mri_ds:      d.mri         && d.mri.ds.find(r => r.week === weekLabel),
    ds_mri:      d.ds_mri_daily && d.ds_mri_daily.find(r => r.dow === dowLabel),
    picc:        d.picc        && d.picc.find(r => r.dow === dowLabel),
  };
}

function getDoctorTasksForToday(a) {
  if (!a) return {};
  
  const doctorTasks = {};
  PEOPLE.forEach(p => {
    doctorTasks[p.name] = { tasks: [], isOnLeave: false };
  });

  function checkLeave(name) {
    if (!name) return false;
    const key = a.key;
    const d = NI_DATA[key];
    if (d && d.leaves && d.leaves[name]) {
      const dateStr = `${a.month}/${a.day}`;
      return d.leaves[name].includes(dateStr);
    }
    return false;
  }

  const key = a.key;
  const d = NI_DATA[key];
  const dateStr = `${a.month}/${a.day}`;
  const dayCovers = (d && d.covers && d.covers[dateStr]) ? d.covers[dateStr] : null;

  function addTask(name, task) {
    if (!name) return;
    name = name.trim();
    if (!name || name === '—') return;
    
    const ampmMatch = name.match(/^(AM|PM)\s+(.+)$/);
    let displayName = name;
    let suffix = '';
    if (ampmMatch) {
      displayName = ampmMatch[2].trim();
      suffix = ` (${ampmMatch[1]})`;
    }
    
    if (!doctorTasks[displayName]) {
      doctorTasks[displayName] = { tasks: [], isOnLeave: false };
    }

    // Determine the task key for this task
    let taskKey = null;
    if (task.includes('DSA') || task.includes('TAE') || task.includes('血管攝影')) {
      taskKey = 'angio';
    } else if (task.includes('急 CT')) {
      taskKey = 'erct';
    } else if (task.includes('門住 CT')) {
      taskKey = 'ct';
    } else if (task.includes('MRI') && !task.includes('解釋')) {
      taskKey = 'mri';
    } else if (task.includes('MRI') && task.includes('解釋')) {
      taskKey = 'ds_mri';
    } else if (task.includes('PICC')) {
      taskKey = 'picc';
    }

    let coverName = null;
    let isSplitCt = false;
    let tpCover = null;
    let dsCover = null;

    if (dayCovers && dayCovers[displayName]) {
      const cover = dayCovers[displayName];
      if (typeof cover === 'string') {
        coverName = cover;
      } else if (typeof cover === 'object' && taskKey && cover[taskKey]) {
        const taskCover = cover[taskKey];
        if (typeof taskCover === 'string') {
          coverName = taskCover;
        } else if (typeof taskCover === 'object') {
          if (taskKey === 'ct' && task.includes('北:') && task.includes('淡:')) {
            isSplitCt = true;
            tpCover = taskCover.tp;
            dsCover = taskCover.ds;
          } else {
            if (task.includes('台北') || task.includes('北:')) {
              coverName = taskCover.tp;
            } else if (task.includes('淡水') || task.includes('淡:')) {
              coverName = taskCover.ds;
            }
          }
        }
      }
    }

    if (isSplitCt) {
      const ctMatch = task.match(/門住 CT \(北:(.+?)\/淡:(.+?)\)/);
      if (ctMatch) {
        const tpVal = ctMatch[1];
        const dsVal = ctMatch[2];
        if (tpCover) {
          if (!doctorTasks[tpCover]) doctorTasks[tpCover] = { tasks: [], isOnLeave: false };
          doctorTasks[tpCover].tasks.push(`門住 CT 台北 (${tpVal}) (代${displayName})${suffix}`);
        } else {
          doctorTasks[displayName].tasks.push(`門住 CT 台北 (${tpVal})${suffix}`);
        }
        if (dsCover) {
          if (!doctorTasks[dsCover]) doctorTasks[dsCover] = { tasks: [], isOnLeave: false };
          doctorTasks[dsCover].tasks.push(`門住 CT 淡水 (${dsVal}) (代${displayName})${suffix}`);
        } else {
          doctorTasks[displayName].tasks.push(`門住 CT 淡水 (${dsVal})${suffix}`);
        }
      }
    } else if (coverName) {
      if (!doctorTasks[coverName]) {
        doctorTasks[coverName] = { tasks: [], isOnLeave: false };
      }
      doctorTasks[coverName].tasks.push(`${task} (代${displayName})${suffix}`);
    } else {
      doctorTasks[displayName].tasks.push(task + suffix);
    }
  }

  function processField(raw, taskName) {
    if (!raw) return;
    if (raw.includes('AM') || raw.includes('PM')) {
      raw.split('/').forEach(seg => {
        seg = seg.trim();
        const m = seg.match(/^(AM|PM)\s+(.+)$/);
        if (m) {
          addTask(m[2].trim(), `${taskName} (${m[1]})`);
        } else {
          addTask(seg, taskName);
        }
      });
      return;
    }
    if (raw.includes('/')) {
      const parts = raw.split('/');
      addTask(parts[0].trim(), `${taskName} (學習)`);
      addTask(parts[1].trim(), `${taskName} (Cover)`);
      return;
    }
    addTask(raw, taskName);
  }

  if (a.isSunday) {
    if (a.sunMri) processField(a.sunMri.person, '週日 MRI 加班');
    if (a.evtDoctor) processField(a.evtDoctor, '中風取栓 On-Call');
  } else if (a.isSat) {
    if (a.sat) processField(a.sat.person, '週六班');
    if (a.evtDoctor) processField(a.evtDoctor, '中風取栓 On-Call');
  } else {
    if (a.angio) {
      processField(a.angio.tp_dsa, '台北 DSA');
      processField(a.angio.tp_tae, '台北 TAE');
      processField(a.angio.ds_dsa, '淡水 DSA');
      processField(a.angio.ds_tae, '淡水 TAE');
    }
    if (a.erct) {
      processField(a.erct.tp, '台北急 CT');
      processField(a.erct.ds, '淡水急 CT');
    }
    if (a.mri_tp) {
      processField(a.mri_tp.person, '台北 MRI');
    }
    if (a.mri_ds) {
      processField(a.mri_ds.person, '淡水 MRI');
    }
    if (a.ds_mri) {
      processField(a.ds_mri.person, '淡水神經 MRI 解釋');
    }
    if (a.picc) {
      processField(a.picc.tp, '台北 PICC');
      processField(a.picc.ds, '淡水 PICC');
    }
    if (a.evtDoctor) {
      processField(a.evtDoctor, '中風取栓 On-Call');
    }
    if (a.routine_ct && a.routine_ct.length) {
      a.routine_ct.forEach(r => {
        processField(r.person, `門住 CT (北:${r.tp}/淡:${r.ds})`);
      });
    }
  }

  // Mark leaves
  Object.keys(doctorTasks).forEach(name => {
    doctorTasks[name].isOnLeave = checkLeave(name);
  });

  // Filter out doctors who have no tasks and are not on leave
  const result = {};
  Object.keys(doctorTasks).forEach(name => {
    const info = doctorTasks[name];
    if (info.tasks.length > 0 || info.isOnLeave) {
      result[name] = info;
    }
  });

  return result;
}

// ════════════════════════════════════════════════════
//  姓名渲染與小備註 helper
// ════════════════════════════════════════════════════
function renderPerson(raw, showTraineeTag = true, targetDate = null, taskKey = null, location = null, dow = null) {
  if (!raw) return '—';

  function formatName(name) {
    const cls = personCls(name);
    const baseHtml = `<span class="person ${cls}">${name}</span>`;
    
    let isCovered = false;
    let coverSuffix = '';
    let hasActiveCover = false;
    let dateStr = '';
    
    if (targetDate) {
      const parsedDate = typeof targetDate === 'string' ? new Date(MONTH_KEYS[currentIdx].split('-')[0], MONTH_KEYS[currentIdx].split('-')[1] - 1, targetDate.split('/')[1]) : targetDate;
      const year = parsedDate.getFullYear();
      const month = parsedDate.getMonth() + 1;
      const day = parsedDate.getDate();
      const monthKey = `${year}-${String(month).padStart(2, '0')}`;
      const d = NI_DATA[monthKey];
      
      dateStr = `${month}/${day}`;
      
      if (d && d.covers && d.covers[dateStr] && d.covers[dateStr][name]) {
        const cover = d.covers[dateStr][name];
        let coverName = '';
        if (typeof cover === 'string') {
          coverName = cover;
          hasActiveCover = true;
        } else if (typeof cover === 'object') {
          if (taskKey && cover[taskKey]) {
            const taskCover = cover[taskKey];
            if (typeof taskCover === 'string') {
              coverName = taskCover;
              hasActiveCover = true;
            } else if (typeof taskCover === 'object') {
              if (location === 'tp' && taskCover.tp) {
                coverName = taskCover.tp;
                hasActiveCover = true;
              } else if (location === 'ds' && taskCover.ds) {
                coverName = taskCover.ds;
                hasActiveCover = true;
              } else if (!location && taskCover.tp && taskCover.ds) {
                const tpCls = personCls(taskCover.tp);
                const dsCls = personCls(taskCover.ds);
                coverSuffix = `<span style="color:var(--text-sub);margin:0 3px">→</span><span style="font-size:0.72rem;color:var(--text-sub);">(北)</span><span class="person ${tpCls}">${taskCover.tp}</span><span style="font-size:0.72rem;color:var(--text-sub);margin-left:4px;">(淡)</span><span class="person ${dsCls}">${taskCover.ds}</span>`;
                hasActiveCover = true;
              }
            }
          }
        }
        if (coverName) {
          const coverCls = personCls(coverName);
          coverSuffix = `<span style="color:var(--text-sub);margin:0 3px">→</span><span class="person ${coverCls}">${coverName}</span>`;
        }
      }

      if (d && d.leaves && d.leaves[name] && d.leaves[name].includes(dateStr)) {
        isCovered = true;
      }
    }
    
    let finalHtml = baseHtml;
    if (isCovered) {
      finalHtml = `<span class="person ${cls}" style="text-decoration: line-through; opacity: 0.6;">${name}</span><span style="font-size: 0.65rem; color: #ef4444; font-weight: 700; margin-left: 2px;">(休)</span>${coverSuffix}`;
    } else if (hasActiveCover) {
      finalHtml = `<span class="person ${cls}" style="text-decoration: line-through; opacity: 0.6;">${name}</span>${coverSuffix}`;
    }
    
    // 如果處於該區塊的請假代班編輯模式，且 name 是有效醫師，渲染 🔄 按鈕
    if (activeCoverSection && (activeCoverSection === taskKey || (activeCoverSection === 'sunday' && taskKey === 'sunday'))) {
      const cleanName = name.replace(/AM|PM/g, '').trim();
      const isValidDoc = PEOPLE.some(p => p.name === cleanName);
      if (isValidDoc) {
        const tDateVal = targetDate ? (typeof targetDate === 'string' ? targetDate : `${targetDate.getMonth()+1}/${targetDate.getDate()}`) : '';
        const escapedName = cleanName.replace(/'/g, "\\'");
        const escapedTask = taskKey ? taskKey.replace(/'/g, "\\'") : '';
        const escapedLoc = location ? location.replace(/'/g, "\\'") : '';
        const escapedDow = dow ? dow.replace(/'/g, "\\'") : '';
        
        finalHtml += `<span class="set-cover-btn" onclick="openCellCoverModal('${escapedTask}', '${escapedLoc}', '${escapedName}', '${tDateVal}', '${escapedDow}')" style="cursor:pointer; margin-left:4px; font-size:0.75rem; background:#eff6ff; border:1px solid #bfdbfe; padding:1px 4px; border-radius:3px; display:inline-block;" title="設定代班">🔄</span>`;
      }
    }
    
    return finalHtml;
  }

  if (raw.includes('AM') || raw.includes('PM')) {
    return raw
      .split('/')
      .map(seg => {
        seg = seg.trim();
        const m = seg.match(/^(AM|PM)\s+(.+)$/);
        if (m) {
          const name = m[2].trim();
          return `<span style="font-size:0.7rem;color:var(--text-sub);font-weight:600;">${m[1]}</span> ${formatName(name)}`;
        }
        return formatName(seg);
      })
      .join('<span style="color:#cbd5e1;margin:0 4px">/</span>');
  }

  const parts = raw.split('/');
  if (parts.length >= 2) {
    const p1 = parts[0].trim();
    const p2 = parts[1].trim();
    if (showTraineeTag) {
      return formatName(p1)
           + `<span class="trainee-tag" style="background:#e0f2fe; color:#0369a1; border-color:#bae6fd; margin-left:4px;">學</span>`
           + `<span style="color:#cbd5e1;margin:0 4px">/</span>`
           + formatName(p2)
           + `<span class="trainee-tag" style="background:#fef3c7; color:#78350f; border-color:#fcd34d; margin-left:4px;">Cover</span>`;
    } else {
      return `<span style="font-size:0.7rem;color:var(--text-sub);font-weight:600;">AM</span> ` + formatName(p1)
           + `<span style="color:#cbd5e1;margin:0 4px">/</span>`
           + `<span style="font-size:0.7rem;color:var(--text-sub);font-weight:600;">PM</span> ` + formatName(p2);
    }
  }

  return formatName(raw);
}

function noteHtml(note) {
  if (!note) return '';
  return `<div class="note-tooltip-trigger" style="display: inline-flex; width: 18px; height: 18px; font-size: 0.72rem; margin-left: 4px; vertical-align: middle;">💬<span class="note-tooltip-text">${note}</span></div>`;
}

// ════════════════════════════════════════════════════
//  今日卡片渲染
// ════════════════════════════════════════════════════
function renderTodayCard(key) {
  const targetDate = getLogicalDate();
  let titleText = '今日分配';
  if (todayCardTab === 'tomorrow') {
    targetDate.setDate(targetDate.getDate() + 1);
    titleText = '明日預覽';
  } else if (todayCardTab === 'custom' && todayCardCustomDate) {
    targetDate.setTime(todayCardCustomDate.getTime());
    titleText = '指定分配';
  }

  const targetKey = `${targetDate.getFullYear()}-${String(targetDate.getMonth()+1).padStart(2,'0')}`;
  const a = getTodayAssignments(targetKey, targetDate);
  if (!a) return null;

  const d = NI_DATA[targetKey];
  const dateStr = `${a.month}/${a.day}`;
  const dayCovers = (d && d.covers && d.covers[dateStr]) ? d.covers[dateStr] : null;

  const card = document.createElement('div');
  card.className = 'today-card';

  const isTodayActive = todayCardTab === 'today';
  const isTomorrowActive = todayCardTab === 'tomorrow';
  const isCustomActive = todayCardTab === 'custom';

  const bgToday = isTodayActive ? '#ffffff' : 'transparent';
  const colorToday = isTodayActive ? 'var(--primary-color)' : '#64748b';
  const shadowToday = isTodayActive ? '0 1px 2px rgba(0,0,0,0.05)' : 'none';
  
  const bgTomorrow = isTomorrowActive ? '#ffffff' : 'transparent';
  const colorTomorrow = isTomorrowActive ? 'var(--primary-color)' : '#64748b';
  const shadowTomorrow = isTomorrowActive ? '0 1px 2px rgba(0,0,0,0.05)' : 'none';

  const bgCustom = isCustomActive ? '#ffffff' : 'transparent';
  const colorCustom = isCustomActive ? 'var(--primary-color)' : '#64748b';
  const shadowCustom = isCustomActive ? '0 1px 2px rgba(0,0,0,0.05)' : 'none';
  
  let customBtnLabel = '指定日期';
  if (isCustomActive && todayCardCustomDate) {
    customBtnLabel = `📅 ${todayCardCustomDate.getMonth() + 1}/${todayCardCustomDate.getDate()}`;
  } else {
    customBtnLabel = '📅 指定日期';
  }

  const status = getAutoFilterStatus(targetDate);
  let statusBadge = '';
  if (status === 'evt_only') {
    statusBadge = `<span style="font-size:0.7rem; background:#fee2e2; color:#ef4444; padding:2px 8px; border-radius:12px; font-weight:600; display:inline-flex; align-items:center; gap:4px; margin-left: 6px; vertical-align: middle;">🌙 On-Call 時段</span>`;
  } else if (status === 'daytime_only') {
    statusBadge = `<span style="font-size:0.7rem; background:#fef3c7; color:#d97706; padding:2px 8px; border-radius:12px; font-weight:600; display:inline-flex; align-items:center; gap:4px; margin-left: 6px; vertical-align: middle;">☀️ 白天值班時段</span>`;
  } else {
    statusBadge = `<span style="font-size:0.7rem; background:#e2e8f0; color:#475569; padding:2px 8px; border-radius:12px; font-weight:600; display:inline-flex; align-items:center; gap:4px; margin-left: 6px; vertical-align: middle;">🕒 自動篩選：關</span>`;
  }

  let headerHtml = `
    <div class="today-card-header" style="display:flex; justify-content:space-between; align-items:center; width:100%; flex-wrap:wrap; gap:10px; margin-bottom:14px;">
      <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
        <h2>📅 ${titleText}</h2>
        <span class="today-date-badge">${a.dateStr}</span>${statusBadge}
      </div>
      <div style="display:flex; gap:2px; background:#f1f5f9; padding:2px; border-radius:6px; border:1px solid #e2e8f0; align-items:center; height: 28px;">
        <button onclick="setTodayTab('today')" style="padding:3px 10px; font-size:0.75rem; border-radius:4px; border:none; font-weight:600; cursor:pointer; transition:all 0.15s; background:${bgToday}; color:${colorToday}; box-shadow:${shadowToday}; height:100%;">今日</button>
        <button onclick="setTodayTab('tomorrow')" style="padding:3px 10px; font-size:0.75rem; border-radius:4px; border:none; font-weight:600; cursor:pointer; transition:all 0.15s; background:${bgTomorrow}; color:${colorTomorrow}; box-shadow:${shadowTomorrow}; height:100%;">明日</button>
        <div style="position:relative; display:flex; align-items:center; height:100%;">
          <button onclick="const p = document.getElementById('todayCardDatePicker'); if (p && typeof p.showPicker === 'function') { p.showPicker(); } else if (p) { p.click(); }" style="padding:3px 10px; font-size:0.75rem; border-radius:4px; border:none; font-weight:600; cursor:pointer; transition:all 0.15s; background:${bgCustom}; color:${colorCustom}; box-shadow:${shadowCustom}; height:100%; white-space:nowrap; z-index: 1;">${customBtnLabel}</button>
          <input type="date" id="todayCardDatePicker" onchange="onCustomDateChange(this.value)" style="position:absolute; top:0; left:0; width:100%; height:100%; opacity:0; pointer-events:none; z-index: -1; margin: 0; padding: 0; border: none;">
        </div>
      </div>
    </div>`;

  let toggleHtml = `
    <div style="display:flex; align-items:center; justify-content:flex-end; width:100%; margin-top:-8px; margin-bottom:10px; font-size:0.75rem; color:#64748b; gap:6px;">
      <label style="display:inline-flex; align-items:center; cursor:pointer; gap:6px; user-select:none;">
        <input type="checkbox" id="autoFilterToggle" ${autoFilterTime ? 'checked' : ''} onchange="toggleAutoFilter(this.checked)" style="cursor:pointer; width:14px; height:14px; margin:0; vertical-align:middle;">
        <span style="vertical-align:middle;">🕒 依目前時間自動切換時段班表</span>
      </label>
    </div>`;

  card.innerHTML = headerHtml + toggleHtml;

  const year = targetDate.getFullYear();
  const month = targetDate.getMonth() + 1;
  const day = targetDate.getDate();
  const dateStrShort = `${month}/${day}`;
  const isHoliday = d && d.holidays && d.holidays.includes(dateStrShort);

  // ── Sunday / Holiday ──
  if (a.isSunday || isHoliday) {
    let sunHtml = '';
    if (a.isSunday && status !== 'evt_only') {
      sunHtml += `<div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:5px; padding:10px 0; justify-content:center;">`;
      if (a.sunMri) {
        const formattedPerson = renderPerson(a.sunMri.person, true, targetDate);
        sunHtml += `
          <div class="today-sat-card" style="min-width:200px;">
            <div class="today-sat-label">週日 MRI 加班</div>
            <div class="today-sat-person">${formattedPerson}</div>
          </div>`;
      } else {
        sunHtml += `
          <div class="today-sat-card" style="min-width:200px;">
            <div class="today-sat-label">週日 MRI 加班</div>
            <div style="color:var(--text-sub);font-size:0.88rem;text-align:center;padding:10px 0;">無加班資料</div>
          </div>`;
      }
      sunHtml += `</div>`;
    } else {
      sunHtml += `<div style="padding:10px 0; text-align:center; color:var(--text-sub); font-size:0.88rem; font-weight:600;">☕ 週日常規日班休假 / 醫院休假日</div>`;
    }

    if (a.evtDoctor && status !== 'daytime_only') {
      const formattedEvt = renderPerson(a.evtDoctor, true, targetDate);
      sunHtml += `
        <div style="display:flex; justify-content:center; margin-top:10px;">
          <div class="today-sat-card" style="min-width:200px;">
            <div class="today-sat-label">中風取栓 On-Call (24H)</div>
            <div class="today-sat-person">${formattedEvt}</div>
          </div>
        </div>`;
    }
    card.innerHTML += sunHtml;
    return card;
  }

  // ── Non-office hours (evt_only) ──
  if (status === 'evt_only') {
    let noticeHtml = `
      <div style="padding:12px; border-radius:8px; background:#f8fafc; border:1px solid #e2e8f0; text-align:center; color:#64748b; font-size:0.82rem; font-weight:500; margin-bottom:14px; display:flex; align-items:center; justify-content:center; gap:6px;">
        <span>🌙 目前為非上班時間，僅顯示中風取栓 On-Call 人員</span>
      </div>`;
    if (a.evtDoctor) {
      const formattedEvt = renderPerson(a.evtDoctor, true, targetDate);
      noticeHtml += `
        <div style="display:flex; justify-content:center; margin-top:10px; margin-bottom: 10px;">
          <div class="today-sat-card" style="min-width:200px;">
            <div class="today-sat-label">中風取栓 On-Call (24H)</div>
            <div class="today-sat-person">${formattedEvt}</div>
          </div>
        </div>`;
    } else {
      noticeHtml += `<div style="text-align:center; color:var(--text-sub); font-size:0.88rem; padding:15px 0;">今日無 On-Call 人員資料</div>`;
    }
    card.innerHTML += noticeHtml;
    return card;
  }

  // ── Saturday ──
  if (a.isSat) {
    let satHtml = `<div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:5px; padding:10px 0;">`;
    if (a.sat) {
      const formattedPerson = renderPerson(a.sat.person, true, targetDate);
      satHtml += `
        <div class="today-sat-card">
          <div class="today-sat-label">週六班（北淡 MRI + 急 CT）</div>
          <div class="today-sat-person">${formattedPerson}</div>
        </div>`;
    } else {
      satHtml += `<div class="today-sat-card"><div class="today-sat-label">週六班</div><div style="color:var(--text-sub);font-size:0.88rem">無資料</div></div>`;
    }
    
    if (a.evtDoctor && status !== 'daytime_only') {
      const formattedEvt = renderPerson(a.evtDoctor, true, targetDate);
      satHtml += `
        <div class="today-sat-card">
          <div class="today-sat-label">中風取栓 On-Call (24H)</div>
          <div class="today-sat-person">${formattedEvt}</div>
        </div>`;
    }
    satHtml += `</div>`;
    card.innerHTML += satHtml;
    return card;
  }

  // ── Today's Doctor Tasks Overview ──
  const doctorTasks = getDoctorTasksForToday(a);
  let overviewHtml = '';
  const docNames = Object.keys(doctorTasks);

  // Filter active doctors based on the selected time-mode
  const activeDocs = docNames.filter(name => {
    const info = doctorTasks[name];
    let filtered = info.tasks;
    if (status === 'evt_only') {
      filtered = info.tasks.filter(t => t.includes('中風取栓') || t.includes('On-Call'));
    } else if (status === 'daytime_only') {
      filtered = info.tasks.filter(t => !(t.includes('中風取栓') || t.includes('On-Call')));
    }
    return filtered.length > 0;
  });

  if (activeDocs.length > 0) {
    overviewHtml += `<div style="margin-bottom: 20px;">
      <div style="font-size: 0.82rem; font-weight: 800; color: var(--primary-color); margin-bottom: 10px;">👤 今日醫師任務總覽 (Task Overview)</div>
      <div class="today-doctors-grid">`;
    activeDocs.forEach(name => {
      const info = doctorTasks[name];
      const pc = personCls(name);
      
      let cardStyle = '';
      let badgeHtml = '';
      
      if (info.isOnLeave) {
        cardStyle = ' style="opacity: 0.6; border-color: #fca5a5; background: #fff5f5;"';
        const hasCover = (dayCovers && dayCovers[name]);
        const isMissingCover = (info.tasks.length > 0 && !hasCover);
        badgeHtml = isMissingCover
          ? ' <span style="font-size: 0.65rem; background: #dc2626; color: white; padding: 1px 5px; border-radius: 4px; margin-left: 5px; font-weight: 800; vertical-align: middle;">⚠️ 漏代班</span>'
          : ' <span style="font-size: 0.65rem; background: #ef4444; color: white; padding: 1px 5px; border-radius: 4px; margin-left: 5px; font-weight: 800; vertical-align: middle;">✈️ 休假</span>';
      }
      
      overviewHtml += `
        <div class="today-doctor-card"${cardStyle}>
          <div class="today-doctor-name">
            <span class="person ${pc}">${name}</span>${badgeHtml}
          </div>
          <div class="today-doctor-task-list">`;
      
      // Filter tasks to show
      let filteredTasks = info.tasks;
      if (status === 'evt_only') {
        filteredTasks = info.tasks.filter(t => t.includes('中風取栓') || t.includes('On-Call'));
      } else if (status === 'daytime_only') {
        filteredTasks = info.tasks.filter(t => !(t.includes('中風取栓') || t.includes('On-Call')));
      }

      if (info.isOnLeave) {
        if (filteredTasks.length > 0) {
          const hasCover = (dayCovers && dayCovers[name]);
          filteredTasks.forEach(task => {
            const warningSuffix = hasCover ? '' : ' <span style="color:#dc2626; font-weight:800; font-size:0.65rem;">(無代班)</span>';
            overviewHtml += `<div class="today-doctor-task-item" style="text-decoration: line-through; opacity: 0.7; border-left-color: #ef4444;">${task}${warningSuffix}</div>`;
          });
        } else {
          overviewHtml += `<div style="font-size: 0.72rem; color: #94a3b8; font-style: italic; padding: 2px 6px;">今日無常規任務</div>`;
        }
      } else {
        if (filteredTasks.length > 0) {
          filteredTasks.forEach(task => {
            overviewHtml += `<div class="today-doctor-task-item">${task}</div>`;
          });
        } else {
          overviewHtml += `<div style="font-size: 0.72rem; color: #94a3b8; font-style: italic; padding: 2px 6px;">今日無常規任務</div>`;
        }
      }
      
      overviewHtml += `</div>
        </div>`;
    });
    overviewHtml += `</div></div>`;
  }
  card.innerHTML += overviewHtml;

  // ── Weekday grid ──
  const rows = [];

  if (a.angio) {
    rows.push({ label: '血管攝影室 DSA', tp: renderPerson(a.angio.tp_dsa, true, targetDate, 'angio', 'tp'), ds: renderPerson(a.angio.ds_dsa, true, targetDate, 'angio', 'ds'), note: a.angio.note });
    rows.push({ label: '血管攝影室 TAE', tp: renderPerson(a.angio.tp_tae, true, targetDate, 'angio', 'tp'), ds: renderPerson(a.angio.ds_tae, true, targetDate, 'angio', 'ds') });
  }
  if (a.erct) {
    rows.push({ label: '急診 CT', tp: renderPerson(a.erct.tp, true, targetDate, 'erct', 'tp'), ds: renderPerson(a.erct.ds, true, targetDate, 'erct', 'ds'), note: a.erct.note });
  }
  if (a.mri_tp || a.mri_ds) {
    rows.push({
      label: `門住急 MRI`,
      tp: a.mri_tp ? renderPerson(a.mri_tp.person, false, targetDate, 'mri', 'tp') : '—',
      ds: a.mri_ds ? renderPerson(a.mri_ds.person, false, targetDate, 'mri', 'ds') : '—',
    });
  }
  if (a.ds_mri) {
    rows.push({ label: '淡水神經 MRI 解釋', tp: '—', ds: renderPerson(a.ds_mri.person, true, targetDate, 'ds_mri', 'ds'), note: a.ds_mri.note });
  }
  if (a.picc) {
    rows.push({ label: 'PICC', tp: renderPerson(a.picc.tp, true, targetDate, 'picc', 'tp'), ds: renderPerson(a.picc.ds, true, targetDate, 'picc', 'ds'), note: a.picc.note });
  }
  if (a.evtDoctor && status !== 'daytime_only') {
    rows.push({ label: '中風取栓 On-Call', tp: renderPerson(a.evtDoctor, true, targetDate, 'evt', 'tp'), ds: '—' });
  }

  let gridHtml = `<div class="today-grid">`;
  gridHtml += `<div class="today-grid-row today-grid-col-header">
    <div></div>
    <div><span class="loc loc-tp">台北</span></div>
    <div><span class="loc loc-ds">淡水</span></div>
  </div>`;
  rows.forEach(r => {
    gridHtml += `<div class="today-grid-row">
      <div>${r.label}</div>
      <div>${r.tp}</div>
      <div>${r.ds}</div>
    </div>`;
  });
  gridHtml += `</div>`;

  // CT number pills
  if (a.routine_ct && a.routine_ct.length) {
    gridHtml += `<div style="margin-top:10px;">
      <div style="font-size:0.72rem;font-weight:700;color:var(--text-sub);margin-bottom:5px;">門住 CT 號碼分配</div>
      <div class="today-ct-pills">`;
    a.routine_ct.forEach(r => {
      const formattedPerson = renderPerson(r.person, true, targetDate, 'routine_ct', 'all', null);
      gridHtml += `<span class="today-ct-pill">${formattedPerson} 台北 ${r.tp} / 淡水 ${r.ds}</span>`;
    });
    gridHtml += `</div></div>`;
  }

  card.innerHTML += gridHtml;
  return card;
}

// ════════════════════════════════════════════════════
//  日班工作分配 Tab 渲染
// ════════════════════════════════════════════════════
function renderNiTab(d) {
  const root = document.getElementById('ni-sections');
  root.innerHTML = '';

  root.appendChild(renderAngio(d.angio));
  root.appendChild(renderErCt(d.erct));
  root.appendChild(renderRoutineCt(d.routine_ct));
  root.appendChild(renderMri(d.mri));
  root.appendChild(renderDsMriDaily(d.ds_mri_daily));
  root.appendChild(renderSaturday(d.saturday));
  root.appendChild(renderSundayMri(d.mri_sunday));
  if (d.picc) root.appendChild(renderPicc(d.picc));
  root.appendChild(renderNotes(d.notes || ''));
  root.appendChild(renderLeavesAndCoversEditorSection(d));
}

let activeCoverSection = null;
let isLeavesCoversExpanded = false;

function makeSection(icon, title, cls='', sectionKey=null) {
  const div = document.createElement('div');
  div.className = 'section-card' + (cls ? ' ' + cls : '');
  const h = document.createElement('div');
  h.className = 'section-title';
  
  if (sectionKey && currentUser) {
    h.className = 'section-title section-header';
    let btnHtml = '';
    const supportCoverSections = ['angio', 'erct', 'mri', 'ds_mri', 'picc', 'routine_ct'];
    
    if (activeEditSection === null && activeCoverSection === null) {
      const editBtn = `<button class="section-edit-btn" onclick="startSectionEdit('${sectionKey}')">✏️ 編輯</button>`;
      const coverBtn = supportCoverSections.includes(sectionKey)
        ? `<button class="section-edit-btn" onclick="enterSectionCover('${sectionKey}')" style="background:#f0fdf4; border-color:#bbf7d0; color:#16a34a;">🔄 設定代班</button>`
        : '';
      btnHtml = `<div style="display:flex; gap:6px;">${editBtn}${coverBtn}</div>`;
    } else if (activeEditSection === sectionKey) {
      btnHtml = `
        <div style="display:flex; gap:6px;">
          <button class="section-edit-save-btn" onclick="saveSectionEdit('${sectionKey}')">💾 儲存</button>
          <button class="section-edit-cancel-btn" onclick="cancelSectionEdit()">❌ 取消</button>
        </div>`;
    } else if (activeCoverSection === sectionKey) {
      btnHtml = `<button class="section-edit-cancel-btn" style="background:#ef4444; color:white; border:none;" onclick="exitSectionCover()">❌ 完成</button>`;
    }
    h.innerHTML = `<span>${icon} ${title}</span>${btnHtml}`;
  } else {
    h.textContent = `${icon} ${title}`;
  }
  
  div.appendChild(h);
  return div;
}

function makeEditSelect(id, currentValue) {
  return `<select id="${id}" style="width:100%; font-size:0.8rem; padding:2px;"><option value="">-</option>` + 
    PEOPLE.map(p => `<option value="${p.name}" ${p.name === currentValue ? 'selected' : ''}>${p.name}</option>`).join('') + 
    `</select>`;
}

function makeEditInput(id, currentValue) {
  return `<input type="text" id="${id}" value="${currentValue || ''}" style="width:100%; font-size:0.8rem; padding:2px; box-sizing:border-box;">`;
}

window.onCoverModeChange = function(selectEl) {
  const row = selectEl.closest('tr');
  const mode = selectEl.value;
  const singleContainer = row.querySelector('.cover-single-container');
  const advancedContainer = row.querySelector('.cover-advanced-container');
  if (mode === 'single') {
    if (singleContainer) singleContainer.style.display = 'block';
    if (advancedContainer) advancedContainer.style.display = 'none';
  } else {
    if (singleContainer) singleContainer.style.display = 'none';
    if (advancedContainer) advancedContainer.style.display = 'flex';
  }
};

window.addVisualCoverRow = function(date = '', absent = '', taskKey = 'all', mode = 'single', tpVal = '', dsVal = '') {
  const tbody = document.getElementById('visual-covers-tbody');
  if (!tbody) return;
  
  const tr = document.createElement('tr');
  const dateInput = `<input type="text" class="cover-date-input" value="${date}" placeholder="如: 7/17" style="width:90%; padding:4px 8px; border:1px solid #cbd5e1; border-radius:4px; font-size:0.8rem; box-sizing:border-box;">`;
  const absentSelect = `
    <select class="cover-absent-select" style="width:95%; padding:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:0.8rem;">
      <option value="">-</option>
      ${PEOPLE.map(p => `<option value="${p.name}" ${p.name === absent ? 'selected' : ''}>${p.name}</option>`).join('')}
    </select>`;
    
  const taskOptionsHtml = [
    { key: 'all', name: '全部工作' },
    { key: 'mri', name: '🧲 門住急 MRI' },
    { key: 'angio', name: '🏥 血管攝影' },
    { key: 'erct', name: '🚨 急診 CT' },
    { key: 'routine_ct', name: '📋 門住 CT 號碼' },
    { key: 'ds_mri', name: '🏥 淡水健檢 MRI' },
    { key: 'picc', name: '💉 PICC' },
    { key: 'saturday', name: '📅 週六班' },
    { key: 'sunday', name: '📅 週日 MRI' }
  ].map(o => `<option value="${o.key}" ${o.key === taskKey ? 'selected' : ''}>${o.name}</option>`).join('');
  
  const taskSelect = `
    <select class="cover-task-select" style="width:95%; padding:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:0.8rem;">
      ${taskOptionsHtml}
    </select>`;
    
  const modeSelect = `
    <select class="cover-mode-select" onchange="onCoverModeChange(this)" style="width:95%; padding:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:0.8rem;">
      <option value="single" ${mode === 'single' ? 'selected' : ''}>單人代班</option>
      <option value="advanced" ${mode === 'advanced' ? 'selected' : ''}>指定分院區</option>
    </select>`;
  const singleSelect = `
    <div class="cover-single-container" style="display:${mode === 'single' ? 'block' : 'none'};">
      <select class="cover-single-select" style="width:95%; padding:4px; border:1px solid #cbd5e1; border-radius:4px; font-size:0.8rem;">
        <option value="">-</option>
        ${PEOPLE.map(p => `<option value="${p.name}" ${p.name === tpVal && mode === 'single' ? 'selected' : ''}>${p.name}</option>`).join('')}
      </select>
    </div>`;
  const advancedSelect = `
    <div class="cover-advanced-container" style="display:${mode === 'advanced' ? 'flex' : 'none'}; gap:4px; align-items:center; flex-wrap:wrap;">
      <span style="font-size:0.7rem; color:#64748b;">北:</span>
      <select class="cover-tp-select" style="padding:2px 4px; border:1px solid #cbd5e1; border-radius:4px; font-size:0.75rem; min-width:60px;">
        <option value="">-</option>
        ${PEOPLE.map(p => `<option value="${p.name}" ${p.name === tpVal && mode === 'advanced' ? 'selected' : ''}>${p.name}</option>`).join('')}
      </select>
      <span style="font-size:0.7rem; color:#64748b; margin-left:4px;">淡:</span>
      <select class="cover-ds-select" style="padding:2px 4px; border:1px solid #cbd5e1; border-radius:4px; font-size:0.75rem; min-width:60px;">
        <option value="">-</option>
        ${PEOPLE.map(p => `<option value="${p.name}" ${p.name === dsVal && mode === 'advanced' ? 'selected' : ''}>${p.name}</option>`).join('')}
      </select>
    </div>`;
  const deleteBtn = `<button type="button" class="covers-delete-btn" onclick="this.closest('tr').remove()">🗑️ 刪除</button>`;
  
  tr.innerHTML = `
    <td>${dateInput}</td>
    <td>${absentSelect}</td>
    <td>${taskSelect}</td>
    <td>${modeSelect}</td>
    <td>${singleSelect}${advancedSelect}</td>
    <td style="text-align:center;">${deleteBtn}</td>`;
  tbody.appendChild(tr);
};

function renderLeavesAndCoversEditorSection(d) {
  const editing = isSectionEditing('leaves_covers');
  const taskNames = {
    'all': '全部工作',
    'mri': '🧲 門住急 MRI',
    'angio': '🏥 血管攝影',
    'erct': '🚨 急診 CT',
    'routine_ct': '📋 門住 CT 號碼',
    'ds_mri': '🏥 淡水健檢 MRI',
    'picc': '💉 PICC',
    'saturday': '📅 週六班',
    'sunday': '📅 週日 MRI'
  };
  
  // 1. 唯讀預覽模式
  if (!editing) {
    const sec = makeSection('⚙️', '請假與代班明細總覽', 'full-width', 'leaves_covers');
    
    // 建立展開/收合按鈕
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'toggle-collapse-btn';
    toggleBtn.style.cssText = `
      width: 100%;
      padding: 10px;
      margin-top: 8px;
      font-size: 0.85rem;
      font-weight: 700;
      border: 1px dashed #cbd5e1;
      border-radius: 8px;
      background: #f8fafc;
      color: #475569;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.2s;
    `;
    toggleBtn.onmouseover = () => {
      toggleBtn.style.background = '#f1f5f9';
      toggleBtn.style.borderColor = '#94a3b8';
    };
    toggleBtn.onmouseout = () => {
      toggleBtn.style.background = '#f8fafc';
      toggleBtn.style.borderColor = '#cbd5e1';
    };
    toggleBtn.innerHTML = isLeavesCoversExpanded ? '📁 收合請假與代班明細' : '📂 展開請假與代班明細';
    toggleBtn.onclick = () => {
      isLeavesCoversExpanded = !isLeavesCoversExpanded;
      render();
    };
    sec.appendChild(toggleBtn);

    const container = document.createElement('div');
    container.style.marginTop = '12px';
    container.style.padding = '16px';
    container.style.background = '#f8fafc';
    container.style.border = '1px solid #e2e8f0';
    container.style.borderRadius = '8px';
    container.style.fontSize = '0.85rem';
    container.style.display = isLeavesCoversExpanded ? 'block' : 'none';
    
    let activeLeavesHtml = '';
    let leaveCount = 0;
    if (d.leaves) {
      Object.keys(d.leaves).forEach(name => {
        const dates = d.leaves[name];
        if (dates && Array.isArray(dates) && dates.length > 0) {
          activeLeavesHtml += `<div style="padding:5px 10px; background:white; border:1px solid #e2e8f0; border-radius:6px; font-weight:600;"><span class="person ${personCls(name)}">${name}</span>：${dates.join(', ')}</div>`;
          leaveCount++;
        }
      });
    }
    if (leaveCount === 0) {
      activeLeavesHtml = `<div style="color:#94a3b8; font-style:italic;">本月無請假紀錄</div>`;
    }
    
    let activeCoversHtml = '';
    let coverCount = 0;
    if (d.covers) {
      Object.keys(d.covers).sort().forEach(dateStr => {
        const dayCovers = d.covers[dateStr];
        if (dayCovers && typeof dayCovers === 'object') {
          Object.keys(dayCovers).forEach(absentDoc => {
            const coverVal = dayCovers[absentDoc];
            let coverText = '';
            
            if (typeof coverVal === 'string') {
              coverText = `<span class="person ${personCls(coverVal)}">${coverVal}</span>`;
            } else if (typeof coverVal === 'object' && coverVal !== null) {
              const knownTasks = ['mri', 'angio', 'erct', 'routine_ct', 'ds_mri', 'picc', 'saturday', 'sunday'];
              const hasTaskKeys = Object.keys(coverVal).some(k => knownTasks.includes(k) || k === 'all');
              
              if (hasTaskKeys) {
                const taskParts = [];
                Object.keys(coverVal).forEach(tKey => {
                  const tVal = coverVal[tKey];
                  const tName = taskNames[tKey] || tKey;
                  let tText = '';
                  if (typeof tVal === 'string') {
                    tText = `<span class="person ${personCls(tVal)}">${tVal}</span>`;
                  } else if (typeof tVal === 'object' && tVal !== null) {
                    const subParts = [];
                    if (tVal.tp) subParts.push(`<span class="loc loc-tp">台北</span><span class="person ${personCls(tVal.tp)}">${tVal.tp}</span>`);
                    if (tVal.ds) subParts.push(`<span class="loc loc-ds">淡水</span><span class="person ${personCls(tVal.ds)}">${tVal.ds}</span>`);
                    tText = subParts.join('、');
                  }
                  taskParts.push(`<span style="background:#f1f5f9; padding:2px 6px; border-radius:4px; border:1px solid #cbd5e1; font-size:0.75rem; margin-right:4px; display:inline-block; margin-top:2px;">${tName}: ${tText}</span>`);
                });
                coverText = taskParts.join(' ');
              } else {
                const parts = [];
                if (coverVal.tp) parts.push(`<span class="loc loc-tp">台北</span><span class="person ${personCls(coverVal.tp)}">${coverVal.tp}</span>`);
                if (coverVal.ds) parts.push(`<span class="loc loc-ds">淡水</span><span class="person ${personCls(coverVal.ds)}">${coverVal.ds}</span>`);
                coverText = parts.join('、');
              }
            }
            
            activeCoversHtml += `<div style="padding:8px 12px; background:white; border:1px solid #e2e8f0; border-radius:6px; display:inline-flex; align-items:center; gap:6px; flex-wrap:wrap; width:100%; box-sizing:border-box;">
              <strong style="color:var(--primary-color); min-width:35px;">${dateStr}</strong>
              <span class="person ${personCls(absentDoc)}" style="text-decoration:line-through; opacity:0.6;">${absentDoc}</span>
              <span style="color:#94a3b8;">→</span>
              <div style="display:inline-flex; flex-wrap:wrap; gap:4px; align-items:center;">${coverText}</div>
            </div>`;
            coverCount++;
          });
        }
      });
    }
    if (coverCount === 0) {
      activeCoversHtml = `<div style="color:#94a3b8; font-style:italic;">本月無代班紀錄</div>`;
    }
    
    container.innerHTML = `
      <div style="margin-bottom:15px;">
        <div style="font-weight:700; color:#475569; margin-bottom:8px; font-size:0.82rem; display:flex; align-items:center; gap:4px;">✈️ 醫師請假日程：</div>
        <div style="display:flex; gap:10px; flex-wrap:wrap;">${activeLeavesHtml}</div>
      </div>
      <div>
        <div style="font-weight:700; color:#475569; margin-bottom:8px; font-size:0.82rem; display:flex; align-items:center; gap:4px;">🔄 醫師代班明細：</div>
        <div style="display:flex; flex-direction:column; gap:6px;">${activeCoversHtml}</div>
      </div>`;
    sec.appendChild(container);
    return sec;
  }
  
  // 2. 編輯模式下的視覺化表格
  const sec = makeSection('⚙️', '請假與代班設定 (Leaves & Covers)', 'full-width', 'leaves_covers');
  const container = document.createElement('div');
  container.style.marginTop = '12px';
  container.style.padding = '16px';
  container.style.background = '#f1f5f9';
  container.style.border = '1px solid #cbd5e1';
  container.style.borderRadius = '8px';
  container.style.fontSize = '0.88rem';
  
  let leavesHtml = `<div style="margin-bottom: 20px;">
    <div style="font-weight:700; color:#475569; margin-bottom:8px;">醫師請假日期設定 (請輸入半形逗號分隔日期，如 7/17, 7/18)：</div>
    <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 10px;">`;
  
  PEOPLE.forEach(p => {
    const currentLeaves = d.leaves && d.leaves[p.name] ? d.leaves[p.name].join(', ') : '';
    leavesHtml += `<div style="display:flex; align-items:center; gap:8px; background:white; padding:6px 10px; border-radius:6px; border:1px solid #e2e8f0;">
      <span style="font-weight:700; min-width:60px;">${p.name}：</span>
      <input type="text" id="ni-leaves-${p.name}" value="${currentLeaves}" placeholder="如: 7/17, 7/18" style="flex:1; padding:4px 8px; border:1px solid #cbd5e1; border-radius:4px; font-size:0.8rem;">
    </div>`;
  });
  leavesHtml += `</div></div>`;
  
  const coversTableHtml = `<div>
    <div style="font-weight:700; color:#475569; margin-bottom:4px;">代班規則設定：</div>
    <div style="font-size:0.75rem; color:#64748b; margin-bottom:8px;">請填寫日期與請假人，並設定代班工作與代班醫師。代班模式支援「單人代班」或指定「台北/淡水」分院區。</div>
    <table class="covers-edit-table">
      <thead>
        <tr>
          <th style="width: 15%;">請假日期 (M/D)</th>
          <th style="width: 20%;">請假醫師</th>
          <th style="width: 20%;">代班工作</th>
          <th style="width: 15%;">代班模式</th>
          <th style="width: 25%;">代班設定</th>
          <th style="width: 5%; text-align:center;">操作</th>
        </tr>
      </thead>
      <tbody id="visual-covers-tbody">
      </tbody>
    </table>
    <button type="button" class="covers-edit-btn-add" onclick="addVisualCoverRow()">➕ 新增代班設定</button>
  </div>`;
  
  container.innerHTML = leavesHtml + coversTableHtml;
  sec.appendChild(container);
  
  // 載入當前代班資料
  setTimeout(() => {
    const tbody = document.getElementById('visual-covers-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (d.covers) {
      Object.keys(d.covers).forEach(dateStr => {
        const dayCovers = d.covers[dateStr];
        if (dayCovers && typeof dayCovers === 'object') {
          Object.keys(dayCovers).forEach(absentDoc => {
            const val = dayCovers[absentDoc];
            if (typeof val === 'string') {
              window.addVisualCoverRow(dateStr, absentDoc, 'all', 'single', val, '');
            } else if (typeof val === 'object' && val !== null) {
              const knownTasks = ['mri', 'angio', 'erct', 'routine_ct', 'ds_mri', 'picc', 'saturday', 'sunday'];
              const hasTaskKeys = Object.keys(val).some(k => knownTasks.includes(k) || k === 'all');
              
              if (hasTaskKeys) {
                Object.keys(val).forEach(tKey => {
                  const tVal = val[tKey];
                  if (typeof tVal === 'string') {
                    window.addVisualCoverRow(dateStr, absentDoc, tKey, 'single', tVal, '');
                  } else if (typeof tVal === 'object' && tVal !== null) {
                    window.addVisualCoverRow(dateStr, absentDoc, tKey, 'advanced', tVal.tp || '', tVal.ds || '');
                  }
                });
              } else {
                window.addVisualCoverRow(dateStr, absentDoc, 'all', 'advanced', val.tp || '', val.ds || '');
              }
            }
          });
        }
      });
    }
  }, 20);
  
  return sec;
}

function renderAngio(data) {
  const editing = isSectionEditing('angio');
  const sec = makeSection('🏥', '血管攝影室（神經介入）', 'full-width', 'angio');
  const t = document.createElement('table');
  t.className = 'ni-table';
  t.style.marginTop = '0';
  const noteColHeader = editing ? '<th style="width: 180px;">備注</th>' : '<th style="width: 55px;">💬</th>';
  t.innerHTML = `
    <thead><tr>
      <th style="width: 10%;">星期</th>
      <th style="width: 22.5%;"><span class="loc loc-tp">台北</span> DSA / IA</th>
      <th style="width: 22.5%;"><span class="loc loc-tp">台北</span> TAE</th>
      <th style="width: 22.5%;"><span class="loc loc-ds">淡水</span> DSA / IA</th>
      <th style="width: 22.5%;"><span class="loc loc-ds">淡水</span> TAE</th>
      ${noteColHeader}
    </tr></thead>
    <tbody></tbody>`;
  const tbody = t.querySelector('tbody');
  data.forEach((row, idx) => {
    const tr = document.createElement('tr');
    if (editing) {
      tr.innerHTML = `
        <td class="dow">${row.dow}</td>
        <td>${makeEditSelect(`ni-angio-${idx}-tp_dsa`, row.tp_dsa)}</td>
        <td>${makeEditInput(`ni-angio-${idx}-tp_tae`, row.tp_tae)}</td>
        <td>${makeEditSelect(`ni-angio-${idx}-ds_dsa`, row.ds_dsa)}</td>
        <td>${makeEditInput(`ni-angio-${idx}-ds_tae`, row.ds_tae)}</td>
        <td>${makeEditInput(`ni-angio-${idx}-note`, row.note)}</td>`;
    } else {
      tr.innerHTML = `
        <td class="dow">${row.dow}</td>
        <td>${renderPerson(row.tp_dsa, true, null, 'angio', 'tp_dsa', row.dow)}</td>
        <td>${renderPerson(row.tp_tae, true, null, 'angio', 'tp_tae', row.dow)}</td>
        <td>${renderPerson(row.ds_dsa, true, null, 'angio', 'ds_dsa', row.dow)}</td>
        <td>${renderPerson(row.ds_tae, true, null, 'angio', 'ds_tae', row.dow)}</td>
        <td style="text-align: center; vertical-align: middle;">${row.note ? `<div class="note-tooltip-trigger tooltip-right">💬<span class="note-tooltip-text">${row.note}</span></div>` : '—'}</td>`;
    }
    tbody.appendChild(tr);
  });
  
  const wrap = document.createElement('div');
  wrap.style.overflowX = 'auto';
  wrap.style.webkitOverflowScrolling = 'touch';
  wrap.style.marginTop = '12px';
  wrap.appendChild(t);
  sec.appendChild(wrap);
  return sec;
}

function renderErCt(data) {
  const editing = isSectionEditing('erct');
  const sec = makeSection('🚨', '急診 CT（Neuro ER CT）', '', 'erct');
  const t = document.createElement('table');
  t.className = 'ni-table';
  t.style.marginTop = '0';
  const noteColHeader = editing ? '<th style="width: 180px;">備注</th>' : '<th style="width: 55px;">💬</th>';
  t.innerHTML = `
    <thead><tr>
      <th style="width: 15%;">星期</th>
      <th style="width: 42.5%;"><span class="loc loc-tp">台北</span></th>
      <th style="width: 42.5%;"><span class="loc loc-ds">淡水</span></th>
      ${noteColHeader}
    </tr></thead><tbody></tbody>`;
  const tbody = t.querySelector('tbody');
  data.forEach((row, idx) => {
    const tr = document.createElement('tr');
    if (editing) {
      tr.innerHTML = `
        <td class="dow">${row.dow}</td>
        <td>${makeEditSelect(`ni-erct-${idx}-tp`, row.tp)}</td>
        <td>${makeEditSelect(`ni-erct-${idx}-ds`, row.ds)}</td>
        <td>${makeEditInput(`ni-erct-${idx}-note`, row.note)}</td>`;
    } else {
      tr.innerHTML = `
        <td class="dow">${row.dow}</td>
        <td>${renderPerson(row.tp, true, null, 'erct', 'tp', row.dow)}</td>
        <td>${renderPerson(row.ds, true, null, 'erct', 'ds', row.dow)}</td>
        <td style="text-align: center; vertical-align: middle;">${row.note ? `<div class="note-tooltip-trigger tooltip-right">💬<span class="note-tooltip-text">${row.note}</span></div>` : '—'}</td>`;
    }
    tbody.appendChild(tr);
  });

  const wrap = document.createElement('div');
  wrap.style.overflowX = 'auto';
  wrap.style.webkitOverflowScrolling = 'touch';
  wrap.style.marginTop = '12px';
  wrap.appendChild(t);
  sec.appendChild(wrap);
  return sec;
}

function renderRoutineCt(data) {
  const editing = isSectionEditing('routine_ct');
  const sec = makeSection('📋', '門住 CT 號碼分配', '', 'routine_ct');
  const t = document.createElement('table');
  t.className = 'ni-table';
  t.style.marginTop = '0';
  const noteColHeader = editing ? '<th style="width: 180px;">備注</th>' : '<th style="width: 55px;">💬</th>';
  t.innerHTML = `
    <thead><tr>
      <th style="width: 25%;">醫師</th>
      <th style="width: 37.5%;"><span class="loc loc-tp">台北</span> 號碼</th>
      <th style="width: 37.5%;"><span class="loc loc-ds">淡水</span> 號碼</th>
      ${noteColHeader}
    </tr></thead><tbody></tbody>`;
  const tbody = t.querySelector('tbody');
  data.forEach((row, idx) => {
    const tr = document.createElement('tr');
    if (editing) {
      tr.innerHTML = `
        <td>${renderPerson(row.person)}</td>
        <td>${makeEditInput(`ni-ct-${idx}-tp`, row.tp)}</td>
        <td>${makeEditInput(`ni-ct-${idx}-ds`, row.ds)}</td>
        <td>${makeEditInput(`ni-ct-${idx}-note`, row.note)}</td>`;
    } else {
      tr.innerHTML = `
        <td>${renderPerson(row.person, true, null, 'routine_ct', 'all', null)}</td>
        <td style="text-align:center;font-weight:600;">${row.tp}</td>
        <td style="text-align:center;font-weight:600;">${row.ds}</td>
        <td style="text-align: center; vertical-align: middle;">${row.note ? `<div class="note-tooltip-trigger tooltip-right">💬<span class="note-tooltip-text">${row.note}</span></div>` : '—'}</td>`;
    }
    tbody.appendChild(tr);
  });

  const wrap = document.createElement('div');
  wrap.style.overflowX = 'auto';
  wrap.style.webkitOverflowScrolling = 'touch';
  wrap.style.marginTop = '12px';
  wrap.appendChild(t);
  sec.appendChild(wrap);
  return sec;
}

function renderMri(data) {
  const editing = isSectionEditing('mri');
  const sec = makeSection('🧲', '門住急 MRI', 'full-width', 'mri');
  const t = document.createElement('table');
  t.className = 'ni-table';
  t.style.marginTop = '0';

  const weekToDow = {
    'W1': '週一',
    'W2': '週二',
    'W3': '週三',
    'W4': '週四',
    'W5': '週五'
  };

  const weekLabels = data.tp.map(r => r.week);
  t.innerHTML = `
    <thead><tr>
      <th style="width: 10%;">院區</th>
      ${weekLabels.map(w => `<th style="width: 18%;"><span class="week-badge">${weekToDow[w] || w}</span></th>`).join('')}
    </tr></thead><tbody></tbody>`;
  const tbody = t.querySelector('tbody');

  ['tp', 'ds'].forEach(side => {
    const tr = document.createElement('tr');
    const label = side === 'tp'
      ? `<span class="loc loc-tp">台北</span>`
      : `<span class="loc loc-ds">淡水</span>`;
    let cells = `<td class="dow">${label}</td>`;
    data[side].forEach((r, idx) => {
      if (editing) {
        cells += `<td>
          ${makeEditInput(`ni-mri-${side}-${idx}-person`, r.person)}
          <div style="margin-top:4px;">${makeEditInput(`ni-mri-${side}-${idx}-note`, r.note)}</div>
        </td>`;
      } else {
        cells += `<td>${renderPerson(r.person, false, null, 'mri', side, ['週一', '週二', '週三', '週四', '週五'][idx])}${r.note ? noteHtml(r.note) : ''}</td>`;
      }
    });
    tr.innerHTML = cells;
    tbody.appendChild(tr);
  });

  const wrap = document.createElement('div');
  wrap.style.overflowX = 'auto';
  wrap.style.webkitOverflowScrolling = 'touch';
  wrap.style.marginTop = '12px';
  wrap.appendChild(t);
  sec.appendChild(wrap);
  return sec;
}

function renderDsMriDaily(data) {
  const editing = isSectionEditing('ds_mri');
  const sec = makeSection('🏥', '淡水健檢 / 神經 MRI 解釋', '', 'ds_mri');
  const t = document.createElement('table');
  t.className = 'ni-table';
  t.style.marginTop = '0';
  const noteColHeader = editing ? '<th style="width: 180px;">備注</th>' : '<th style="width: 55px;">💬</th>';
  t.innerHTML = `
    <thead><tr>
      <th style="width: 20%;">星期</th>
      <th style="width: 65%;"><span class="loc loc-ds">淡水</span> 負責人</th>
      ${noteColHeader}
    </tr></thead><tbody></tbody>`;
  const tbody = t.querySelector('tbody');
  data.forEach((row, idx) => {
    const tr = document.createElement('tr');
    if (editing) {
      tr.innerHTML = `
        <td class="dow">${row.dow}</td>
        <td>${makeEditSelect(`ni-dsmri-${idx}-person`, row.person)}</td>
        <td>${makeEditInput(`ni-dsmri-${idx}-note`, row.note)}</td>`;
    } else {
      tr.innerHTML = `
        <td class="dow">${row.dow}</td>
        <td>${renderPerson(row.person, true, null, 'ds_mri', 'ds', row.dow)}</td>
        <td style="text-align: center; vertical-align: middle;">${row.note ? `<div class="note-tooltip-trigger tooltip-right">💬<span class="note-tooltip-text">${row.note}</span></div>` : '—'}</td>`;
    }
    tbody.appendChild(tr);
  });

  const wrap = document.createElement('div');
  wrap.style.overflowX = 'auto';
  wrap.style.webkitOverflowScrolling = 'touch';
  wrap.style.marginTop = '12px';
  wrap.appendChild(t);
  sec.appendChild(wrap);
  return sec;
}

function renderSaturday(data) {
  const editing = isSectionEditing('saturday');
  const sec = makeSection('📅', '週六班（北淡 MRI + 急 CT）', '', 'saturday');
  const list = document.createElement('div');
  list.className = 'sat-list';
  data.forEach((row, idx) => {
    const card = document.createElement('div');
    card.className = 'sat-card';
    if (editing) {
      card.innerHTML = `
        <div class="sat-date">${row.date}</div>
        <div style="margin-top:4px; width:100%;">${makeEditSelect(`ni-sat-${idx}-person`, row.person)}</div>
        <div style="margin-top:4px; width:100%;">${makeEditInput(`ni-sat-${idx}-note`, row.note)}</div>`;
    } else {
      card.innerHTML = `
        <div class="sat-date">${row.date}</div>
        <div class="sat-person">${renderPerson(row.person, true, row.date, 'saturday', 'all', '週六')}</div>
        ${row.note ? `<div class="sat-note">※ ${row.note}</div>` : ''}`;
    }
    list.appendChild(card);
  });
  sec.appendChild(list);
  return sec;
}

function renderSundayMri(data) {
  const editing = isSectionEditing('sunday');
  let activeData = data;
  if (!activeData || activeData.length === 0) {
    const key = MONTH_KEYS[currentIdx];
    if (key && /^\d{4}-\d{2}$/.test(key)) {
      const [yearStr, monthStr] = key.split('-');
      const year = parseInt(yearStr);
      const month = parseInt(monthStr);
      const sundays = [];
      const daysInMonth = new Date(year, month, 0).getDate();
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month - 1, day);
        if (date.getDay() === 0) {
          sundays.push(`${month}/${day}`);
        }
      }
      activeData = sundays.map(dateStr => ({ date: dateStr, person: '', note: '' }));
      if (NI_DATA[key] && !NI_DATA[key].mri_sunday) {
        NI_DATA[key].mri_sunday = activeData;
      }
    }
  }
  if (!activeData) activeData = [];

  const sec = makeSection('📅', '週日 MRI 加班', '', 'sunday');
  const list = document.createElement('div');
  list.className = 'sat-list';
  activeData.forEach((row, idx) => {
    const card = document.createElement('div');
    card.className = 'sat-card';
    if (editing) {
      card.innerHTML = `
        <div class="sat-date">${row.date}</div>
        <div style="margin-top:4px; width:100%;">${makeEditSelect(`ni-sun-${idx}-person`, row.person)}</div>
        <div style="margin-top:4px; width:100%;">${makeEditInput(`ni-sun-${idx}-note`, row.note)}</div>`;
    } else {
      card.innerHTML = `
        <div class="sat-date">${row.date}</div>
        <div class="sat-person">${renderPerson(row.person, true, row.date, 'sunday', 'all', '週日')}</div>
        ${row.note ? `<div class="sat-note">※ ${row.note}</div>` : ''}`;
    }
    list.appendChild(card);
  });
  sec.appendChild(list);
  return sec;
}

function renderPicc(data) {
  const editing = isSectionEditing('picc');
  const sec = makeSection('💉', 'PICC', '', 'picc');
  const t = document.createElement('table');
  t.className = 'ni-table';
  t.style.marginTop = '0';
  const noteColHeader = editing ? '<th style="width: 180px;">備注</th>' : '<th style="width: 55px;">💬</th>';
  t.innerHTML = `
    <thead><tr>
      <th style="width: 15%;">星期</th>
      <th style="width: 42.5%;"><span class="loc loc-tp">台北</span></th>
      <th style="width: 42.5%;"><span class="loc loc-ds">淡水</span></th>
      ${noteColHeader}
    </tr></thead><tbody></tbody>`;
  const tbody = t.querySelector('tbody');
  data.forEach((row, idx) => {
    const tr = document.createElement('tr');
    if (editing) {
      tr.innerHTML = `
        <td class="dow">${row.dow}</td>
        <td>${makeEditSelect(`ni-picc-${idx}-tp`, row.tp)}</td>
        <td>${makeEditSelect(`ni-picc-${idx}-ds`, row.ds)}</td>
        <td>${makeEditInput(`ni-picc-${idx}-note`, row.note)}</td>`;
    } else {
      tr.innerHTML = `
        <td class="dow">${row.dow}</td>
        <td>${renderPerson(row.tp, true, null, 'picc', 'tp', row.dow)}</td>
        <td>${renderPerson(row.ds, true, null, 'picc', 'ds', row.dow)}</td>
        <td style="text-align: center; vertical-align: middle;">${row.note ? `<div class="note-tooltip-trigger tooltip-right">💬<span class="note-tooltip-text">${row.note}</span></div>` : '—'}</td>`;
    }
    tbody.appendChild(tr);
  });

  const wrap = document.createElement('div');
  wrap.style.overflowX = 'auto';
  wrap.style.webkitOverflowScrolling = 'touch';
  wrap.style.marginTop = '12px';
  wrap.appendChild(t);
  sec.appendChild(wrap);
  return sec;
}

function renderNotes(notes) {
  const sec = makeSection('📝', '本月備註');
  sec.className = 'section-card full-width';
  
  const container = document.createElement('div');
  container.style.marginTop = '12px';
  container.style.padding = '16px';
  container.style.background = '#fff8e1';
  container.style.border = '1px solid #ffe082';
  container.style.borderRadius = '8px';
  container.style.fontSize = '0.88rem';
  
  const formattedNotes = notes ? notes.replace(/\n/g, '<br>') : '<span style="color:#94a3b8; font-style:italic;">本月無備註</span>';
  
  if (!currentUser) {
    container.innerHTML = `<div style="white-space:pre-line; line-height:1.6; color:#5d4037;">${formattedNotes}</div>`;
  } else {
    container.innerHTML = `
      <div id="notesDisplayMode">
        <div style="white-space:pre-line; line-height:1.6; color:#5d4037; margin-bottom:12px;">${formattedNotes}</div>
        <div style="display:flex; justify-content:flex-end;">
          <button onclick="showNotesEditMode()" style="padding:4px 12px; font-size:0.75rem; border-radius:4px; border:none; background:var(--primary-color); color:white; font-weight:600; cursor:pointer;">編輯備註</button>
        </div>
      </div>
      
      <div id="notesEditMode" style="display:none; flex-direction:column; gap:10px;">
        <div style="font-weight:700; color:#475569;">編輯本月備註：</div>
        <textarea id="notesInput" style="padding:8px 12px; border-radius:6px; border:1px solid #cbd5e1; width:100%; min-height:100px; font-size:0.88rem; box-sizing:border-box; font-family:inherit; resize:vertical;">${notes || ''}</textarea>
        <div style="display:flex; gap:8px; justify-content:flex-end; margin-top:4px;">
          <button onclick="hideNotesEditMode()" style="padding:4px 12px; font-size:0.75rem; border-radius:4px; border:1px solid #cbd5e1; background:white; color:#475569; font-weight:600; cursor:pointer;">取消</button>
          <button id="saveNotesBtn" onclick="saveNotes()" style="padding:4px 12px; font-size:0.75rem; border-radius:4px; border:none; background:var(--primary-color); color:white; font-weight:600; cursor:pointer;">儲存</button>
        </div>
      </div>
    `;
  }
  
  sec.appendChild(container);
  return sec;
}


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
      const dsEl = document.getElementById(`evt-ds-${day}`);
      if (tpEl && dsEl) {
        const tpVal = tpEl.value;
        const dsVal = dsEl.value;
        if (tpVal || dsVal) {
          evt[day] = {
            tp: tpVal || '',
            ds: dsVal || ''
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
    
    await db.collection("schedules").doc(key).set({
      ni,
      evt
    });
    
    // 4. 同步更新記憶體
    NI_DATA[key] = ni;
    ALL_SCHEDULES[key] = evt;
    
    // 退出編輯模式
    isEditMode = false;
    toggleEditUiState();
    render();
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
function toggleAllFilters(showAll) {
  const pills = legendEl.querySelectorAll('.legend-pill');
  PEOPLE.forEach((p, idx) => {
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
PEOPLE.forEach(p => {
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

function renderEvtCalendar() {
  const key = MONTH_KEYS[currentIdx];
  const [yearStr, monthStr] = key.split('-');
  const year  = parseInt(yearStr);
  const month = parseInt(monthStr);
  const schedule = ALL_SCHEDULES[key] || {};

  const daysInMonth = new Date(year, month, 0).getDate();
  const startOffset = ((new Date(year, month - 1, 1).getDay()) + 6) % 7; // Mon=0
  const todayDay = (now.getFullYear() === year && now.getMonth() + 1 === month) ? now.getDate() : -1;

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
      const currentDs = (typeof duty === 'object') ? (duty.ds || '') : '';
      
      // 台北選單
      const selectTp = document.createElement('select');
      selectTp.id = `evt-tp-${day}`;
      selectTp.style.fontSize = '0.72rem';
      selectTp.style.padding = '1px 2px';
      selectTp.style.width = '100%';
      selectTp.innerHTML = `<option value="">北: -</option>` + PEOPLE.map(p => `<option value="${p.name}" ${p.name === currentTp ? 'selected' : ''}>北: ${p.name}</option>`).join('');
      editDiv.appendChild(selectTp);
      
      // 淡水選單
      const selectDs = document.createElement('select');
      selectDs.id = `evt-ds-${day}`;
      selectDs.style.fontSize = '0.72rem';
      selectDs.style.padding = '1px 2px';
      selectDs.style.width = '100%';
      selectDs.innerHTML = `<option value="">淡: -</option>` + PEOPLE.map(p => `<option value="${p.name}" ${p.name === currentDs ? 'selected' : ''}>淡: ${p.name}</option>`).join('');
      editDiv.appendChild(selectDs);
      
      cell.appendChild(editDiv);
    } else {
      const duty = schedule[day];
      if (duty) {
        const list = document.createElement('div');
        list.className = 'oncall-list';
        list.style.display = 'flex';
        list.style.flexDirection = 'column';
        list.style.gap = '3px';
        
        const tpName = (typeof duty === 'string') ? duty : duty.tp;
        const dsName = (typeof duty === 'object') ? duty.ds : '';
        
        if (tpName) {
          const p = personByName[tpName];
          if (p) {
            const chip = document.createElement('div');
            chip.className = `oncall-chip ${p.cls}`;
            if (hiddenPeople.has(p.key)) chip.classList.add('dimmed');
            chip.textContent = `北: ${tpName}`;
            list.appendChild(chip);
          }
        }
        
        if (dsName) {
          const p = personByName[dsName];
          if (p) {
            const chip = document.createElement('div');
            chip.className = `oncall-chip ${p.cls}`;
            if (hiddenPeople.has(p.key)) chip.classList.add('dimmed');
            chip.textContent = `淡: ${dsName}`;
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

// ════════════════════════════════════════════════════
//  主渲染控制
// ════════════════════════════════════════════════════
function render() {
  const key = MONTH_KEYS[currentIdx];
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

const originalTaskNames = {
  'all': '全部工作',
  'mri': '🧲 門住急 MRI',
  'angio': '🏥 血管攝影',
  'erct': '🚨 急診 CT',
  'ds_mri': '🏥 淡水健檢 MRI',
  'picc': '💉 PICC',
  'saturday': '📅 週六班',
  'sunday': '📅 週日 MRI'
};

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
      const dates = (!dow)
        ? getAllDatesInMonth(monthKey)
        : getDatesForDayOfWeek(monthKey, dow);
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
  
  PEOPLE.forEach(p => {
    if (p.name !== name) {
      const opt = document.createElement('option');
      opt.value = p.name;
      opt.textContent = p.name;
      doctorSelect.appendChild(opt);
      
      if (doctorSelectTp && doctorSelectDs) {
        const opt1 = document.createElement('option');
        opt1.value = p.name;
        opt1.textContent = p.name;
        doctorSelectTp.appendChild(opt1);
        
        const opt2 = document.createElement('option');
        opt2.value = p.name;
        opt2.textContent = p.name;
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
          if (taskKey && cover[taskKey]) {
            const taskCover = cover[taskKey];
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
          
          // 同步加入 leaves
          if (!leaves[name]) leaves[name] = [];
          if (!leaves[name].includes(dateVal)) {
            leaves[name].push(dateVal);
          }
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
      
      // 同步從 leaves 中移除該日期，如果該日期沒有其他代班項目的話
      if (leaves[name] && leaves[name].includes(dateVal)) {
        let hasOtherCovers = false;
        if (covers[dateVal] && covers[dateVal][name]) {
          const item = covers[dateVal][name];
          if (typeof item === 'string') {
            hasOtherCovers = true;
          } else if (typeof item === 'object') {
            // 除了 routine_ct 之外還有其他代班
            const keys = Object.keys(item).filter(k => k !== taskKey);
            if (keys.length > 0) {
              hasOtherCovers = true;
            }
          }
        }
        if (!hasOtherCovers) {
          leaves[name] = leaves[name].filter(d => d !== dateVal);
          if (leaves[name].length === 0) {
            delete leaves[name];
          }
        }
      }
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
      
      // 同步自 leaves 中移除
      if (leaves[name] && leaves[name].includes(dateVal)) {
        let hasOtherCovers = false;
        if (covers[dateVal] && covers[dateVal][name]) {
          const item = covers[dateVal][name];
          if (typeof item === 'string') {
            hasOtherCovers = true;
          } else if (typeof item === 'object') {
            const keys = Object.keys(item).filter(k => k !== taskKey);
            if (keys.length > 0) {
              hasOtherCovers = true;
            }
          }
        }
        if (!hasOtherCovers) {
          leaves[name] = leaves[name].filter(d => d !== dateVal);
          if (leaves[name].length === 0) {
            delete leaves[name];
          }
        }
      }
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
      
      // 同步加入 Leaves
      if (!leaves[name]) leaves[name] = [];
      if (!leaves[name].includes(dateVal)) {
        leaves[name].push(dateVal);
      }
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
  render();
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

// Force rebuild trigger to clear deployment locks
