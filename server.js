import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import shippingRoutes from './routes/shipping.js';

dotenv.config();

const app = express();

// ✅ CORS Middleware (allow only your frontend domain in production)
app.use(cors({
  origin: ['https://frontend-one-zeta-45.vercel.app'],  // <-- Update this to match your actual frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// ✅ Handle preflight manually if needed (optional)
app.options('*', cors());

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/api/shipping', shippingRoutes);

// Healthcheck route
app.get('/', (req, res) => {
  res.send('Treviant backend is running');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
