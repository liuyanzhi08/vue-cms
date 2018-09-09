import { server, path } from '../config';
import { savePageRecurse } from '../helper/spider';

export default {
  get: async (ctx) => {
    console.log(`${server.url}${path.user}`)
    await savePageRecurse(`${server.url}${path.user}`, path.static, 'index.html');
    ctx.body = { msg: 'success' };
  },
};
