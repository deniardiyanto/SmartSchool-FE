import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import ScanDashboard from './pages/ScanDashboard';
import WaliDashboard from './pages/WaliDashboard';
import WaliPresensi from './pages/WaliPresensi';
import WaliPoin from './pages/WaliPoin';
import WaliLogin from './pages/WaliLogin';
import { ChevronLeft } from 'lucide-react';

// Placeholder untuk halaman lain
const Students = () => <div className="p-4 text-gray-500">Halaman Data Siswa (coming soon)</div>;
const Attendance = () => <div className="p-4 text-gray-500">Halaman Presensi (coming soon)</div>;
const Violations = () => <div className="p-4 text-gray-500">Halaman Poin Pelanggaran (coming soon)</div>;
const Kaih = () => <div className="p-4 text-gray-500">Halaman KAIH (coming soon)</div>;
const Announcements = () => <div className="p-4 text-gray-500">Halaman Pengumuman (coming soon)</div>;
const Reports = () => <div className="p-4 text-gray-500">Halaman Laporan (coming soon)</div>;
const Settings = () => <div className="p-4 text-gray-500">Halaman Pengaturan (coming soon)</div>;
const Help = () => <div className="p-4 text-gray-500">Halaman Bantuan (coming soon)</div>;

// Placeholder untuk KAIH dan Profil Wali
const WaliKaih = () => (
  <div className="max-w-md mx-auto px-4 py-6 pb-24 min-h-screen bg-gray-50">
    <div className="flex items-center justify-between mb-4">
      <button onClick={() => window.location.href = '/wali'} className="p-2 hover:bg-gray-100 rounded-full transition">
        <ChevronLeft size={24} className="text-gray-600" />
      </button>
      <p className="text-lg font-semibold text-gray-800">KAIH</p>
      <img src="/src/assets/student.png" alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-blue-500" />
    </div>
    <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">
      <p className="text-gray-500">Halaman KAIH</p>
      <p className="text-sm text-gray-400 mt-2">Coming soon...</p>
    </div>
  </div>
);

const WaliProfil = () => (
  <div className="max-w-md mx-auto px-4 py-6 pb-24 min-h-screen bg-gray-50">
    <div className="flex items-center justify-between mb-4">
      <button onClick={() => window.location.href = '/wali'} className="p-2 hover:bg-gray-100 rounded-full transition">
        <ChevronLeft size={24} className="text-gray-600" />
      </button>
      <p className="text-lg font-semibold text-gray-800">Profil</p>
      <img src="/src/assets/student.png" alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-blue-500" />
    </div>
    <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">
      <p className="text-gray-500">Halaman Profil</p>
      <p className="text-sm text-gray-400 mt-2">Coming soon...</p>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root ke /admin */}
        <Route path="/" element={<Navigate to="/admin" replace />} />
        
        {/* Admin */}
        <Route path="/admin" element={<Layout><Dashboard /></Layout>} />
        <Route path="/admin/students" element={<Layout><Students /></Layout>} />
        <Route path="/admin/attendance" element={<Layout><Attendance /></Layout>} />
        <Route path="/admin/violations" element={<Layout><Violations /></Layout>} />
        <Route path="/admin/kaih" element={<Layout><Kaih /></Layout>} />
        <Route path="/admin/announcements" element={<Layout><Announcements /></Layout>} />
        <Route path="/admin/reports" element={<Layout><Reports /></Layout>} />
        <Route path="/admin/settings" element={<Layout><Settings /></Layout>} />
        <Route path="/admin/help" element={<Layout><Help /></Layout>} />
        
        {/* Petugas Scan */}
        <Route path="/scan" element={<Layout><ScanDashboard /></Layout>} />
        <Route path="/scan/checkin" element={<Layout><ScanDashboard /></Layout>} />
        <Route path="/scan/students" element={<Layout><Students /></Layout>} />
        <Route path="/scan/attendance" element={<Layout><Attendance /></Layout>} />
        <Route path="/scan/activities" element={<Layout><ScanDashboard /></Layout>} />
        
        {/* Wali Murid */}
        <Route path="/login" element={<WaliLogin />} />
        <Route path="/wali" element={<WaliDashboard />} />
        <Route path="/wali/presensi" element={<WaliPresensi />} />
        <Route path="/wali/poin" element={<WaliPoin />} />
        <Route path="/wali/kaih" element={<WaliKaih />} />
        <Route path="/wali/profil" element={<WaliProfil />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;