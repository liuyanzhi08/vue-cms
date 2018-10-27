import chalk from 'chalk';
import _ from 'lodash';
import { isDev } from './env';
import { log, err } from './logger';

const accessLog = (ctx, color = 'green') => {
  const msg = `${ctx.method.toUpperCase()} ${ctx.status} ${ctx.url} @${ctx.ip}`;
  return `${chalk[color](msg)}`;
};

const success = (ctx, data, options = { code: 200 }) => {
  if (data) {
    ctx.body = data;
  }
  ctx.status = options.code;
  log(accessLog(ctx, 'green'));
  return data;
};

const fail = (ctx, e, options = { code: 500 }) => {
  // development mode print the error stack
  let output = e;
  if (e && e.stack) {
    if (isDev) {
      output = `${e.message}\n${e.stack}`;
    } else {
      output = {
        code: 0,
        msg: e.message,
      };
    }
  } else if (_.isArray(e)) {
    output = {
      code: e[0],
      msg: e[1],
    };
  }
  ctx.body = output;
  ctx.status = options.code;

  log(accessLog(ctx, 'red'));
  err(output);
  return output;
};

export {
  success,
  fail,
};
