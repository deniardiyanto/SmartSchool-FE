import { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import Pagination from '../components/common/Pagination';
import ErrorState from '../components/common/ErrorState';
import useApi from '../hooks/useApi';
import { getPoints, getLeaderboard } from '../services/pointService';
import { formatDate } from '../utils/format';

const PAGE_SIZE = 10;

export default function Violations() {
  const [page, setPage] = useState(1);

  const leaderboard = useApi((signal) => getLeaderboard({ top: 10 }, signal), []);
  const points = useApi((signal) => getPoints({ pageNumber: page, pageSize: PAGE_SIZE }, signal), [page]);

  const board = leaderboard.data?.items ?? [];
  const items = points.data?.items ?? [];

  return (
    <div>
      <PageHeader title="Poin Pelanggaran" subtitle="Semakin tinggi poin, semakin banyak pelanggaran (terlambat, dll.)" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:col-span-1 self-start">
          <h3 className="font-semibold text-gray-800 mb-4">Peringkat Poin Tertinggi</h3>
          {leaderboard.error && <ErrorState message={leaderboard.error} onRetry={leaderboard.reload} />}
          {!leaderboard.error && board.length === 0 && !leaderboard.loading && (
            <p className="text-sm text-gray-400">Belum ada data.</p>
          )}
          <ol className="space-y-3">
            {board.map((b) => (
              <li key={b.studentId} className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-gray-100 text-xs font-semibold text-gray-600 flex items-center justify-center">{b.rank}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{b.studentName}</p>
                  <p className="text-xs text-gray-400">{b.classRoomName} · {b.nis}</p>
                </div>
                <span className="text-sm font-semibold text-red-600">{b.totalPoint}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="font-semibold text-gray-800 mb-4">Riwayat Poin</h3>
          {points.error && <div className="mb-4"><ErrorState message={points.error} onRetry={points.reload} /></div>}

          <div className={`overflow-x-auto ${points.loading ? 'opacity-60' : ''}`}>
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  <th className="pb-3 font-semibold">TANGGAL</th>
                  <th className="pb-3 font-semibold">NAMA</th>
                  <th className="pb-3 font-semibold">POIN</th>
                  <th className="pb-3 font-semibold">KETERANGAN</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 && !points.loading && (
                  <tr><td colSpan={4} className="py-8 text-center text-sm text-gray-400">Belum ada riwayat poin.</td></tr>
                )}
                {items.map((p) => (
                  <tr key={p.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                    <td className="py-3 text-sm text-gray-600">{formatDate(p.createdAt)}</td>
                    <td className="py-3 text-sm font-medium text-gray-800">{p.studentName}</td>
                    <td className={`py-3 text-sm font-semibold ${p.point > 0 ? 'text-red-600' : p.point < 0 ? 'text-green-600' : 'text-gray-500'}`}>
                      {p.point > 0 ? `+${p.point}` : p.point}
                    </td>
                    <td className="py-3 text-sm text-gray-500">{p.description || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination page={page} pageSize={PAGE_SIZE} total={points.data?.totalRecords ?? 0} onChange={setPage} unit="data" />
        </div>
      </div>
    </div>
  );
}
