import fs from 'fs';
import ctxHelper from '../helper/ctx';
import config from '../config';

const { success } = ctxHelper;
const { dir } = config;

export default {
  get: async (ctx) => {
    const themes = fs.readdirSync(dir.theme);
    success(ctx, { items: themes, total: themes.length });
  },
};
