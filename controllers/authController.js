// controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../utils/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';

// Register a new user
export const registerUser = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Email, password, and role are required.' });
  }

  try {
    const existingUser = await db('users').where({ email }).first();
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [user] = await db('users')
      .insert({ email, password: hashedPassword, role })
      .returning(['id', 'email', 'role']);

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Server error during registration.' });
  }
};

// Login an existing user
export const login = async (req, res) => {
  try {
    console.log("🔐 Login request received:", req.body); // ADD THIS

    const { email, password } = req.body;
    if (!email || !password) {
      console.error("🚨 Missing email or password"); // ADD THIS
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await db('users').where({ email }).first();
    if (!user) {
      console.error("🚨 User not found for email:", email); // ADD THIS
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error("🚨 Password mismatch"); // ADD THIS
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    console.log("✅ Login success, issuing token"); // ADD THIS
    res.json({ token });
  } catch (error) {
    console.error("💥 Login error:", error); // ADD THIS
    res.status(500).json({ message: "Internal server error" });
  }
};

