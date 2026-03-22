import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { toast } from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart({
      product,
      qty: 1,
      size: product.sizes[0],
      color: product.colors[0]
    }));
    toast.success(`${product.name} added to bag`, {
      style: { background: '#1A1208', color: '#FFF8E7', borderRadius: '4px', fontFamily: 'DM Mono', fontSize: '11px' }
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.025 }}
      transition={{ duration: 0.2 }}
      className="skeu-card skeu-card-hover group relative"
    >
      <Link to={`/product/${product.slug}`} className="block">
        {/* Image Container */}
        <div
          className="relative aspect-[3/4] overflow-hidden m-1 rounded-sm"
          style={{ boxShadow: 'inset 2px 2px 6px rgba(200,191,176,0.4)' }}
        >
          <img
            src={product.images[0]?.startsWith('http') ? product.images[0] : `/api/uploads/${product.images[0]}`}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />

          {/* Wishlist Heart */}
          <button
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{
              background: 'linear-gradient(145deg, #EFEBE2, #E0D8C8)',
              boxShadow: '3px 3px 8px #C8BFB0, -2px -2px 6px #FDFAF5',
            }}
            onClick={(e) => e.preventDefault()}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          {/* Add to Cart — slides up on hover */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-2">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleAddToCart}
              className="skeu-btn w-full text-center"
            >
              ADD TO CART
            </motion.button>
          </div>

          {/* Out of Stock */}
          {product.stock === 0 && (
            <div className="absolute top-3 left-3 skeu-tag">SOLD OUT</div>
          )}
        </div>

        {/* Info */}
        <div className="p-4 space-y-2">
          <span className="skeu-tag">{product.category}</span>
          <h3 className="font-heading font-semibold text-base text-text truncate mt-2">{product.name}</h3>
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm text-accent tracking-wider">${product.price}</span>
            <div className="flex -space-x-1">
              {product.colors?.slice(0, 3).map((color, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full border border-seam/60"
                  style={{ backgroundColor: color, boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.15)' }}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
