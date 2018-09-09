import { path } from '../config';
import fse from 'fs-extra';
import moment from 'moment';

const err = function (content) {
  var now = moment().format('YYYY-MM-DD hh:mm:ss');
  const msg = `[${now}] ${content}\n`;
  console.error(msg);
  return fse.outputFile(path.log.error, msg, {
    flag: 'a'
  }, (err) => {
    if (err) return console.error(err);
  });
};

const log = function (content) {
  var now = moment().format('YYYY-MM-DD hh:mm:ss');
  const msg = `[${now}] ${content}\n`;
  console.log(msg);
  return fse.outputFile(path.log.access, msg, {
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
