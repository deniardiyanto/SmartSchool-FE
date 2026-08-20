import { useState, useEffect } from 'react';
import { 
  QrCode, UserCheck, AlertTriangle, Award,
  Calendar, Clock, CheckCircle, XCircle,
  Search, ChevronLeft, ChevronRight,
  Eye, Edit, Clock as ClockIcon, Users
} from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import studentPhoto from '../assets/student.png';

// Data dummy untuk petugas scan
const scanStats = [
  { 
    title: 'TOTAL SCAN HARI INI', 
    value: '347', 
    subtitle: 'Siswa yang sudah scan',
    change: '↑ +24 dari kemarin', 
    icon: QrCode, 
    color: 'bg-blue-500' 
  },
  { 
    title: 'PRESENSI HARI INI', 
    value: '92,4%', 
    subtitle: 'Tingkat Kehadiran',
    change: '↑ +2,1% kemarin', 
    icon: UserCheck, 
    color: 'bg-green-500' 
  },
  { 
    title: 'BELUM SCAN', 
    value: '78', 
    subtitle: 'Siswa belum scan',
    change: '↓ -12 dari kemarin', 
    icon: AlertTriangle, 
    color: 'bg-red-500' 
  },
  { 
    title: 'AKTIVITAS SCAN', 
    value: '1.204', 
    subtitle: 'Total scan bulan ini',
    change: '↑ +156 dari bulan lalu', 
    icon: Award, 
    color: 'bg-purple-500' 
  },
];

const recentScans = [
  { name: 'Ahmad Fauzi', class: 'XII-1', time: '08:15', status: 'Hadir', method: 'QR Code' },
  { name: 'Siti Rahma', class: 'XI-2', time: '08:12', status: 'Hadir', method: 'NFC' },
  { name: 'Budi Santoso', class: 'XII-3', time: '08:08', status: 'Terlambat', method: 'QR Code' },
  { name: 'Dewi Lestari', class: 'X-1', time: '08:05', status: 'Hadir', method: 'QR Code' },
  { name: 'Andi Pratama', class: 'XI-1', time: '08:00', status: 'Hadir', method: 'NFC' },
  { name: 'Rina Marlina', class: 'XII-2', time: '07:55', status: 'Hadir', method: 'QR Code' },
  { name: 'Fajar Ramadhan', class: 'X-3', time: '07:50', status: 'Sakit', method: 'Manual' },
];

const scanActivities = [
  { text: 'Ahmad Fauzi melakukan scan masuk', time: '2 menit lalu', by: 'QR Code' },
  { text: 'Siti Rahma scan masuk dengan NFC', time: '5 menit lalu', by: 'NFC' },
  { text: 'Budi Santoso terdeteksi terlambat', time: '10 menit lalu', by: 'QR Code' },
  { text: 'Dewi Lestari berhasil scan masuk', time: '15 menit lalu', by: 'QR Code' },
  { text: 'Andi Pratama scan masuk', time: '20 menit lalu', by: 'NFC' },
];

const classAttendance = [
  { class: 'XII-1', total: 32, present: 30, percentage: 94 },
  { class: 'XII-2', total: 30, present: 28, percentage: 93 },
  { class: 'XII-3', total: 28, present: 26, percentage: 93 },
  { class: 'XI-1', total: 32, present: 29, percentage: 91 },
  { class: 'XI-2', total: 30, present: 27, percentage: 90 },
];

export default function ScanDashboard() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      {/* ============ HEADER ============ */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Scan</h1>
          <p className="text-sm text-gray-500 mt-1">Pantau aktivitas scan presensi siswa</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Cari siswa atau kelas..."
              className="w-64 px-4 py-2.5 pl-10 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Tombol Scan */}
          <button className="bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center gap-2">
            <QrCode size={18} /> Scan Now
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-lg border border-gray-200">
            <img 
                src={studentPhoto} 
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-gray-800">Petugas Scan</p>
              <p className="text-xs text-gray-400">Shift Pagi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {scanStats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Two Column: Recent Scans & Aktivitas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Recent Scans */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Scan Terbaru</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">Lihat Semua →</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  <th className="pb-3 font-semibold">NAMA</th>
                  <th className="pb-3 font-semibold">KELAS</th>
                  <th className="pb-3 font-semibold">WAKTU</th>
                  <th className="pb-3 font-semibold">STATUS</th>
                  <th className="pb-3 font-semibold">METODE</th>
                </tr>
              </thead>
              <tbody>
                {recentScans.map((scan, idx) => (
                  <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
                    <td className="py-3 text-sm font-medium text-gray-800">{scan.name}</td>
                    <td className="py-3 text-sm text-gray-600">{scan.class}</td>
                    <td className="py-3 text-sm text-gray-600">{scan.time}</td>
                    <td className="py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        scan.status === 'Hadir' ? 'bg-green-100 text-green-700' :
                        scan.status === 'Terlambat' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {scan.status}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-500">{scan.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Aktivitas Scan */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">Aktivitas Scan</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {scanActivities.map((act, idx) => (
              <div key={idx} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm text-gray-700">{act.text}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <ClockIcon size={12} className="text-gray-400" />
                      <p className="text-xs text-gray-400">
                        {act.time} • {act.by}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Kehadiran per Kelas */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4">📊 Kehadiran per Kelas</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classAttendance.map((cls, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800">{cls.class}</h4>
                <span className="text-sm font-medium text-gray-600">{cls.present}/{cls.total}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    cls.percentage >= 90 ? 'bg-green-500' :
                    cls.percentage >= 80 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${cls.percentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">{cls.percentage}% hadir</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// StatCard Component (sama dengan dashboard admin)
function StatCard({ title, value, subtitle, change, icon: Icon, color }) {
  const isPositive = change?.includes('+');
  const isNegative = change?.includes('-');
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          <p className="text-xs font-semibold text-gray-500 mt-1 tracking-wide">{title}</p>
          {subtitle && (
            <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
          )}
          {change && (
            <p className={`text-sm mt-2 font-medium ${
              isPositive ? 'text-green-600' : 
              isNegative ? 'text-red-600' : 
              'text-gray-500'
            }`}>
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color} flex-shrink-0 ml-4`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );
}