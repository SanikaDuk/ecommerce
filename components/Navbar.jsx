import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../store/slices/authApiSlice';
import { logout } from '../store/slices/authSlice';
import { toggleCart } from '../store/slices/uiSlice';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const navLinks = [
    { name: 'Shop All', path: '/shop' },
    { name: 'Men', path: '/shop?gender=Men' },
    { name: 'Women', path: '/shop?gender=Women' },
    { name: 'New Arrivals', path: '/shop?sort=newest' },
  ];

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3'
            : 'py-5'
        }`}
        style={{
          background: isScrolled ? 'rgba(234,227,214,0.92)' : '#EAE3D6',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          boxShadow: isScrolled
            ? '0 4px 16px #C0B8A8, 0 1px 0 #FDFAF5'
            : '0 4px 12px #C0B8A8, 0 1px 0 #FDFAF5',
          borderBottom: '1px solid #D4C9B0',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Mobile Menu Toggle */}
          <button className="lg:hidden text-accent2" onClick={() => setIsMenuOpen(true)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Logo */}
          <Link to="/" className="font-heading font-semibold text-[22px] tracking-[0.2em] text-text select-none">
            UNIQUE STORE<span className="text-accent">.</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="font-heading font-light text-[13px] uppercase tracking-[0.15em] text-muted hover:text-accent transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-5">
            {/* Search */}
            <button className="hidden sm:block text-accent2 hover:text-accent transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* User */}
            <div className="relative group">
              <Link to={userInfo ? "/profile" : "/login"} className="text-accent2 hover:text-accent transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
              {userInfo && (
                <div
                  className="absolute right-0 mt-3 w-52 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50"
                  style={{
                    background: 'linear-gradient(145deg, #EFEBE2, #E0D8C8)',
                    boxShadow: '6px 6px 14px #C8BFB0, -4px -4px 10px #FDFAF5',
                    border: '1px solid rgba(196,185,154,0.4)',
                    borderRadius: '4px',
                  }}
                >
                  <div className="px-4 py-2 border-b border-seam/30 mb-1">
                    <p className="font-mono text-[10px] text-muted tracking-wider">SIGNED IN AS</p>
                    <p className="text-sm font-body font-normal truncate text-text">{userInfo.name}</p>
                  </div>
                  <Link to="/profile" className="block px-4 py-2 text-sm font-body hover:bg-surface/60 text-text transition-colors">My Profile</Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm font-body hover:bg-surface/60 text-text transition-colors">My Orders</Link>
                  {userInfo.role === 'admin' && (
                    <Link to="/admin/dashboard" className="block px-4 py-2 text-sm font-mono text-accent hover:bg-surface/60 transition-colors tracking-wider">ADMIN</Link>
                  )}
                  <button onClick={logoutHandler} className="w-full text-left px-4 py-2 text-sm font-body text-red-700 hover:bg-red-50/30 transition-colors">
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="hidden sm:block text-accent2 hover:text-accent transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </Link>

            {/* Cart */}
            <button onClick={() => dispatch(toggleCart())} className="text-accent2 hover:text-accent transition-colors relative">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 w-[18px] h-[18px] flex items-center justify-center font-mono text-[9px] rounded-sm"
                  style={{
                    background: 'linear-gradient(135deg, #D4C49A, #BEA978)',
                    boxShadow: '2px 2px 5px #A89060, -1px -1px 3px #EDD98A',
                    color: '#3A2A08',
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-text/40 z-[100] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[300px] z-[110] p-8 fabric-bg"
              style={{
                boxShadow: '6px 0 24px #C0B8A8',
                borderRight: '1px solid #D4C9B0',
              }}
            >
              <div className="flex justify-between items-center mb-12">
                <span className="font-heading font-semibold text-lg tracking-[0.2em] text-text">MENU</span>
                <button onClick={() => setIsMenuOpen(false)} className="text-accent2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link key={link.name} to={link.path} onClick={() => setIsMenuOpen(false)}
                    className="font-heading font-light text-[15px] uppercase tracking-[0.15em] text-text hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="stitch-divider my-4" />
                <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="font-heading font-light text-[15px] uppercase tracking-[0.15em] text-muted hover:text-accent transition-colors">Contact</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
