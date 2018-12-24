import config from '../../../config';

const tableName = `${config.db.prefix}_common`;

exports.seed = knex => knex(tableName).del()
  .then(() => knex(tableName).insert({
    theme: 'default',
  }));
