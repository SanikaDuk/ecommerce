import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useUpdateProductMutation, useGetProductByIdQuery, useUploadProductImageMutation } from '../store/slices/productApiSlice';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Upload, Plus, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('Unisex');
  const [stock, setStock] = useState(0);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [images, setImages] = useState([]);
  const [newSize, setNewSize] = useState('');
  const [newColor, setNewColor] = useState('#000000');

  const { data: productData, isLoading, error } = useGetProductByIdQuery(id);
  
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadProductImageMutation();

  useEffect(() => {
    if (productData?.data) {
      const p = productData.data;
      setName(p.name);
      setPrice(p.price);
      setDescription(p.description);
      setCategory(p.category);
      setGender(p.gender);
      setStock(p.stock);
      setSizes(p.sizes);
      setColors(p.colors);
      setImages(p.images);
    }
  }, [productData]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        _id: id,
        name,
        price,
        description,
        category,
        gender,
        stock,
        sizes,
        colors,
        images
      }).unwrap();
      toast.success('Product updated');
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadImage(formData).unwrap();
      setImages([...images, res.image]);
      toast.success('Image uploaded');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto min-h-screen">
      <Link to="/admin/productlist" className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-muted hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Inventory</span>
      </Link>

      <div className="flex justify-between items-end mb-12">
        <h1 className="text-4xl font-heading font-bold italic">Edit Product</h1>
        <div className="text-[10px] font-bold uppercase tracking-widest text-muted">ID: {id}</div>
      </div>

      <form onSubmit={submitHandler} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-gray-100/50 space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">Product Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-surface/50 border border-transparent rounded-2xl px-5 py-4 focus:outline-none focus:bg-white focus:border-accent transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">Description</label>
                <textarea 
                  required
                  rows="6"
                  className="w-full bg-surface/50 border border-transparent rounded-2xl px-5 py-4 focus:outline-none focus:bg-white focus:border-accent transition-all resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">Price ($)</label>
                <input 
                  type="number" 
                  required
                  className="w-full bg-surface/50 border border-transparent rounded-2xl px-5 py-4 focus:outline-none focus:bg-white focus:border-accent transition-all"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">Stock Quantity</label>
                <input 
                  type="number" 
                  required
                  className="w-full bg-surface/50 border border-transparent rounded-2xl px-5 py-4 focus:outline-none focus:bg-white focus:border-accent transition-all"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-gray-100/50 space-y-8">
             <h2 className="text-xl font-bold italic mb-6">Gallery</h2>
             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
               {images.map((img, i) => (
                 <div key={i} className="aspect-[3/4] rounded-2xl relative group overflow-hidden border border-gray-100">
                    <img src={img.startsWith('http') ? img : `/api/uploads/${img}`} alt="" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                 </div>
               ))}
               <label className="aspect-[3/4] rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center space-y-2 cursor-pointer hover:border-accent hover:bg-surface transition-all">
                  <input type="file" className="hidden" onChange={uploadFileHandler} />
                  <Upload className="w-6 h-6 text-muted" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Upload</span>
               </label>
             </div>
          </div>
        </div>

        {/* Sidebar Options */}
        <div className="space-y-8">
           <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-xl shadow-gray-100/50 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">Category</label>
                <select 
                  className="w-full bg-surface/50 border border-transparent rounded-2xl px-5 py-4 focus:outline-none focus:bg-white focus:border-accent transition-all appearance-none"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Apparel">Apparel</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Footwear">Footwear</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">Gender</label>
                <select 
                  className="w-full bg-surface/50 border border-transparent rounded-2xl px-5 py-4 focus:outline-none focus:bg-white focus:border-accent transition-all appearance-none"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Unisex">Unisex</option>
                </select>
              </div>
           </div>

           <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-xl shadow-gray-100/50 space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Variants</h3>
              
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase text-muted">Sizes</p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(s => (
                    <span key={s} className="bg-surface px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-2">
                      <span>{s}</span>
                      <X className="w-3 h-3 cursor-pointer" onClick={() => setSizes(sizes.filter(size => size !== s))} />
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input 
                    type="text" 
                    placeholder="Add..." 
                    className="flex-grow bg-surface/50 rounded-xl px-4 py-2 text-xs focus:outline-none"
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value.toUpperCase())}
                  />
                  <button type="button" onClick={() => {if(newSize){setSizes([...sizes, newSize]); setNewSize('')}}} className="p-2 bg-primary text-white rounded-xl"><Plus className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-50">
                <p className="text-[10px] font-bold uppercase text-muted">Colors</p>
                <div className="flex flex-wrap gap-2">
                  {colors.map(c => (
                    <span key={c} className="w-6 h-6 rounded-full border border-gray-100 flex items-center justify-center group relative cursor-pointer" style={{ backgroundColor: c }}>
                      <X className="w-3 h-3 text-white opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => setColors(colors.filter(col => col !== c))} />
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input 
                    type="color" 
                    className="w-10 h-10 bg-transparent cursor-pointer"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                  />
                  <button type="button" onClick={() => setColors([...colors, newColor])} className="p-2 bg-primary text-white rounded-xl flex-grow font-bold text-[10px] uppercase">Add Color</button>
                </div>
              </div>
           </div>

           <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isUpdating}
              className="w-full bg-primary text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center space-x-3 shadow-xl shadow-primary/20"
            >
              {isUpdating ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Product</span>
                </>
              )}
           </motion.button>
        </div>
      </form>
    </div>
  );
};

export default ProductEdit;
