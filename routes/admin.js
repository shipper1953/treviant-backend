// backend/routes/admin.js
import express from 'express';
import { getAllUsers } from '../controllers/adminController.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';

router.use(authenticateToken, isAdmin);

const router = express.Router();

// Admin-only route to fetch all users
router.get('/users', authenticateAdmin, getAllUsers);

export default router;
