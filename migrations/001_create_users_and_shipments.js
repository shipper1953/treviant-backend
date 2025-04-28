export function up(knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.string('role').notNullable().defaultTo('user');
      table.timestamps(true, true);
    })
    .createTable('shipments', (table) => {
      table.increments('id').primary();
      table.string('carrier');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.string('label_url');
      table.json('ship_from');
      table.json('ship_to');
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    });
}

export function down(knex) {
  return knex.schema
    .dropTableIfExists('shipments')
    .dropTableIfExists('users');
}
