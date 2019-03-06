import config from '../../config';

const pagination = {
  state: {
  },
  getters: {
    listKey: (state) => {
      console.log(state);
      if (!state.route) {
        return null;
      }
      const page = state.route.query._page || config.pagination.page;
      const num = state.route.query._num || config.pagination.num;
      const from = (page - 1) * num;
      const size = num;
      return `${from},${size}`;
    },
  },
  mutations: {
  },
  actions: {
    getListKey: ({ rootState }) => {
      const page = rootState.route.query._page || config.pagination.page;
      const num = rootState.route.query._num || config.pagination.num;
      const from = (page - 1) * num;
      const size = num;
      return `${from},${size}`;
    },
  },
};

export {
  pagination,
};
