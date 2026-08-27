// Department history, extracted from the legacy history.html.
// Western years derived from the original era dates (和暦).

import type { Locale } from "@/i18n/routing";
import { type L, pick } from "./i18n";

export interface HistoryItem {
  /** western year for the timeline label */
  year: string;
  /** original era date, e.g. "昭和54年4月" — in English, the western month */
  era: string;
  text: string;
}

interface RawHistoryItem {
  year: string;
  era: L;
  text: L;
}

const ITEMS: RawHistoryItem[] = [
  {
    year: "1979",
    era: { ja: "昭和54年4月", en: "April 1979" },
    text: {
      ja: "歯科補綴学第二講座設置",
      en: "The Second Department of Prosthodontics is established",
    },
  },
  {
    year: "1979",
    era: { ja: "昭和54年5月", en: "May 1979" },
    text: {
      ja: "坂東 永一 教授就任",
      en: "Professor Eiichi Bando takes office",
    },
  },
  {
    year: "1980",
    era: { ja: "昭和55年4月", en: "April 1980" },
    text: {
      ja: "中野 雅徳 講師就任（昭和56年5月より助教授）",
      en: "Masanori Nakano is appointed lecturer (associate professor from May 1981)",
    },
  },
  {
    year: "2003",
    era: { ja: "平成15年10月", en: "October 2003" },
    text: {
      ja: "医学部・歯学部附属病院が統合",
      en: "The university hospitals of the schools of medicine and dentistry are merged",
    },
  },
  {
    year: "2004",
    era: { ja: "平成16年4月", en: "April 2004" },
    text: {
      ja: "部局化により歯科補綴学第二講座から咬合管理学分野へ改組",
      en: "On reorganisation into departments, the Second Department of Prosthodontics becomes the Department of Occlusion and Oral Management",
    },
  },
  {
    year: "2007",
    era: { ja: "平成19年4月", en: "April 2007" },
    text: {
      ja: "中野 雅徳 准教授が口腔保健学科教授へ異動",
      en: "Associate Professor Masanori Nakano transfers to a professorship in the Department of Oral Health Science",
    },
  },
  {
    year: "2007",
    era: { ja: "平成19年4月", en: "April 2007" },
    text: {
      ja: "久保 吉廣 准教授が高次歯科診療部より咬合管理学分野へ異動",
      en: "Associate Professor Yoshihiro Kubo transfers from the Division of Advanced Dentistry to the Department of Occlusion and Oral Management",
    },
  },
  {
    year: "2008",
    era: { ja: "平成20年3月", en: "March 2008" },
    text: {
      ja: "坂東 永一 教授定年により退職",
      en: "Professor Eiichi Bando retires on reaching the mandatory retirement age",
    },
  },
  {
    year: "2012",
    era: { ja: "平成24年7月", en: "July 2012" },
    text: {
      ja: "松香 芳三 教授就任",
      en: "Professor Yoshizo Matsuka takes office",
    },
  },
  {
    year: "2014",
    era: { ja: "平成26年4月", en: "April 2014" },
    text: {
      ja: "顎機能咬合再建学分野に名称変更",
      en: "Renamed the Department of Stomatognathic Function and Occlusal Reconstruction",
    },
  },
  {
    year: "2017",
    era: { ja: "平成29年4月", en: "April 2017" },
    text: {
      ja: "西川 啓介 講師が徳島文理大学教授へ異動",
      en: "Lecturer Keisuke Nishikawa transfers to a professorship at Tokushima Bunri University",
    },
  },
  {
    year: "2025",
    era: { ja: "令和7年3月", en: "March 2025" },
    text: {
      ja: "細木 真紀 教授就任",
      en: "Professor Maki Hosoki takes office",
    },
  },
];

export const getHistoryItems = (locale: Locale): HistoryItem[] =>
  ITEMS.map(({ year, era, text }) => ({
    year,
    era: pick(era, locale),
    text: pick(text, locale),
  }));
