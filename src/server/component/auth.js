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
              ctx.body = {user, err, info, status};
              if (user) {
                ctx.login(user);
              } else {
                fail(reject, ctx, { msg: 'user and password are unmatched'});
              }
              resovle();
            })(ctx);
          break;
        case 'logout':
          ctx.logout();
          ctx.body = {auth: ctx.isAuthenticated(), user: ctx.state.user};
          resovle();
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
