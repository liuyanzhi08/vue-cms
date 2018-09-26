import bcrypt from 'bcryptjs';
import { db } from '../../config';

const tableName = `${db.prefix}_user`;

exports.seed = knex => knex(tableName).del()
  .then(() => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync('jack', salt);
    return knex(tableName).insert({
      username: 'jack',
      password: hash,
    });
  })
  .then(() => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync('rose', salt);
    return knex(tableName).insert({
      username: 'rose',
      password: hash,
    });
  })
  .then(() => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync('1', salt);
    return knex(tableName).insert({
      username: '1',
      password: hash,
    });
  });
