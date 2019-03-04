import config from '../../config';

const pagination = {
  state: {
  },
  getters: {
    listKey: (state) => {
      if (!state.route) {
        return null;
      }
      console.log(state.route)
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
  },
};

export {
  pagination,
};
