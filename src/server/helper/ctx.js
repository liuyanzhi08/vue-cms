import chalk from 'chalk';
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
  const { code } = options;
  ctx.status = code;
  log(accessLog(ctx, 'green'));
};

const fail = (ctx, e, options = { code: 500 }) => {
  // development mode print the error stack
  if (e instanceof Error && isDev) {
    ctx.body = e.stack;
  } else {
    ctx.body = e;
  }
  const { code } = options;
  ctx.status = code;
  log(accessLog(ctx, 'red'));
  err(e);
};

export {
  success,
  fail,
};
