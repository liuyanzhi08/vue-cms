import query from '../db/query'
import fs from 'fs'
import path from 'path'
import {db} from '../config'
import {savePage} from '../helper'

export default {
  get: function (ctx) {
    return new Promise(async (resolve, reject) => {
      await savePage('http://localhost:1991', path.resolve(__dirname, 'test.html'));
      resolve();
    })
  }
}


