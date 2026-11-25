import { ChevronLeft, ChevronRight } from 'lucide-react';

function buildPages(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, current, current - 1, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push('gap-' + p);
    out.push(p);
  });
  return out;
}

const btn = 'px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-40 disabled:hover:bg-transparent';

export default function Pagination({ page, pageSize, total, onChange, unit = 'data' }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-gray-200">
      <p className="text-sm text-gray-500">
        Menampilkan {from.toLocaleString('id-ID')}-{to.toLocaleString('id-ID')} dari{' '}
        {total.toLocaleString('id-ID')} {unit}
      </p>
      <div className="flex items-center gap-1">
        <button className={btn} disabled={page <= 1} onClick={() => onChange(page - 1)} aria-label="Sebelumnya">
          <ChevronLeft size={16} />
        </button>
        {buildPages(page, totalPages).map((p) =>
          typeof p === 'string' ? (
            <span key={p} className="px-2 text-gray-400">…</span>
          ) : (
            <button
              key={p}
              onClick={() => onChange(p)}
              className={p === page ? 'px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg' : btn}
            >
              {p}
            </button>
          )
        )}
        <button className={btn} disabled={page >= totalPages} onClick={() => onChange(page + 1)} aria-label="Berikutnya">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
