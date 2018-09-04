import Vuex from 'vuex';
import auth from './module/auth';
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_USER } from "./module/auth";


const store = new Vuex.Store({
  modules: {
    auth
  }
});

export {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_USER
};

export default store;
