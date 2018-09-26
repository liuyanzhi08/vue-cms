import Cookie from 'js-cookie';
import Auth from '../../api/auth';

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
    [AUTH_LOGIN]: ({ commit }, user) => new Promise((resolve, reject) => {
      commit(AUTH_REQUEST);
      Auth.login(user)
        .then((res) => {
          commit(AUTH_SUCCESS, res);
          resolve(res);
        })
        .catch((err) => {
          commit(AUTH_ERROR, err);
          reject(err);
        });
    }),
    [AUTH_LOGOUT]: ({ commit }) => Auth.logout()
      .then(() => {
        commit(AUTH_LOGOUT);
      }),
    [AUTH_USER]: ({ commit }) => Auth.user()
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
