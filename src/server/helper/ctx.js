import _ from 'lodash';
import chalk from 'chalk';
import moment from 'moment/moment';
import { log, err } from './logger';

const visitLog = (ctx, code, color = 'green') => {
  const now = moment().format('YYYY-MM-DD hh:mm:ss');
  const msgTag = `[${chalk.blue(now)}]`;
  const msgBody = `${ctx.method.toUpperCase()} ${code} ${ctx.url} @${ctx.ip}`;
  const msg = `${msgTag} ${chalk[color](msgBody)}`;
  return msg;
};

const success = (ctx, data, options = { code: 200 }) => {
  if (data) {
    ctx.body = data;
  }
  const { code } = options;
  ctx.status = code;
  log(visitLog(ctx, code, 'green'));
};

const fail = (ctx, e, options = { code: 500 }) => {
  if (e) {
    ctx.body = e.stack;
  }
  const { code } = options;
  ctx.status = code;
  err(e);
  err(visitLog(ctx, code, 'red'));
};

export {
  success,
  fail,
};
