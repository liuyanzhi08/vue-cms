const success = (resolve, ctx, data) => {
  ctx.body = data;
  resolve(data);
};

const fail = (reject, ctx, err, options = { code: 500 }) => {
  if (err) {
    ctx.body = err;
  }
  ctx.status = options.code;
  reject(err);
};

export {
  success,
  fail
};