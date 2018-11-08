import config from '../../../config';

const { db } = config;

const articleTable = `${db.prefix}_article`;
const categoryTable = `${db.prefix}_category`;

exports.up = knex => knex.schema.createTable(articleTable, (table) => {
  table.increments();
  table.string('title').notNullable();
  table.text('content').notNullable();
  table.text('summary').nullable();
  table.integer('category_id').unsigned().nullable();
  table.foreign('category_id').references(`${categoryTable}.id`).onDelete('CASCADE');
  table.dateTime('created_at', 6).notNullable().defaultTo(knex.fn.now(6));
  table.timestamp('updated_at', 6);
});

exports.down = knex => knex.schema.dropTable(articleTable);
