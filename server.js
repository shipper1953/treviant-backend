// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import shippingRoutes from './routes/shipping.js';

dotenv.config();
const app = express();

// ✅ Allow Vercel frontend domain in CORS
const allowedOrigins = [
  'https://frontend-one-zeta-45.vercel.app', // Replace with your actual deployed frontend domain
  'https://your-custom-domain.com' // Optional: add custom domain if set
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

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/api/shipping', shippingRoutes);

// ✅ Root route to confirm server is working
app.get('/', (req, res) => res.send('Treviant API is live'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
