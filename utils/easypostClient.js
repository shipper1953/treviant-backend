import dotenv from 'dotenv';
dotenv.config(); // MUST be first

import EasyPost from '@easypost/api';

if (!process.env.EASYPOST_API_KEY) {
  throw new Error('🚨 EASYPOST_API_KEY is missing in environment variables!');
}

const api = new EasyPost(process.env.EASYPOST_API_KEY);

export default api;
