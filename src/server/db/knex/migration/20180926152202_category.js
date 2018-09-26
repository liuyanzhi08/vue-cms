import { db } from '../../../config';

const categoryTable = `${db.prefix}_category`;

exports.up = knex => knex.schema.createTable(categoryTable, (table) => {
  table.increments();
  table.string('title').notNullable();
  table.text('description').notNullable();
  table.integer('parent_id').unsigned().nullable();
  table.foreign('parent_id').references(`${categoryTable}.id`).onDelete('CASCADE');
  table.dateTime('created_at', 6).notNullable().defaultTo(knex.fn.now(6));
  table.timestamp('updated_at', 6);
});

exports.down = knex => knex.schema.dropTable(categoryTable);
