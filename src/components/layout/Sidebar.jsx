import { 
  LayoutDashboard, Users, CalendarCheck, AlertTriangle, 
  FileText, Megaphone, FileBarChart, Settings, HelpCircle,
  LogOut, QrCode, Award, Home, User
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

// Menu untuk Admin
const adminMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Users, label: 'Data Siswa', path: '/admin/students' },
  { icon: CalendarCheck, label: 'Presensi', path: '/admin/attendance' },
  { icon: AlertTriangle, label: 'Poin Pelanggaran', path: '/admin/violations' },
  { icon: FileText, label: 'KAIH', path: '/admin/kaih' },
  // { icon: Megaphone, label: 'Pengumuman', path: '/admin/announcements' },
  { icon: FileBarChart, label: 'Laporan', path: '/admin/reports' },
  { icon: Settings, label: 'Pengaturan', path: '/admin/settings' },
  { icon: HelpCircle, label: 'Bantuan', path: '/admin/help' },
];

// Menu untuk Petugas Scan
const scanMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/scan' },
  { icon: QrCode, label: 'Scan Masuk', path: '/scan/checkin' },
  { icon: Users, label: 'Data Siswa', path: '/scan/students' },
  { icon: CalendarCheck, label: 'Presensi', path: '/scan/attendance' },
  { icon: Award, label: 'Aktivitas Scan', path: '/scan/activities' },
  { icon: Settings, label: 'Pengaturan', path: '/settings' },
  { icon: HelpCircle, label: 'Bantuan', path: '/help' },
];

// Menu untuk Wali Murid
const waliMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/wali' },
  { icon: User, label: 'Data Siswa', path: '/wali/student' },
  { icon: CalendarCheck, label: 'Presensi', path: '/wali/attendance' },
  { icon: AlertTriangle, label: 'Poin', path: '/wali/violations' },
  { icon: FileText, label: 'KAIH', path: '/wali/kaih' },
  { icon: Settings, label: 'Pengaturan', path: '/settings' },
  { icon: HelpCircle, label: 'Bantuan', path: '/help' },
];

export default function Sidebar() {
  const location = useLocation();
  
  // Deteksi role berdasarkan URL
  const isScanRoute = location.pathname.startsWith('/scan');
  const isWaliRoute = location.pathname.startsWith('/wali');
  
  // Pilih menu berdasarkan role
  let menuItems = adminMenuItems;
  let roleLabel = 'Admin';
  let roleSubLabel = 'Sekolah';
  let avatarColor = 'from-blue-500 to-blue-700';
  let avatarInitial = 'A';

  if (isScanRoute) {
    menuItems = scanMenuItems;
    roleLabel = 'Petugas Scan';
    roleSubLabel = 'Shift Pagi';
    avatarColor = 'from-green-500 to-green-700';
    avatarInitial = 'P';
  } else if (isWaliRoute) {
    menuItems = waliMenuItems;
    roleLabel = 'Wali Murid';
    roleSubLabel = 'Orang Tua';
    avatarColor = 'from-orange-500 to-orange-700';
    avatarInitial = 'W';
  }

  return (
    <aside className="w-64 bg-[#1a2332] min-h-screen flex flex-col">
      {/* ============ LOGO / HEADER SEKOLAH ============ */}
      <div className="px-6 py-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-white font-bold text-lg">SM</span>
          </div>
          <div>
            <h1 className="text-white text-lg font-bold leading-tight">SMAN 1</h1>
            <p className="text-gray-400 text-xs">Kota Mungkid</p>
          </div>
        </div>
      </div>

      {/* ============ ROLE BADGE ============ */}
      <div className="px-4 py-3 border-b border-gray-700">
        <div className="bg-[#2a3444] rounded-lg px-3 py-2">
          <p className="text-xs text-gray-400">Login sebagai</p>
          <p className="text-sm font-semibold text-white">{roleLabel}</p>
          <p className="text-xs text-gray-400">{roleSubLabel}</p>
        </div>
      </div>

      {/* ============ MENU NAVIGATION ============ */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'text-gray-400 hover:bg-[#2a3444] hover:text-white'
              }`
            }
          >
            <item.icon size={20} className="flex-shrink-0" />
            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* ============ PROFILE & LOGOUT ============ */}
      <div className="px-4 py-4 border-t border-gray-700">
        {/* Profile */}
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white font-bold text-sm`}>
            {avatarInitial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{roleLabel}</p>
            <p className="text-xs text-gray-400">{roleSubLabel}</p>
          </div>
        </div>
        
        {/* Logout Button */}
        <button 
          onClick={() => {
            console.log('Logout clicked');
          }}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
        >
          <LogOut size={20} className="flex-shrink-0" />
          <span className="text-sm font-medium">Keluar Sesi</span>
        </button>
      </div>
    </aside>
  );
}