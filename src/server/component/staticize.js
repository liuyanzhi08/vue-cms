import { server, path } from '../config';
import { savePageRecurse } from '../helper/spider';

export default {
  get: async (ctx) => {
    await savePageRecurse(`${server.url}${path.user}`, path.static, 'index.html');
    ctx.body = { msg: 'success' };
  },
};
