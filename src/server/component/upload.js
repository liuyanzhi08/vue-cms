import fs from 'fs';
import $path from 'path';
import fse from 'fs-extra';
import nanoid from 'nanoid';
import ctxHelper from '../helper/ctx';
import error from '../helper/error';
import config from '../config';

const { dir, path } = config;
const { success, fail } = ctxHelper;

class Upload {
  async post (ctx) {
    if (!ctx.isAuthenticated()) {
      fail(ctx, error.authUnauthorized, { code: 401 });
      return;
    }

    fse.ensureDirSync(dir.upload);
    const { file } = ctx.request.body.files;
    const reader = fs.createReadStream(file.path);
    const randomName = `${nanoid(10)}${$path.extname(file.name)}`;
    const targetPath = `${dir.upload}/${randomName}`;
    const upStream = fs.createWriteStream(targetPath);
    reader.pipe(upStream);
    success(ctx, { url: `${path.upload}/${randomName}` });
  }
}

export default Upload;
