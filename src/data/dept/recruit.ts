// Recruit Q&A, extracted from the legacy recruit.html.

import type { Locale } from "@/i18n/routing";
import { type L, pick } from "./i18n";

export interface QaItem {
  q: string;
  a: string;
}

const INTRO: L = {
  ja: "顎機能咬合再建学分野（歯科補綴学第二講座）への入局についてのQ&Aです。",
  en: "Questions and answers about joining the Department of Stomatognathic Function and Occlusal Reconstruction (formerly the Second Department of Prosthodontics).",
};

const QA: { q: L; a: L }[] = [
  {
    q: {
      ja: "顎機能咬合再建学分野の大学院に興味があるのですが、どのような研究を行っているのでしょうか？",
      en: "I am interested in the graduate programme. What kind of research does the department carry out?",
    },
    a: {
      ja: "顎機能咬合再建学分野では下顎運動測定器の開発、下顎運動と咬合に関する研究、咬合接触感覚の伝達に関する研究、睡眠時ブラキシズムに関する研究、金属アレルギーに関する研究、顎関節症ならびに口腔顔面痛の診断と治療に関する研究、組織再生に関する研究、補綴臨床に関する臨床疫学研究などを行っています。",
      en: "Our work includes the development of instruments for measuring mandibular movement; research into mandibular movement and occlusion; how the sensation of occlusal contact is transmitted; sleep bruxism; metal allergy; the diagnosis and treatment of temporomandibular disorders and orofacial pain; tissue regeneration; and clinical epidemiological studies in prosthodontic practice.",
    },
  },
  {
    q: {
      ja: "第２補綴科ではクラウンブリッジ以外の診療も行っているのですか？",
      en: "Does the Occlusion and Prosthodontics Clinic treat anything other than crowns and bridges?",
    },
    a: {
      ja: "教育上の分担から第２補綴科はクラウンブリッジの診療科と思われがちですが、実際には補綴全般についての診療を行っています。その内容は歯冠補綴、架工義歯、有床義歯、インプラント義歯、顎顔面補綴、顎関節症・口腔顔面痛患者の保存治療などです。また補綴治療以外にも歯科外来一般で行う診療行為も行っています。",
      en: "Because of how teaching duties are divided, the Occlusion and Prosthodontics Clinic is often assumed to deal only with crowns and bridges, but in practice it covers prosthodontics as a whole: crown restorations, bridges, removable dentures, implant dentures, maxillofacial prostheses, and conservative treatment for patients with temporomandibular disorders and orofacial pain. Beyond prosthodontic treatment, we also carry out the general dental procedures of an outpatient clinic.",
    },
  },
  {
    q: {
      ja: "第２補綴科の医員（修練歯科医）は、どういった仕事をするのでしょうか？",
      en: "What does a clinical fellow (trainee dentist) at the Occlusion and Prosthodontics Clinic actually do?",
    },
    a: {
      ja: "各臨床講座における研修項目以外に、第２補綴科の医員は次のような業務に従事することになります。予診（担当医未決患者の外来診療）、基礎実習（４年次の模型実習）の補佐、担当指導医の診療介助、担当患者の診療などです。",
      en: "In addition to the training required of every clinical department, fellows here take on the following duties: preliminary examinations (seeing outpatients not yet assigned to a dentist), assisting with the basic practical course (the fourth-year model work), assisting their supervising dentist in clinic, and treating their own patients.",
    },
  },
  {
    q: {
      ja: "顎機能咬合再建学分野に入局すると帰宅するのが夜遅くなると聞きますが本当でしょうか？",
      en: "I have heard that people who join the department end up going home late at night. Is that true?",
    },
    a: {
      ja: "原則として補綴科の医員は担当患者の技工物の製作を自分で行います。そのため帰宅が遅くなることもあります。自分の患者の技工物を自分で製作することは補綴診療を習熟する上での、最良のトレーニングとなります。補綴科医は患者の口腔全体をコントロールする技術を身につける必要があるため（治療の失敗のほとんどは自分自身の身に降りかかってくることになるためです）、第２補綴科では医員の指導に当たり、歯科診療一般に対する包括的な技能の習得を目指しています。よってそれだけ仕事量も多いものと考えて下さい。",
      en: "As a rule, fellows in prosthodontics make the laboratory work for their own patients themselves, and this can mean going home late. Making your own patients' appliances is the best training there is for mastering prosthodontic practice. A prosthodontist needs the skill to manage the patient's mouth as a whole — because most failures in treatment come back to you personally — so in supervising our fellows we aim at a comprehensive command of general dental practice. Please expect the workload to match that ambition.",
    },
  },
  {
    q: {
      ja: "顎機能咬合再建学分野の教室行事にはどのようなものがあるのでしょう？",
      en: "What kind of departmental events are there?",
    },
    a: {
      ja: "毎週行われる行事としては木曜日５時からの抄読会（論文を読んでその内容を発表する会）、臨床報告会、進行報告会などがあります。年間を通じての行事としては医局旅行、補綴杯（ボーリング大会）、バーベキュー大会、補綴科合同忘年会、学会出席のための出張などがあり、その他にも新歓、新年会などがあります。",
      en: "Weekly events include the journal club from five o'clock on Thursdays (where members read a paper and present it), clinical case meetings and progress reports. Over the course of the year there are the department trip, the Prosthodontics Cup (a bowling tournament), a barbecue, the joint year-end party of the prosthodontics clinics, and trips to attend academic conferences, as well as the welcome party for new members and the new year gathering.",
    },
  },
  {
    q: {
      ja: "顎機能咬合再建学分野に入局したいのですが、どうすればよいのでしょう？",
      en: "I would like to join the department. What should I do?",
    },
    a: {
      ja: "教室員に入局の意志を伝えて下さい。",
      en: "Simply let any member of the department know that you would like to join.",
    },
  },
];

export const getRecruitIntro = (locale: Locale) => pick(INTRO, locale);

export const getRecruitQa = (locale: Locale): QaItem[] =>
  QA.map(({ q, a }) => ({ q: pick(q, locale), a: pick(a, locale) }));
