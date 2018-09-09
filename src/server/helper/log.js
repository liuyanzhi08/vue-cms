import { path } from '../config';
import fse from 'fs-extra';
import moment from 'moment';

const error = function (content) {
  var now = moment().format('YYYY-MM-DD hh:mm:ss');
  return fse.outputFile(path.log.error, `${now} ${content}\n`, {
    flag: 'a'
  }, (err) => {
    if (err) return console.error(err);
  });
};

const log = function (content) {
  var now = moment().format('YYYY-MM-DD hh:mm:ss');
  return fse.outputFile(path.log.access, `${now} ${content}\n`, {
    flag: 'a'
  }, (err) => {
    if (err) return error(`fail to write file: ${path.log.access}`);
  });
};

export {
  error,
  log,
}

export default log;
