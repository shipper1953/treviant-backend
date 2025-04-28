// backend/scripts/resetAdminPassword.js
import bcrypt from 'bcryptjs';
import db from '..db.js';

const email = 'admin@treviant.com';
const newPassword = 'newStrongPassword123'; // ⬅️ Set a new secure password here

const run = async () => {
  try {
    const hash = await bcrypt.hash(newPassword, 10);

    const updated = await db('users')
      .where({ email })
      .update({ password: hash });

    if (updated) {
      console.log(`✅ Password reset for ${email}`);
      console.log(`🔑 New password: ${newPassword}`);
    } else {
      console.log(`❌ No user found with email ${email}`);
    }
  } catch (err) {
    console.error('❌ Error resetting password:', err);
  } finally {
    await db.destroy();
  }
};

run();
