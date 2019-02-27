import bcrypt from 'bcrypt';
import passport from '../passport';
import user from '../models/user';
import ctxHelper from '../helper/ctx';
import error from '../helper/error';

const { success, fail } = ctxHelper;

class Auth {
  async post(ctx) {
    const action = ctx.params.id;
    switch (action) {
      case 'register': {
        const data = ctx.request.body;
        // obj.created_at = moment().format('YYYY-MM-DD HH:mm:ss');
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(data.password, salt);
        data.password = hash;
        await user.get(data).then((res) => {
          if (res) {
            return success(ctx, { msg: 'user exists' });
          }
          return user.save(data).then(
            _res => success(ctx, { id: _res[0] }),
            (err) => {
              fail(ctx, err);
            },
          );
        }, (err) => {
          fail(ctx, err);
        });
        break;
      }
      case 'login':
        await new Promise((resolve, reject) => {
          passport.authenticate(
            'local',
            (err, _user) => {
              if (_user && !err) {
                ctx.login(_user);
                ctx.cookies.set('auth:user', _user.id, {
                  path: '/',
                  maxAge: 60 * 60 * 1000, // 1 hour to expire
                  httpOnly: false,
                  overwrite: false,
                });
                resolve(success(ctx, _user));
              } else if (err) {
                reject(fail(ctx, err));
              } else {
                reject(fail(ctx, error.authUserMissing));
              }
            },
          )(ctx);
        });
        break;
      case 'logout':
        // ctx.logout();
        ctx.cookies.set('koa:sess', null);
        ctx.cookies.set('koa:sess.sig', null);
        ctx.cookies.set('auth:user', null);
        ctx.cookies.set('auth:user.sig', null);
        success(ctx, { msg: 'successfully logout' });
        break;
      default:
    }
    return true;
  }

  async get(ctx) {
    const action = ctx.params.id;
    switch (action) {
      case 'user':
        if (!ctx.isAuthenticated()) {
          fail(ctx, error.unauthorized, { code: 401 });
          return;
        }
        success(ctx, {
          id: ctx.state.user.id,
          username: ctx.state.user.username,
        });
        break;
      case 'login':
      case 'logout':
      default:
        fail(ctx, null, { code: 404 });
    }
  }
}

export default Auth;
