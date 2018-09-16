import Vuex from 'vuex';
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_USER, auth } from './module/auth';


const store = new Vuex.Store({
  modules: {
    auth,
  },
});

export {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_USER,
  store,
};
