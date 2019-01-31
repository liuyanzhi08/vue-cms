import config from '../../../config';

const userTable = `${config.db.prefix}_common`;

exports.up = knex => knex.schema.createTable(userTable, (table) => {
  table.increments();
  table.string('index_theme').notNullable();
  table.string('search_theme').notNullable();
  table.dateTime('created_at', 6).notNullable().defaultTo(knex.fn.now(6));
  table.timestamp('updated_at', 6);
});

exports.down = knex => knex.schema.dropTable(userTable);
