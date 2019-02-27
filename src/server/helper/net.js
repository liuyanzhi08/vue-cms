import request from 'request';
import fs from 'fs';
import nanoid from 'nanoid';
import $path from 'path';
import config from '../config';
import logger from '../helper/logger';

const { dir, path } = config;
const { err } = logger;

const downloadFile = (url) => {
  const randomName = `${nanoid(10)}${$path.extname(url)}`;
  const targetPath = `${dir.upload}/${randomName}`;
  request(url)
    .pipe(fs.createWriteStream(targetPath))
    .on('close', () => {
    })
    .on('error', (e) => {
      err(e);
    });
  return `${path.upload}/${randomName}`;
};

export default {
  downloadFile,
};
