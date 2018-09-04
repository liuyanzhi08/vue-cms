import fs from 'fs'
import {server, path} from '../config'
import {savePageRecurse} from '../helper/spider'
import {userRoot} from "../../client/config";

export default {
  get: async (ctx) => {
    await savePageRecurse(`${server.url}${userRoot}`, path.static, 'index.html');
    ctx.body = { msg: 'success' };
  }
}


