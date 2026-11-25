import api, { unwrap } from './api';

export const getStudents = (params, signal) =>
  api.get('/master/students', { params, signal }).then(unwrap);

export const getStudent = (id) => api.get(`/master/students/${id}`).then(unwrap);

export const createStudent = (payload) =>
  api.post('/master/students', payload).then(unwrap);

export const updateStudent = (id, payload) =>
  api.put(`/master/students/${id}`, payload).then(unwrap);

export const deleteStudent = (id) => api.delete(`/master/students/${id}`);
