async function up(knex) {
  return knex.schema.createTable('exceptions', table => {
    table.increments('id').primary();
    table.string('from').notNullable();
    table.string('to').notNullable();
  });
}

async function down(knex) {
  return knex.schema.dropTable('exceptions');
}

module.exports = { up, down };
