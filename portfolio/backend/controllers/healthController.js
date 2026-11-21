import mongoose from 'mongoose';

export function health(req, res) {
  const dbReady = mongoose.connection.readyState === 1;
  // Always 200 while the process is up, so Railway does not kill it during a DB reconnect.
  res.json({
    status: 'ok',
    database: dbReady ? 'connected' : 'disconnected',
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
}
