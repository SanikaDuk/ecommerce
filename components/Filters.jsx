import { motion } from 'framer-motion';

const Filters = ({ filters, setFilters, clearFilters }) => {
  const categories = ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Accessories', 'Shoes'];
  const genders = ['Men', 'Women', 'Kids', 'Unisex'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];
  const colors = [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Green', value: '#10B981' },
    { name: 'Beige', value: '#F5F5DC' },
    { name: 'Gold', value: '#8B6914' },
  ];

  const handleToggle = (key, value) => {
    setFilters(prev => {
      const current = prev[key] || [];
      if (current.includes(value)) {
        return { ...prev, [key]: current.filter(v => v !== value) };
      } else {
        return { ...prev, [key]: [...current, value] };
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="font-heading font-semibold text-lg text-text">Filters</h3>
        <button onClick={clearFilters} className="font-mono text-[10px] text-accent tracking-wider hover:underline underline-offset-4 uppercase">Clear All</button>
      </div>

      {/* Gender */}
      <div>
        <h4 className="font-mono text-[9px] tracking-[0.2em] uppercase mb-4 text-muted">Gender</h4>
        <div className="flex flex-wrap gap-2">
          {genders.map(g => (
            <button
              key={g}
              onClick={() => handleToggle('gender', g)}
              className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider rounded-sm transition-all ${
                filters.gender?.includes(g)
                  ? 'skeu-btn'
                  : 'skeu-card text-muted hover:text-text cursor-pointer'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="stitch-divider" />

      {/* Categories */}
      <div>
        <h4 className="font-mono text-[9px] tracking-[0.2em] uppercase mb-4 text-muted">Categories</h4>
        <div className="space-y-2">
          {categories.map(c => (
            <label key={c} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.category?.includes(c)}
                onChange={() => handleToggle('category', c)}
                className="w-4 h-4 accent-accent"
              />
              <span className={`font-body text-sm group-hover:text-text transition-colors ${
                filters.category?.includes(c) ? 'text-text font-normal' : 'text-muted font-light'
              }`}>{c}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="stitch-divider" />

      {/* Sizes */}
      <div>
        <h4 className="font-mono text-[9px] tracking-[0.2em] uppercase mb-4 text-muted">Size</h4>
        <div className="grid grid-cols-4 gap-2">
          {sizes.map(s => (
            <button
              key={s}
              onClick={() => handleToggle('sizes', s)}
              className={`h-9 flex items-center justify-center font-mono text-[9px] rounded-sm transition-all ${
                filters.sizes?.includes(s)
                  ? 'skeu-btn'
                  : 'skeu-card cursor-pointer text-muted hover:text-text'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="stitch-divider" />

      {/* Colors */}
      <div>
        <h4 className="font-mono text-[9px] tracking-[0.2em] uppercase mb-4 text-muted">Colors</h4>
        <div className="flex flex-wrap gap-3">
          {colors.map(c => (
            <button
              key={c.name}
              title={c.name}
              onClick={() => handleToggle('colors', c.value)}
              className={`w-7 h-7 rounded-full border-2 transition-all p-0.5 ${
                filters.colors?.includes(c.value) ? 'border-accent scale-110' : 'border-seam/40'
              }`}
            >
              <div
                className="w-full h-full rounded-full"
                style={{ backgroundColor: c.value, boxShadow: 'inset 1px 1px 3px rgba(0,0,0,0.2)' }}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="stitch-divider" />

      {/* Price Range */}
      <div>
        <h4 className="font-mono text-[9px] tracking-[0.2em] uppercase mb-4 text-muted">Price Range</h4>
        <div className="flex items-center gap-3">
          <input
            type="number"
            placeholder="Min"
            className="skeu-input w-full text-sm py-2 px-3"
            value={filters.minPrice || ''}
            onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
          />
          <span className="text-seam font-light">–</span>
          <input
            type="number"
            placeholder="Max"
            className="skeu-input w-full text-sm py-2 px-3"
            value={filters.maxPrice || ''}
            onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
