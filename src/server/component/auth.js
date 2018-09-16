import bcrypt from 'bcrypt';
import passport from '../passport';
import user from '../models/user';
import { success, fail } from '../helper/ctx';

export default {
  post: ctx => new Promise((resovle, reject) => {
    const action = ctx.params.id;
    switch (action) {
      case 'register': {
        const data = ctx.request.body;
        // obj.create_time = moment().format('YYYY-MM-DD HH:mm:ss');
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(data.password, salt);
        data.password = hash;
        user.query(data).then((res) => {
          if (res.length) {
            success(resovle, ctx, { msg: 'user exists' });
          } else {
            user.create(data).then((_res) => {
              success(resovle, ctx, { id: _res[0] });
            }, (err) => {
              fail(reject, ctx, err);
            });
          }
        }, (err) => {
          fail(reject, ctx, err);
        });
        break;
      }
      case 'login':
        passport.authenticate(
          'local',
          (err, _user) => {
            if (_user && !err) {
              ctx.login(_user);
              ctx.cookies.set('auth:user', user.id, {
                path: '/', // 写cookie所在的路径
                maxAge: 60 * 60 * 1000, // cookie有效时长
                httpOnly: false, // 是否只用于http请求中获取
                overwrite: false, // 是否允许重写
              });
              success(resovle, ctx, _user);
            } else {
              fail(reject, ctx, err.message);
            }
          },
        )(ctx);
        break;
      case 'logout':
        // ctx.logout();
        ctx.cookies.set('koa:sess', null);
        ctx.cookies.set('koa:sess.sig', null);
        ctx.cookies.set('auth:user', null);
        ctx.cookies.set('auth:user.sig', null);
        success(resovle, ctx, { msg: 'successfully logout' });
        break;
      default:
        resovle();
    }
    return true;
  }),
  get: ctx => new Promise((resolve, reject) => {
    const action = ctx.params.id;
    switch (action) {
      case 'user':
        if (!ctx.isAuthenticated()) {
          return fail(reject, ctx, { msg: 'unauthorized' }, { code: 401 });
        }
        success(resolve, ctx, {
          id: ctx.state.user.id,
          username: ctx.state.user.username,
        });
        break;
      case 'login':
      case 'logout':
      default:
        fail(reject, ctx, null, { code: 404 });
    }
    return true;
  }),
};
