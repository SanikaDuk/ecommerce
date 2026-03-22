import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from '../store/slices/productApiSlice';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import Filters from '../components/Filters';
import { motion } from 'framer-motion';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    keyword: searchParams.get('keyword') || '',
    category: searchParams.get('category') ? [searchParams.get('category')] : [],
    gender: searchParams.get('gender') ? [searchParams.get('gender')] : [],
    sizes: [],
    colors: [],
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
  });
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const queryArgs = {
    keyword: filters.keyword,
    category: filters.category.join(','),
    gender: filters.gender.join(','),
    sizes: filters.sizes.join(','),
    colors: filters.colors.join(','),
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    sort,
    pageNumber: page,
  };

  const { data, isLoading, error } = useGetProductsQuery(queryArgs);
  const products = data?.data?.products || [];
  const pages = data?.data?.pages || 1;

  const clearFilters = () => {
    setFilters({ keyword: '', category: [], gender: [], sizes: [], colors: [], minPrice: '', maxPrice: '' });
    setSort('newest');
    setPage(1);
  };

  useEffect(() => {
    const params = {};
    if (filters.keyword) params.keyword = filters.keyword;
    if (filters.category.length) params.category = filters.category[0];
    if (filters.gender.length) params.gender = filters.gender[0];
    if (sort !== 'newest') params.sort = sort;
    setSearchParams(params);
  }, [filters, sort, setSearchParams]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-28 pb-24 px-6 max-w-7xl mx-auto min-h-screen"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="font-heading font-semibold text-4xl md:text-5xl text-text">THE COLLECTION</h1>
          <div className="stitch-divider w-24 mt-4" />
        </div>
        <div className="flex items-center gap-4">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden skeu-btn-ghost flex items-center gap-2 text-[10px] px-4 py-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
            </svg>
            Filters
          </button>
          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value); setPage(1); }}
            className="skeu-input text-[11px] font-mono tracking-wider py-2 px-3"
          >
            <option value="newest">NEWEST</option>
            <option value="priceLow">PRICE: LOW → HIGH</option>
            <option value="priceHigh">PRICE: HIGH → LOW</option>
          </select>
          {/* Search */}
          <input
            type="text"
            placeholder="Search..."
            className="skeu-input text-sm w-40 py-2"
            value={filters.keyword}
            onChange={(e) => { setFilters(prev => ({ ...prev, keyword: e.target.value })); setPage(1); }}
          />
        </div>
      </div>

      <div className="flex gap-10">
        {/* Sidebar Filters */}
        <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}>
          <div className="skeu-card p-6 sticky top-28">
            <Filters filters={filters} setFilters={(fn) => { setFilters(fn); setPage(1); }} clearFilters={clearFilters} />
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <ProductSkeleton key={i} />)}
            </div>
          ) : error ? (
            <div className="skeu-card p-12 text-center">
              <p className="font-body text-muted">Failed to load products. Please try again.</p>
            </div>
          ) : products.length === 0 ? (
            <div className="skeu-card p-12 text-center space-y-3">
              <h3 className="font-heading font-semibold text-lg text-text">No products found</h3>
              <p className="font-body font-light text-sm text-muted">Try adjusting your filters.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((p, i) => (
                  <motion.div
                    key={p._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <ProductCard product={p} />
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {pages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-16">
                  {[...Array(pages).keys()].map((x) => (
                    <button
                      key={x + 1}
                      onClick={() => setPage(x + 1)}
                      className={`w-10 h-10 flex items-center justify-center font-mono text-[11px] rounded-sm transition-all ${
                        page === x + 1 ? 'skeu-btn' : 'skeu-card skeu-card-hover cursor-pointer text-muted'
                      }`}
                    >
                      {x + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Shop;
