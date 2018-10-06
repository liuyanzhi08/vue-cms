import Vuex from 'vuex';
import {
  AUTH_LOGIN, AUTH_LOGOUT, AUTH_USER, auth,
} from './module/auth';
import {
  MENU_SET, MENU_SHOW, MENU_HIDE, MENU_TOGGLE, menu,
} from './module/menu';
import { NOTICE_SEND, notice } from './module/notice';
import { ARTICLE_FETCH, article } from './module/article';
import { URI_GET, URI_SET, uri } from './module/uri';
import { api } from './module/api';

class Store {
  constructor() {
    return new Vuex.Store({
      modules: {
        auth,
        menu,
        notice,
        article,
        uri,
        api,
      },
    });
  }
}

export {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_USER,
  MENU_SET,
  MENU_SHOW,
  MENU_HIDE,
  MENU_TOGGLE,
  NOTICE_SEND,
  ARTICLE_FETCH,
  URI_SET,
  URI_GET,
  Store,
};
