import { AlertCircle } from 'lucide-react';

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-700 rounded-lg px-4 py-3 text-sm">
      <AlertCircle size={18} className="flex-shrink-0" />
      <span className="flex-1">{message}</span>
      {onRetry && (
        <button onClick={onRetry} className="font-medium underline hover:no-underline">
          Coba lagi
        </button>
      )}
    </div>
  );
}
