import axios from 'axios/index';
import resource from 'resource-axios';

const API_SET = 'api:set';
const API_GET = 'api:get';
const API_URI_SET = 'api:uri:set';

const api = {
  state: {
    uri: '',
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
    [API_GET]: ({ state }, type) => {
      let actions;
      switch (type) {
        case 'auth':
          actions = {
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
          };
          break;
        case 'common':
          actions = {
            staticize: () => axios.get(`${state.uri}/api/staticize`),
          };
          break;
        default:
          actions = resource(`${state.uri}/api/${type}`, axios);
      }
      console.log(actions.get);
      return actions;
    },
  },
};

export {
  API_SET,
  API_GET,
  api,
};
