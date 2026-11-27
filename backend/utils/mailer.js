import nodemailer from 'nodemailer';
import { env, mailConfigured } from '../config/env.js';

let transporter;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.mail.host,
      port: env.mail.port,
      secure: env.mail.secure,
      auth: { user: env.mail.user, pass: env.mail.pass },
    });
  }
  return transporter;
}

// Plain-text only, so visitor input can never inject HTML into the email.
export async function sendContactEmail({ name, email, subject, message }) {
console.log("MAIL DEBUG:", {
  configured: mailConfigured,
  host: env.mail.host,
  port: env.mail.port,
  secure: env.mail.secure,
  user: env.mail.user,
  passwordExists: Boolean(env.mail.pass),
  recipient: env.mail.to,
});


  if (!mailConfigured) return false;

  await getTransporter().sendMail({
    from: `"Portfolio contact" <${env.mail.user}>`,
    to: env.mail.to,
    replyTo: `"${name.replace(/["\r\n]/g, '')}" <${email}>`,
    subject: `Portfolio: ${subject || `New message from ${name}`}`.replace(/[\r\n]/g, ' ').slice(0, 150),
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });
  return true;
}
