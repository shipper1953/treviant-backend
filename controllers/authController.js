// backend/controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../utils/db.js';

// Helper to create JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, isAdmin: user.is_admin },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Register new user
export const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const existing = await db('users').where({ email }).first();

    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [user] = await db('users')
      .insert({ email, password: hashedPassword, name })
      .returning(['id', 'email', 'name']);

    const token = generateToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed' });
  }
};

// ✅ Exported properly
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db('users').where({ email }).first();
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
    res.status(200).json({ token, isAdmin: user.role === 'admin' });
  }
};
