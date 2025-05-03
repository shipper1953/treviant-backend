// backend/middleware/auth.js
import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded JWT payload (email, id, role) to request
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await db('users').where({ id: req.user.id }).first();
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: admin only' });
    }
    next();
  } catch (err) {
    return res.status(500).json({ message: 'Error verifying admin role' });
  }
};
