import { useState } from 'react';
import { Users, UserCheck, AlertTriangle, ClipboardCheck, Search, Bell } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorState from '../components/common/ErrorState';
import Pagination from '../components/common/Pagination';
import useApi from '../hooks/useApi';
import useDebounce from '../hooks/useDebounce';
import { getOverview, getBestClasses, getStudentMonitoring } from '../services/dashboardService';
import { formatNumber, formatPercent, formatSigned, timeAgo } from '../utils/format';
import studentPhoto from '../assets/student.png';

const PAGE_SIZE = 5;

const RECAP_COLORS = {
  present: 'bg-green-500',
  sick: 'bg-blue-400',
  permission: 'bg-yellow-400',
  absent: 'bg-red-400',
  late: 'bg-orange-400',
};

const STATUS_STYLES = {
  active: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  coaching: 'bg-red-100 text-red-700',
};

const RANK_COLORS = ['bg-yellow-400', 'bg-gray-400', 'bg-orange-400'];

function buildStats(o) {
  const att = o.attendanceToday;
  const vio = o.violations;
  const kaih = o.kaih;

  return [
    {
      title: 'TOTAL SISWA',
      value: formatNumber(o.students.total),
      subtitle: 'Total Peserta Didik',
      change: o.students.newThisMonth > 0 ? `+${formatNumber(o.students.newThisMonth)} siswa baru bulan ini` : null,
      trend: 'good',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'KEHADIRAN HARI INI',
      value: formatPercent(att.rate),
      subtitle: 'Tingkat Kehadiran',
      change: att.changeFromYesterday == null ? null : `${formatSigned(att.changeFromYesterday, '%')} dari kemarin`,
      trend: att.changeFromYesterday == null ? 'neutral' : att.changeFromYesterday >= 0 ? 'good' : 'bad',
      icon: UserCheck,
      color: 'bg-green-500',
    },
    {
      title: 'TOTAL PELANGGARAN',
      value: formatNumber(vio.thisMonth),
      subtitle: 'Pelanggaran Bulan Ini',
      change: vio.changeFromLastMonth === 0
        ? 'Sama dengan bulan lalu'
        : `${formatSigned(vio.changeFromLastMonth)} dari bulan lalu`,
      // pelanggaran naik = buruk
      trend: vio.changeFromLastMonth === 0 ? 'neutral' : vio.changeFromLastMonth > 0 ? 'bad' : 'good',
      icon: AlertTriangle,
      color: 'bg-red-500',
    },
    {
      title: 'KAIH TERKUMPUL',
      value: formatPercent(kaih.rate),
      subtitle: '7 Kebiasaan Anak Indonesia Hebat',
      change: kaih.changeFromLastWeek == null ? null : `${formatSigned(kaih.changeFromLastWeek, '%')} dari minggu lalu`,
      trend: kaih.changeFromLastWeek == null ? 'neutral' : kaih.changeFromLastWeek >= 0 ? 'good' : 'bad',
      icon: ClipboardCheck,
      color: 'bg-purple-500',
    },
  ];
}

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const keyword = useDebounce(searchTerm.trim());

  const overview = useApi((signal) => getOverview(5, signal), []);
  const bestClasses = useApi((signal) => getBestClasses(3, signal), []);
  const monitoring = useApi(
    (signal) => getStudentMonitoring({ keyword: keyword || undefined, pageNumber: page, pageSize: PAGE_SIZE }, signal),
    [keyword, page]
  );

  if (overview.loading && !overview.data) return <LoadingSpinner />;

  const o = overview.data;
  const stats = o ? buildStats(o) : [];
  const recap = o?.presenceRecap;
  const students = monitoring.data?.items ?? [];

  return (
    <div>
      {/* ============ HEADER SESUAI FIGMA ============ */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        {/* Kiri: Judul */}
        <h1 className="text-2xl font-bold text-gray-800">CMS Sekolah</h1>
        
        {/* Tengah: Search Bar */}
        <div className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Cari nama atau NIS siswa..."
              className="w-full px-4 py-2.5 pl-10 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
            />
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Kanan: Notification & Profile */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <button className="relative p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition">
            <Bell size={20} className="text-gray-600" />
          </button>

          {/* Profile dengan Avatar Inisial */}
          <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-lg border border-gray-200">
            <img 
                src={studentPhoto} 
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-gray-800">Administrator</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          </div>
        </div>
      </div>
      {/* ============================================ */}

      {overview.error && (
        <div className="mb-6">
          <ErrorState message={overview.error} onRetry={overview.reload} />
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Rekap Presensi & Aktivitas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-2">Rekap Presensi Hari Ini</h3>
          <p className="text-sm text-gray-500 mb-4">
            Total siswa: {formatNumber(recap?.total)}
            {recap?.notRecorded > 0 && ` · Belum tercatat: ${formatNumber(recap.notRecorded)}`}
          </p>

          <div className="space-y-3">
            {(recap?.items ?? []).map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div className="flex items-center gap-3 w-28">
                  <div className={`w-3 h-3 rounded-full ${RECAP_COLORS[item.key] ?? 'bg-gray-400'}`}></div>
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                </div>
                <div className="flex-1 mx-4">
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${RECAP_COLORS[item.key] ?? 'bg-gray-400'} rounded-full transition-all`}
                      style={{ width: `${Math.min(item.percentage, 100)}%` }}
                    />
                  </div>
                </div>
                <div className="text-right min-w-[90px]">
                  <span className="text-sm font-medium text-gray-700">{formatNumber(item.count)}</span>
                  <span className="text-xs text-gray-400 ml-1">({formatPercent(item.percentage)})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">Aktivitas Terbaru</h3>
          <div className="space-y-4">
            {(o?.recentActivities ?? []).length === 0 && (
              <p className="text-sm text-gray-400">Belum ada aktivitas.</p>
            )}
            {(o?.recentActivities ?? []).map((act, idx) => (
              <div key={`${act.occurredAt}-${idx}`} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                <p className="text-sm text-gray-700">{act.title}</p>
                {act.description && <p className="text-xs text-gray-500 mt-0.5">{act.description}</p>}
                <p className="text-xs text-gray-400 mt-1">
                  {timeAgo(act.occurredAt)}
                  {act.actorName && ` · ${act.actorName}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Kelas Terbaik */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">🏆 Kelas Terbaik Hari Ini</h3>
        {bestClasses.error ? (
          <ErrorState message={bestClasses.error} onRetry={bestClasses.reload} />
        ) : (bestClasses.data ?? []).length === 0 ? (
          <p className="text-sm text-gray-400">
            {bestClasses.loading ? 'Memuat...' : 'Belum ada data kehadiran hari ini.'}
          </p>
        ) : (
          <div className="flex flex-wrap gap-8">
            {bestClasses.data.map((cls, idx) => (
              <div key={cls.classRoomId} className="flex items-center gap-3">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-base ${RANK_COLORS[idx] ?? 'bg-gray-400'}`}>
                  {formatPercent(cls.attendanceRate)}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{cls.classRoomName}</p>
                  <p className="text-xs text-gray-400">
                    {cls.attendedCount}/{cls.totalStudents} siswa hadir
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tabel Monitoring */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4">Monitoring Peserta Didik</h3>

        {monitoring.error && <ErrorState message={monitoring.error} onRetry={monitoring.reload} />}

        <div className={`overflow-x-auto transition-opacity ${monitoring.loading ? 'opacity-60' : ''}`}>
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200">
                <th className="pb-3 font-semibold">NAMA</th>
                <th className="pb-3 font-semibold">KELAS</th>
                <th className="pb-3 font-semibold">PRESENSI</th>
                <th className="pb-3 font-semibold">POIN</th>
                <th className="pb-3 font-semibold">KAIH</th>
                <th className="pb-3 font-semibold">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 && !monitoring.loading && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-sm text-gray-400">
                    Tidak ada siswa ditemukan.
                  </td>
                </tr>
              )}
              {students.map((student) => (
                <tr key={student.studentId} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
                  <td className="py-3 text-sm font-medium text-gray-800">
                    {student.fullName}
                    <span className="block text-xs font-normal text-gray-400">{student.nis}</span>
                  </td>
                  <td className="py-3 text-sm text-gray-600">{student.classRoomName}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all"
                          style={{ width: `${Math.min(student.attendanceRate, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{formatPercent(student.attendanceRate)}</span>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-gray-600">{student.violationPoints}</td>
                  <td className="py-3 text-sm text-gray-600">{formatPercent(student.kaihRate)}</td>
                  <td className="py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[student.status] ?? STATUS_STYLES.active}`}>
                      {student.statusLabel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          page={page}
          pageSize={PAGE_SIZE}
          total={monitoring.data?.totalRecords ?? 0}
          onChange={setPage}
          unit="siswa"
        />
      </div>
    </div>
  );
}
