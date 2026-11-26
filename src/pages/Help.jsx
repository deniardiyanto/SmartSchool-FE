import { useMemo, useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import { ROLE_GUIDES, FAQ_GROUPS, CONTACT } from '../data/helpContent';
import pkg from '../../package.json';

export default function Help() {
  const [query, setQuery] = useState('');

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQ_GROUPS;
    return FAQ_GROUPS.map((g) => ({
      ...g,
      items: g.items.filter((i) => `${i.q} ${i.a}`.toLowerCase().includes(q)),
    })).filter((g) => g.items.length > 0);
  }, [query]);

  return (
    <div>
      <PageHeader title="Bantuan" subtitle="Panduan singkat dan pertanyaan yang sering diajukan">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari pertanyaan..."
            className="w-64 px-4 py-2 pl-10 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </PageHeader>

      {!query.trim() && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          {ROLE_GUIDES.map((role) => (
            <div key={role.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-3">
                <span className="mr-2" aria-hidden="true">{role.icon}</span>
                {role.title}
              </h3>
              <ol className="list-decimal list-outside pl-5 space-y-2 text-sm text-gray-600">
                {role.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              {role.note && (
                <p className="mt-4 text-xs text-yellow-700 bg-yellow-50 border border-yellow-100 rounded-lg px-3 py-2">
                  {role.note}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {groups.length === 0 && (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center text-sm text-gray-400">
          Tidak ada pertanyaan yang cocok dengan &quot;{query}&quot;.
        </div>
      )}

      {groups.map((g) => (
        <section key={g.title} className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{g.title}</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            {g.items.map((item) => (
              <details key={item.q} className="group px-6 py-4" open={Boolean(query.trim())}>
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-sm font-medium text-gray-800">
                  {item.q}
                  <ChevronDown size={16} className="flex-shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      ))}

      <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-gray-800">Masih butuh bantuan?</p>
          <p className="text-sm text-gray-500 mt-1">
            Hubungi {CONTACT.name} ({CONTACT.handle})
          </p>
        </div>
        <p className="text-xs text-gray-400">Versi aplikasi {pkg.version}</p>
      </div>
    </div>
  );
}
