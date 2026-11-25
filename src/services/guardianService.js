import api, { unwrap } from './api';

export const getGuardians = (params = { pageNumber: 1, pageSize: 100 }, signal) =>
  api.get('/master/guardians', { params, signal }).then(unwrap);
