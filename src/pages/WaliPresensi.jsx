import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, CalendarCheck, AlertTriangle, BookOpen, User,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import studentPhoto from '../assets/student.png';

export default function WaliPresensi() {
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState('Agustus 2026');
  const [selectedFilter, setSelectedFilter] = useState('Semua');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingSpinner />;

  // Data dummy
  const attendanceSummary = {
    total: 20,
    hadir: 18,
    sakit: 1,
    izin: 0,
    alpa: 1,
    percentage: 96,
    status: 'Sangat Baik'
  };

  const calendarDays = [
    { day: 3, type: 'normal' },
    { day: 4, type: 'normal' },
    { day: 5, type: 'normal' },
    { day: 6, type: 'normal' },
    { day: 7, type: 'alpa' },
    { day: 8, type: 'sakit' },
    { day: 9, type: 'normal' },
    { day: 10, type: 'normal' },
    { day: 11, type: 'hadir' },
    { day: 12, type: 'normal' },
    { day: 13, type: 'normal' },
    { day: 14, type: 'normal' },
    { day: 15, type: 'normal' },
    { day: 16, type: 'normal' },
    { day: 17, type: 'normal' },
    { day: 18, type: 'normal' },
    { day: 19, type: 'normal' },
    { day: 20, type: 'normal' },
    { day: 21, type: 'normal' },
    { day: 22, type: 'normal' },
    { day: 23, type: 'normal' },
  ];

  const weekDays = ['S', 'S', 'R', 'K', 'J', 'S', 'M'];

  const historyData = [
    { date: 'Senin, 11 Agustus 2026', time: 'Jam masuk: 07:02', status: 'Hadir', statusColor: 'text-green-600' },
    { date: 'Jumat, 8 Agustus 2026', time: 'Sakit (Surat Dokter)', status: 'Sakit', statusColor: 'text-blue-600' },
    { date: 'Kamis, 7 Agustus 2026', time: 'Tanpa Keterangan', status: 'Alpa', statusColor: 'text-red-600' },
  ];

  const filters = ['Semua', 'Hadir', 'Sakit', 'Izin'];

  const bottomNav = [
    { icon: Home, label: 'Beranda', path: '/wali' },
    { icon: CalendarCheck, label: 'Presensi', path: '/wali/presensi' },
    { icon: AlertTriangle, label: 'Poin', path: '/wali/poin' },
    { icon: BookOpen, label: 'KAIH', path: '/wali/kaih' },
    { icon: User, label: 'Profil', path: '/wali/profil' },
  ];

  const isActive = (path) => location.pathname === path;

  const getDayColor = (type) => {
    switch(type) {
      case 'hadir': return 'bg-green-500 text-white';
      case 'sakit': return 'bg-blue-500 text-white';
      case 'alpa': return 'bg-red-500 text-white';
      default: return 'hover:bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Konten Utama */}
      <div className="max-w-md mx-auto px-4 py-6 pb-24">
        {/* ============ HEADER ============ */}
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => navigate('/wali')}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          <p className="text-lg font-semibold text-gray-800">Presensi</p>
          <img 
            src={studentPhoto} 
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
          />
        </div>

        {/* ============ RINGKASAN PRESENSI ============ */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Rasio Kehadiran</p>
              <p className="text-3xl font-bold text-gray-800">{attendanceSummary.percentage}%</p>
              <p className="text-sm font-semibold text-green-600">{attendanceSummary.status}</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-800">{attendanceSummary.hadir}</p>
                <p className="text-xs text-gray-400">Hadir</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-800">{attendanceSummary.sakit}</p>
                <p className="text-xs text-gray-400">Sakit</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-800">{attendanceSummary.izin}</p>
                <p className="text-xs text-gray-400">Izin</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-800">{attendanceSummary.alpa}</p>
                <p className="text-xs text-gray-400">Alpa</p>
              </div>
            </div>
          </div>
        </div>

        {/* ============ KALENDER ============ */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-800">{currentMonth}</p>
            <div className="flex gap-2">
              <button className="p-1 hover:bg-gray-100 rounded-full transition">
                <ChevronLeft size={20} className="text-gray-500" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded-full transition">
                <ChevronRight size={20} className="text-gray-500" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day, idx) => (
              <div key={idx} className="text-center text-xs font-medium text-gray-400 py-1">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((item, idx) => (
              <div 
                key={idx} 
                className={`text-center py-2 rounded-full text-sm font-medium transition ${getDayColor(item.type)}`}
              >
                {item.day}
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${
                  selectedFilter === filter 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* ============ RIWAYAT PRESENSI ============ */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p className="text-sm font-semibold text-gray-800 mb-3">Riwayat Presensi</p>
          <div className="space-y-4">
            {historyData.map((item, idx) => (
              <div key={idx} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{item.date}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                  </div>
                  <span className={`text-sm font-semibold ${item.statusColor}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============ BOTTOM NAVIGATION ============ */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto">
        <div className="flex items-center justify-around py-2">
          {bottomNav.map((item, idx) => (
            <button 
              key={idx} 
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-0.5 px-4 py-1"
            >
              <item.icon 
                size={22} 
                className={isActive(item.path) ? 'text-blue-600' : 'text-gray-400'} 
              />
              <span className={`text-[10px] font-medium ${isActive(item.path) ? 'text-blue-600' : 'text-gray-400'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}