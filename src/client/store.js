import Vuex from 'vuex';
import Cookie from 'js-cookie';
import Auth from './api/auth';

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
    isAuthenticated: (state) => {
      return !!state.userId;
    },
    user: (state) => {
      return state.user || {};
    }
  },
  mutations: {
    [AUTH_REQUEST]: (state) => {
      state.status = 'loading'
    },

    [AUTH_SUCCESS]: (state, user) => {
      state.status = 'success'
      state.user = user
      localStorage.setItem('auth:user', user);
    },
    [AUTH_ERROR]: (state) => {
      state.status = 'error'
    },
    [AUTH_LOGOUT]: (state) => {
      state.user = null;
    },
  },
  actions: {
    [AUTH_LOGIN]: ({ commit, dispatch }, user) => {
      return new Promise((resolve, reject) => { // The Promise used for router redirect in login
        commit(AUTH_REQUEST);
        Auth.login(user)
          .then(res => {
            commit(AUTH_SUCCESS, res)
            resolve(res)
          })
          .catch(err => {
            commit(AUTH_ERROR, err)
            reject(err)
          })
      })
    },
    [AUTH_LOGOUT]: ({commit, dispatch}) => {
      return Auth.logout()
        .then(() => {
          commit(AUTH_LOGOUT);
        });
    },
    [AUTH_USER]: ({commit, dispatch}) => {
      return Auth.user()
        .then((user) => {
          console.log(user)
          commit(AUTH_LOGOUT);
        });
    },
  }
}


const store = new Vuex.Store({
  modules: {
    auth
  }
});

export {
  AUTH_LOGIN,
  AUTH_LOGOUT
};

export default store;