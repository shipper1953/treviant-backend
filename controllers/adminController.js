// controllers/adminController.js
import db from '../utils/db.js';
import bcrypt from 'bcrypt';


export const getAllUsers = async (req, res) => {
  try {
    const users = await db('users').select('id', 'email', 'is_admin', 'created_at');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error fetching users.' });
  }
};

export const createUser = async (req, res) => {
  try {
    const { email, password, is_admin } = req.body;
    const existing = await db('users').where({ email }).first();
    if (existing) return res.status(400).json({ message: 'User already exists.' });

    const hashed = await bcrypt.hash(password, 10);
    const [user] = await db('users')
      .insert({ email, password: hashed, is_admin: is_admin || false })
      .returning(['id', 'email', 'is_admin', 'created_at']);

    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error creating user.' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, is_admin } = req.body;

    const updated = await db('users')
      .where({ id })
      .update({ email, is_admin })
      .returning(['id', 'email', 'is_admin']);

    if (!updated.length) return res.status(404).json({ message: 'User not found.' });

    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error updating user.' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const count = await db('users').where({ id }).del();
    if (count === 0) return res.status(404).json({ message: 'User not found.' });

    res.json({ message: 'User deleted.' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error deleting user.' });
  }
};
