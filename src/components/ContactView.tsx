import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, MapPin, Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-react';

export default function ContactView() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate quiet transmission
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-2xl mx-auto px-6 pt-32 pb-24 md:pt-40 md:pb-36"
    >
      <motion.div variants={itemVariants} className="space-y-4 mb-10">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 font-bold block">Communications Desk</span>
        <h1 id="contact-title" className="text-4xl md:text-6xl font-black font-display text-white tracking-tighter">
          Get in Touch
        </h1>
        <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-sans font-light">
          This inbox is actively filtered. David replies to operations and advisory challenges where there is immediate mathematical alignment.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="border-t border-zinc-900 pt-10">
        {formSubmitted ? (
          <div className="p-8 bg-zinc-950 border border-zinc-900 rounded-lg text-center space-y-4">
            <div className="w-12 h-12 bg-zinc-900 border border-zinc-700 text-white flex items-center justify-center rounded-full mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white font-display">Transmission Completed</h4>
            <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed font-sans">
              Your inquiry has been logged. David reviews submissions on a rolling basis. If your project has clear operational context, we will be in touch.
            </p>
            <button
              type="button"
              onClick={() => setFormSubmitted(false)}
              className="text-xs font-mono text-zinc-500 hover:text-white underline"
            >
              Submit another transmission
            </button>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="input-name" className="block text-[10px] font-mono uppercase text-zinc-500 mb-1.5 font-bold tracking-wider">Your Name *</label>
                <input
                  id="input-name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-950 border border-zinc-900 rounded px-4 py-3 text-xs text-white focus:outline-none focus:border-zinc-700 transition-all font-sans"
                  placeholder="e.g. Marcus Aurelius"
                />
              </div>
              <div>
                <label htmlFor="input-email" className="block text-[10px] font-mono uppercase text-zinc-500 mb-1.5 font-bold tracking-wider">Email Address *</label>
                <input
                  id="input-email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-950 border border-zinc-900 rounded px-4 py-3 text-xs text-white focus:outline-none focus:border-zinc-700 transition-all font-sans"
                  placeholder="e.g. marcus@empire.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="input-subject" className="block text-[10px] font-mono uppercase text-zinc-500 mb-1.5 font-bold tracking-wider">What's this about? *</label>
              <select
                id="input-subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full bg-zinc-950 border border-zinc-900 rounded px-4 py-3 text-xs text-zinc-300 focus:outline-none focus:border-zinc-700 transition-all font-sans appearance-none cursor-pointer"
              >
                <option value="" disabled>Select an option...</option>
                <option value="Advisory engagement">Advisory engagement</option>
                <option value="Partnership or investment">Partnership or investment</option>
                <option value="Speaking or podcast">Speaking or podcast</option>
                <option value="Real estate">Real estate</option>
                <option value="Something else">Something else</option>
              </select>
            </div>

            {formData.subject === 'Real estate' && (
              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded text-xs text-zinc-400 space-y-1.5 font-sans">
                <p className="font-mono text-[10px] uppercase text-zinc-500 font-bold">REAL ESTATE NOTICE:</p>
                <p className="font-light">
                  I'm a licensed real estate agent in Rhode Island and Massachusetts. For residential or commercial asset inquiries, you can also access my real estate platform:
                </p>
                <a 
                  href="https://davidpeterson.realestate-placeholder.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center space-x-1 text-white hover:underline font-mono text-[10px]"
                >
                  <span>David Peterson Real Estate Brokerage</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            )}

            <div>
              <label htmlFor="input-message" className="block text-[10px] font-mono uppercase text-zinc-500 mb-1.5 font-bold tracking-wider">Message *</label>
              <textarea
                id="input-message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full bg-zinc-950 border border-zinc-900 rounded px-4 py-3 text-xs text-white focus:outline-none focus:border-zinc-700 transition-all font-sans leading-relaxed"
                placeholder="Skip the pitch deck. Two sentences on why this is worth both our time."
              ></textarea>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black hover:bg-zinc-200 py-4 text-xs font-mono font-bold uppercase tracking-widest transition-all flex items-center justify-center space-x-2 rounded font-black cursor-pointer"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Transmit Brief</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </motion.div>

      {/* Footer social deck details */}
      <motion.div variants={itemVariants} className="mt-16 pt-10 border-t border-zinc-900 grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs font-sans text-zinc-500 font-light">
        <div className="space-y-2">
          <span className="block font-mono text-[10px] uppercase text-zinc-400 font-bold">Direct Channel</span>
          <a href="mailto:davidpetersonri@gmail.com" className="text-white hover:underline font-mono">
            davidpetersonri@gmail.com
          </a>
          <p className="text-[10px]">Located in Rhode Island, servicing projects globally.</p>
        </div>

        <div className="space-y-2">
          <span className="block font-mono text-[10px] uppercase text-zinc-400 font-bold">Professional Logs</span>
          <div className="flex items-center space-x-4 pt-1 text-[10px] font-mono uppercase tracking-wider">
            <a 
              href="https://linkedin.com/in/imdavidpeterson-placeholder" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-zinc-400 hover:text-white transition-colors inline-flex items-center space-x-1"
            >
              <Linkedin className="w-3 h-3" />
              <span>LinkedIn</span>
            </a>
            <a 
              href="https://twitter.com/imdavidpeterson-placeholder" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-zinc-400 hover:text-white transition-colors inline-flex items-center space-x-1"
            >
              <Twitter className="w-3 h-3" />
              <span>Twitter</span>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
