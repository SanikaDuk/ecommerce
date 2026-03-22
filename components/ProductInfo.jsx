import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const ProductInfo = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      product,
      qty: Number(qty),
      size: selectedSize,
      color: selectedColor
    }));
    toast.success(`${product.name} added to bag`);
  };

  return (
    <div className="space-y-8">
      <div>
        <span className="skeu-tag mb-3 inline-block">{product.category}</span>
        <h1 className="font-heading font-semibold text-3xl md:text-4xl text-text mb-3">{product.name}</h1>
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-2xl text-accent tracking-wider">${product.price}</span>
          {product.stock > 0 ? (
            <span className="skeu-tag !bg-gradient-to-r !from-green-200 !to-green-300 !text-green-900">In Stock</span>
          ) : (
            <span className="skeu-tag !bg-gradient-to-r !from-red-200 !to-red-300 !text-red-900">Out of Stock</span>
          )}
        </div>
        <p className="font-body font-light text-sm text-muted leading-relaxed">{product.description}</p>
      </div>

      <div className="stitch-divider" />

      {/* Color Selection */}
      <div className="space-y-3">
        <h3 className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted">Select Color</h3>
        <div className="flex gap-3">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-9 h-9 rounded-full border-2 transition-all p-0.5 ${
                selectedColor === color ? 'border-accent scale-110' : 'border-seam/40'
              }`}
            >
              <div className="w-full h-full rounded-full" style={{ backgroundColor: color, boxShadow: 'inset 1px 1px 3px rgba(0,0,0,0.2)' }} />
            </button>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted">Select Size</h3>
          <button className="font-mono text-[9px] text-accent tracking-wider hover:underline underline-offset-4 uppercase">Size Guide</button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`h-10 flex items-center justify-center font-mono text-[10px] rounded-sm transition-all ${
                selectedSize === size ? 'skeu-btn' : 'skeu-card cursor-pointer text-text'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity & Add to Cart */}
      <div className="flex items-center gap-4">
        <div className="flex items-center skeu-input !p-0 overflow-hidden">
          <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center text-muted hover:text-text text-lg">−</button>
          <span className="w-10 text-center font-mono text-sm text-text">{qty}</span>
          <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="w-10 h-10 flex items-center justify-center text-muted hover:text-text text-lg">+</button>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="skeu-btn flex-grow flex items-center justify-center gap-3 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          Add to Bag
        </motion.button>
      </div>

      <div className="stitch-divider" />

      {/* Trust Badges */}
      <div className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted font-body font-light">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="1.5">
            <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
          <span>Free Express Shipping on orders over $150</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted font-body font-light">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="1.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span>Authenticity Guaranteed • 1-Year Warranty</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
