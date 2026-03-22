import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import MarqueeStrip from '../components/MarqueeStrip';
import CategoryGrid from '../components/CategoryGrid';
import FeaturedProducts from '../components/FeaturedProducts';
import EditorialBanner from '../components/EditorialBanner';
import NewArrivals from '../components/NewArrivals';
import HowToOrder from '../components/HowToOrder';
import Newsletter from '../components/Newsletter';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <MarqueeStrip />
      <CategoryGrid />
      <FeaturedProducts />
      <EditorialBanner />
      <NewArrivals />
      <HowToOrder />
      <Newsletter />
    </motion.div>
  );
};

export default Home;
