import { motion } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Browse & Add to Cart',
    desc: 'Explore our curated collections, select your preferred size and color, and add items to your bag.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="1.5">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Place Your Order',
    desc: 'Fill in your shipping details and confirm your order. No online payment needed — we keep it simple.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Contact Seller for Payment',
    desc: 'Reach us directly via WhatsApp or email to arrange payment and confirm delivery timeline.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

const HowToOrder = () => {
  return (
    <section className="py-24 px-6 linen-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading font-semibold text-[42px] text-text tracking-wider">HOW TO ORDER</h2>
          <div className="stitch-divider w-32 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="skeu-card p-8 text-center space-y-5"
            >
              {/* Gold coin icon */}
              <div
                className="w-16 h-16 flex items-center justify-center mx-auto rounded-full"
                style={{
                  background: 'linear-gradient(145deg, #EFEBE2, #E0D8C8)',
                  boxShadow: '4px 4px 10px #C8BFB0, -3px -3px 8px #FDFAF5, inset 0 0 0 2px #C4B99A',
                }}
              >
                {step.icon}
              </div>
              <span className="font-mono text-[10px] text-accent tracking-[0.2em]">{step.num}</span>
              <h3 className="font-heading font-semibold text-xl text-text">{step.title}</h3>
              <p className="font-body font-light text-sm text-muted leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Contact Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <motion.a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-3 px-6 py-3 rounded-sm font-mono text-[11px] uppercase tracking-[0.12em] cursor-pointer"
            style={{
              background: 'linear-gradient(160deg, #25D366, #128C44)',
              boxShadow: '3px 3px 8px #1a8a40, -2px -2px 6px #30e070, inset 0 1px 0 rgba(255,255,255,0.2)',
              color: '#fff',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            </svg>
            WhatsApp
          </motion.a>
          <motion.a
            href="mailto:hello@antigravity.store"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="skeu-btn-ghost flex items-center gap-3 cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Email Us
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default HowToOrder;
