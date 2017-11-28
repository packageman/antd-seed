import request from '../utils/request';

export default async () => {
  return request('/api/events');
};
