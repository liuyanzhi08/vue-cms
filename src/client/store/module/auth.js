import Cookie from 'js-cookie';

const AUTH_REQUEST = 'auth:request';
const AUTH_LOGIN = 'auth:login';
const AUTH_LOGOUT = 'auth:logout';
const AUTH_SUCCESS = 'auth:success';
const AUTH_ERROR = 'auth:error';
const AUTH_USER = 'auth:user';

const auth = {
  state: {
    status: null,
    user: null,
    userId: Cookie.get(AUTH_USER),
  },
  getters: {
    isAuthenticated: state => !!state.userId,
    user: state => state.user || {},
  },
  mutations: {
    [AUTH_REQUEST]: (_state) => {
      const state = _state;
      state.status = 'loading';
    },

    [AUTH_SUCCESS]: (_state, user) => {
      const state = _state;
      state.status = 'success';
      state.user = user;
      state.userId = user.id;
    },
    [AUTH_ERROR]: (_state) => {
      const state = _state;
      state.status = 'error';
    },
    [AUTH_LOGOUT]: (_state) => {
      const state = _state;
      state.user = null;
      state.userId = null;
    },
    [AUTH_USER]: (_state, user) => {
      const state = _state;
      state.user = user;
    },
  },
  actions: {
    [AUTH_LOGIN]: async ({ commit, getters }, user) => {
      commit(AUTH_REQUEST);
      await getters.Auth.login(user)
        .then((res) => {
          commit(AUTH_SUCCESS, res);
          return res;
        })
        .catch((err) => {
          commit(AUTH_ERROR, err);
          return Promise.reject(err);
        });
    },
    [AUTH_LOGOUT]: ({ commit, getters }) => getters.Auth.logout()
      .then(() => {
        commit(AUTH_LOGOUT);
      }),
    [AUTH_USER]: ({ commit, getters }) => getters.Auth.user()
      .then((user) => {
        commit(AUTH_USER, user);
      }),
  },
};

export {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_USER,
  auth,
};
