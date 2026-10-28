// One-off import of the staff roster into Sanity.
//
// The roster used to live in src/data/dept/staff.ts (extracted from the legacy
// staff.html) and the staff page read it from there. The page now reads the
// Studio's スタッフページ instead; this script copies the roster across once so
// the Studio starts with everyone in it rather than empty.
//
//   npx sanity login                                         (once)
//   npx sanity exec scripts/seed-staff.ts --with-user-token -- --dry-run
//   npx sanity exec scripts/seed-staff.ts --with-user-token
//
// Every write is createIfNotExists under a fixed id, so running it again never
// overwrites what was edited in the Studio — it only fills in what is missing.
// Photos dedupe by content on Sanity's side, so re-uploading costs nothing.
//
// Romanised names follow the department's own bilingual news posts
// (data/dept/topics-archive.json) wherever those name the person in English.
// Emails are written with the full-width ＠ below because that is how the old
// page displayed them; they are stored with a normal @ and the page converts.

import { createReadStream } from "node:fs";
import { basename, join } from "node:path";
import { getCliClient } from "sanity/cli";

type L = { ja: string; en: string };

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

// ── import ────────────────────────────────────────────────────────────────

const DRY_RUN = process.argv.includes("--dry-run");
const client = getCliClient({ apiVersion: "2024-03-18" });

/** "Yoshizo Matsuka" → "yoshizo-matsuka" */
const slug = (s: string) =>
  s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Ids use "-" and never "." — an id containing a dot is private in Sanity and
// would be invisible to the site, which reads the dataset without a token.
const qualificationId = (key: string) => `staffQualification-${key}`;
const memberId = (m: RawStaffMember) => `staffMember-${slug(m.name.en)}`;

const ref = (id: string) => ({ _type: "reference", _ref: id, _key: id });

async function main() {
  const qualificationKey = new Map<L, string>(
    Object.entries(Q).map(([key, q]) => [q, key])
  );
  const keyOf = (q: L) => {
    const key = qualificationKey.get(q);
    if (!key) throw new Error(`qualification not declared in Q: ${q.ja}`);
    return key;
  };

  const members = SECTIONS.flatMap((s) => s.members);
  const ids = members.map(memberId);
  const dup = ids.find((id, i) => ids.indexOf(id) !== i);
  if (dup) throw new Error(`two members map to the same id: ${dup}`);

  // photos first: each member document embeds its asset reference
  const photoAsset = new Map<string, string>();
  for (const m of members) {
    if (m.img === NO_IMAGE || photoAsset.has(m.img)) continue;
    if (DRY_RUN) {
      photoAsset.set(m.img, "(dry run)");
      continue;
    }
    const path = join(process.cwd(), "public", m.img);
    const asset = await client.assets.upload("image", createReadStream(path), {
      filename: basename(path),
    });
    photoAsset.set(m.img, asset._id);
    console.log(`photo  ${m.img}`);
  }

  const tx = client.transaction();

  for (const [key, q] of Object.entries(Q)) {
    tx.createIfNotExists({ _id: qualificationId(key), _type: "staffQualification", ...q });
  }

  for (const m of members) {
    const asset = photoAsset.get(m.img);
    tx.createIfNotExists({
      _id: memberId(m),
      _type: "staffMember",
      name_ja: m.name.ja,
      name_en: m.name.en,
      ...(asset &&
        !DRY_RUN && { photo: { _type: "image", asset: { _type: "reference", _ref: asset } } }),
      ...(m.note && { note_ja: m.note.ja, note_en: m.note.en }),
      qualifications: m.specialties.map((q) => ref(qualificationId(keyOf(q)))),
      ...(m.email && { email: m.email.replace(/＠/g, "@") }),
    });
  }

  tx.createIfNotExists({
    _id: "staffPage",
    _type: "staffPage",
    sections: SECTIONS.map(({ id, title, en, members }) => ({
      _type: "staffSection",
      _key: id,
      title_ja: title,
      title_en: en,
      anchor: id,
      members: members.map((m) => ref(memberId(m))),
    })),
  });

  console.log(
    `${Object.keys(Q).length} qualifications, ${members.length} members, ` +
      `${SECTIONS.length} sections, ${photoAsset.size} photos`
  );

  if (DRY_RUN) {
    console.log("dry run — nothing written");
    return;
  }
  await tx.commit();
  console.log("done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
