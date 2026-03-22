import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const EditorialBanner = () => {
  const thumbnails = [
    'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=400&auto=format&fit=crop',
  ];

  return (
    <section className="py-24" style={{ background: '#1A1208' }}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left — Quote */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <div className="stitch-divider w-16 !border-[#C4B99A] !opacity-30" />
          <h2 className="font-heading font-semibold text-4xl md:text-5xl lg:text-[56px] leading-tight italic" style={{ color: '#8B6914' }}>
            "Crafted for the<br />ones who notice."
          </h2>
          <p className="font-body text-sm max-w-md leading-relaxed" style={{ color: 'rgba(255,248,231,0.4)' }}>
            Every stitch carries intention. Every fabric chosen with purpose. This is not fast fashion — this is considered craft.
          </p>
          <Link to="/shop">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="mt-4"
              style={{
                background: 'transparent',
                border: '1px solid rgba(139,105,20,0.5)',
                color: '#8B6914',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontFamily: '"DM Mono", monospace',
                fontSize: '11px',
                padding: '12px 28px',
                borderRadius: '2px',
                cursor: 'pointer',
                boxShadow: '2px 2px 6px rgba(0,0,0,0.3)',
              }}
            >
              Explore All
            </motion.button>
          </Link>
        </motion.div>

        {/* Right — Thumbnail Grid */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 gap-4"
        >
          {thumbnails.map((src, i) => (
            <div
              key={i}
              className="aspect-square overflow-hidden"
              style={{
                border: '3px solid #5C3D1E',
                borderRadius: '2px',
                padding: '3px',
                background: '#2A1E10',
                boxShadow: '4px 4px 12px rgba(0,0,0,0.4), -2px -2px 6px rgba(92,61,30,0.3)',
              }}
            >
              <img src={src} alt="Editorial" className="w-full h-full object-cover rounded-sm" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EditorialBanner;
