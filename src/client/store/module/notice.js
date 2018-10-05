const NOTICE_SEND = 'notice:send';

const notice = {
  state: {
  },
  mutations: {
  },
  actions: {
    [NOTICE_SEND]: async (ctx, msg, options = { timeout: 1000 }) => {
      const uk = import('uikit');
      uk.notification(msg, options);
    },
  },
};

export {
  NOTICE_SEND,
  notice,
};
