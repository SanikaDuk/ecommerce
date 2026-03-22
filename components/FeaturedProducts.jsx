import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

const dummyProducts = [
  { _id: '000000000000000000000001', name: 'Minimal Cotton Tee', slug: 'minimal-cotton-tee', price: 45, category: 'Tops', gender: 'Men', sizes: ['S', 'M', 'L'], colors: ['#1A1208', '#F2EDE6', '#7A6A55'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop'], stock: 10 },
  { _id: '000000000000000000000002', name: 'Silk Slip Dress', slug: 'silk-slip-dress', price: 120, category: 'Dresses', gender: 'Women', sizes: ['XS', 'S', 'M'], colors: ['#8B6914', '#1A1208'], images: ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1908&auto=format&fit=crop'], stock: 5 },
  { _id: '000000000000000000000003', name: 'Premium Denim Jacket', slug: 'premium-denim-jacket', price: 95, category: 'Outerwear', gender: 'Unisex', sizes: ['M', 'L', 'XL'], colors: ['#1A1208', '#5C3D1E'], images: ['https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?q=80&w=1973&auto=format&fit=crop'], stock: 15 },
  { _id: '000000000000000000000004', name: 'Leather Chelsea Boots', slug: 'leather-chelsea-boots', price: 180, category: 'Shoes', gender: 'Men', sizes: ['40', '41', '42'], colors: ['#5C3D1E', '#1A1208'], images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop'], stock: 8 },
  { _id: '000000000000000000000005', name: 'Cashmere Beanie', slug: 'cashmere-beanie', price: 35, category: 'Accessories', gender: 'Unisex', sizes: ['One Size'], colors: ['#7A6A55', '#1A1208'], images: ['https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=1974&auto=format&fit=crop'], stock: 20 },
];

const FeaturedProducts = () => {
  return (
    <section className="py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="font-heading font-semibold text-[42px] text-text tracking-wider">FEATURED PIECES</h2>
            <div className="stitch-divider w-24 mt-4" />
          </div>
          <div className="flex gap-3">
            <button
              className="swiper-prev-btn w-10 h-10 flex items-center justify-center rounded-sm cursor-pointer"
              style={{
                background: 'linear-gradient(145deg, #EFEBE2, #E0D8C8)',
                boxShadow: '3px 3px 8px #C8BFB0, -2px -2px 6px #FDFAF5',
                border: '1px solid rgba(196,185,154,0.4)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5C3D1E" strokeWidth="1.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              className="swiper-next-btn w-10 h-10 flex items-center justify-center rounded-sm cursor-pointer"
              style={{
                background: 'linear-gradient(145deg, #EFEBE2, #E0D8C8)',
                boxShadow: '3px 3px 8px #C8BFB0, -2px -2px 6px #FDFAF5',
                border: '1px solid rgba(196,185,154,0.4)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5C3D1E" strokeWidth="1.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          navigation={{
            prevEl: '.swiper-prev-btn',
            nextEl: '.swiper-next-btn',
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="overflow-visible"
        >
          {dummyProducts.map((p) => (
            <SwiperSlide key={p._id}>
              <ProductCard product={p} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeaturedProducts;
