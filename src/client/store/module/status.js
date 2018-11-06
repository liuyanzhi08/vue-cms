const STATUS_SET = 'status:set';
const STATUS_INIT = 'status:init';
const STATUS_FETCH = 'status:fetch';
const STATUS_GOT = 'status:set';
const STATUS_404 = 'status:404';

const status = {
  state: {
    status: {
      article: STATUS_INIT,
      category: STATUS_INIT,
    },
  },
  getters: {
    articleStatus: state => state.status.article,
  },
  mutations: {
    // eslint-disable-next-line
    [STATUS_SET]: (state, { type, status }) => {
      state.status[type] = status;
    },
  },
};

export {
  STATUS_SET,
  STATUS_INIT,
  STATUS_FETCH,
  STATUS_GOT,
  STATUS_404,
  status,
};
