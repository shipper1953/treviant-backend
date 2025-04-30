import dotenv from 'dotenv';
dotenv.config(); // Always load env FIRST

import express from 'express';
import cors from 'cors';

import shippingRoutes from './routes/shipping.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import db from './utils/db.js';

const app = express(); // <== You forgot this line

app.use(cors());
app.use(express.json());

// Health route
app.get('/', (req, res) => {
  res.send('✅ Treviant Backend is running!');
});

app.use('/api', shippingRoutes);
app.use('/api', authRoutes);
app.use('/api', adminRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

