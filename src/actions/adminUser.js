export default {
  login(params) {
    return {
      type: 'adminUser/login',
      payload: params,
    };
  },

  logout() {
    return {
      type: 'adminUser/logout',
    };
  },
};
