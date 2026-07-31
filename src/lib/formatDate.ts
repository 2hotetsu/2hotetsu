// Datas de publicação são `datetime` no Sanity (ISO com fuso).
// Formatar sem fixar locale e fuso faz o resultado depender de onde o código roda:
// no servidor sai en-US (MM/DD/YYYY) e no navegador sai o locale do visitante,
// o que além de inconsistente causa hydration mismatch em componentes client.
// Aqui o padrão é sempre japonês: YYYY/MM/DD no fuso de Tóquio.

const TIME_ZONE = 'Asia/Tokyo';

// en-CA com 2-digit devolve as partes já zero-padded; montamos a string à mão
// para o resultado não depender da versão do ICU.
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

/** "2026-07-31T09:00:00Z" -> "07/31" (listas já agrupadas por ano) */
export function formatMonthDay(value?: string | null, fallback = ''): string {
  const date = toDate(value);
  if (!date) return fallback;
  const { month, day } = parts(date);
  return `${month}/${day}`;
}

/** "2026-07-31T09:00:00Z" -> "2026" (agrupamento por ano, mesmo fuso do resto) */
export function formatYear(value?: string | null, fallback = ''): string {
  const date = toDate(value);
  if (!date) return fallback;
  return parts(date).year;
}
