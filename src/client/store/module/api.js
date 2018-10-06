import axios from 'axios/index';
import resource from 'resource-axios';

// const URI_SET = 'uri:set';

const api = {
  state: {
    api: {
      article: resource('/api/article', axios),
      category: resource('/api/category', axios),
      auth: {
        async login(user) {
          const res = await axios({
            url: '/api/auth/login',
            data: user,
            method: 'POST',
          });
          return res.data;
        },
        async logout() {
          const res = await axios({
            url: '/api/auth/logout',
            method: 'POST',
          });
          return res.data;
        },
        async user() {
          const res = axios({
            url: '/api/auth/user',
            method: 'GET',
          });
          return res.data;
        },
      },
      common: {
        staticize: () => axios.get('/api/staticize'),
      },
    },
  },
  getters: {
    Article: state => state.api.article,
    Category: state => state.api.category,
    Auth: state => state.api.auth,
    Common: state => state.api.common,
  },
  mutations: {
    // [URI_GET]: (state, value) => {
    //   state.uri = value;
    // },
  },
  actions: {
    // [URI_GET]: ({ state }) => state.uri,
    // [URI_SET]: ({ commit }, value) => commit(URI_SET, value),
  },
};

export {
  api,
};
