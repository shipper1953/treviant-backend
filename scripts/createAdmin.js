// /backend/scripts/createAdmin.js
import bcrypt from 'bcryptjs';
import db from '..db.js'
import dotenv from 'dotenv';

dotenv.config();

const createAdminUser = async () => {
  const email = 'admin@treviant.com';
  const plainPassword = 'admin123';
  const role = 'admin';

  try {
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const [existing] = await db('users').where({ email });

    if (existing) {
      console.log('⚠️ Admin user already exists');
      process.exit(0);
    }

    await db('users').insert({
      email,
      password: hashedPassword,
      role,
    });

    console.log('✅ Admin user created:', email);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
};

createAdminUser();
