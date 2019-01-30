import fs from 'fs';
import fse from 'fs-extra';
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

    fse.ensureDirSync(dir.uploadDir);
    const { file } = ctx.request.body.files;
    const reader = fs.createReadStream(file.path);
    const targetPath = `${dir.uploadDir}/${file.name}`;
    const upStream = fs.createWriteStream(targetPath);
    reader.pipe(upStream);
    success(ctx, { url: `${path.upload}${file.name}` });
  }
}

export default Upload;
