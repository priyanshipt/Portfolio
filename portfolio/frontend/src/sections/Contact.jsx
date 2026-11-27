import { useState } from 'react';
import axios from 'axios';
import { Mail, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import Section from '../components/Section.jsx';
import { GithubIcon, LinkedinIcon } from '../components/Icons.jsx';
import { site, hireMeLink } from '../data/portfolio.js';
import { sendContactMessage } from '../services/api.js';

const empty = { name: '', email: '', subject: '', message: '', website: '' };

const inputClass =
  'mt-2 w-full rounded-lg border border-line bg-ink px-4 py-3 text-fg placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none';

function Field({ label, id, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-fg">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (status === 'sending') return;

    setStatus('sending');
    setErrors({});
    setNotice('');

    try {
      const result = await sendContactMessage(form);
      setStatus('success');
      setNotice(result.message || 'Thanks! Your message has been sent.');
      setForm(empty);
    } catch (error) {
      setStatus('error');
      if (axios.isAxiosError(error) && error.response) {
        const { status: code, data } = error.response;
        if (code === 422 && Array.isArray(data.errors)) {
          const fieldErrors = {};
          data.errors.forEach((e) => {
            fieldErrors[e.field] = fieldErrors[e.field] || e.message;
          });
          setErrors(fieldErrors);
          setNotice(data.message);
        } else {
          setNotice(data?.message || 'Something went wrong. Please try again.');
        }
      } else {
        setNotice(`Could not reach the server. Please email me directly at ${site.email}.`);
      }
    }
  };

  const contactLink =
    'flex items-center gap-3 rounded-lg border border-line bg-surface px-4 py-3 text-fg transition-colors hover:border-accent/60 hover:bg-raised';

  return (
    <Section
      id="contact"
      title="Let's work together"
      intro="I'm looking for an entry-level software role. Send a message here or email me directly and I'll reply."
      className="border-t border-line bg-surface/40"
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-4">
          <a href={hireMeLink} className="btn btn-primary w-full !py-3">
            <Mail className="h-4 w-4" aria-hidden="true" />
            Hire me by email
          </a>
          <a href={`mailto:${site.email}`} className={contactLink}>
            <Mail className="h-5 w-5 text-accent" aria-hidden="true" />
            <span className="min-w-0 break-all">{site.email}</span>
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={contactLink}>
            <LinkedinIcon className="h-5 w-5 text-accent" />
            LinkedIn
          </a>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className={contactLink}>
            <GithubIcon className="h-5 w-5 text-accent" />
            GitHub
          </a>
        </div>

        <form onSubmit={onSubmit} noValidate className="card space-y-5 p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" id="name" error={errors.name}>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                maxLength={80}
                value={form.name}
                onChange={onChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className={inputClass}
              />
            </Field>
            <Field label="Email" id="email" error={errors.email}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={120}
                value={form.email}
                onChange={onChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Subject (optional)" id="subject" error={errors.subject}>
            <input
              id="subject"
              name="subject"
              type="text"
              maxLength={120}
              value={form.subject}
              onChange={onChange}
              className={inputClass}
            />
          </Field>

          <Field label="Message" id="message" error={errors.message}>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              maxLength={2000}
              value={form.message}
              onChange={onChange}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
              className={`${inputClass} resize-y`}
            />
          </Field>

          {/* Honeypot: hidden from people and assistive tech, bots fill it in. */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="website">Leave this field empty</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={onChange} />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button type="submit" disabled={status === 'sending'} className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-70">
              {status === 'sending' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Sending
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Send message
                </>
              )}
            </button>

            <p role="status" aria-live="polite" className="text-sm">
              {status === 'success' && (
                <span className="inline-flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  {notice}
                </span>
              )}
              {status === 'error' && (
                <span className="inline-flex items-start gap-2 text-red-400">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {notice}
                </span>
              )}
            </p>
          </div>
        </form>
      </div>
    </Section>
  );
}
