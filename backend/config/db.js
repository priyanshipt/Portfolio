import mongoose from 'mongoose';
import { env } from './env.js';

mongoose.set('strictQuery', true);

export async function connectDB() {
  try {
    console.log('Connecting to MongoDB...');

    await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 15000,
    });

    console.log(`MongoDB connected: ${mongoose.connection.name}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export async function disconnectDB() {
  await mongoose.connection.close();
}
