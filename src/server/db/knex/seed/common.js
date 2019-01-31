import config from '../../../config';

const tableName = `${config.db.prefix}_common`;

exports.seed = knex => knex(tableName).del()
  .then(() => knex(tableName).insert({
    index_theme: config.theme,
    search_theme: config.theme,
  }));
