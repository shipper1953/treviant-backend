import express from 'express';
import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser
} from '../controllers/adminController.js';

const router = express.Router();

router.post('/create', createUser);
router.get('/users', getAllUsers);
router.put('/users/:id', updateUser);     // ✅ Named route parameter
router.delete('/users/:id', deleteUser);  // ✅ Named route parameter

export default router;
