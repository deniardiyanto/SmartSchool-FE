import Sidebar from './Sidebar';  // ← Pastikan ini

export default function Layout({ children }) {
  return (
    <div className="flex bg-[#f0f2f5] min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto min-h-screen">
        {children}
      </main>
    </div>
  );
}