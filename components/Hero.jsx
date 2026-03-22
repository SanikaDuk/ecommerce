import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center fabric-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-24 lg:pt-0">
        {/* Left — Text */}
        <div className="space-y-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="skeu-tag inline-block mb-6">NEW 2026 COLLECTION</span>
          </motion.div>

          <div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-heading font-light text-[clamp(48px,8vw,90px)] leading-[0.95] text-text"
            >
              WEAR WHAT
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-heading font-semibold text-[clamp(48px,8vw,90px)] leading-[0.95] text-accent"
            >
              MATTERS.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-body font-light text-base text-muted max-w-md tracking-wide"
          >
            Curated clothing. Timeless craft. Every piece tells a story of precision and intention.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <Link to="/shop">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} className="skeu-btn">
                Shop Collection
              </motion.button>
            </Link>
            <Link to="/shop?sort=newest">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} className="skeu-btn-ghost">
                New Arrivals
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Right — Editorial Image in Skeuomorphic Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative hidden lg:block"
        >
          <div
            className="aspect-[3/4] rounded-sm overflow-hidden"
            style={{
              boxShadow: '8px 8px 20px #C8BFB0, -6px -6px 14px #FDFAF5, inset 0 0 0 4px #D4C9B0',
              border: '6px solid #C4B99A',
              background: 'linear-gradient(145deg, #EFEBE2, #E0D8C8)',
              padding: '8px',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
              alt="Editorial Fashion"
              className="w-full h-full object-cover rounded-sm"
            />
          </div>
          {/* Floating accent piece */}
          <div
            className="absolute -bottom-6 -left-6 px-6 py-4 font-heading font-semibold text-2xl text-accent tracking-wider italic"
            style={{
              background: 'linear-gradient(145deg, #EFEBE2, #E0D8C8)',
              boxShadow: '6px 6px 14px #C8BFB0, -4px -4px 10px #FDFAF5',
              border: '1px solid rgba(196,185,154,0.4)',
            }}
          >
            Timeless
          </div>
        </motion.div>
      </div>

      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg to-transparent" />
    </section>
  );
};

export default Hero;
