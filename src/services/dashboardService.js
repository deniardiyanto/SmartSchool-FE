import api, { unwrap } from './api';

export const getOverview = (activityLimit = 5, signal) =>
  api.get('/dashboard/overview', { params: { activityLimit }, signal }).then(unwrap);

export const getBestClasses = (top = 3, signal) =>
  api.get('/dashboard/best-classes', { params: { top }, signal }).then(unwrap);

export const getStudentMonitoring = (params, signal) =>
  api.get('/dashboard/student-monitoring', { params, signal }).then(unwrap);
