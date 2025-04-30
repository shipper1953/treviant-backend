// backend/routes/admin.js
import express from 'express';
import { getAllUsers } from '../controllers/adminController.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// 🔥 Middlewares must come AFTER router is declared
router.use(authenticateToken, isAdmin);

// GET /api/admin/users
router.get('/users', getAllUsers);

export default router;
