export const set = (key, value) => {
  localStorage.setItem(key, value);
};

export const get = (key) => {
  return localStorage.getItem(key);
};

export const remove = (key) => {
  localStorage.removeItem(key);
};

export const init = (data) => {
  const { token, ...user } = data;
  set('token', token);
  setCurrentUser(user);
};

export const destory = () => {
  remove('user');
  remove('token');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user) => {
  user = JSON.stringify(user);
  return set('user', user);
};

export const getToken = () => {
  return localStorage.getItem('token');
};
