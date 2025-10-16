/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('empleado', (table) => {
    table.increments('id').primary();
    table.date('fecha_ingreso').notNullable();
    table.string('nombre', 50).notNullable();
    table.decimal('salario', 10, 2).notNullable();
    table.timestamps(true, true); // created_at, updated_at
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('empleado');
};
