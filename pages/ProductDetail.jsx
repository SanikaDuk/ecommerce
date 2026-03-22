import { useParams } from 'react-router-dom';
import { useGetProductDetailsQuery } from '../store/slices/productApiSlice';
import ProductGallery from '../components/ProductGallery';
import ProductInfo from '../components/ProductInfo';
import { motion } from 'framer-motion';

const ProductDetail = () => {
  const { slug } = useParams();
  const { data, isLoading, error } = useGetProductDetailsQuery(slug);
  const product = data?.data;

  if (isLoading) {
    return (
      <div className="pt-28 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="aspect-[3/4] animate-shimmer skeu-card" />
          <div className="space-y-6">
            <div className="h-8 w-3/4 animate-shimmer rounded-sm" />
            <div className="h-6 w-1/3 animate-shimmer rounded-sm" />
            <div className="h-20 w-full animate-shimmer rounded-sm" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pt-28 pb-24 px-6 max-w-7xl mx-auto min-h-screen flex items-center justify-center">
        <div className="skeu-card p-12 text-center">
          <h2 className="font-heading font-semibold text-2xl text-text mb-2">Product Not Found</h2>
          <p className="font-body font-light text-muted">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-28 pb-24 px-6 max-w-7xl mx-auto min-h-screen"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} />
      </div>
    </motion.div>
  );
};

export default ProductDetail;
