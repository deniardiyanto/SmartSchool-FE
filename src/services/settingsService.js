import api, { unwrap } from './api';

export const getAttendanceRule = (signal) =>
  api.get('/settings/attendance-rule', { signal }).then(unwrap);

export const saveAttendanceRule = (payload) =>
  api.put('/settings/attendance-rule', payload).then(unwrap);

export const getMonitoringSetting = (signal) =>
  api.get('/settings/student-monitoring', { signal }).then(unwrap);

export const saveMonitoringSetting = (payload) =>
  api.put('/settings/student-monitoring', payload).then(unwrap);
