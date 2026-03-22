import { useState } from 'react';
import { useForgotPasswordMutation } from '../store/slices/authApiSlice';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword({ email }).unwrap();
      toast.success('Reset link sent to your email');
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
          <h1 className="font-heading font-semibold text-3xl text-text mb-2">Forgot Password</h1>
          <p className="font-body font-light text-sm text-muted">Enter your email and we'll send a reset link</p>
        </div>

        <form onSubmit={submitHandler} className="space-y-5">
          <div className="space-y-2">
            <label className="font-mono text-[9px] text-muted tracking-[0.15em] uppercase">Email Address</label>
            <input type="email" placeholder="jane@example.com" className="skeu-input w-full text-sm"
              value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }} type="submit" disabled={isLoading}
            className="skeu-btn w-full flex items-center justify-center gap-2 py-4 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-[#FFF8E7]/30 border-t-[#FFF8E7] rounded-full animate-spin" />
            ) : 'Send Reset Link'}
          </motion.button>
        </form>

        <div className="mt-8 text-center">
          <Link to="/login" className="font-body text-sm text-muted hover:text-text transition-colors inline-flex items-center gap-2">
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
