const APP_SET_PUBLISH = 'app:set:publish';

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
  },
};

export {
  APP_SET_PUBLISH,
  app,
};
