import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-28 pb-24 px-6 min-h-screen flex items-center justify-center"
    >
      <div className="skeu-card p-16 text-center max-w-md space-y-6">
        <span className="font-mono text-[80px] text-accent leading-none block">404</span>
        <h1 className="font-heading font-semibold text-2xl text-text">Page Not Found</h1>
        <p className="font-body font-light text-sm text-muted leading-relaxed">
          The page you're looking for seems to have wandered off. Let's get you back on track.
        </p>
        <Link to="/">
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} className="skeu-btn mt-4">
            Back to Home
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default NotFound;
