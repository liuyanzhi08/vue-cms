import fse from 'fs-extra';
import moment from 'moment/moment';
import _ from 'lodash';
import chalk from 'chalk';
import safeStringify from 'safe-json-stringify';
import { dir } from '../config';
import { isDev } from './env';

const stringify = (data, color) => {
  let msg = data;
  if (_.isObject(data)) {
    if (data instanceof Error) {
      msg = data.stack;
    } else {
      msg = safeStringify(data);
    }
  }
  const now = moment().format('YYYY-MM-DD hh:mm:ss');
  const timeTag = `[${chalk.blue(now)}]`;
  return `${timeTag} ${color ? chalk[color](msg) : msg}`;
};

const writeLog = (logPath, logMsg) => {
  if (isDev) {
    return;
  }

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
  const msg = stringify(error, 'red');
  // eslint-disable-next-line
  console.error(msg);
  writeLog(dir.log.error, msg);
};

const log = (data) => {
  const msg = stringify(data);
  // eslint-disable-next-line
  console.log(msg);
  writeLog(dir.log.access, msg);
};

export {
  err,
  log,
};

export default log;
