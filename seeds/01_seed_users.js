import bcrypt from 'bcrypt';

export async function seed(knex) {
  await knex('users').del();

  const hashedPassword = await bcrypt.hash('admin123', 10);
  await knex('users').insert([
    {
      email: 'admin@treviant.com',
      password: hashedPassword,
      role: 'admin',
    },
  ]);
}
