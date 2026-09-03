// import { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { 
//   Eye, AlertTriangle, FileText, 
//   Home, CalendarCheck, User, BookOpen
// } from 'lucide-react';
// import LoadingSpinner from '../components/common/LoadingSpinner';
// import studentPhoto from '../assets/student.png';

// export default function WaliDashboard() {
//   const [loading, setLoading] = useState(true);
//   const [currentTime, setCurrentTime] = useState('');
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const now = new Date();
//     const hours = String(now.getHours()).padStart(2, '0');
//     const minutes = String(now.getMinutes()).padStart(2, '0');
//     setCurrentTime(`${hours}:${minutes}`);

//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) return <LoadingSpinner />;

//   // Data dummy
//   const student = {
//     name: 'Akalili',
//     class: 'XI-1',
//     attendance: 96,
//     points: 8,
//     maxPoints: 50,
//     kaih: 18,
//     maxKaih: 20,
//   };

//   const quickAccess = [
//     { icon: Eye, label: 'Lihat Presensi', color: 'bg-blue-500', path: '/wali/presensi' },
//     { icon: AlertTriangle, label: 'Lihat Poin', color: 'bg-red-500', path: '/wali/poin' },
//     { icon: FileText, label: 'Isi KAIH', color: 'bg-purple-500', path: '/wali/kaih' },
//   ];

//   const bottomNav = [
//     { icon: Home, label: 'Beranda', path: '/wali' },
//     { icon: CalendarCheck, label: 'Presensi', path: '/wali/presensi' },
//     { icon: AlertTriangle, label: 'Poin', path: '/wali/poin' },
//     { icon: BookOpen, label: 'KAIH', path: '/wali/kaih' },
//     { icon: User, label: 'Profil', path: '/wali/profil' },
//   ];

//   // Cek path aktif
//   const isActive = (path) => location.pathname === path;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Konten Utama */}
//       <div className="max-w-md mx-auto px-4 py-6 pb-24">
//         {/* ============ HEADER ============ */}
//         <div className="flex items-start justify-between mb-4">
//           <div>
//             <p className="text-3xl font-bold text-gray-800">{currentTime}</p>
//             <p className="text-xs text-gray-500 mt-0.5 font-medium">SMAN 1 Kota Mungkid</p>
//             <p className="text-xs text-gray-400">Sistem Informasi Siswa</p>
//           </div>
//           <img 
//             src={studentPhoto} 
//             alt="Profile"
//             className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
//           />
//         </div>

//         {/* ============ GREETING ============ */}
//         <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-5">
//           <p className="text-sm text-gray-500">Selamat pagi,</p>
//           <p className="text-xl font-bold text-gray-800">{student.name}</p>
//           <p className="text-sm text-gray-500">Kelas {student.class}</p>
//         </div>

//         {/* ============ STATS CARDS ============ */}
//         <div className="grid grid-cols-3 gap-3 mb-5">
//           <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
//             <p className="text-2xl font-bold text-blue-600">{student.attendance}%</p>
//             <p className="text-[10px] text-gray-500 mt-0.5">Presensi</p>
//             <p className="text-[10px] text-gray-400">Kehadiran bulan ini</p>
//           </div>
//           <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
//             <p className="text-2xl font-bold text-red-500">{student.points}/{student.maxPoints}</p>
//             <p className="text-[10px] text-gray-500 mt-0.5">Poin</p>
//             <p className="text-[10px] text-gray-400">Poin saat ini</p>
//           </div>
//           <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
//             <p className="text-2xl font-bold text-purple-600">{student.kaih}/{student.maxKaih}</p>
//             <p className="text-[10px] text-gray-500 mt-0.5">KAIH</p>
//             <p className="text-[10px] text-gray-400">Aktivitas harian</p>
//           </div>
//         </div>

//         {/* ============ AKSES CEPAT ============ */}
//         <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-5">
//           <p className="text-sm font-semibold text-gray-800 mb-3">Akses Cepat</p>
//           <div className="flex gap-3">
//             {quickAccess.map((item, idx) => (
//               <button 
//                 key={idx} 
//                 onClick={() => navigate(item.path)}
//                 className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition border border-gray-100"
//               >
//                 <div className={`p-2 rounded-full ${item.color}`}>
//                   <item.icon size={18} className="text-white" />
//                 </div>
//                 <span className="text-[11px] font-medium text-gray-700">{item.label}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* ============ AKTIVITAS TERBARU ============ */}
//         <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between mb-3">
//             <p className="text-sm font-semibold text-gray-800">Aktivitas Terbaru</p>
//             <button className="text-xs text-blue-600 font-medium">Lihat Semua →</button>
//           </div>
//           <div className="space-y-4">
//             <div className="border-b border-gray-100 pb-4">
//               <div className="flex items-start gap-3">
//                 <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
//                 <div>
//                   <p className="text-sm font-semibold text-gray-800">Kehadiran Tercatat</p>
//                   <p className="text-xs text-gray-500 mt-0.5">Anda melakukan presensi masuk dengan status Hadir.</p>
//                   <p className="text-xs text-gray-400 mt-1">Hari ini, 07:02</p>
//                 </div>
//               </div>
//             </div>
//             <div className="border-b border-gray-100 pb-4">
//               <div className="flex items-start gap-3">
//                 <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></div>
//                 <div>
//                   <p className="text-sm font-semibold text-gray-800">Pencatatan Poin Pelanggaran</p>
//                   <p className="text-xs text-gray-500 mt-0.5">Terlambat masuk sekolah sebanyak 5 poin pelanggaran.</p>
//                   <p className="text-xs text-gray-400 mt-1">12 Agt 2026</p>
//                 </div>
//               </div>
//             </div>
//             <div>
//               <div className="flex items-start gap-3">
//                 <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 flex-shrink-0"></div>
//                 <div>
//                   <p className="text-sm font-semibold text-gray-800">Pengisian KAIH Disetujui</p>
//                   <p className="text-xs text-gray-500 mt-0.5">Aktivitas harian "Shalat Berjamaah" telah divalidasi pembina.</p>
//                   <p className="text-xs text-gray-400 mt-1">11 Agt 2026</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ============ BOTTOM NAVIGATION ============ */}
//       <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto">
//         <div className="flex items-center justify-around py-2">
//           {bottomNav.map((item, idx) => (
//             <button 
//               key={idx} 
//               onClick={() => navigate(item.path)}
//               className="flex flex-col items-center gap-0.5 px-4 py-1"
//             >
//               <item.icon 
//                 size={22} 
//                 className={isActive(item.path) ? 'text-blue-600' : 'text-gray-400'} 
//               />
//               <span className={`text-[10px] font-medium ${isActive(item.path) ? 'text-blue-600' : 'text-gray-400'}`}>
//                 {item.label}
//               </span>
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Eye,
  AlertTriangle,
  FileText,
  Home,
  CalendarCheck,
  User,
  BookOpen,
} from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import studentPhoto from '../assets/student.png';

export default function WaliDashboard() {
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    setCurrentTime(`${hours}:${minutes}`);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  // =========================================================
  // AMBIL DATA USER DARI RESPONSE LOGIN
  // =========================================================
  let user = {};

  try {
    user = JSON.parse(
      localStorage.getItem('user') || '{}'
    );
  } catch (error) {
    console.error('Gagal membaca data user:', error);
    user = {};
  }

  // =========================================================
  // DATA SISWA / WALI
  // =========================================================
  // fullName berasal dari response login:
  // {
  //   userId: "...",
  //   username: "202600001",
  //   fullName: "Budi Santoso",
  //   role: "Guardian",
  //   clientType: "MOBILE",
  //   ...
  // }
  const student = {
    name: user.fullName || 'Wali Murid',
    class: 'XI-1',
    attendance: 96,
    points: 8,
    maxPoints: 50,
    kaih: 18,
    maxKaih: 20,
  };

  // =========================================================
  // AKSES CEPAT
  // =========================================================
  const quickAccess = [
    {
      icon: Eye,
      label: 'Lihat Presensi',
      color: 'bg-blue-500',
      path: '/wali/presensi',
    },
    {
      icon: AlertTriangle,
      label: 'Lihat Poin',
      color: 'bg-red-500',
      path: '/wali/poin',
    },
    {
      icon: FileText,
      label: 'Isi KAIH',
      color: 'bg-purple-500',
      path: '/wali/kaih',
    },
  ];

  // =========================================================
  // BOTTOM NAVIGATION
  // =========================================================
  const bottomNav = [
    {
      icon: Home,
      label: 'Beranda',
      path: '/wali',
    },
    {
      icon: CalendarCheck,
      label: 'Presensi',
      path: '/wali/presensi',
    },
    {
      icon: AlertTriangle,
      label: 'Poin',
      path: '/wali/poin',
    },
    {
      icon: BookOpen,
      label: 'KAIH',
      path: '/wali/kaih',
    },
    {
      icon: User,
      label: 'Profil',
      path: '/wali/profil',
    },
  ];

  // =========================================================
  // CEK PATH AKTIF
  // =========================================================
  const isActive = (path) => location.pathname === path;

  // =========================================================
  // RENDER
  // =========================================================
  return (
    <div className="min-h-screen bg-gray-50">

      {/* =====================================================
          KONTEN UTAMA
      ====================================================== */}
      <div className="max-w-md mx-auto px-4 py-6 pb-24">

        {/* ===================================================
            HEADER
        ==================================================== */}
        <div className="flex items-start justify-between mb-4">

          <div>
            <p className="text-3xl font-bold text-gray-800">
              {currentTime}
            </p>

            <p className="text-xs text-gray-500 mt-0.5 font-medium">
              SMAN 1 Kota Mungkid
            </p>

            <p className="text-xs text-gray-400">
              Sistem Informasi Siswa
            </p>
          </div>

          <img
            src={studentPhoto}
            alt="Profile"
            className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
          />

        </div>

        {/* ===================================================
            GREETING
        ==================================================== */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-5">

          <p className="text-sm text-gray-500">
            Selamat pagi,
          </p>

          <p className="text-xl font-bold text-gray-800">
            {student.name}
          </p>

          <p className="text-sm text-gray-500">
            Kelas {student.class}
          </p>

        </div>

        {/* ===================================================
            STATS CARDS
        ==================================================== */}
        <div className="grid grid-cols-3 gap-3 mb-5">

          {/* PRESENSI */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">

            <p className="text-2xl font-bold text-blue-600">
              {student.attendance}%
            </p>

            <p className="text-[10px] text-gray-500 mt-0.5">
              Presensi
            </p>

            <p className="text-[10px] text-gray-400">
              Kehadiran bulan ini
            </p>

          </div>

          {/* POIN */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">

            <p className="text-2xl font-bold text-red-500">
              {student.points}/{student.maxPoints}
            </p>

            <p className="text-[10px] text-gray-500 mt-0.5">
              Poin
            </p>

            <p className="text-[10px] text-gray-400">
              Poin saat ini
            </p>

          </div>

          {/* KAIH */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">

            <p className="text-2xl font-bold text-purple-600">
              {student.kaih}/{student.maxKaih}
            </p>

            <p className="text-[10px] text-gray-500 mt-0.5">
              KAIH
            </p>

            <p className="text-[10px] text-gray-400">
              Aktivitas harian
            </p>

          </div>

        </div>

        {/* ===================================================
            AKSES CEPAT
        ==================================================== */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-5">

          <p className="text-sm font-semibold text-gray-800 mb-3">
            Akses Cepat
          </p>

          <div className="flex gap-3">

            {quickAccess.map((item, idx) => (
              <button
                key={idx}
                onClick={() => navigate(item.path)}
                className="
                  flex-1
                  flex
                  flex-col
                  items-center
                  gap-1.5
                  py-3
                  rounded-xl
                  bg-gray-50
                  hover:bg-gray-100
                  transition
                  border
                  border-gray-100
                "
              >

                <div
                  className={`p-2 rounded-full ${item.color}`}
                >
                  <item.icon
                    size={18}
                    className="text-white"
                  />
                </div>

                <span className="text-[11px] font-medium text-gray-700">
                  {item.label}
                </span>

              </button>
            ))}

          </div>

        </div>

        {/* ===================================================
            AKTIVITAS TERBARU
        ==================================================== */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">

          <div className="flex items-center justify-between mb-3">

            <p className="text-sm font-semibold text-gray-800">
              Aktivitas Terbaru
            </p>

            <button className="text-xs text-blue-600 font-medium">
              Lihat Semua →
            </button>

          </div>

          <div className="space-y-4">

            {/* AKTIVITAS 1 */}
            <div className="border-b border-gray-100 pb-4">

              <div className="flex items-start gap-3">

                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />

                <div>

                  <p className="text-sm font-semibold text-gray-800">
                    Kehadiran Tercatat
                  </p>

                  <p className="text-xs text-gray-500 mt-0.5">
                    Anda melakukan presensi masuk dengan status Hadir.
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Hari ini, 07:02
                  </p>

                </div>

              </div>

            </div>

            {/* AKTIVITAS 2 */}
            <div className="border-b border-gray-100 pb-4">

              <div className="flex items-start gap-3">

                <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />

                <div>

                  <p className="text-sm font-semibold text-gray-800">
                    Pencatatan Poin Pelanggaran
                  </p>

                  <p className="text-xs text-gray-500 mt-0.5">
                    Terlambat masuk sekolah sebanyak 5 poin pelanggaran.
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    12 Agt 2026
                  </p>

                </div>

              </div>

            </div>

            {/* AKTIVITAS 3 */}
            <div>

              <div className="flex items-start gap-3">

                <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />

                <div>

                  <p className="text-sm font-semibold text-gray-800">
                    Pengisian KAIH Disetujui
                  </p>

                  <p className="text-xs text-gray-500 mt-0.5">
                    Aktivitas harian "Shalat Berjamaah" telah divalidasi pembina.
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    11 Agt 2026
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          BOTTOM NAVIGATION
      ====================================================== */}
      <div className="
        fixed
        bottom-0
        left-0
        right-0
        bg-white
        border-t
        border-gray-200
        max-w-md
        mx-auto
      ">

        <div className="flex items-center justify-around py-2">

          {bottomNav.map((item, idx) => (
            <button
              key={idx}
              onClick={() => navigate(item.path)}
              className="
                flex
                flex-col
                items-center
                gap-0.5
                px-4
                py-1
              "
            >

              <item.icon
                size={22}
                className={
                  isActive(item.path)
                    ? 'text-blue-600'
                    : 'text-gray-400'
                }
              />

              <span
                className={`
                  text-[10px]
                  font-medium
                  ${
                    isActive(item.path)
                      ? 'text-blue-600'
                      : 'text-gray-400'
                  }
                `}
              >
                {item.label}
              </span>

            </button>
          ))}

        </div>

      </div>

    </div>
  );
}