import { useGetOrdersQuery, useUpdateOrderStatusMutation } from '../store/slices/orderApiSlice';
import { motion } from 'framer-motion';
import { ShoppingBag, Calendar, User, ChevronRight, Package, Truck, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const OrderList = () => {
  const { data: orderData, isLoading, refetch } = useGetOrdersQuery();
  const orders = orderData?.data || [];

  const [updateStatus, { isLoading: isUpdating }] = useUpdateOrderStatusMutation();

  const statusHandler = async (orderId, status) => {
    try {
      await updateStatus({ orderId, status }).unwrap();
      refetch();
      toast.success(`Status updated to ${status}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (isLoading) return <div className="pt-32 text-center">Loading...</div>;

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold italic mb-2">Order Management</h1>
        <p className="text-muted font-light tracking-wide italic">Track shipments, update statuses, and manage fulfillment</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-xl shadow-gray-100/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface/50 border-b border-gray-100">
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-muted">Order ID</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-muted">Customer</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-muted">Date</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-muted">Total</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-muted">Status</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-surface/30 transition-colors">
                  <td className="px-8 py-6">
                    <span className="font-mono text-xs font-bold uppercase tracking-tighter">#{order._id.slice(-8)}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-surface rounded-full flex items-center justify-center text-[10px] font-bold text-accent uppercase">
                        {order.user?.name.charAt(0)}
                      </div>
                      <span className="text-sm font-bold">{order.user?.name || 'Guest'}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm text-muted">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-6 font-bold text-sm">
                    ${order.totalPrice.toFixed(2)}
                  </td>
                  <td className="px-8 py-6">
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      order.status === 'Delivered' ? 'bg-green-50 text-green-500' : 
                      order.status === 'Shipped' ? 'bg-blue-50 text-blue-500' : 
                      'bg-orange-50 text-orange-500'
                    }`}>
                      {order.status === 'Delivered' ? <CheckCircle className="w-3 h-3" /> : <Package className="w-3 h-3" />}
                      <span>{order.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm">
                    <div className="flex items-center space-x-2">
                       <select 
                        disabled={isUpdating}
                        onChange={(e) => statusHandler(order._id, e.target.value)}
                        value={order.status}
                        className="bg-surface border-none text-[10px] font-bold uppercase tracking-widest rounded-lg px-3 py-2 focus:ring-1 focus:ring-accent outline-none"
                      >
                         <option value="Processing">Processing</option>
                         <option value="Shipped">Shipped</option>
                         <option value="Delivered">Delivered</option>
                         <option value="Cancelled">Cancelled</option>
                       </select>
                       <Link to={`/order-success/${order._id}`} className="p-2 hover:bg-white rounded-lg transition-all text-muted">
                        <ChevronRight className="w-4 h-4" />
                       </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
