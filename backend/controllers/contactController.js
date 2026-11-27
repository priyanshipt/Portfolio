import Contact from '../models/Contact.js';
import { sendContactEmail } from '../utils/mailer.js';

export async function createContact(req, res, next) {
  try {
    // Honeypot: real visitors never see or fill this hidden field.
    if (req.body.website) {
      return res.status(201).json({ message: 'Thanks! Your message has been sent.' });
    }

    const { name, email, subject = '', message } = req.body;
    const doc = await Contact.create({ name, email, subject, message, ip: req.ip });

    let emailSent = false;
    try {
      emailSent = await sendContactEmail({ name, email, subject, message });
    } catch (mailError) {
      // The message is already stored, so do not fail the request.
      console.error('Email notification failed:', mailError.message);
    }

    if (emailSent) {
      doc.emailSent = true;
      await doc.save();
    }

    return res.status(201).json({ message: 'Thanks! Your message has been sent.' });
  } catch (error) {
    return next(error);
  }
}
