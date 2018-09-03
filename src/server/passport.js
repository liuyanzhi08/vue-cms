// passport.js
const passport = require('koa-passport')
var LocalStrategy = require('passport-local').Strategy
import bcrypt from 'bcrypt'
import user from './models/user';



// 序列化ctx.login()触发
passport.serializeUser(function(user, done) {
  done(null, user.id)
})
// 反序列化（请求时，session中存在"passport":{"user":"1"}触发）
passport.deserializeUser(async function(id, done) {
  user.get(id).then((res) => {
    if (res) {
      done(null, res);
    } else {
      done(null, false);
    }
  }, (err) => {
    done(err);
  })
})
// 提交数据(策略)
passport.use(new LocalStrategy({
  // usernameField: 'email', //
  // passwordField: 'passwd'
}, function(username, password, done) {
  user.query({ username }).then((res) => {
    if (res.length) {
      var hash = res[0].password;
      if (bcrypt.compareSync(password, hash)) {
        done(null, res[0]);
      } else {
        done({ msg: 'username and password are unmatched' }, false);
      }
    } else {
      done({ msg: 'username is not existed' }, false);
    }
  }, (err) => {
    done(err);
  });
}))


module.exports = passport
