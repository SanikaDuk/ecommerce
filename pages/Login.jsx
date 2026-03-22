import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../store/slices/authApiSlice';
import { setCredentials } from '../store/slices/authSlice';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res.data }));
      toast.success('Logged in successfully');
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-28 pb-24 px-6 min-h-screen flex items-center justify-center"
    >
      <div className="skeu-card p-10 w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-heading font-semibold text-3xl text-text mb-2">Welcome Back</h1>
          <p className="font-body font-light text-sm text-muted">Sign in to sync your wishlist and orders</p>
        </div>

        <form onSubmit={submitHandler} className="space-y-5">
          <div className="space-y-2">
            <label className="font-mono text-[9px] text-muted tracking-[0.15em] uppercase">Email Address</label>
            <input type="email" placeholder="jane@example.com" className="skeu-input w-full text-sm"
              value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <label className="font-mono text-[9px] text-muted tracking-[0.15em] uppercase">Password</label>
            <input type="password" placeholder="••••••••" className="skeu-input w-full text-sm"
              value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className="flex justify-end">
            <Link to="/forgot-password" className="font-mono text-[10px] text-accent tracking-wider hover:underline underline-offset-4">Forgot Password?</Link>
          </div>

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }} type="submit" disabled={isLoading}
            className="skeu-btn w-full flex items-center justify-center gap-2 py-4 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-[#FFF8E7]/30 border-t-[#FFF8E7] rounded-full animate-spin" />
            ) : 'Sign In'}
          </motion.button>
        </form>

        <div className="mt-8 text-center font-body text-sm text-muted">
          Don't have an account?{' '}
          <Link to={`/register?redirect=${redirect}`} className="text-accent font-normal hover:underline underline-offset-4">Create one now</Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
