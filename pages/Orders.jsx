import { motion } from 'framer-motion';
import { useGetMyOrdersQuery } from '../store/slices/orderApiSlice';
import { Link } from 'react-router-dom';

const statusColors = {
  pending: { bg: '#C4A020', label: 'Pending' },
  confirmed: { bg: '#4A7C4E', label: 'Confirmed' },
  shipped: { bg: '#2E5F8A', label: 'Shipped' },
  delivered: { bg: '#5C3D1E', label: 'Delivered' },
  cancelled: { bg: '#8B2020', label: 'Cancelled' },
};

const Orders = () => {
  const { data: ordersData, isLoading, error } = useGetMyOrdersQuery();

  const orders = ordersData?.data || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="font-heading font-semibold text-3xl text-text mb-2">My Orders</h1>
      <p className="font-body font-light text-sm text-muted mb-10">Track and manage your orders</p>

      {isLoading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeu-card p-6 animate-shimmer h-40 rounded-sm" />
          ))}
        </div>
      ) : error ? (
        <div className="skeu-card p-8 text-center">
          <p className="font-body text-muted">Failed to load orders. Please try again.</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="skeu-card p-12 text-center space-y-4">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#7A6A55" strokeWidth="1" className="mx-auto">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14,2 14,8 20,8" />
          </svg>
          <h3 className="font-heading font-semibold text-lg text-text">No orders yet</h3>
          <p className="font-body font-light text-sm text-muted">Start exploring our collections.</p>
          <Link to="/shop" className="skeu-btn inline-block mt-2">Shop Now</Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, i) => {
            const status = statusColors[order.status] || statusColors.pending;
            return (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="skeu-card p-6 space-y-4"
              >
                {/* Top bar */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] text-muted tracking-wider">#{order._id?.slice(-8).toUpperCase()}</span>
                    <span className="font-mono text-[10px] text-muted">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <span
                    className="px-3 py-1 rounded-sm font-mono text-[10px] uppercase tracking-wider text-white"
                    style={{ background: status.bg, boxShadow: `2px 2px 5px ${status.bg}44` }}
                  >
                    {status.label}
                  </span>
                </div>

                <div className="stitch-divider" />

                {/* Items */}
                <div className="space-y-3">
                  {order.orderItems?.map((item, j) => (
                    <div key={j} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] text-muted w-6">{item.qty}×</span>
                        <span className="font-body text-text truncate max-w-[200px]">{item.name}</span>
                        {item.size && <span className="font-mono text-[9px] text-muted">({item.size})</span>}
                      </div>
                      <span className="font-mono text-sm text-accent">${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom */}
                <div className="flex items-center justify-between pt-2">
                  <motion.a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    className="skeu-btn-ghost text-[10px] px-4 py-2 flex items-center gap-2"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    Contact Seller
                  </motion.a>
                  <div className="text-right">
                    <span className="font-mono text-[9px] text-muted block">TOTAL</span>
                    <span className="font-heading font-semibold text-xl text-text">${order.totalPrice}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default Orders;
