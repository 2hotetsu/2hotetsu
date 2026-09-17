// Publication dates are `datetime` in Sanity (ISO with an offset).
// Formatting without pinning locale and time zone makes the result depend on
// where the code runs: en-US (MM/DD/YYYY) on the server, the visitor's locale in
// the browser — inconsistent, and a hydration mismatch in client components.
// The format here is always Japanese: YYYY/MM/DD in the Tokyo time zone.

const TIME_ZONE = 'Asia/Tokyo';

// en-CA with 2-digit returns the parts already zero-padded; the string is
// assembled by hand so the result does not depend on the ICU version.
const parts = (date: Date) =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone: TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .formatToParts(date)
    .reduce<Record<string, string>>((acc, p) => {
      acc[p.type] = p.value;
      return acc;
    }, {});

function toDate(value?: string | null): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** "2026-07-31T09:00:00Z" -> "2026/07/31" */
export function formatDate(value?: string | null, fallback = ''): string {
  const date = toDate(value);
  if (!date) return fallback;
  const { year, month, day } = parts(date);
  return `${year}/${month}/${day}`;
}

/** "2026-07-31T09:00:00Z" -> "07/31" (lists already grouped by year) */
export function formatMonthDay(value?: string | null, fallback = ''): string {
  const date = toDate(value);
  if (!date) return fallback;
  const { month, day } = parts(date);
  return `${month}/${day}`;
}

/** "2026-07-31T09:00:00Z" -> "2026" (year grouping, same zone as the rest) */
export function formatYear(value?: string | null, fallback = ''): string {
  const date = toDate(value);
  if (!date) return fallback;
  return parts(date).year;
}
