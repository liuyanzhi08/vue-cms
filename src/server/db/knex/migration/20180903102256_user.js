import { db } from '../../../config';

const userTable = `${db.prefix}_user`;

exports.up = knex => knex.schema.createTable(userTable, (table) => {
  table.increments();
  table.string('username').unique().notNullable();
  table.string('password').notNullable();
  table.dateTime('created_at', 6).notNullable().defaultTo(knex.fn.now(6));
  table.timestamp('updated_at', 6);
});

exports.down = knex => knex.schema.dropTable(userTable);
