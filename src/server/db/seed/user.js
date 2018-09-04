const bcrypt = require('bcryptjs');

exports.seed = (knex, Promise) => {
  return knex('vms_user').del()
    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync('jack', salt);
      return Promise.join(
        knex('vms_user').insert({
          username: 'jack',
          password: hash
        })
      );
    })
    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync('rose', salt);
      return Promise.join(
        knex('vms_user').insert({
          username: 'rose',
          password: hash
        })
      );
    })
    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync('1', salt);
      return Promise.join(
        knex('vms_user').insert({
          username: '1',
          password: hash
        })
      );
    });
};
