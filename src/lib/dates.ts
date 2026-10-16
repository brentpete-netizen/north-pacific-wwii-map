const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface DateParts {
  year: number;
  month: number;
  day: number;
}

function parseIso(iso: string): DateParts {
  const [year, month, day] = iso.split("-").map(Number);
  return { year, month: month - 1, day };
}

export function formatRange(start: string, end: string): string {
  const from = parseIso(start);
  const to = parseIso(end);
  const fromMonth = MONTHS[from.month];
  const toMonth = MONTHS[to.month];

  if (start === end) {
    return `${from.day} ${fromMonth} ${from.year}`;
  }
  if (from.year === to.year && from.month === to.month) {
    return `${from.day}–${to.day} ${fromMonth} ${from.year}`;
  }
  if (from.year === to.year) {
    return `${from.day} ${fromMonth}–${to.day} ${toMonth} ${from.year}`;
  }
  return `${from.day} ${fromMonth} ${from.year}–${to.day} ${toMonth} ${to.year}`;
}
