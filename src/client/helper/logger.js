import _ from 'lodash';

const tag = 'vms';
const err = (content, ...extra) => {
  if (_.isObject(content)) {
    console.error(`[${tag}]`, content, ...extra);
  } else {
    console.error(`[${tag}] ${content}`, ...extra);
  }
};

const log = function (content, ...extra) {
  if (_.isObject(content)) {
    console.log(`[${tag}]`, content, ...extra);
  } else {
    console.log(`[${tag}] ${content}`, ...extra);
  }
};

export {
  err,
  log,
};

export default log;
