import Vuex from 'vuex';
import Cookie from 'js-cookie';
import Auth from './api/auth';

const AUTH_REQUEST = 'AUTH_REQUEST';
const AUTH_LOGIN = 'AUTH_LOGIN';
const AUTH_LOGOUT = 'AUTH_LOGOUT';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const AUTH_ERROR = 'AUTH_ERROR';

const auth = {
  state: {
    status: null,
    user: null
  },
  getters: {
    isAuthenticated: (state) => {
      return !!state.user;
    },
  },
  mutations: {
    [AUTH_REQUEST]: (state) => {
      state.status = 'loading'
    },

    [AUTH_SUCCESS]: (state, user) => {
      state.status = 'success'
      state.user = user
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
    }
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