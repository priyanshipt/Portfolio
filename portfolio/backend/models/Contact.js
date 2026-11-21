import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 120 },
    subject: { type: String, trim: true, maxlength: 300, default: '' },
    message: { type: String, required: true, trim: true, maxlength: 6000 },
    emailSent: { type: Boolean, default: false },
    ip: { type: String, default: '' },
  },
  { timestamps: true }
);

contactSchema.index({ createdAt: -1 });

export default mongoose.model('Contact', contactSchema);
