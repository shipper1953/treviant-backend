import setupDb from '../utils/db.js';
import dotenv from 'dotenv';
dotenv.config();

const db = setupDb;

const listAdmins = async () => {
  try {
    const admins = await db('users').select('id', 'email', 'role').where('role', 'admin');
    console.log('\n📋 Admin Users:');
    admins.forEach(user => {
      console.log(`- ${user.email} (ID: ${user.id})`);
    });
    process.exit(0);
  } catch (err) {
    console.error('❌ Error listing admins:', err);
    process.exit(1);
  }
};

listAdmins();
