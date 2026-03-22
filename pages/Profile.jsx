import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useUpdateProfileMutation } from '../store/slices/authApiSlice';
import { setCredentials } from '../store/slices/authSlice';
import { toast } from 'react-hot-toast';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res.data }));
        toast.success('Profile updated successfully', {
          style: { background: '#1A1208', color: '#FFF8E7', borderRadius: '4px', fontFamily: 'DM Mono', fontSize: '11px' }
        });
        setPassword('');
        setConfirmPassword('');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="font-heading font-semibold text-3xl text-text mb-2">My Profile</h1>
      <p className="font-body font-light text-sm text-muted mb-10">Manage your account details and preferences</p>

      <div className="skeu-card p-8 lg:p-10 max-w-2xl">
        <form onSubmit={submitHandler} className="space-y-8">
          {/* Personal Information */}
          <div className="space-y-5">
            <h2 className="font-mono text-[10px] text-accent tracking-[0.2em] uppercase flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="font-mono text-[9px] text-muted tracking-[0.15em] uppercase">Full Name</label>
                <input type="text" className="skeu-input w-full text-sm" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[9px] text-muted tracking-[0.15em] uppercase">Email Address</label>
                <input type="email" className="skeu-input w-full text-sm" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="stitch-divider" />

          {/* Password */}
          <div className="space-y-5">
            <h2 className="font-mono text-[10px] text-accent tracking-[0.2em] uppercase flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Update Password
            </h2>
            <p className="font-mono text-[9px] text-muted italic">Leave blank to keep current password</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="font-mono text-[9px] text-muted tracking-[0.15em] uppercase">New Password</label>
                <input type="password" className="skeu-input w-full text-sm" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[9px] text-muted tracking-[0.15em] uppercase">Confirm Password</label>
                <input type="password" className="skeu-input w-full text-sm" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            disabled={isLoading}
            className="skeu-btn w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-[#FFF8E7]/30 border-t-[#FFF8E7] rounded-full animate-spin" />
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
                </svg>
                Save Changes
              </>
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default Profile;
