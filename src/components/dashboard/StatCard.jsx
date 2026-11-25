// trend: 'good' | 'bad' | 'neutral' (opsional). Tanpa trend, warna ditentukan dari tanda +/-.
export default function StatCard({ title, value, subtitle, change, trend, icon: Icon, color }) {
  const isPositive = trend ? trend === 'good' : change?.includes('+');
  const isNegative = trend ? trend === 'bad' : change?.includes('-');
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          <p className="text-sm font-medium text-gray-700 mt-1">{title}</p>
          {subtitle && subtitle !== title && (
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