import fse from 'fs-extra';
import _ from 'lodash';
import { path } from '../config';
import { isDev } from './env';

const resolve = (data) => {
  let obj = data;
  let msg = data;
  if (_.isObject(data)) {
    if (data instanceof Error) {
      msg = data.stack;
      obj = data;
    } else {
      msg = JSON.stringify(data);
      obj = new Error(msg);
    }
  }
  return {
    obj,
    msg,
  };
};

const writeLog = (logPath, logMsg) => {
  fse.outputFile(logPath, `${logMsg}\n`, {
    flag: 'a',
  }, (e) => {
    if (e) {
      // eslint-disable-next-line
      console.error(e);
    }
  });
};

const err = (error) => {
  const { obj, msg } = resolve(error);
  // if (isDev) {
  //   throw obj;
  // }
  // eslint-disable-next-line
  console.error(msg);
  writeLog(path.log.error, msg);
};

const log = (data) => {
  const { msg } = resolve(data);
  // eslint-disable-next-line
  console.log(msg);
  writeLog(path.log.error, msg);
};

export {
  err,
  log,
};

export default log;
