import type { Locale } from "@/i18n/routing";

/**
 * A piece of department copy in both languages.
 *
 * The content stays bilingual in here and each file exposes a `getX(locale)`
 * returning already-resolved strings, so the presentation components keep
 * taking plain `string` and never need to know i18n exists.
 */
export type L = Record<Locale, string>;

export const pick = (value: L, locale: Locale): string => value[locale];

export const pickAll = (values: L[], locale: Locale): string[] =>
  values.map((v) => v[locale]);
