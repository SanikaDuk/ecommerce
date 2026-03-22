import { useParams, Link } from 'react-router-dom';
import { useGetOrderDetailsQuery } from '../store/slices/orderApiSlice';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetOrderDetailsQuery(id);
  const order = data?.data;

  if (isLoading) {
    return (
      <div className="pt-28 pb-24 px-6 min-h-screen flex items-center justify-center">
        <div className="skeu-card p-12 animate-shimmer w-full max-w-lg h-60" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-28 pb-24 px-6 min-h-screen flex items-center justify-center"
    >
      <div className="skeu-card p-12 max-w-lg w-full text-center space-y-6">
        {/* Success Icon */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
          style={{
            background: 'linear-gradient(145deg, #EFEBE2, #E0D8C8)',
            boxShadow: '6px 6px 14px #C8BFB0, -4px -4px 10px #FDFAF5, inset 0 0 0 2px #4A7C4E',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4A7C4E" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="font-heading font-semibold text-3xl text-text">Order Placed!</h1>
        <p className="font-body font-light text-muted text-sm">
          Thank you for your order. We'll reach out to confirm your payment details.
        </p>

        {order && (
          <div className="skeu-card p-4 text-left space-y-2 mt-4">
            <div className="flex justify-between text-sm">
              <span className="font-mono text-[10px] text-muted tracking-wider">ORDER ID</span>
              <span className="font-mono text-[10px] text-text">#{order._id?.slice(-8).toUpperCase()}</span>
            </div>
            <div className="stitch-divider" />
            <div className="flex justify-between text-sm">
              <span className="font-body text-muted">Total</span>
              <span className="font-mono text-accent">${order.totalPrice}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link to="/orders">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} className="skeu-btn">
              View Orders
            </motion.button>
          </Link>
          <Link to="/shop">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} className="skeu-btn-ghost">
              Continue Shopping
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSuccess;
