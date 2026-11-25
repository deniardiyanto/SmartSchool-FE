import axios from 'axios';

// VITE_API_URL berisi host saja (mis. http://localhost:5075); prefix /api ditambahkan di sini.
const host = (import.meta.env.VITE_API_URL || 'http://localhost:5075').replace(/\/+$/, '');

const api = axios.create({
  baseURL: `${host}/api`,
  timeout: 15000,
});

/**
 * Ambil pesan error yang ramah dari response ApiResponse<T>
 * ({ success, message, data, errors }) atau dari error jaringan.
 */
export function getErrorMessage(error) {
  const body = error?.response?.data;

  if (body?.errors) {
    const list = Array.isArray(body.errors)
      ? body.errors
      : Object.values(body.errors).flat();
    if (list.length > 0) return list.join(', ');
  }
  if (body?.message) return body.message;
  if (body?.title) return body.title;
  if (error?.code === 'ERR_NETWORK') {
    return 'Tidak dapat terhubung ke server. Periksa koneksi atau pengaturan CORS API.';
  }
  if (error?.code === 'ECONNABORTED') return 'Permintaan ke server terlalu lama.';
  return error?.message || 'Terjadi kesalahan.';
}

/** Ambil `data` dari bungkus ApiResponse<T>. */
export const unwrap = (response) => response.data?.data;

export default api;
