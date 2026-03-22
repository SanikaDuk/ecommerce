import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

const dummyNewArrivals = [
  { _id: '000000000000000000000006', name: 'Oversized Linen Shirt', slug: 'oversized-linen-shirt', price: 68, category: 'Tops', gender: 'Unisex', sizes: ['S', 'M', 'L', 'XL'], colors: ['#F2EDE6', '#7A6A55'], images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1976&auto=format&fit=crop'], stock: 12 },
  { _id: '000000000000000000000007', name: 'Tailored Wool Trousers', slug: 'tailored-wool-trousers', price: 110, category: 'Bottoms', gender: 'Men', sizes: ['30', '32', '34'], colors: ['#1A1208', '#5C3D1E'], images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1980&auto=format&fit=crop'], stock: 7 },
  { _id: '000000000000000000000008', name: 'Knit Midi Dress', slug: 'knit-midi-dress', price: 89, category: 'Dresses', gender: 'Women', sizes: ['XS', 'S', 'M'], colors: ['#8B6914', '#E8E0D0'], images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983&auto=format&fit=crop'], stock: 9 },
  { _id: '000000000000000000000009', name: 'Canvas Tote Bag', slug: 'canvas-tote-bag', price: 42, category: 'Accessories', gender: 'Unisex', sizes: ['One Size'], colors: ['#C4B99A', '#1A1208'], images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1974&auto=format&fit=crop'], stock: 25 },
  { _id: '000000000000000000000010', name: 'Suede Bomber Jacket', slug: 'suede-bomber-jacket', price: 195, category: 'Outerwear', gender: 'Men', sizes: ['M', 'L', 'XL'], colors: ['#5C3D1E', '#7A6A55'], images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1935&auto=format&fit=crop'], stock: 4 },
  { _id: '000000000000000000000011', name: 'Gold Pendant Necklace', slug: 'gold-pendant-necklace', price: 55, category: 'Accessories', gender: 'Women', sizes: ['One Size'], colors: ['#8B6914'], images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1974&auto=format&fit=crop'], stock: 18 },
];

const NewArrivals = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading font-semibold text-[42px] text-text tracking-wider">NEW ARRIVALS</h2>
          <div className="stitch-divider w-32 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyNewArrivals.map((p, i) => (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
