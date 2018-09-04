import query from '../db/query'
import fs from 'fs'
import path from 'path'
import {db} from '../config'
import {saveSite} from '../helper/spider'
import {userRoot} from "../../client/config";

export default {
  get: async (ctx) => {
    await saveSite(`http://localhost:1991${userRoot}`, path.resolve(__dirname));
    ctx.body = { msg: 'success' };
  }
}


