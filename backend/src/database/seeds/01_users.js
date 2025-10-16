const bcrypt = require('bcrypt');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('users').del();
  
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  await knex('users').insert([
    {
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      is_active: true
    },
    {
      username: 'user',
      email: 'user@example.com',
      password: await bcrypt.hash('user123', 10),
      role: 'user',
      is_active: true
    }
  ]);
};
