import fs from 'fs';
import ctxHelper from '../helper/ctx';
import config from '../config';

const { success } = ctxHelper;
const { dir } = config;

class Theme {
  async get(ctx) {
    const themes = fs.readdirSync(dir.theme);
    success(ctx, { items: themes, total: themes.length });
  }
}

export default Theme;
