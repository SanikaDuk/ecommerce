import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from '../store/slices/authApiSlice';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        await resetPassword({ token, password }).unwrap();
        toast.success('Password updated successfully');
        navigate('/login');
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
          <h1 className="font-heading font-semibold text-3xl text-text mb-2">New Password</h1>
          <p className="font-body font-light text-sm text-muted">Create a strong password for your account</p>
        </div>

        <form onSubmit={submitHandler} className="space-y-5">
          <div className="space-y-2">
            <label className="font-mono text-[9px] text-muted tracking-[0.15em] uppercase">New Password</label>
            <input type="password" placeholder="Minimum 6 characters" className="skeu-input w-full text-sm"
              value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <label className="font-mono text-[9px] text-muted tracking-[0.15em] uppercase">Confirm Password</label>
            <input type="password" placeholder="••••••••" className="skeu-input w-full text-sm"
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }} type="submit" disabled={isLoading}
            className="skeu-btn w-full flex items-center justify-center gap-2 py-4 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-[#FFF8E7]/30 border-t-[#FFF8E7] rounded-full animate-spin" />
            ) : 'Save New Password'}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ResetPassword;
