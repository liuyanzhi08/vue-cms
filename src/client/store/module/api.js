import axios from 'axios/index';
import resource from 'resource-axios';

const API_SET = 'api:set';
const API_URI_SET = 'api:uri:set';

const api = {
  state: {
    uri: '',
  },
  getters: {
    Article: state => resource(`${state.uri}/api/article`, axios),
    Category: state => resource(`${state.uri}/api/category`, axios),
    Auth: state => ({
      async login(user) {
        const res = await axios({
          url: `${state.uri}/api/auth/login`,
          data: user,
          method: 'post',
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
        const res = await axios({
          url: `${state.uri}/api/auth/user`,
          method: 'GET',
        });
        return res.data;
      },
    }),
    Theme: state => resource(`${state.uri}/api/theme`, axios),
    Common: state => resource(`${state.uri}/api/common`, {
      publish: data => axios.post(`${state.uri}/api/publish`, data),
      upload: data => axios({
        url: `${state.uri}/api/upload`,
        method: 'post',
        data,
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
      search: params => axios.get(`${state.uri}/api/search`, { params }),
    }, axios),
    Spider: state => resource(`${state.uri}/api/spider`, axios),
  },
  mutations: {
    [API_URI_SET]: (state, value) => {
      state.uri = value;
    },
  },
  actions: {
    [API_SET]: ({ commit }, uri) => {
      commit(API_URI_SET, uri);
    },
  },
};

export {
  API_SET,
  api,
};
