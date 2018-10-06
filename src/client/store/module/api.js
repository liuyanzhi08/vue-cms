import axios from 'axios/index';
import resource from 'resource-axios';
import path from 'path';

const API_UPDATE = 'api:update';
const API_URI_SET = 'api:uri:set';

const api = {
  state: {
    uri: '',
    api: null,
  },
  getters: {
    Article: state => state.api.article,
    Category: state => state.api.category,
    Auth: state => state.api.auth,
    Common: state => state.api.common,
  },
  mutations: {
    [API_UPDATE]: (state, value) => {
      state.api = value;
    },
    [API_URI_SET]: (state, value) => {
      state.uri = value;
    },
  },
  actions: {
    [API_UPDATE]: ({ commit, state }, uri) => {
      commit(API_URI_SET, uri);
      commit(API_UPDATE, {
        article: resource(`${state.uri}/api/article`, axios),
        category: resource(`${state.uri}/api/category`, axios),
        auth: {
          async login(user) {
            const res = await axios({
              url: `${state.uri}/api/auth/login`,
              data: user,
              method: 'POST',
            });
            return res.data;
          },
          async logout() {
            const res = await axios({
              url: `${state.uri}/api/auth/logout`,
              method: 'POST',
            });
            return res.data;
          },
          async user() {
            const res = axios({
              url: `${state.uri}/api/auth/user`,
              method: 'GET',
            });
            return res.data;
          },
        },
        common: {
          staticize: () => axios.get(`${state.uri}/api/staticize`),
        },
      });
    },
  },
};

export {
  API_UPDATE,
  api,
};
