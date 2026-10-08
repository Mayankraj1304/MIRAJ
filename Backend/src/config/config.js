import dotenv from 'dotenv';
dotenv.config();

export const config = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/mirajstore',
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key',
};

export default config;  