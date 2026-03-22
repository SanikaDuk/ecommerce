import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto scrollbar-hide">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelectedImage(i)}
            className={`flex-shrink-0 w-16 h-20 overflow-hidden rounded-sm transition-all ${
              selectedImage === i ? 'ring-2 ring-accent' : ''
            }`}
            style={{
              border: selectedImage === i ? '2px solid #8B6914' : '2px solid #C4B99A',
              padding: '2px',
              background: 'linear-gradient(145deg, #EFEBE2, #E0D8C8)',
              boxShadow: selectedImage === i
                ? '3px 3px 8px #C8BFB0, -2px -2px 6px #FDFAF5'
                : '2px 2px 4px #C8BFB0',
            }}
          >
            <img
              src={img.startsWith('http') ? img : `/api/uploads/${img}`}
              className="w-full h-full object-cover rounded-sm"
              alt={`Thumbnail ${i}`}
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div
        className="flex-grow aspect-[3/4] overflow-hidden rounded-sm"
        style={{
          border: '4px solid #C4B99A',
          padding: '4px',
          background: 'linear-gradient(145deg, #EFEBE2, #E0D8C8)',
          boxShadow: '8px 8px 20px #C8BFB0, -6px -6px 14px #FDFAF5',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            src={images[selectedImage]?.startsWith('http') ? images[selectedImage] : `/api/uploads/${images[selectedImage]}`}
            className="w-full h-full object-cover rounded-sm"
            alt="Product"
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductGallery;
