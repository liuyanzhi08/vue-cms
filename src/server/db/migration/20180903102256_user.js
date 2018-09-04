import { db } from '../../config';

const userTable = `${db.prefix}_user`;

exports.up = function(knex, Promise) {
  return knex.schema.createTable(userTable, function (table) {
    table.increments();
    table.string('username').unique().notNullable();
    table.string('password').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable(userTable);
};
