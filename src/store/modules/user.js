const TOKEN_KEY = 'TOUTIAO_USER'

export default {
  namespaced: true,
  state() {
    return {
      token: JSON.parse(window.localStorage.getItem(TOKEN_KEY)) || '',
    };
  },
  mutations: {
    getItem(state, token) {
      state.token = token;
      console.log(state.token);
      window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.token));
    },
  },
  actions: {},
};
