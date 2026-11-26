import { useState } from 'react';
import { Download } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Pagination from '../components/common/Pagination';
import ErrorState from '../components/common/ErrorState';
import useApi from '../hooks/useApi';
import { getAttendanceReport, getViolationReport, getKaihReport } from '../services/reportService';
import { getClassRooms } from '../services/classRoomService';
import { downloadCsv, decimalId } from '../utils/csv';
import { buildXlsx, downloadBlob } from '../utils/xlsx';
import { formatPercent } from '../utils/format';

const PAGE_SIZE = 20;

// BE memakai tanggal UTC untuk presensi, jadi default periode juga berbasis UTC.
const todayUtc = () => new Date().toISOString().slice(0, 10);
const monthStartUtc = () => `${todayUtc().slice(0, 8)}01`;

const TABS = {
  attendance: {
    label: 'Presensi',
    fetch: getAttendanceReport,
    columns: [
      { header: 'Kelas', get: (r) => r.classRoomName, width: 14 },
      { header: 'NIS', get: (r) => r.nis, width: 14 },
      { header: 'Nama', get: (r) => r.fullName, strong: true, width: 32 },
      { header: 'Hadir', get: (r) => r.present, kind: 'int', width: 10 },
      { header: 'Terlambat', get: (r) => r.late, kind: 'int', width: 12 },
      { header: 'Sakit', get: (r) => r.sick, kind: 'int', width: 10 },
      { header: 'Izin', get: (r) => r.permission, kind: 'int', width: 10 },
      { header: 'Alpa', get: (r) => r.absent, kind: 'int', width: 10 },
      { header: 'Kehadiran', get: (r) => formatPercent(r.attendanceRate), csv: (r) => decimalId(r.attendanceRate), raw: (r) => r.attendanceRate, kind: 'percent', width: 12 },
    ],
    summary: (d) => `Hari efektif pada periode: ${d.effectiveDays} hari`,
  },
  violations: {
    label: 'Poin Pelanggaran',
    fetch: getViolationReport,
    columns: [
      { header: 'Kelas', get: (r) => r.classRoomName, width: 14 },
      { header: 'NIS', get: (r) => r.nis, width: 14 },
      { header: 'Nama', get: (r) => r.fullName, strong: true, width: 32 },
      { header: 'Jumlah Catatan', get: (r) => r.incidents, kind: 'int', width: 16 },
      { header: 'Total Poin', get: (r) => r.totalPoint, kind: 'int', width: 12 },
    ],
    summary: () => 'Hanya siswa dengan poin pelanggaran pada periode ini.',
  },
  kaih: {
    label: 'KAIH',
    fetch: getKaihReport,
    columns: [
      { header: 'Kelas', get: (r) => r.classRoomName, width: 14 },
      { header: 'NIS', get: (r) => r.nis, width: 14 },
      { header: 'Nama', get: (r) => r.fullName, strong: true, width: 32 },
      { header: 'Hari Terisi', get: (r) => r.submittedDays, kind: 'int', width: 13 },
      { header: 'Capaian', get: (r) => formatPercent(r.completionRate), csv: (r) => decimalId(r.completionRate), raw: (r) => r.completionRate, kind: 'percent', width: 12 },
    ],
    summary: () => 'Capaian = kebiasaan tercapai dari 7 kebiasaan pada hari yang diisi.',
  },
};

export default function Reports() {
  const [tab, setTab] = useState('attendance');
  const [from, setFrom] = useState(monthStartUtc());
  const [to, setTo] = useState(todayUtc());
  const [classRoomId, setClassRoomId] = useState('');
  const [page, setPage] = useState(1);

  const cfg = TABS[tab];

  const report = useApi(
    (signal) => cfg.fetch({ from, to, classRoomId }, signal),
    [tab, from, to, classRoomId]
  );
  const classRooms = useApi((signal) => getClassRooms(undefined, signal), []);

  const rows = report.data?.items ?? [];
  const pageRows = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const classLabel = classRoomId
    ? (classRooms.data?.items ?? []).find((c) => c.id === classRoomId)?.name ?? 'Kelas terpilih'
    : 'Semua kelas';

  function exportXlsx() {
    const blob = buildXlsx({
      sheetName: `Laporan ${cfg.label}`,
      title: `Laporan ${cfg.label}`,
      info: [`Periode: ${from} s/d ${to}`, `Kelas: ${classLabel}`],
      columns: cfg.columns.map((c) => ({ header: c.header, kind: c.kind, width: c.width })),
      rows: rows.map((r) => cfg.columns.map((c) => (c.raw ? c.raw(r) : c.get(r)))),
    });
    downloadBlob(`laporan-${tab}-${from}_${to}.xlsx`, blob);
  }

  function exportCsv() {
    downloadCsv(
      `laporan-${tab}-${from}_${to}.csv`,
      cfg.columns.map((c) => c.header),
      rows.map((r) => cfg.columns.map((c) => (c.csv ? c.csv(r) : c.get(r))))
    );
  }

  const filterReset = (setter) => (e) => {
    setter(e.target.value);
    setPage(1);
  };

  return (
    <div>
      <PageHeader title="Laporan" subtitle="Rekap per siswa pada periode tertentu">
        <button
          onClick={exportXlsx}
          disabled={rows.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <Download size={16} /> Ekspor Excel
        </button>
        <button
          onClick={exportCsv}
          disabled={rows.length === 0}
          className="px-4 py-2 text-sm border border-gray-200 bg-white text-gray-600 rounded-lg hover:bg-gray-50 disabled:opacity-50"
        >
          CSV
        </button>
      </PageHeader>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {Object.entries(TABS).map(([key, t]) => (
          <button
            key={key}
            onClick={() => { setTab(key); setPage(1); }}
            className={`px-4 py-2 text-sm rounded-lg border ${
              tab === key ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <label className="text-sm text-gray-500">
          Dari{' '}
          <input type="date" value={from} max={to} onChange={filterReset(setFrom)} className="ml-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm" />
        </label>
        <label className="text-sm text-gray-500">
          Sampai{' '}
          <input type="date" value={to} min={from} onChange={filterReset(setTo)} className="ml-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm" />
        </label>
        <select value={classRoomId} onChange={filterReset(setClassRoomId)} className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm">
          <option value="">Semua kelas</option>
          {(classRooms.data?.items ?? []).map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        {report.error && <div className="mb-4"><ErrorState message={report.error} onRetry={report.reload} /></div>}
        {report.data && <p className="text-sm text-gray-500 mb-4">{cfg.summary(report.data)}</p>}

        <div className={`overflow-x-auto ${report.loading ? 'opacity-60' : ''}`}>
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200">
                {cfg.columns.map((c) => (
                  <th key={c.header} className="pb-3 font-semibold">{c.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 && !report.loading && (
                <tr><td colSpan={cfg.columns.length} className="py-8 text-center text-sm text-gray-400">Tidak ada data pada periode ini.</td></tr>
              )}
              {pageRows.map((r) => (
                <tr key={r.studentId} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  {cfg.columns.map((c) => (
                    <td key={c.header} className={`py-3 text-sm ${c.strong ? 'font-medium text-gray-800' : 'text-gray-600'}`}>
                      {c.get(r)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination page={page} pageSize={PAGE_SIZE} total={rows.length} onChange={setPage} unit="siswa" />
      </div>
    </div>
  );
}
