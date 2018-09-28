import _ from 'lodash';
import { log, err } from './logger';

const success = (ctx, data, options = { code: 200 }) => {
  if (data) {
    ctx.body = data;
  }
  ctx.status = options.code;
  // log
  const msg = `${ctx.method.toUpperCase()} ${options.code} ${ctx.url} @${ctx.ip}`;
  log(msg);
  return Promise.resolve(data);
};

const fail = (ctx, _err, options = { code: 500 }) => {
  if (_err) {
    ctx.body = _err;
  }
  ctx.status = options.code;
  // log
  let content = _err;
  if (_.isObject(content)) {
    if (_err instanceof Error) {
      content = content.toString();
    } else {
      content = JSON.stringify(content);
    }
  }
  const msg = `${ctx.method.toUpperCase()} ${options.code} ${ctx.url} @${ctx.ip}`;
  err(msg);
  err(`↳error: ${content}`);
  return _err;
};

export {
  success,
  fail,
};
