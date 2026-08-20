import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, CalendarCheck, AlertTriangle, BookOpen, User,
  ChevronLeft, Award
} from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import studentPhoto from '../assets/student.png';

export default function WaliPoin() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingSpinner />;

  const poinData = {
    current: 8,
    max: 50,
    remaining: 42,
    status: 'Sangat Baik',
    statusColor: 'text-green-600'
  };

  const disciplineLevels = [
    { min: 41, max: 50, label: 'Baik', color: 'bg-green-500' },
    { min: 31, max: 40, label: 'Monitoring', color: 'bg-yellow-500' },
    { min: 21, max: 30, label: 'Pembinaan', color: 'bg-orange-500' },
    { min: 11, max: 20, label: 'Pembinaan Intensif', color: 'bg-red-500' },
  ];

  const violations = [
    {
      title: 'Terlambat Masuk Sekolah',
      date: 'Senin, 10 Agustus 2026',
      time: '07:15',
      desc: 'Datang setelah bel masuk berbunyi tanpa alasan sah.',
      points: -5,
      color: 'text-red-500'
    },
    {
      title: 'Atribut Seragam Tidak Lengkap',
      date: 'Rabu, 5 Agustus 2026',
      time: '07:05',
      desc: 'Tidak mengenakan dasi dan ikat pinggang standar sekolah.',
      points: -3,
      color: 'text-red-500'
    },
  ];

  const bottomNav = [
    { icon: Home, label: 'Beranda', path: '/wali' },
    { icon: CalendarCheck, label: 'Presensi', path: '/wali/presensi' },
    { icon: AlertTriangle, label: 'Poin', path: '/wali/poin' },
    { icon: BookOpen, label: 'KAIH', path: '/wali/kaih' },
    { icon: User, label: 'Profil', path: '/wali/profil' },
  ];

  const isActive = (path) => location.pathname === path;

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
          <p className="text-lg font-semibold text-gray-800">Poin Pelanggaran</p>
          <img 
            src={studentPhoto} 
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
          />
        </div>

        {/* ============ STATUS PEMBINAAN ============ */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Status Pembinaan</p>
              <p className="text-2xl font-bold text-gray-800">
                {poinData.current} <span className="text-lg text-gray-400">/ {poinData.max} Poin</span>
              </p>
              <p className={`text-sm font-semibold ${poinData.statusColor}`}>{poinData.status}</p>
              <p className="text-xs text-gray-400 mt-1">
                Tersisa {poinData.remaining} poin dari batas aman
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400">Max</p>
              <div className="w-14 h-14 rounded-full border-4 border-green-500 flex items-center justify-center text-xl font-bold text-green-500">
                {poinData.max}
              </div>
            </div>
          </div>
        </div>

        {/* ============ SKALA TINGKAT KEDISIPLINAN ============ */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-5">
          <p className="text-sm font-semibold text-gray-800 mb-3">Skala Tingkat Kedisiplinan</p>
          
          <div className="space-y-2">
            {disciplineLevels.map((level, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-16 text-xs text-gray-500 flex-shrink-0">
                  {level.min} – {level.max} Poin
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${level.color} rounded-full`}
                    style={{ 
                      width: `${((level.max - level.min + 1) / poinData.max) * 100}%` 
                    }}
                  />
                </div>
                <div className={`text-xs font-medium ${
                  poinData.current >= level.min && poinData.current <= level.max 
                    ? 'text-blue-600' 
                    : 'text-gray-400'
                }`}>
                  {level.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <Award size={14} className="text-blue-500" />
              <span className="text-xs text-gray-500">
                Poin saat ini: <span className="font-semibold text-gray-700">{poinData.current} poin</span>
              </span>
            </div>
          </div>
        </div>

        {/* ============ RIWAYAT PELANGGARAN ============ */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p className="text-sm font-semibold text-gray-800 mb-3">Riwayat Pelanggaran</p>
          
          <div className="space-y-4">
            {violations.map((violation, idx) => (
              <div key={idx} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">{violation.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {violation.date} • {violation.time}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{violation.desc}</p>
                  </div>
                  <span className={`text-sm font-bold ${violation.color} flex-shrink-0 ml-3`}>
                    {violation.points}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center">
              Poin merupakan bagian dari sistem pembinaan peserta didik.
            </p>
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