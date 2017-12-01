export default {
  namespace: 'global',

  state: {
    collapsed: false,
    currentUser: {},
  },

  reducers: {
    changeLayoutCollapsed(state, { collapsed }) {
      return { ...state, collapsed };
    },

    setCurrentUser(state, { currentUser }) {
      return { ...state, currentUser };
    },
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
