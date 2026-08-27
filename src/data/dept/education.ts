// Education page content, extracted from the legacy education.html.

import type { Locale } from "@/i18n/routing";
import { type L, pick } from "./i18n";

const INTRO: L = {
  ja: "顎機能咬合再建学分野（歯科補綴学第二講座）では主に固定性義歯を用いた補綴治療についての教育を行っています。",
  en: "The Department of Stomatognathic Function and Occlusal Reconstruction (formerly the Second Department of Prosthodontics) teaches prosthodontic treatment based mainly on fixed prostheses.",
};

const MATERIALS_NOTE: L = {
  ja: "閲覧にはIDとパスワードが必要です",
  en: "An ID and password are required to view these materials",
};

export const getEducationIntro = (locale: Locale) => pick(INTRO, locale);

export const getEducationMaterials = (locale: Locale) => ({
  href: "http://d49.dent.tokushima-u.ac.jp/groups/crbr/",
  jp: "講義資料",
  en: "Lecture Materials",
  note: pick(MATERIALS_NOTE, locale),
});
