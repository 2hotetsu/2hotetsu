// Staff roster, extracted from the legacy staff.html.
// Emails keep the full-width ＠ for display (anti-scraping); the mailto
// href is derived by normalising it back to @.
//
// Romanised names follow the department's own bilingual news posts
// (data/dept/topics-archive.json) wherever those name the person in English.

import type { Locale } from "@/i18n/routing";
import { type L, pick } from "./i18n";

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

interface RawStaffMember {
  name: L;
  img: string;
  note?: L;
  specialties: L[];
  email?: string;
}

interface RawStaffSection {
  id: string;
  title: string;
  en: string;
  members: RawStaffMember[];
}

const NO_IMAGE = "/images/staff/noimage.jpg";

/** Qualifications shared across members — declared once so the English
 *  wording of a society's certification stays identical everywhere. */
const Q = {
  prostho: {
    ja: "補綴歯科専門医",
    en: "Board-Certified Prosthodontist",
  },
  prosthoSpecialist: {
    ja: "日本補綴歯科学会専門医",
    en: "Board-Certified Specialist, Japan Prosthodontic Society",
  },
  prosthoCertified: {
    ja: "日本補綴歯科学会認定医",
    en: "Certified Member, Japan Prosthodontic Society",
  },
  prosthodontics: {
    ja: "歯科補綴学",
    en: "Prosthodontics",
  },
  generalDentistry: {
    ja: "一般歯科",
    en: "General Dentistry",
  },
  tmjInstructor: {
    ja: "日本顎関節学会指導医",
    en: "Certified Instructor, Japanese Society for the Temporomandibular Joint",
  },
  tmjCertified: {
    ja: "日本顎関節学会認定医",
    en: "Certified Member, Japanese Society for the Temporomandibular Joint",
  },
  orofacialPainInstructor: {
    ja: "日本口腔顔面痛学会指導医",
    en: "Certified Instructor, Japanese Society of Orofacial Pain",
  },
  oralRehabInstructor: {
    ja: "日本口腔リハビリテーション学会指導医",
    en: "Certified Instructor, Japanese Society of Oral Rehabilitation",
  },
  oralRehabCertified: {
    ja: "日本口腔リハビリテーション学会認定医",
    en: "Certified Member, Japanese Society of Oral Rehabilitation",
  },
  sportsDentist: {
    ja: "日本スポーツ協会公認スポーツデンティスト",
    en: "Sports Dentist certified by the Japan Sport Association",
  },
  painFoundation: {
    ja: "日本痛み財団マネージャー",
    en: "Manager, Japan Pain Foundation",
  },
  oralSurgery: {
    ja: "日本口腔外科学会専門医",
    en: "Board-Certified Specialist, Japanese Society of Oral and Maxillofacial Surgeons",
  },
  stomatological: {
    ja: "日本口腔科学会認定医・指導医",
    en: "Certified Member and Instructor, Japanese Stomatological Society",
  },
  chemotherapy: {
    ja: "日本化学療法学会抗菌化学療法認定歯科医師",
    en: "Certified Dentist in Antimicrobial Chemotherapy, Japanese Society of Chemotherapy",
  },
  infectionControl: {
    ja: "ICD制度協議会インフェクションコントロールドクター",
    en: "Infection Control Doctor, ICD Board",
  },
  acls: {
    ja: "日本ACLS協会ACLSプロバイダー",
    en: "ACLS Provider, Japan ACLS Association",
  },
  dysphagia: {
    ja: "日本摂食嚥下リハビリテーション学会認定士",
    en: "Certified Specialist, Japanese Society of Dysphagia Rehabilitation",
  },
  parkinson: {
    ja: "日本パーキンソン病・運動障害疾患学会パーキンソン病療養指導士",
    en: "Certified Parkinson's Disease Care Educator, Japanese Society of Parkinson's Disease and Movement Disorders",
  },
  mechatronics: {
    ja: "メカトロニクス",
    en: "Mechatronics",
  },
  biomedicalEngineering: {
    ja: "生体医工学（顎口腔系機能）",
    en: "Biomedical Engineering (Stomatognathic Function)",
  },
} satisfies Record<string, L>;

const SECTIONS: RawStaffSection[] = [
  {
    id: "staff01",
    title: "教授",
    en: "Professor",
    members: [
      {
        name: { ja: "松香 芳三", en: "Yoshizo Matsuka" },
        img: "/images/staff/matuka.jpg",
        specialties: [
          Q.prostho,
          Q.tmjInstructor,
          Q.orofacialPainInstructor,
          Q.oralRehabInstructor,
        ],
        email: "matsuka＠tokushima-u.ac.jp",
      },
      {
        name: { ja: "細木 真紀", en: "Maki Hosoki" },
        img: "/images/staff/Hosoki 1.jpg",
        specialties: [Q.prostho, Q.tmjCertified],
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
        name: { ja: "大島 正充", en: "Masamitsu Oshima" },
        img: "/images/staff/o_shima.jpg",
        specialties: [Q.prostho],
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
        name: { ja: "鈴木 善貴", en: "Yoshitaka Suzuki" },
        img: "/images/staff/suzuki.jpg",
        specialties: [Q.prostho, Q.oralRehabCertified, Q.sportsDentist],
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
        name: { ja: "井上 美穂", en: "Miho Inoue" },
        img: "/images/staff/inoue.jpg",
        specialties: [Q.prosthodontics, Q.painFoundation],
        email: "inoue.miho＠tokushima-u.ac.jp",
      },
      {
        name: { ja: "生田目 大介", en: "Daisuke Ikutame" },
        img: "/images/staff/ikutame 1.jpg",
        specialties: [Q.prosthodontics, Q.painFoundation],
        email: "c000030613＠tokushima-u.ac.jp",
      },
      {
        name: { ja: "小池 一幸", en: "Kazuyuki Koike" },
        img: "/images/staff/koike.jpg",
        specialties: [
          Q.prosthodontics,
          Q.oralSurgery,
          Q.stomatological,
          Q.chemotherapy,
          Q.infectionControl,
          Q.acls,
        ],
        email: "koike.kazuyuki＠tokushima-u.ac.jp",
      },
      {
        name: { ja: "新開 瑞希", en: "Mizuki Shinkai" },
        img: "/images/staff/shinkai.jpg",
        specialties: [Q.prosthodontics, Q.dysphagia, Q.parkinson],
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
        name: { ja: "藤村 哲也", en: "Tetsuya Fujimura" },
        img: "/images/staff/fujimura.jpg",
        note: {
          ja: "徳島文理大学 理工学部 電子情報工学科 前教授",
          en: "Former Professor, Department of Electronic and Information Engineering, Faculty of Science and Engineering, Tokushima Bunri University",
        },
        specialties: [Q.mechatronics, Q.biomedicalEngineering],
        email: "fujimura.tetsuya＠tokushima-u.ac.jp",
      },
      {
        name: { ja: "田島 登誉子", en: "Toyoko Tajima" },
        img: "/images/staff/tajima.jpg",
        specialties: [Q.prosthoSpecialist],
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
        name: { ja: "宮城 麻友", en: "Mayu Miyagi" },
        img: "/images/staff/ueda.jpg",
        specialties: [Q.prosthodontics],
        email: "ueda.mayu＠tokushima-u.ac.jp",
      },
      {
        name: { ja: "吉原 靖智", en: "Yasutomo Yoshihara" },
        img: "/images/staff/yoshihara.jpg",
        specialties: [Q.prosthodontics],
        email: "c301751014＠tokushima-u.ac.jp",
      },
      {
        name: { ja: "谷脇 竜弥", en: "Tatsuya Taniwaki" },
        img: "/images/staff/taniwaki.jpg",
        specialties: [Q.prosthodontics],
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
        name: { ja: "後藤田 茉子", en: "Mako Gotoda" },
        img: "/images/staff/gotouda.jpg",
        specialties: [Q.prosthodontics],
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
        name: { ja: "岩浅 匠真", en: "Takuma Iwasa" },
        img: "/images/staff/iwasa.jpg",
        specialties: [Q.prosthodontics],
        email: "c000025985＠tokushima-u.ac.jp",
      },
      {
        name: { ja: "清水 朱里", en: "Akari Shimizu" },
        img: "/images/staff/shimizu.jpg",
        specialties: [Q.prosthodontics],
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
        name: { ja: "Fangyuan Zhang", en: "Fangyuan Zhang" },
        img: "/images/staff/fangyuan.jpg",
        specialties: [Q.prosthodontics],
        email: "dentist_zhang1999＠163.com",
      },
      {
        name: { ja: "渡邊 亮友", en: "Akitomo Watanabe" },
        img: "/images/staff/watanabe.jpg",
        specialties: [Q.prosthoCertified],
        email: "watanabe.akitomo＠tokushima-u.ac.jp",
      },
      {
        name: {
          ja: "Fannisa Afrilyana Ulzanah",
          en: "Fannisa Afrilyana Ulzanah",
        },
        img: "/images/staff/fannisa.jpg",
        specialties: [Q.prosthodontics],
        email: "ulzanahafril＠gmail.com",
      },
      {
        name: { ja: "Yaozheng Wang", en: "Yaozheng Wang" },
        img: "/images/staff/yaozheng.jpg",
        specialties: [Q.prosthodontics],
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
        name: { ja: "Vaishnavi Vijay Fulari", en: "Vaishnavi Vijay Fulari" },
        img: "/images/staff/vaishnavi.jpg",
        specialties: [Q.prosthodontics],
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
        name: { ja: "佐々木 英子", en: "Eiko Sasaki" },
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
      {
        name: { ja: "小川 匠", en: "Takumi Ogawa" },
        img: NO_IMAGE,
        specialties: [Q.prosthodontics],
      },
      {
        name: { ja: "窪木 拓男", en: "Takuo Kuboki" },
        img: NO_IMAGE,
        specialties: [Q.prosthodontics],
      },
      {
        name: { ja: "西川 啓介", en: "Keisuke Nishikawa" },
        img: NO_IMAGE,
        specialties: [Q.prosthodontics],
      },
      {
        name: { ja: "坂東 永一", en: "Eiichi Bando" },
        img: NO_IMAGE,
        specialties: [Q.prosthodontics],
      },
      {
        name: { ja: "板東 伸幸", en: "Nobuyuki Bando" },
        img: "/images/staff/bando.jpg",
        specialties: [Q.prosthodontics],
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
        name: { ja: "中川 敬史", en: "Takashi Nakagawa" },
        img: NO_IMAGE,
        specialties: [Q.prosthodontics],
        email: "nkc0811＠icloud.com",
      },
      {
        name: { ja: "鈴木 規之", en: "Noriyuki Suzuki" },
        img: "/images/staff/suzuki02.jpg",
        specialties: [Q.generalDentistry],
        email: "ufo1980shadou＠gmail.com",
      },
      {
        name: { ja: "木下 直人", en: "Naoto Kinoshita" },
        img: "/images/staff/kinoshita.jpg",
        specialties: [Q.prosthodontics],
        email: "showtime100803＠msn.com",
      },
      {
        name: { ja: "山内 英嗣", en: "Eiji Yamauchi" },
        img: NO_IMAGE,
        specialties: [Q.prosthodontics],
      },
    ],
  },
];

export const getStaffSections = (locale: Locale): StaffSection[] =>
  SECTIONS.map(({ id, title, en, members }) => ({
    id,
    // the position label already existed in both languages on the old page
    title: locale === "en" ? en : title,
    en,
    members: members.map(({ name, img, note, specialties, email }) => ({
      name: pick(name, locale),
      img,
      ...(note && { note: pick(note, locale) }),
      specialties: specialties.map((s) => pick(s, locale)),
      ...(email && { email }),
    })),
  }));

/** "name＠domain" (display form) → "mailto:name@domain" */
export function mailtoHref(email: string): string {
  return `mailto:${email.replace(/＠/g, "@").replace(/\s+/g, "")}`;
}
