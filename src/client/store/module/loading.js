import UIkit from 'uikit';

const LOADING = 'loading:loading';
const LOADED = 'loading:loaded';

const notice = {
  state: {
  },
  mutations: {
  },
  actions: {
    [NOTICE_SEND]: (ctx, msg, options = { timeout: 1000 }) => {
      UIkit.notification(msg, options);
    },
  },
};

export {
  NOTICE_SEND,
  notice,
};
