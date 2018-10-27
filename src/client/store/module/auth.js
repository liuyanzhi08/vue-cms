import Cookie from 'js-cookie';

const AUTH_REQUEST = 'auth:request';
const AUTH_LOGIN = 'auth:login';
const AUTH_LOGOUT = 'auth:logout';
const AUTH_SUCCESS = 'auth:success';
const AUTH_ERROR = 'auth:error';
const AUTH_USER = 'auth:user';
const AUTH_USER_ID = 'auth:user:id';

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
    [AUTH_USER_ID]: (state, id) => {
      state.userId = id;
    },
    [AUTH_REQUEST]: (state) => {
      state.status = 'loading';
    },
    [AUTH_SUCCESS]: (state, user) => {
      state.status = 'success';
      state.user = user;
      state.userId = user.id;
    },
    [AUTH_ERROR]: (state) => {
      state.status = 'error';
    },
    [AUTH_LOGOUT]: (state) => {
      state.user = null;
      state.userId = null;
    },
    [AUTH_USER]: (state, user) => {
      state.user = user;
    },
  },
  actions: {
    [AUTH_LOGIN]: async ({ commit, getters }, user) => {
      commit(AUTH_REQUEST);
      getters.Auth.login(user)
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
  AUTH_USER_ID,
  auth,
};
