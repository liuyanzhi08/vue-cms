import { db } from '../../config';

const categoryTable = `${db.prefix}_category`;

exports.up = knex => knex.schema.createTable(categoryTable, (table) => {
  table.increments();
  table.string('title').notNullable();
  table.text('description').notNullable();
  table.integer('parent_id').unsigned().nullable();
  table.foreign('parent_id').references(`${categoryTable}.id`).onDelete('CASCADE');
  table.timestamp('created_time').defaultTo(knex.fn.now());
  table.timestamp('updated_time').defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable(categoryTable);
