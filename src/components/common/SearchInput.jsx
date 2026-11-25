import { Search } from 'lucide-react';

export default function SearchInput({ value, onChange, placeholder = 'Cari...' }) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-64 px-4 py-2 pl-10 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      />
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
    </div>
  );
}
