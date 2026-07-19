import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Check, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';
import { PROFILE } from '../data';

export default function ContactView() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 900);
  };

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  const inputClass =
    'w-full bg-paper border border-line rounded-xl px-4 py-3.5 text-ink placeholder:text-ink-faint focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all';

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="max-w-2xl mx-auto px-6 pt-32 pb-28 md:pt-44"
    >
      <motion.div variants={item} className="space-y-4 mb-10">
        <span className="kicker">Work with me</span>
        <h1 id="contact-title" className="font-display font-bold text-ink text-5xl md:text-6xl tracking-tight">
          Let's talk.
        </h1>
        <p className="text-ink-soft text-lg leading-relaxed">
          Advisory, speaking, a partnership, or just a hard question you want answered straight.
          Tell me what you're building. I read everything and reply where there's real alignment.
        </p>
      </motion.div>

      <motion.div variants={item} className="border-t border-line pt-10">
        {formSubmitted ? (
          <div className="ed-card rounded-2xl p-8 text-center space-y-4">
            <div className="w-12 h-12 bg-accent flex items-center justify-center rounded-full mx-auto">
              <Check className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-bold text-ink font-display tracking-tight">Got it, thanks.</h4>
            <p className="text-ink-soft max-w-md mx-auto leading-relaxed">
              Your note is in. I review these on a rolling basis and will be in touch if there's a
              fit. If it's time-sensitive, email me directly.
            </p>
            <button
              type="button"
              onClick={() => setFormSubmitted(false)}
              className="text-sm text-accent font-medium link-underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="input-name" className="block text-sm font-medium text-ink mb-1.5">
                  Your name
                </label>
                <input
                  id="input-name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Jane Founder"
                />
              </div>
              <div>
                <label htmlFor="input-email" className="block text-sm font-medium text-ink mb-1.5">
                  Email
                </label>
                <input
                  id="input-email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="jane@company.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="input-subject" className="block text-sm font-medium text-ink mb-1.5">
                What's this about?
              </label>
              <select
                id="input-subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleInputChange}
                className={`${inputClass} appearance-none cursor-pointer`}
              >
                <option value="" disabled>
                  Pick one…
                </option>
                <option value="Advisory engagement">Advisory engagement</option>
                <option value="Partnership or investment">Partnership or investment</option>
                <option value="Speaking or podcast">Speaking or podcast</option>
                <option value="Real estate">Real estate</option>
                <option value="Something else">Something else</option>
              </select>
            </div>

            {formData.subject === 'Real estate' && (
              <div className="p-4 bg-paper-2 border border-line rounded-xl text-sm text-ink-soft space-y-1.5">
                <p className="font-semibold text-ink">Real estate note</p>
                <p>
                  I'm a licensed real estate agent in Rhode Island and Massachusetts. For property
                  inquiries you can also reach my real estate practice:
                </p>
                <a
                  href={PROFILE.realEstate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-accent font-medium link-underline"
                >
                  <span>David Peterson Real Estate</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            <div>
              <label htmlFor="input-message" className="block text-sm font-medium text-ink mb-1.5">
                Message
              </label>
              <textarea
                id="input-message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                className={`${inputClass} leading-relaxed`}
                placeholder="Two sentences on what you're building and why it's worth both our time."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-accent w-full py-4 rounded-full text-sm font-semibold tracking-wide flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send message</span>
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>

      {/* Direct channels */}
      <motion.div
        variants={item}
        className="mt-14 pt-10 border-t border-line grid grid-cols-1 sm:grid-cols-2 gap-8"
      >
        <div className="space-y-1.5">
          <span className="kicker">Direct</span>
          <a href={`mailto:${PROFILE.email}`} className="block text-ink font-medium link-underline w-fit">
            {PROFILE.email}
          </a>
          <p className="text-sm text-ink-faint">Rhode Island, USA · working globally.</p>
        </div>
        <div className="space-y-2.5">
          <span className="kicker">Elsewhere</span>
          <div className="flex items-center gap-3">
            <a
              href={PROFILE.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-line-2 flex items-center justify-center text-ink-soft hover:text-paper hover:bg-ink hover:border-ink transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PROFILE.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-line-2 flex items-center justify-center text-ink-soft hover:text-paper hover:bg-ink hover:border-ink transition-all"
              aria-label="X / Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
