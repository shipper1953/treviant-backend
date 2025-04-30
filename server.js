// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import shippingRoutes from './routes/shipping.js';

dotenv.config();

const app = express();

// CORS configuration
const allowedOrigins = [
  'https://frontend-one-zeta-45.vercel.app',
  'https://frontend-qxraph5nd-shipper1953s-projects.vercel.app',
  'http://localhost:5173',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/api/shipping', shippingRoutes);

// Health check
app.get('/', (req, res) => {
  res.status(200).send('Treviant backend is running ✅');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is live at http://localhost:${PORT}`);
});
