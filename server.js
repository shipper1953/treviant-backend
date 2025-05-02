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

// Database Connection
connectDB();

// ✅ CORS CONFIGURATION
const allowedOrigins = [
  'http://localhost:5173',
  'https://frontend-one-zeta-45.vercel.app', // Vercel frontend
  'https://your-custom-domain.com'           // Optional: add your production domain if you have one
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`❌ Not allowed by CORS: ${origin}`));
    }
  },
  credentials: true,
}));

app.use(express.json());

// 🔁 API ROUTES
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/shipping', shippingRoutes);

// ✅ HEALTH CHECK
app.get('/', (req, res) => {
  res.send('✅ Treviant backend is up and running!');
});

// 🚀 START SERVER
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

