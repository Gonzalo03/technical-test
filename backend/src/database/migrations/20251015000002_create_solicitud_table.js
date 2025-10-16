/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('solicitud', (table) => {
    table.increments('id').primary();
    table.string('codigo', 50).notNullable();
    table.string('descripcion', 50).notNullable();
    table.string('resumen', 50).notNullable();
    table.integer('id_empleado').unsigned().notNullable();
    table.timestamps(true, true); // created_at, updated_at
    
    // Foreign key
    table.foreign('id_empleado').references('id').inTable('empleado').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('solicitud');
};
