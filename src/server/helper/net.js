import request from 'request';
import fs from 'fs';
import fse from 'fs-extra';
import nanoid from 'nanoid';
import $path from 'path';
import config from '../config';
import logger from './logger';

const { dir, path } = config;
const { err } = logger;

const downloadFile = (url) => {
  fse.ensureDirSync(dir.upload);
  const randomName = `${nanoid(10)}${$path.extname(url)}`;
  const targetPath = `${dir.upload}/${randomName}`;
  request(url)
    .on('error', (e) => {
      err(`net: failed to fetch ${url}`);
      err(e);
    })
    .pipe(fs.createWriteStream(targetPath))
    .on('error', (e) => {
      err(`net: failed to write ${targetPath}`);
      err(e);
    });
  return `${path.upload}/${randomName}`;
};

export default {
  downloadFile,
};
