// Department history, extracted from the legacy history.html.
// Western years derived from the original era dates (和暦).

export interface HistoryItem {
  /** western year for the timeline label */
  year: string;
  /** original era date, e.g. "昭和54年4月" */
  era: string;
  text: string;
}

export const HISTORY_ITEMS: HistoryItem[] = [
  { year: "1979", era: "昭和54年4月", text: "歯科補綴学第二講座設置" },
  { year: "1979", era: "昭和54年5月", text: "坂東 永一 教授就任" },
  { year: "1980", era: "昭和55年4月", text: "中野 雅徳 講師就任（昭和56年5月より助教授）" },
  { year: "2003", era: "平成15年10月", text: "医学部・歯学部附属病院が統合" },
  { year: "2004", era: "平成16年4月", text: "部局化により歯科補綴学第二講座から咬合管理学分野へ改組" },
  { year: "2007", era: "平成19年4月", text: "中野 雅徳 准教授が口腔保健学科教授へ異動" },
  { year: "2007", era: "平成19年4月", text: "久保 吉廣 准教授が高次歯科診療部より咬合管理学分野へ異動" },
  { year: "2008", era: "平成20年3月", text: "坂東 永一 教授定年により退職" },
  { year: "2012", era: "平成24年7月", text: "松香 芳三 教授就任" },
  { year: "2014", era: "平成26年4月", text: "顎機能咬合再建学分野に名称変更" },
  { year: "2017", era: "平成29年4月", text: "西川 啓介 講師が徳島文理大学教授へ異動" },
  { year: "2025", era: "令和7年3月", text: "細木 真紀 教授就任" },
];
