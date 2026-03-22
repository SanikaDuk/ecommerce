import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/contact', formData);
      toast.success('Message sent! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-28 pb-24 px-6 max-w-7xl mx-auto min-h-screen"
    >
      <div className="text-center mb-16">
        <h1 className="font-heading font-semibold text-4xl md:text-5xl text-text mb-4">Get in Touch</h1>
        <div className="stitch-divider w-32 mx-auto mt-4 mb-6" />
        <p className="font-body font-light text-muted text-sm max-w-xl mx-auto">
          Have a question about our collections or need assistance? Our team is here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Info */}
        <div className="space-y-8">
          <div className="skeu-card p-8 space-y-6">
            <h2 className="font-mono text-[10px] text-accent tracking-[0.2em] uppercase">Contact Information</h2>
            {[
              { label: 'Our Atelier', value: '789 Fashion Avenue, Design District\nNew York, NY 10018', icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' },
              { label: 'Phone', value: '+1 (212) 555-0198', icon: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z' },
              { label: 'Email', value: 'concierge@antigravity.com', icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-sm flex-shrink-0" style={{
                  background: 'linear-gradient(145deg, #EFEBE2, #E0D8C8)',
                  boxShadow: '3px 3px 8px #C8BFB0, -2px -2px 6px #FDFAF5',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="1.5">
                    <path d={item.icon} />
                  </svg>
                </div>
                <div>
                  <p className="font-mono text-[9px] text-muted tracking-[0.15em] uppercase mb-1">{item.label}</p>
                  <p className="font-body font-light text-sm text-text whitespace-pre-line">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="skeu-card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="font-mono text-[9px] text-muted tracking-[0.15em] uppercase">Full Name</label>
                <input type="text" required className="skeu-input w-full text-sm" placeholder="Alex Rivera"
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[9px] text-muted tracking-[0.15em] uppercase">Email</label>
                <input type="email" required className="skeu-input w-full text-sm" placeholder="alex@example.com"
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-mono text-[9px] text-muted tracking-[0.15em] uppercase">Subject</label>
              <input type="text" required className="skeu-input w-full text-sm" placeholder="Product Inquiry"
                value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="font-mono text-[9px] text-muted tracking-[0.15em] uppercase">Message</label>
              <textarea required rows="5" className="skeu-input w-full text-sm resize-none" placeholder="How can we help?"
                value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }} type="submit" disabled={loading}
              className="skeu-btn w-full py-4 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-[#FFF8E7]/30 border-t-[#FFF8E7] rounded-full animate-spin" />
              ) : 'Send Message'}
            </motion.button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
