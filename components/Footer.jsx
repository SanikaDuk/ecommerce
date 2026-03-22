import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ background: '#1A1208' }} className="text-[#FFF8E7] pt-20 pb-8 px-6 relative overflow-hidden">
      {/* Watermark Logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-heading font-semibold text-[180px] tracking-[0.3em] opacity-[0.03]">UNIQUE STORE</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="font-heading font-semibold text-xl tracking-[0.2em]">
              UNIQUE STORE<span style={{ color: '#8B6914' }}>.</span>
            </Link>
            <p className="font-body font-light text-sm leading-relaxed opacity-40 max-w-xs">
              Defining modern aesthetics through premium craftsmanship and timeless designs.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase mb-8 opacity-60">Shop</h4>
            <ul className="space-y-4 font-body font-light text-sm opacity-50">
              <li><Link to="/shop?gender=Men" className="hover:text-[#8B6914] transition-colors">Men's Collection</Link></li>
              <li><Link to="/shop?gender=Women" className="hover:text-[#8B6914] transition-colors">Women's Collection</Link></li>
              <li><Link to="/shop?category=Accessories" className="hover:text-[#8B6914] transition-colors">Accessories</Link></li>
              <li><Link to="/shop?sort=newest" className="hover:text-[#8B6914] transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase mb-8 opacity-60">Help</h4>
            <ul className="space-y-4 font-body font-light text-sm opacity-50">
              <li><Link to="/contact" className="hover:text-[#8B6914] transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-[#8B6914] transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/size-guide" className="hover:text-[#8B6914] transition-colors">Size Guide</Link></li>
              <li><Link to="/faq" className="hover:text-[#8B6914] transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase mb-2 opacity-60">Contact</h4>
            <div className="space-y-3 font-body font-light text-sm opacity-50">
              <p>123 Fashion Ave, NY 10001</p>
              <p>+1 (234) 567-890</p>
              <p>hello@uniquestore.com</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-center"
          style={{ borderTop: '2px dashed rgba(139,105,20,0.2)' }}
        >
          <p className="font-mono text-[9px] tracking-[0.15em] uppercase opacity-30">
            &copy; 2026 UNIQUE STORE FASHION GROUP. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0 font-mono text-[9px] tracking-[0.1em] uppercase opacity-30">
            <Link to="/privacy" className="hover:opacity-60 transition-opacity">Privacy Policy</Link>
            <Link to="/terms" className="hover:opacity-60 transition-opacity">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
