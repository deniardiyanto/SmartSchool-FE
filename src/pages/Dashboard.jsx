import { useState, useEffect } from 'react';
import { 
  Users, UserCheck, AlertTriangle, CreditCard,
  Search, Plus, ChevronLeft, ChevronRight,
  Eye, Edit, Clock, Bell
} from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import studentPhoto from '../assets/student.png';

// Data dummy
const dummyStudents = [
  { name: 'Akalili', class: 'XI-1', attendance: 96, points: 5, kaih: 85, status: 'Aktif' },
  { name: 'Budi Santoso', class: 'XII-2', attendance: 92, points: 12, kaih: 78, status: 'Aktif' },
  { name: 'Citra Dewi', class: 'X-1', attendance: 100, points: 0, kaih: 95, status: 'Aktif' },
  { name: 'Dimas Pratama', class: 'XI-3', attendance: 88, points: 18, kaih: 72, status: 'Peringatan' },
  { name: 'Eka Putri', class: 'XII-1', attendance: 78, points: 25, kaih: 65, status: 'Pembinaan' },
];

const activities = [
  { text: 'Data presensi kelas XII-1 diperbarui', time: '10 menit lalu', by: 'Guru BK' },
  { text: 'Poin pelanggaran ditambahkan untuk Ahmad R.', time: '25 menit lalu', by: 'Wali Kelas' },
  { text: 'KAIH 15 siswa kelas XI-2 diverifikasi', time: '1 jam lalu', by: 'Admin' },
  { text: 'Pengumuman UTS diterbitkan', time: '2 jam lalu', by: 'Kepala Sekolah' },
  { text: 'Data siswa baru ditambahkan', time: '3 jam lalu', by: 'Tata Usaha' },
];

const bestClasses = [
  { name: 'XII-1', percentage: 98 },
  { name: 'XI-3', percentage: 97 },
  { name: 'X-2', percentage: 96 },
];

const attendanceDetails = [
  { status: 'Hadir', count: 876, percentage: 85.5, color: 'bg-green-500' },
  { status: 'Sakit', count: 42, percentage: 4.1, color: 'bg-blue-400' },
  { status: 'Izin', count: 31, percentage: 3.0, color: 'bg-yellow-400' },
  { status: 'Alpa', count: 18, percentage: 1.8, color: 'bg-red-400' },
  { status: 'Terlambat', count: 57, percentage: 5.6, color: 'bg-orange-400' },
];

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState(dummyStudents);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingSpinner />;

  const stats = [
    { 
      title: 'TOTAL SISWA', 
      value: '1.024', 
      subtitle: 'Total Peserta Didik',
      change: '+12 siswa baru', 
      icon: Users, 
      color: 'bg-blue-500' 
    },
    { 
      title: 'KEHADIRAN HARI INI', 
      value: '96,4%', 
      subtitle: 'Tingkat Kehadiran',
      change: '+1,2% kemarin', 
      icon: UserCheck, 
      color: 'bg-green-500' 
    },
    { 
      title: 'TOTAL PELANGGARAN', 
      value: '28', 
      subtitle: 'Pelanggaran Bulan Ini',
      change: '-5 dari bulan lalu', 
      icon: AlertTriangle, 
      color: 'bg-red-500' 
    },
    { 
      title: 'KAIH TERKUMPUL', 
      value: '91%', 
      subtitle: 'Kartu Indonesia Pintar',
      change: '+3% minggu lalu', 
      icon: CreditCard, 
      color: 'bg-purple-500' 
    },
  ];

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
              placeholder="Cari siswa, kelas, atau data..."
              className="w-full px-4 py-2.5 pl-10 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Kanan: Notification & Profile */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <button className="relative p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              3
            </span>
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

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Rekap Presensi & Aktivitas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-2">Rekap Presensi Hari Ini</h3>
          <p className="text-sm text-gray-500 mb-4">Total kekurtasian: 1.024 siswa</p>
          
          <div className="space-y-3">
            {attendanceDetails.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3 w-24">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className="text-sm font-medium text-gray-700">{item.status}</span>
                </div>
                <div className="flex-1 mx-4">
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color} rounded-full transition-all`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
                <div className="text-right min-w-[90px]">
                  <span className="text-sm font-medium text-gray-700">{item.count}</span>
                  <span className="text-xs text-gray-400 ml-1">({item.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">Aktivitas Terbaru</h3>
          <div className="space-y-4">
            {activities.map((act, idx) => (
              <div key={idx} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                <p className="text-sm text-gray-700">{act.text}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {act.time} · {act.by}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Kelas Terbaik */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">🏆 Kelas Terbaik Hari Ini</h3>
        <div className="flex flex-wrap gap-8">
          {bestClasses.map((cls, idx) => (
            <div key={cls.name} className="flex items-center gap-3">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                idx === 0 ? 'bg-yellow-400' : idx === 1 ? 'bg-gray-400' : 'bg-orange-400'
              }`}>
                {cls.percentage}%
              </div>
              <div>
                <p className="font-semibold text-gray-800">{cls.name}</p>
                <p className="text-xs text-gray-400">Tingkat kehadiran</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabel Monitoring */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4">Monitoring Peserta Didik</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200">
                <th className="pb-3 font-semibold">NAMA</th>
                <th className="pb-3 font-semibold">KELAS</th>
                <th className="pb-3 font-semibold">PRESENSI</th>
                <th className="pb-3 font-semibold">POIN</th>
                <th className="pb-3 font-semibold">KAIH</th>
                <th className="pb-3 font-semibold">STATUS</th>
                <th className="pb-3 font-semibold text-right">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, idx) => (
                <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
                  <td className="py-3 text-sm font-medium text-gray-800">{student.name}</td>
                  <td className="py-3 text-sm text-gray-600">{student.class}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full transition-all" 
                          style={{ width: `${student.attendance}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{student.attendance}%</span>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-gray-600">{student.points}</td>
                  <td className="py-3 text-sm text-gray-600">{student.kaih}%</td>
                  <td className="py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      student.status === 'Aktif' ? 'bg-green-100 text-green-700' :
                      student.status === 'Peringatan' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center justify-end gap-3 text-xs">
                      <button className="text-blue-600 hover:text-blue-800 font-medium">Lihat</button>
                      <button className="text-green-600 hover:text-green-800 font-medium">Edit</button>
                      <button className="text-gray-500 hover:text-gray-700 font-medium">Riwayat</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">Menampilkan 1-5 dari 1.024 siswa</p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <ChevronLeft size={16} />
            </button>
            <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg">1</button>
            <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition">2</button>
            <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition">3</button>
            <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition">...</button>
            <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition">205</button>
            <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}