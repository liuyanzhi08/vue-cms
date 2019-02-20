import config from '../../../config';

const categoryTable = `${config.db.prefix}_category`;

exports.up = knex => knex.schema.createTable(categoryTable, (table) => {
  table.increments();
  table.string('title').notNullable();
  table.text('description').notNullable();
  table.string('theme').notNullable();
  table.string('image_url');
  table.integer('parent_id').unsigned().nullable();
  table.foreign('parent_id').references(`${categoryTable}.id`).onDelete('CASCADE');
  table.dateTime('created_at', 6).notNullable().defaultTo(knex.fn.now(6));
  table.timestamp('updated_at', 6);
});

exports.down = knex => knex.schema.dropTable(categoryTable);
