import { path } from '../config';
import fse from 'fs-extra';
import moment from 'moment';

const log = function (content) {
  var now = moment().format('YYYY-MM-DD hh:mm:ss');
  return fse.outputFile(path.log.access, `${now} ${content}\n`, {
    flag: 'a'
  });
};

export default log;
