import moment from 'moment'

import passport from '../passport';
import query from '../db/query';
import user from '../models/user';
import { success, fail } from "../helper/ctx";

export default {
  post: (ctx) => {
    return new Promise((resovle, reject) => {
      const action = ctx.params.id;
      switch (action) {
        case 'register':
          const data = ctx.request.body;
          // obj.create_time = moment().format('YYYY-MM-DD HH:mm:ss');

          user.query(data).then((res) => {
            if (res.length) {
              success(resovle, ctx, { msg: 'user exists' });
            } else {
              user.create(data).then((res) => {
                success(resovle, ctx, { id: res[0] });
              }, (err) => {
                fail(reject, ctx, err);
              });
            }
          }, (err) => {
            fail(reject, ctx, err);
          });
          break;
        case 'login':
          return passport.authenticate('local',
            function(err, user, info, status) {
              if (user) {
                ctx.login(user);
                success(resovle, ctx, user);
              } else {
                fail(reject, ctx, { msg: 'user and password are unmatched' });
              }
            })(ctx);
          break;
        case 'logout':
          ctx.cookies.set('koa:sess.sig', null)
          ctx.logout();
          success(resovle, ctx, { msg: 'successfully logout' });
          break;
        default:
          resovle();
      }
    });
  },
  get: (ctx) => {
    ctx.status = 404;
  },
};
