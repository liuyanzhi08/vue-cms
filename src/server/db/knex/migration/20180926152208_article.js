import { db } from '../../../config';

const articleTable = `${db.prefix}_article`;
const categoryTable = `${db.prefix}_category`;

exports.up = knex => knex.schema.createTable(articleTable, (table) => {
  table.increments();
  table.string('title').notNullable();
  table.text('content').notNullable();
  table.text('summary').nullable();
  table.integer('category_id').unsigned().nullable();
  table.foreign('category_id').references(`${categoryTable}.id`).onDelete('CASCADE');
  table.timestamp('created_time').defaultTo(knex.fn.now());
  table.timestamp('updated_time').defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable(articleTable);
