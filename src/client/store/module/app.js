import config from '../../config';

const { rnames } = config;
const APP_SET_PUBLISH = 'app:set:publish';
const APP_GOTO = 'app:go:page';

const app = {
  state: {
    isPublish: false,
  },
  getters: {
    isPublish: state => state.isPublish,
  },
  mutations: {
    [APP_SET_PUBLISH]: (state, value) => {
      state.isPublish = value;
    },
  },
  actions: {
    [APP_SET_PUBLISH]: ({ commit }, value) => {
      commit(APP_SET_PUBLISH, value);
    },
    [APP_GOTO]: ({ state }, router, name, query) => {
      const params = {
        query,
      };
      if (state.isPublish) {
        params.path = '/category';
      } else {
        params.name = rnames.list;
      }
      switch (name) {
        case 'list':
          router.push(params);
          break;
        default:
      }
    },
  },
};

export {
  APP_SET_PUBLISH,
  APP_GOTO,
  app,
};
