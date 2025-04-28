import express from 'express';
import {
  fetchRates,
  purchaseLabel,
  getShipmentHistory
} from '../controllers/shippingController.js';

const router = express.Router();

router.post('/rates', fetchRates);
router.post('/purchase', purchaseLabel);
router.get('/history', getShipmentHistory);

export default router;
