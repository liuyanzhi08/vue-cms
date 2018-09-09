import fse from 'fs-extra';
import moment from 'moment';
import _ from 'lodash';
import chalk from 'chalk';
import { path } from '../config';

const err = function (content) {
  if (_.isObject(content)) {
    content = JSON.stringify(content);
  }
  var now = moment().format('YYYY-MM-DD hh:mm:ss');
  const msg = `[${chalk.blue(now)}] ${chalk.red(content)}`;
  console.error(chalk.red(msg));
  return fse.outputFile(path.log.error, `${msg}\n`, {
    flag: 'a'
  }, (err) => {
    if (err) return console.error(err);
  });
};

const log = function (content) {
  if (_.isObject(content)) {
    content = JSON.stringify(content);
  }
  var now = moment().format('YYYY-MM-DD hh:mm:ss');
  const msg = `[${chalk.blue(now)}] ${chalk.green(content)}`;
  console.log(msg);
  return fse.outputFile(path.log.access, `${msg}\n`, {
    flag: 'a'
  }, (_err) => {
    if (_err) return err(`fail to write file '${path.log.access}'`);
  });
};

export {
  err,
  log,
}

export default log;
