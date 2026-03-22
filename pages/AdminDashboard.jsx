import { useGetProductsQuery } from '../store/slices/productApiSlice';
import { useGetOrdersQuery } from '../store/slices/orderApiSlice';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { data: productsData } = useGetProductsQuery({ pageSize: 1 });
  const { data: ordersData } = useGetOrdersQuery();

  const stats = [
    {
      label: 'Total Sales', value: '$12,840',
      icon: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
      color: '#4A7C4E',
    },
    {
      label: 'Total Orders', value: ordersData?.data?.length || 0,
      icon: 'M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z',
      color: '#2E5F8A',
    },
    {
      label: 'Total Products', value: productsData?.data?.total || 0,
      icon: 'M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z',
      color: '#8B6914',
    },
    {
      label: 'Total Users', value: '142',
      icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2',
      color: '#5C3D1E',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-28 pb-24 px-6 max-w-7xl mx-auto min-h-screen"
    >
      <div className="mb-12">
        <h1 className="font-heading font-semibold text-4xl text-text">Admin Dashboard</h1>
        <div className="stitch-divider w-24 mt-4" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="skeu-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-12 h-12 rounded-sm flex items-center justify-center"
                style={{
                  background: 'linear-gradient(145deg, #EFEBE2, #E0D8C8)',
                  boxShadow: '3px 3px 8px #C8BFB0, -2px -2px 6px #FDFAF5',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stat.color} strokeWidth="1.5">
                  <path d={stat.icon} />
                </svg>
              </div>
            </div>
            <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted mb-1">{stat.label}</p>
            <h3 className="font-heading font-semibold text-2xl text-text">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Link to="/admin/productlist" className="skeu-card skeu-card-hover p-8 group cursor-pointer">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="1.5" className="mb-4">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          </svg>
          <h3 className="font-heading font-semibold text-lg text-text mb-1">Products</h3>
          <p className="font-body font-light text-sm text-muted">Add, edit, or remove store items</p>
        </Link>
        <Link to="/admin/orderlist" className="skeu-card skeu-card-hover p-8 group cursor-pointer">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="1.5" className="mb-4">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" />
          </svg>
          <h3 className="font-heading font-semibold text-lg text-text mb-1">Orders</h3>
          <p className="font-body font-light text-sm text-muted">Manage deliveries and statuses</p>
        </Link>
        <Link to="/admin/userlist" className="skeu-card skeu-card-hover p-8 group cursor-pointer">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="1.5" className="mb-4">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
          </svg>
          <h3 className="font-heading font-semibold text-lg text-text mb-1">Users</h3>
          <p className="font-body font-light text-sm text-muted">Edit roles and permissions</p>
        </Link>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
