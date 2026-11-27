import 'dotenv/config';

const isProd = process.env.NODE_ENV === 'production';

const list = (value, fallback) =>
  (value || fallback)
    .split(',')
    .map((item) => item.trim().replace(/\/$/, ''))
    .filter(Boolean);

if (isProd && !process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI is required in production.');
}

export const env = {
  isProd,
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio',
  clientOrigins: list(process.env.CLIENT_ORIGINS, 'http://localhost:5173'),
  github: {
    username: process.env.GITHUB_USERNAME || 'priyanshipt',
    token: process.env.GITHUB_TOKEN || '',
  },
  mail: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    to: process.env.MAIL_TO || process.env.SMTP_USER || '',
  },
};

export const mailConfigured = Boolean(
  env.mail.host &&
  env.mail.port &&
  env.mail.user &&
  env.mail.pass &&
  env.mail.to
);
