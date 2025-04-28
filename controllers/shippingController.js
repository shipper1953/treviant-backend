// shippingController.js
import easypost from '../utils/easypostClient.js';
import db from '../utils/db.js';


// Fetch shipping rates
export const fetchRates = async (req, res) => {
  try {
    const shipment = await easypost.Shipment.create(req.body);
    const rates = shipment.rates.sort((a, b) => parseFloat(a.rate) - parseFloat(b.rate));
    res.json({ rates });
  } catch (error) {
    console.error('Error fetching rates:', error);
    res.status(500).json({ error: 'Failed to fetch shipping rates.' });
  }
};

// Purchase shipping label
export const purchaseLabel = async (req, res) => {
  try {
    const { shipmentId, rateId } = req.body;
    const shipment = await easypost.Shipment.retrieve(shipmentId);
    const purchased = await shipment.buy(rateId);
    res.json({ label_url: purchased.postage_label.label_url });
  } catch (error) {
    console.error('Error purchasing label:', error);
    res.status(500).json({ error: 'Label purchase failed.' });
  }
};

// Save shipment history to DB
export const saveShipmentHistory = async (req, res) => {
  try {
    const { user_id, to_address, from_address, rate_id, carrier, service, cost } = req.body;
    const [shipment] = await db('shipments').insert({
      user_id,
      to_address,
      from_address,
      rate_id,
      carrier,
      service,
      cost,
      created_at: new Date(),
    }).returning('*');

    res.status(201).json({ shipment });
  } catch (err) {
    console.error('Error saving shipment history:', err);
    res.status(500).json({ error: 'Failed to save shipment.' });
  }
};

// Get user’s shipment history
export const getShipmentHistory = async (req, res) => {
  try {
    const { user_id } = req.query;
    const shipments = await db('shipments').where({ user_id }).orderBy('created_at', 'desc');
    res.json({ shipments });
  } catch (err) {
    console.error('Error retrieving shipment history:', err);
    res.status(500).json({ error: 'Failed to fetch shipment history.' });
  }
};
