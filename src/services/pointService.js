import api, { unwrap } from './api';

export const getPoints = (params, signal) =>
  api.get('/master/attendance-points', { params, signal }).then(unwrap);

export const getLeaderboard = (params, signal) =>
  api.get('/master/attendance-points/leaderboard', { params, signal }).then(unwrap);
