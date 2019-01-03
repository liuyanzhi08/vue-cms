import config from '../../config';

const { path } = config;

const url = {
  state: {
    uri: '',
  },
  getters: {
    index: (state, getters) => (getters.isPublish ? '' : path.user),
  },
  mutations: {
  },
  actions: {
  },
};

export {
  url,
};
