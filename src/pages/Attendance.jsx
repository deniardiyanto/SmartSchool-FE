import { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import Pagination from '../components/common/Pagination';
import ErrorState from '../components/common/ErrorState';
import useApi from '../hooks/useApi';
import { getAttendances } from '../services/attendanceService';
import { formatTime } from '../utils/format';

const PAGE_SIZE = 10;

// Nilai enum AttendanceStatus di BE (angka)
const STATUS = {
  1: { label: 'Hadir', cls: 'bg-green-100 text-green-700' },
  2: { label: 'Terlambat', cls: 'bg-orange-100 text-orange-700' },
  3: { label: 'Sakit', cls: 'bg-blue-100 text-blue-700' },
  4: { label: 'Izin', cls: 'bg-yellow-100 text-yellow-700' },
  5: { label: 'Alpa', cls: 'bg-red-100 text-red-700' },
};

// BE menyimpan tanggal presensi sebagai tanggal UTC, jadi default memakai tanggal UTC juga.
const todayUtc = () => new Date().toISOString().slice(0, 10);

export default function Attendance() {
  const [date, setDate] = useState(todayUtc());
  const [page, setPage] = useState(1);

  const attendances = useApi(
    (signal) => getAttendances({ date: date || undefined, pageNumber: page, pageSize: PAGE_SIZE }, signal),
    [date, page]
  );
  const items = attendances.data?.items ?? [];

  return (
    <div>
      <PageHeader title="Presensi" subtitle="Riwayat kehadiran siswa per tanggal">
        <input
          type="date"
          value={date}
          onChange={(e) => { setDate(e.target.value); setPage(1); }}
          className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"
        />
        {date && (
          <button onClick={() => { setDate(''); setPage(1); }} className="text-sm text-blue-600 hover:underline">
            Semua tanggal
          </button>
        )}
      </PageHeader>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        {attendances.error && <div className="mb-4"><ErrorState message={attendances.error} onRetry={attendances.reload} /></div>}

        <div className={`overflow-x-auto ${attendances.loading ? 'opacity-60' : ''}`}>
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200">
                <th className="pb-3 font-semibold">TANGGAL</th>
                <th className="pb-3 font-semibold">NAMA</th>
                <th className="pb-3 font-semibold">MASUK</th>
                <th className="pb-3 font-semibold">PULANG</th>
                <th className="pb-3 font-semibold">STATUS</th>
                <th className="pb-3 font-semibold">CATATAN</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && !attendances.loading && (
                <tr><td colSpan={6} className="py-8 text-center text-sm text-gray-400">Belum ada data presensi.</td></tr>
              )}
              {items.map((a) => {
                const st = STATUS[a.status] ?? { label: '-', cls: 'bg-gray-100 text-gray-600' };
                return (
                  <tr key={a.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                    <td className="py-3 text-sm text-gray-600">{a.attendanceDate}</td>
                    <td className="py-3 text-sm font-medium text-gray-800">{a.studentName}</td>
                    <td className="py-3 text-sm text-gray-600">{formatTime(a.checkInTime)}</td>
                    <td className="py-3 text-sm text-gray-600">{formatTime(a.checkOutTime)}</td>
                    <td className="py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${st.cls}`}>{st.label}</span>
                    </td>
                    <td className="py-3 text-sm text-gray-500">{a.notes || '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <Pagination page={page} pageSize={PAGE_SIZE} total={attendances.data?.totalRecords ?? 0} onChange={setPage} unit="data" />
      </div>
    </div>
  );
}
