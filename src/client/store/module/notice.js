import UIkit from 'uikit';

const NOTICE_SEND = 'notice:send';

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
