import { useGetProductsQuery, useDeleteProductMutation, useCreateProductMutation } from '../store/slices/productApiSlice';
import { motion } from 'framer-motion';
import { Package, Plus, Edit, Trash2, Search, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ProductList = () => {
  const { data: productData, isLoading, refetch } = useGetProductsQuery({ pageNumber: 1, pageSize: 100 });
  const products = productData?.data?.products || [];

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const navigate = useNavigate();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id).unwrap();
        refetch();
        toast.success('Product deleted');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createProductHandler = async () => {
    try {
      const res = await createProduct({
        name: 'New Product',
        price: 0,
        description: 'New Description',
        category: 'Apparel',
        gender: 'Unisex',
        stock: 0,
        sizes: ['M'],
        colors: ['#000000'],
        images: ['placeholder.jpg']
      }).unwrap();
      navigate(`/admin/product/${res.data._id}/edit`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (isLoading) return <div className="pt-32 text-center">Loading...</div>;

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold italic mb-2">Product Inventory</h1>
          <p className="text-muted font-light tracking-wide italic">Manage your store catalog and inventory levels</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={createProductHandler}
          disabled={isCreating}
          className="bg-primary text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center space-x-3 shadow-xl shadow-primary/20"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Product</span>
        </motion.button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-xl shadow-gray-100/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface/50 border-b border-gray-100">
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-muted">Product</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-muted">Category</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-muted">Price</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-muted">Stock</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-surface/30 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-16 bg-surface rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                        {product.images?.[0] ? (
                          <img src={product.images[0].startsWith('http') ? product.images[0] : `/api/uploads/${product.images[0]}`} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-50"><ImageIcon className="w-4 h-4 text-muted" /></div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-sm truncate max-w-[200px]">{product.name}</p>
                        <p className="text-[10px] text-muted font-mono uppercase">ID: {product._id.slice(-6)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold uppercase tracking-wider bg-gray-50 px-3 py-1 rounded-full">{product.category}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="font-bold text-sm">${product.price.toFixed(2)}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-2">
                       <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-green-500' : product.stock > 0 ? 'bg-orange-500' : 'bg-red-500'}`} />
                       <span className={`text-sm font-bold ${product.stock === 0 ? 'text-red-500' : ''}`}>{product.stock} Units</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-3">
                      <Link 
                        to={`/admin/product/${product._id}/edit`}
                        className="p-2 hover:bg-white hover:shadow-md rounded-lg transition-all text-muted hover:text-accent"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button 
                        onClick={() => deleteHandler(product._id)}
                        className="p-2 hover:bg-white hover:shadow-md rounded-lg transition-all text-muted hover:text-red-500"
                        disabled={isDeleting}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
