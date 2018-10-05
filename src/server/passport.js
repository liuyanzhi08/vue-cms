// passport.js
import bcrypt from 'bcrypt';
import user from './models/user';
import { error } from './helper/error';

const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

// ctx.login() will trigger
passport.serializeUser((_user, done) => {
  done(null, _user.id);
});
// when a request with session("passport":{"user":"1"}) will trigger
passport.deserializeUser(async (id, done) => {
  user.get({ id }).then((res) => {
    if (res) {
      done(null, res);
    } else {
      done(null, false);
    }
  }, (err) => {
    done(err);
  });
});
// 提交数据(策略)
passport.use(new LocalStrategy({
  // usernameField: 'email', //
  // passwordField: 'passwd'
}, ((username, password, done) => {
  user.get({ username }).then((res) => {
    if (res) {
      const hash = res.password;
      if (bcrypt.compareSync(password, hash)) {
        delete res.password;
        done(null, res);
      } else {
        done(error.authUnmatched, false);
      }
    } else {
      done(error.authUserNotExisted, false);
    }
  }, (err) => {
    done(err);
  });
})));


export default passport;
