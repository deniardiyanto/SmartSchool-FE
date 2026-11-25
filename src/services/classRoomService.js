import api, { unwrap } from './api';

export const getClassRooms = (params = { pageNumber: 1, pageSize: 100 }, signal) =>
  api.get('/master/classrooms', { params, signal }).then(unwrap);
