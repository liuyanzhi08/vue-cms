import Vuex from 'vuex';
import {
  AUTH_LOGIN, AUTH_LOGOUT, AUTH_USER, AUTH_USER_ID, auth,
} from './module/auth';
import {
  MENU_SET, MENU_SHOW, MENU_HIDE, MENU_TOGGLE, menu,
} from './module/menu';
import { NOTICE_SEND, notice } from './module/notice';
import { ARTICLE_FETCH, article } from './module/article';
import { CATEGORY_FETCH, category } from './module/category';
import { url } from './module/url';
import { API_SET, api } from './module/api';
import {
  STATUS_SET, STATUS_INIT, STATUS_FETCH, STATUS_GOT, STATUS_404, status,
} from './module/status';
import { THEME_SET, THEME_GET, theme } from './module/theme';
import { APP_SET_PUBLISH, app } from './module/app';

class Store {
  constructor() {
    return new Vuex.Store({
      modules: {
        auth,
        menu,
        notice,
        article,
        category,
        uri: url,
        api,
        status,
        theme,
        app,
      },
    });
  }
}

export {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_USER,
  AUTH_USER_ID,
  MENU_SET,
  MENU_SHOW,
  MENU_HIDE,
  MENU_TOGGLE,
  NOTICE_SEND,
  ARTICLE_FETCH,
  CATEGORY_FETCH,
  API_SET,
  STATUS_SET,
  STATUS_INIT,
  STATUS_FETCH,
  STATUS_GOT,
  STATUS_404,
  THEME_SET,
  THEME_GET,
  APP_SET_PUBLISH,
  Store,
};
