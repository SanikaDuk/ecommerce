import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCreateOrderMutation } from '../store/slices/orderApiSlice';
import { clearCart } from '../store/slices/cartSlice';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState({
    address: '', city: '', postalCode: '', country: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems, totalPrice, shippingPrice, itemsPrice } = cart;

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formattedItems = cartItems.map(item => ({
        product: item._id,
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price,
        size: item.size,
        color: item.color
      }));

      const formattedShippingAddress = {
        street: shippingAddress.address,
        city: shippingAddress.city,
        state: shippingAddress.city, 
        zip: shippingAddress.postalCode,
        country: shippingAddress.country
      };

      const payload = {
        items: formattedItems,
        shippingAddress: formattedShippingAddress,
        totalPrice,
      };
      
      console.log('FINAL CHECKOUT PAYLOAD:', payload);

      const res = await createOrder(payload).unwrap();
      
      dispatch(clearCart());
      toast.success('Order placed successfully!');
      navigate(`/order-success/${res.data._id}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-28 pb-24 px-6 max-w-7xl mx-auto min-h-screen"
    >
      <h1 className="font-heading font-semibold text-4xl text-text mb-12">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-16">
        <div className="flex-grow space-y-12">
          {/* Shipping */}
          <section className="skeu-card p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 flex items-center justify-center rounded-sm font-mono text-[11px]" style={{
                background: 'linear-gradient(160deg, #A07820, #6B4F10)',
                color: '#FFF8E7',
                boxShadow: '2px 2px 6px #9A7A30',
              }}>1</div>
              <h2 className="font-heading font-semibold text-xl text-text">Shipping Address</h2>
            </div>

            <form id="checkout-form" onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2 space-y-2">
                <label className="font-mono text-[9px] text-muted tracking-[0.15em] uppercase">Full Address</label>
                <input type="text" required className="skeu-input w-full text-sm" placeholder="e.g., 123 Luxury Lane"
                  value={shippingAddress.address} onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[9px] text-muted tracking-[0.15em] uppercase">City</label>
                <input type="text" required className="skeu-input w-full text-sm" placeholder="e.g., New York"
                  value={shippingAddress.city} onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[9px] text-muted tracking-[0.15em] uppercase">Postal Code</label>
                <input type="text" required className="skeu-input w-full text-sm" placeholder="e.g., 10001"
                  value={shippingAddress.postalCode} onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})} />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="font-mono text-[9px] text-muted tracking-[0.15em] uppercase">Country</label>
                <input type="text" required className="skeu-input w-full text-sm" placeholder="e.g., United States"
                  value={shippingAddress.country} onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})} />
              </div>
            </form>
          </section>

          {/* Payment */}
          <section className="skeu-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 flex items-center justify-center rounded-sm font-mono text-[11px]" style={{
                background: 'linear-gradient(160deg, #A07820, #6B4F10)',
                color: '#FFF8E7',
                boxShadow: '2px 2px 6px #9A7A30',
              }}>2</div>
              <h2 className="font-heading font-semibold text-xl text-text">Payment Method</h2>
            </div>
            <div className="skeu-card p-5 flex items-center justify-between cursor-default">
              <div className="flex items-center gap-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="1.5">
                  <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                <div>
                  <p className="font-body font-normal text-sm text-text">Cash on Delivery (COD)</p>
                  <p className="font-mono text-[9px] text-muted">Pay when you receive your order</p>
                </div>
              </div>
              <div className="w-5 h-5 rounded-full border-[3px] border-accent" />
            </div>
          </section>
        </div>

        {/* Order Summary */}
        <aside className="w-full lg:w-[380px]">
          <div className="skeu-card p-8 sticky top-28">
            <h2 className="font-heading font-semibold text-xl text-text italic mb-8">Order Summary</h2>

            <div className="space-y-4 mb-6 max-h-48 overflow-y-auto scrollbar-hide">
              {cartItems.map((item) => (
                <div key={`${item._id}-${item.size}-${item.color}`} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] text-muted">{item.qty}×</span>
                    <span className="font-body truncate max-w-[160px]">{item.name}</span>
                  </div>
                  <span className="font-mono text-accent">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="stitch-divider mb-4" />

            <div className="space-y-3">
              <div className="flex justify-between font-body text-sm text-muted">
                <span>Items</span><span className="font-mono">${itemsPrice}</span>
              </div>
              <div className="flex justify-between font-body text-sm text-muted">
                <span>Shipping</span><span className="font-mono">${shippingPrice}</span>
              </div>
              <div className="stitch-divider" />
              <div className="flex justify-between pt-2">
                <span className="font-heading font-semibold italic text-lg">Total</span>
                <span className="font-mono text-lg text-accent">${totalPrice}</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              form="checkout-form"
              type="submit"
              disabled={isLoading || cartItems.length === 0}
              className="skeu-btn w-full mt-8 py-4 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-[#FFF8E7]/30 border-t-[#FFF8E7] rounded-full animate-spin" />
              ) : 'Complete Order'}
            </motion.button>
          </div>
        </aside>
      </div>
    </motion.div>
  );
};

export default Checkout;
