const nf = new Intl.NumberFormat('id-ID');
const pf = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 1 });

export const formatNumber = (n) => nf.format(n ?? 0);

export const formatPercent = (n) => `${pf.format(n ?? 0)}%`;

/** Selisih bertanda, mis. "+1,2%" / "-5" / "0". */
export function formatSigned(n, suffix = '') {
  if (n === null || n === undefined) return null;
  const sign = n > 0 ? '+' : n < 0 ? '-' : '';
  return `${sign}${pf.format(Math.abs(n))}${suffix}`;
}

export function timeAgo(isoUtc) {
  if (!isoUtc) return '';
  // Server mengirim UTC; tambahkan "Z" bila tidak ada penanda zona.
  const value = /Z|[+-]\d{2}:?\d{2}$/.test(isoUtc) ? isoUtc : `${isoUtc}Z`;
  const diff = Math.floor((Date.now() - new Date(value).getTime()) / 1000);

  if (Number.isNaN(diff)) return '';
  if (diff < 60) return 'Baru saja';
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
  if (diff < 86400 * 7) return `${Math.floor(diff / 86400)} hari lalu`;
  return new Date(value).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDate(value) {
  if (!value) return '-';
  return new Date(value).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

/** Jam lokal (WIB mengikuti zona browser) dari timestamp UTC. */
export function formatTime(isoUtc) {
  if (!isoUtc) return '-';
  const value = /Z|[+-]\d{2}:?\d{2}$/.test(isoUtc) ? isoUtc : `${isoUtc}Z`;
  return new Date(value).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
