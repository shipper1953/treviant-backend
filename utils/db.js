// backend/utils/db.js
import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    tableName: 'knex_migrations'
  }
});
export default db;

export const connectDB = async () => {
  try {
    await db.raw('SELECT 1+1 AS result');
    console.log('✅ Connected to PostgreSQL');
  } catch (err) {
    console.error('❌ Database connection failed:', err);
    process.exit(1);
  }
};
