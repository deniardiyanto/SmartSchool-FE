import api, { unwrap } from './api';

export const getAttendances = (params, signal) =>
  api.get('/attendance', { params, signal }).then(unwrap);

export const closeDay = (date) =>
  api.post('/attendance/close-day', { date: date || null }).then(unwrap);
