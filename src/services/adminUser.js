import request from '../utils/request';

export default async function login(params) {
  return request('/api/tokens', {
    method: 'POST',
    body: params,
  });
}
