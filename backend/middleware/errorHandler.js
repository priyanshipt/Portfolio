import { env } from '../config/env.js';

export function notFound(req, res) {
  res.status(404).json({ message: 'Route not found.' });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500;

  if (status >= 500) console.error(err);

  res.status(status).json({
    message: status >= 500 && env.isProd ? 'Something went wrong on the server.' : err.message,
  });
}
