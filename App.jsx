import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { useSelector, useDispatch } from 'react-redux';
import { setCartOpen } from './store/slices/uiSlice';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import DashboardLayout from './components/DashboardLayout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import AdminDashboard from './pages/AdminDashboard';
import ProductList from './pages/ProductList';
import ProductEdit from './pages/ProductEdit';
import OrderList from './pages/OrderList';
import UserList from './pages/UserList';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import NotFound from './pages/NotFound';

const App = () => {
  const dispatch = useDispatch();
  const { cartOpen } = useSelector((state) => state.ui);

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} toastOptions={{
        style: { background: '#1A1208', color: '#FFF8E7', borderRadius: '4px', fontFamily: '"DM Mono", monospace', fontSize: '11px' }
      }} />
      <CartDrawer isOpen={cartOpen} setIsOpen={(val) => dispatch(setCartOpen(val))} />
      <div className="min-h-screen bg-bg text-text font-body flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* User Dashboard with sidebar layout */}
            <Route path="" element={<PrivateRoute />}>
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success/:id" element={<OrderSuccess />} />
              <Route element={<DashboardLayout />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<Orders />} />
              </Route>
            </Route>

            <Route path="" element={<AdminRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/productlist" element={<ProductList />} />
              <Route path="/admin/product/:id/edit" element={<ProductEdit />} />
              <Route path="/admin/orderlist" element={<OrderList />} />
              <Route path="/admin/userlist" element={<UserList />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
