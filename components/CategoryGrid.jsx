import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: "Men",
    image: "https://images.unsplash.com/photo-1488161628813-244a2ceba245?q=80&w=1935&auto=format&fit=crop",
    link: "/shop?gender=Men",
  },
  {
    name: "Women",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
    link: "/shop?gender=Women",
  },
  {
    name: "Kids",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=1972&auto=format&fit=crop",
    link: "/shop?category=Kids",
  },
  {
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
    link: "/shop?category=Accessories",
  },
];

const CategoryGrid = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="font-heading font-semibold text-[42px] text-text tracking-wider">SHOP BY CATEGORY</h2>
        <div className="stitch-divider w-32 mx-auto mt-6" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <Link to={cat.link}>
              <motion.div
                whileHover={{ scale: 1.025 }}
                transition={{ duration: 0.2 }}
                className="relative aspect-[3/4] overflow-hidden group cursor-pointer"
                style={{
                  boxShadow: '6px 6px 14px #C8BFB0, -4px -4px 10px #FDFAF5',
                  border: '4px solid #C4B99A',
                  borderRadius: '4px',
                  padding: '4px',
                  background: 'linear-gradient(145deg, #EFEBE2, #E0D8C8)',
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-sm group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className="absolute inset-1 bg-gradient-to-t from-text/50 via-transparent to-transparent rounded-sm" />
                {/* Name */}
                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <span
                    className="inline-block px-4 py-2 font-heading font-semibold text-sm tracking-[0.15em] uppercase"
                    style={{
                      background: 'rgba(239,235,226,0.9)',
                      color: '#8B6914',
                      boxShadow: '2px 2px 6px rgba(200,191,176,0.5)',
                      borderRadius: '2px',
                    }}
                  >
                    {cat.name}
                  </span>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
