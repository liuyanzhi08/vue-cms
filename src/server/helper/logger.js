import fse from 'fs-extra';
import moment from 'moment';
import _ from 'lodash';
import chalk from 'chalk';
import { path } from '../config';

const err = (input, color = 'red') => {
  let content = input;
  if (_.isObject(content)) {
    if (content instanceof Error) {
      content = content.toString();
    } else {
      content = JSON.stringify(content);
    }
  }
  const now = moment().format('YYYY-MM-DD hh:mm:ss');
  const msg = `[${chalk.blue(now)}] ${chalk[color](content)}`;
  console.error(msg);
  return fse.outputFile(path.log.error, `${msg}\n`, {
    flag: 'a',
  }, (_err) => {
    if (_err) {
      console.error(_err);
    }
    return err;
  });
};

const log = function (input, color = 'green') {
  let content = input;
  if (_.isObject(content)) {
    if (content instanceof Error) {
      content = content.toString();
    } else {
      content = JSON.stringify(content);
    }
  }
  const now = moment().format('YYYY-MM-DD hh:mm:ss');
  const msg = `[${chalk.blue(now)}] ${chalk[color](content)}`;
  console.log(msg);
  return fse.outputFile(path.log.access, `${msg}\n`, {
    flag: 'a',
  }, (_err) => {
    if (_err) {
      err(`fail to write file '${path.log.access}'`);
    }
    return _err;
  });
};

export {
  err,
  log,
};

export default log;
