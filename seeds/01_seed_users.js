// seeds/01_seed_users.js
import bcrypt from 'bcryptjs';

export async function seed(knex) {
  await knex('shipments').del();
  await knex('users').del();

  const hashedPassword = await bcrypt.hash('admin123', 10);

  await knex('users').insert([
    {
      id: 1,
      email: 'admin@treviant.com',
      password: hashedPassword,
      role: 'admin',
    },
    {
      id: 2,
      email: 'user1@example.com',
      password: await bcrypt.hash('password123', 10),
      role: 'user',
    },
    {
      id: 3,
      email: 'user2@example.com',
      password: await bcrypt.hash('password123', 10),
      role: 'user',
    },
  ]);
}
