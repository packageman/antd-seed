export default {
  changeLayoutCollapsed(collapsed) {
    return {
      type: 'global/changeLayoutCollapsed',
      collapsed,
    };
  },

  setCurrentUser(currentUser) {
    return {
      type: 'global/setCurrentUser',
      currentUser,
    };
  },
};

