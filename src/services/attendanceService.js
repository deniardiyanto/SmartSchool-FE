import api, { unwrap } from './api';

export const getAttendances = (params, signal) =>
  api.get('/attendance', { params, signal }).then(unwrap);
