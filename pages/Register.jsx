import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../store/slices/authApiSlice';
import { setCredentials } from '../store/slices/authSlice';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res.data }));
        toast.success('Account created successfully');
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
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
          <h1 className="font-heading font-semibold text-3xl text-text mb-2">Create Account</h1>
          <p className="font-body font-light text-sm text-muted">Join our community for a premium experience</p>
        </div>

        <form onSubmit={submitHandler} className="space-y-4">
          <div className="space-y-2">
            <label className="font-mono text-[9px] text-muted tracking-[0.15em] uppercase">Full Name</label>
            <input type="text" placeholder="Jane Doe" className="skeu-input w-full text-sm"
              value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <label className="font-mono text-[9px] text-muted tracking-[0.15em] uppercase">Email Address</label>
            <input type="email" placeholder="jane@example.com" className="skeu-input w-full text-sm"
              value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <label className="font-mono text-[9px] text-muted tracking-[0.15em] uppercase">Password</label>
            <input type="password" placeholder="Minimum 6 characters" className="skeu-input w-full text-sm"
              value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <label className="font-mono text-[9px] text-muted tracking-[0.15em] uppercase">Confirm Password</label>
            <input type="password" placeholder="••••••••" className="skeu-input w-full text-sm"
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }} type="submit" disabled={isLoading}
            className="skeu-btn w-full flex items-center justify-center gap-2 py-4 mt-4 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-[#FFF8E7]/30 border-t-[#FFF8E7] rounded-full animate-spin" />
            ) : 'Sign Up'}
          </motion.button>
        </form>

        <div className="mt-8 text-center font-body text-sm text-muted">
          Already have an account?{' '}
          <Link to={`/login?redirect=${redirect}`} className="text-accent font-normal hover:underline underline-offset-4">Sign In</Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
