import { motion } from 'framer-motion';

const Newsletter = () => {
  return (
    <section className="py-24 px-6 linen-bg">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="skeu-tag inline-block mb-6">NEWSLETTER</span>
          <h2 className="font-heading font-semibold text-4xl md:text-5xl text-text mb-4">Stay in the Loop</h2>
          <p className="font-body font-light text-muted text-sm max-w-lg mx-auto mb-10 leading-relaxed">
            Subscribe to receive exclusive offers, early access to new collections, and curated fashion insights.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Your email address"
            className="skeu-input flex-grow text-sm"
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            className="skeu-btn whitespace-nowrap"
          >
            Subscribe
          </motion.button>
        </motion.form>

        <p className="mt-8 font-mono text-[9px] text-muted tracking-[0.15em] uppercase">
          By subscribing, you agree to our Terms & Privacy Policy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
