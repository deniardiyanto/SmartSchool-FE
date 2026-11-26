import api, { unwrap } from './api';

const clean = (params) =>
  Object.fromEntries(Object.entries(params).filter(([, v]) => v !== '' && v != null));

export const getAttendanceReport = (params, signal) =>
  api.get('/reports/attendance', { params: clean(params), signal }).then(unwrap);

export const getViolationReport = (params, signal) =>
  api.get('/reports/violations', { params: clean(params), signal }).then(unwrap);

export const getKaihReport = (params, signal) =>
  api.get('/reports/kaih', { params: clean(params), signal }).then(unwrap);
