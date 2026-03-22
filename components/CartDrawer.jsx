import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateCartQty } from '../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-text/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md z-[101] flex flex-col fabric-bg"
            style={{
              boxShadow: '-6px 0 24px #C0B8A8',
              borderLeft: '1px solid #D4C9B0',
            }}
          >
            {/* Header */}
            <div className="p-6 flex items-center justify-between" style={{ borderBottom: '2px dashed #C4B99A', opacity: 1 }}>
              <div className="flex items-center gap-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5C3D1E" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <h2 className="font-heading font-semibold text-xl text-text italic">Your Bag</h2>
                <span className="skeu-tag">{cartItems.length} Items</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-accent2 hover:text-accent transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-grow overflow-y-auto p-6 space-y-5 scrollbar-hide">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-5">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(145deg, #EFEBE2, #E0D8C8)',
                      boxShadow: '6px 6px 14px #C8BFB0, -4px -4px 10px #FDFAF5',
                    }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7A6A55" strokeWidth="1.5">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-text">Your bag is empty</h3>
                  <p className="font-body text-sm text-muted font-light">Explore our collections and find something you love.</p>
                  <button
                    onClick={() => { setIsOpen(false); navigate('/shop'); }}
                    className="skeu-btn mt-2"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={`${item._id}-${item.size}-${item.color}`} className="flex gap-4 group skeu-card p-3">
                    <div className="w-20 h-24 flex-shrink-0 overflow-hidden rounded-sm"
                      style={{ boxShadow: 'inset 2px 2px 4px rgba(200,191,176,0.4)' }}>
                      <img
                        src={item.images[0]?.startsWith('http') ? item.images[0] : `/api/uploads/${item.images[0]}`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-heading font-semibold text-sm text-text truncate pr-2">{item.name}</h3>
                          <button
                            onClick={() => dispatch(removeFromCart({ id: item._id, size: item.size, color: item.color }))}
                            className="text-muted hover:text-red-700 transition-colors flex-shrink-0"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                          </button>
                        </div>
                        <p className="font-mono text-[9px] text-muted tracking-wider mt-1">
                          {item.size} • <span className="inline-block w-2 h-2 rounded-full align-middle" style={{ backgroundColor: item.color, boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.2)' }} />
                        </p>
                      </div>
                      <div className="flex justify-between items-end mt-2">
                        <div className="flex items-center skeu-input !p-0 !shadow-none border border-seam/50 rounded-sm overflow-hidden">
                          <button
                            onClick={() => dispatch(updateCartQty({ id: item._id, size: item.size, color: item.color, qty: Math.max(1, item.qty - 1) }))}
                            className="w-7 h-7 flex items-center justify-center text-muted hover:text-text text-xs"
                          >−</button>
                          <span className="w-6 text-center font-mono text-[10px] text-text">{item.qty}</span>
                          <button
                            onClick={() => dispatch(updateCartQty({ id: item._id, size: item.size, color: item.color, qty: Math.min(item.stock || 99, item.qty + 1) }))}
                            className="w-7 h-7 flex items-center justify-center text-muted hover:text-text text-xs"
                          >+</button>
                        </div>
                        <span className="font-mono text-sm text-accent">${(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 space-y-5" style={{ borderTop: '2px dashed #C4B99A' }}>
                <div className="flex justify-between font-heading text-lg">
                  <span className="italic">Subtotal</span>
                  <span className="font-mono text-accent">${subtotal}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => { setIsOpen(false); navigate('/checkout'); }}
                  className="skeu-btn w-full text-center"
                >
                  Proceed to Checkout
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
