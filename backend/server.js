import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env.js';
import { connectDB, disconnectDB } from './config/db.js';
import routes from './routes/index.js';
import { apiLimiter } from './middleware/rateLimiters.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

// Railway sits behind a proxy; this makes req.ip and rate limiting use the real client IP.
app.set('trust proxy', 1);
app.disable('x-powered-by');

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      // No origin = health checks, curl, server-to-server.
      if (!origin || env.clientOrigins.includes(origin)) return callback(null, true);
      const error = new Error('Origin not allowed by CORS.');
      error.status = 403;
      return callback(error);
    },
    methods: ['GET', 'POST'],
    maxAge: 86400,
  })
);
app.use(express.json({ limit: '10kb' }));

app.get('/', (req, res) => res.json({ name: 'Portfolio API', status: 'ok' }));
app.use('/api', apiLimiter, routes);

app.use(notFound);
app.use(errorHandler);

async function start() {
  // Listen first so Railway's health check can pass while MongoDB connects.
  const server = app.listen(env.port, '0.0.0.0', () => {
    console.log(`API listening on port ${env.port}`);
  });

  try {
    await connectDB();
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    server.close();
    process.exit(1);
  }

  const shutdown = (signal) => {
    console.log(`${signal} received, shutting down...`);
    server.close(async () => {
      await disconnectDB();
      process.exit(0);
    });
    setTimeout(() => process.exit(1), 10000).unref();
  };
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

start();
