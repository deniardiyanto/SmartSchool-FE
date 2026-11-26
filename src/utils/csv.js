// CSV untuk Excel (locale Indonesia memakai pemisah ";" dan perlu BOM UTF-8).
const SEP = ';';

function cell(value) {
  const text = value == null ? '' : String(value);
  // Cegah formula injection saat dibuka di Excel.
  const safe = /^[=+\-@]/.test(text) && Number.isNaN(Number(text)) ? `'${text}` : text;
  return /[";\n\r]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
}

export function toCsv(headers, rows) {
  const lines = [headers, ...rows].map((r) => r.map(cell).join(SEP));
  return `﻿${lines.join('\r\n')}`;
}

export function downloadCsv(filename, headers, rows) {
  const blob = new Blob([toCsv(headers, rows)], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/** Angka desimal dengan koma, mis. 96.4 -> "96,4". */
export const decimalId = (n) => String(n ?? 0).replace('.', ',');
