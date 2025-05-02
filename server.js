// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import shippingRoutes from './routes/shipping.js';
import { connectDB } from './utils/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to database
connectDB();

// Configure CORS for frontend on Vercel
const allowedOrigins = [
  'http://localhost:5173',
  'https://frontend-one-zeta-45.vercel.app',
  'https://your-custom-domain.com' // <- add all frontend URLs
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // if you're sending cookies or auth headers
}));

app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/shipping', shippingRoutes);

// Root health check
app.get('/', (req, res) => {
  res.send('Treviant backend is running ✅');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
