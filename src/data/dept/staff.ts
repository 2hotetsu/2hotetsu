// Staff roster, extracted from the legacy staff.html.
// Emails keep the full-width ＠ for display (anti-scraping); the mailto
// href is derived by normalising it back to @.

export interface StaffMember {
  name: string;
  img: string;
  /** extra line shown above the specialties (e.g. previous affiliation) */
  note?: string;
  specialties: string[];
  email?: string;
}

export interface StaffSection {
  /** anchor id — kept from the old page (staff01…staff13) for link compat */
  id: string;
  title: string;
  en: string;
  members: StaffMember[];
}

const NO_IMAGE = "/images/staff/noimage.jpg";

export const STAFF_SECTIONS: StaffSection[] = [
  {
    id: "staff01",
    title: "教授",
    en: "Professor",
    members: [
      {
        name: "松香 芳三",
        img: "/images/staff/matuka.jpg",
        specialties: [
          "補綴歯科専門医",
          "日本顎関節学会指導医",
          "日本口腔顔面痛学会指導医",
          "日本口腔リハビリテーション学会指導医",
        ],
        email: "matsuka＠tokushima-u.ac.jp",
      },
      {
        name: "細木 真紀",
        img: "/images/staff/Hosoki 1.jpg",
        specialties: ["補綴歯科専門医", "日本顎関節学会認定医"],
        email: "hosoki＠tokushima-u.ac.jp",
      },
    ],
  },
  {
    id: "staff02",
    title: "准教授",
    en: "Associate Professor",
    members: [
      {
        name: "大島 正充",
        img: "/images/staff/o_shima.jpg",
        specialties: ["補綴歯科専門医"],
        email: "m-oshima＠tokushima-u.ac.jp",
      },
    ],
  },
  {
    id: "staff03",
    title: "講師",
    en: "Lecturer",
    members: [
      {
        name: "鈴木 善貴",
        img: "/images/staff/suzuki.jpg",
        specialties: [
          "補綴歯科専門医",
          "日本口腔リハビリテーション学会認定医",
          "日本スポーツ協会公認スポーツデンティスト",
        ],
        email: "yosuzuki＠tokushima-u.ac.jp",
      },
    ],
  },
  {
    id: "staff04",
    title: "助教",
    en: "Assistant Professor",
    members: [
      {
        name: "井上 美穂",
        img: "/images/staff/inoue.jpg",
        specialties: ["歯科補綴学", "日本痛み財団マネージャー"],
        email: "inoue.miho＠tokushima-u.ac.jp",
      },
      {
        name: "生田目 大介",
        img: "/images/staff/ikutame 1.jpg",
        specialties: ["歯科補綴学", "日本痛み財団マネージャー"],
        email: "c000030613＠tokushima-u.ac.jp",
      },
      {
        name: "小池 一幸",
        img: "/images/staff/koike.jpg",
        specialties: [
          "歯科補綴学",
          "日本口腔外科学会専門医",
          "日本口腔科学会認定医・指導医",
          "日本化学療法学会抗菌化学療法認定歯科医師",
          "ICD制度協議会インフェクションコントロールドクター",
          "日本ACLS協会ACLSプロバイダー",
        ],
        email: "koike.kazuyuki＠tokushima-u.ac.jp",
      },
      {
        name: "新開 瑞希",
        img: "/images/staff/shinkai.jpg",
        specialties: [
          "歯科補綴学",
          "日本摂食嚥下リハビリテーション学会認定士",
          "日本パーキンソン病・運動障害疾患学会パーキンソン病療養指導士",
        ],
        email: "c000033797＠tokushima-u.ac.jp",
      },
    ],
  },
  {
    id: "staff05",
    title: "専門研究員",
    en: "Research Fellow",
    members: [
      {
        name: "藤村 哲也",
        img: "/images/staff/fujimura.jpg",
        note: "徳島文理大学 理工学部 電子情報工学科 前教授",
        specialties: ["メカトロニクス", "生体医工学（顎口腔系機能）"],
        email: "fujimura.tetsuya＠tokushima-u.ac.jp",
      },
      {
        name: "田島 登誉子",
        img: "/images/staff/tajima.jpg",
        specialties: ["日本補綴歯科学会専門医"],
        email: "toyokosatsuma＠gmail.com",
      },
    ],
  },
  {
    id: "staff06",
    title: "医員",
    en: "Clinical Staff",
    members: [
      {
        name: "宮城 麻友",
        img: "/images/staff/ueda.jpg",
        specialties: ["歯科補綴学"],
        email: "ueda.mayu＠tokushima-u.ac.jp",
      },
      {
        name: "吉原 靖智",
        img: "/images/staff/yoshihara.jpg",
        specialties: ["歯科補綴学"],
        email: "c301751014＠tokushima-u.ac.jp",
      },
      {
        name: "谷脇 竜弥",
        img: "/images/staff/taniwaki.jpg",
        specialties: ["歯科補綴学"],
        email: "taniwaki.tatsuya＠tokushima-u.ac.jp",
      },
    ],
  },
  {
    id: "staff07",
    title: "医員（修練歯科医）",
    en: "Clinical Trainee",
    members: [
      {
        name: "後藤田 茉子",
        img: "/images/staff/gotouda.jpg",
        specialties: ["歯科補綴学"],
        email: "m.gotoda＠tokushima-u.ac.jp",
      },
    ],
  },
  {
    id: "staff08",
    title: "診療支援歯科医師",
    en: "Clinical Support Dentist",
    members: [
      {
        name: "岩浅 匠真",
        img: "/images/staff/iwasa.jpg",
        specialties: ["歯科補綴学"],
        email: "c000025985＠tokushima-u.ac.jp",
      },
      {
        name: "清水 朱里",
        img: "/images/staff/shimizu.jpg",
        specialties: ["歯科補綴学"],
        email: "c000031794＠tokushima-u.ac.jp",
      },
    ],
  },
  {
    id: "staff09",
    title: "大学院生",
    en: "Graduate Student",
    members: [
      {
        name: "Fangyuan Zhang",
        img: "/images/staff/fangyuan.jpg",
        specialties: ["歯科補綴学"],
        email: "dentist_zhang1999＠163.com",
      },
      {
        name: "渡邊 亮友",
        img: "/images/staff/watanabe.jpg",
        specialties: ["日本補綴歯科学会認定医"],
        email: "watanabe.akitomo＠tokushima-u.ac.jp",
      },
      {
        name: "Fannisa Afrilyana Ulzanah",
        img: "/images/staff/fannisa.jpg",
        specialties: ["歯科補綴学"],
        email: "ulzanahafril＠gmail.com",
      },
      {
        name: "Yaozheng Wang",
        img: "/images/staff/yaozheng.jpg",
        specialties: ["歯科補綴学"],
        email: "wang.yz-0712＠outlook.com",
      },
    ],
  },
  // 診療許可医 / 外国人受託研修員 — currently no members; sections with an
  // empty members array are not rendered, add people here to bring them back
  {
    id: "staff10",
    title: "研究生",
    en: "Research Student",
    members: [
      {
        name: "Vaishnavi Vijay Fulari",
        img: "/images/staff/vaishnavi.jpg",
        specialties: ["歯科補綴学"],
        email: "vaishnavifulari＠gmail.com",
      },
    ],
  },
  {
    id: "staff11",
    title: "技術員",
    en: "Technical Staff",
    members: [
      {
        name: "佐々木 英子",
        img: "/images/staff/sasaki.jpg",
        specialties: [],
        email: "sasaki.eiko＠tokushima-u.ac.jp",
      },
    ],
  },
  {
    id: "staff12",
    title: "非常勤講師",
    en: "Part-time Lecturer",
    members: [
      { name: "小川 匠", img: NO_IMAGE, specialties: ["歯科補綴学"] },
      { name: "窪木 拓男", img: NO_IMAGE, specialties: ["歯科補綴学"] },
      { name: "西川 啓介", img: NO_IMAGE, specialties: ["歯科補綴学"] },
      { name: "坂東 永一", img: NO_IMAGE, specialties: ["歯科補綴学"] },
      {
        name: "板東 伸幸",
        img: "/images/staff/bando.jpg",
        specialties: ["歯科補綴学"],
        email: "info＠bandodental.jp",
      },
    ],
  },
  {
    id: "staff13",
    title: "研修登録医",
    en: "Registered Trainee",
    members: [
      {
        name: "中川 敬史",
        img: NO_IMAGE,
        specialties: ["歯科補綴学"],
        email: "nkc0811＠icloud.com",
      },
      {
        name: "鈴木 規之",
        img: "/images/staff/suzuki02.jpg",
        specialties: ["一般歯科"],
        email: "ufo1980shadou＠gmail.com",
      },
      {
        name: "木下 直人",
        img: "/images/staff/kinoshita.jpg",
        specialties: ["歯科補綴学"],
        email: "showtime100803＠msn.com",
      },
      { name: "山内 英嗣", img: NO_IMAGE, specialties: ["歯科補綴学"] },
    ],
  },
];

/** "name＠domain" (display form) → "mailto:name@domain" */
export function mailtoHref(email: string): string {
  return `mailto:${email.replace(/＠/g, "@").replace(/\s+/g, "")}`;
}
