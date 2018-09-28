import Vuex from 'vuex';
import {
  AUTH_LOGIN, AUTH_LOGOUT, AUTH_USER, auth,
} from './module/auth';
import {
  MENU_SET, MENU_SHOW, MENU_HIDE, MENU_TOGGLE, menu,
} from './module/menu';
import {
  NOTICE_SEND,
  notice,
} from './module/notice';

const store = new Vuex.Store({
  modules: {
    auth,
    menu,
    notice,
  },
});

export {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_USER,
  MENU_SET,
  MENU_SHOW,
  MENU_HIDE,
  MENU_TOGGLE,
  NOTICE_SEND,
  store,
};
