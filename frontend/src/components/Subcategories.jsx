import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';

// Dynamic image loading function
const getProductImage = (productId) => {
  // If it's a Cloudinary URL, use it directly
  if (productId && typeof productId === 'string' && productId.startsWith('http')) {
    return productId;
  }
  
  const extensions = ['jpg', 'webp', 'png', 'jpeg', 'avif'];
  
  for (const ext of extensions) {
    try {
      return require(`../assets/${productId}.${ext}`);
    } catch (error) {
      continue;
    }
  }
  
  // Fallback to default image
  try {
    return require('../assets/1.jpg');
  } catch {
    return '/placeholder-image.jpg';
  }
};

const categoryToSlug = (category) => category?.toLowerCase().replace(/\s+/g, '-') || '';
const slugToCategory = (slug) => slug?.replace(/-/g, ' ') || '';

const Subcategories = () => {
  const { mainCategory } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Convert slug back to category name - with safety check
  const mainCategoryName = mainCategory ? slugToCategory(mainCategory) : '';
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch from backend API
        const res = await productAPI.getAll();
        
        if (res.success && Array.isArray(res.data)) {
          setProducts(res.data);
          console.log('✅ Products fetched from backend:', res.data.length);
        } else {
          console.warn('⚠️ Unexpected API response:', res);
          setProducts([]);
        }
      } catch (err) {
        console.error('❌ Failed to fetch products:', err);
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  // FIXED: Filter products for this main category (case-insensitive)
  const productsInMain = products.filter(p => {
    const productMainCategory = (p.mainCategory || '').toLowerCase();
    return productMainCategory === mainCategoryName.toLowerCase();
  });
  
  // FIXED: Get unique subcategories
  const subcategories = [...new Set(
    productsInMain
      .map(p => p.subCategory || '')
      .filter(Boolean)
  )];
  
  console.log(' Main Category:', mainCategoryName);
  console.log(' Products in main:', productsInMain.length);
  console.log(' Subcategories:', subcategories);
  
  const handleSubcategoryClick = (subCategory) => {
    const slug = categoryToSlug(subCategory);
    navigate(`/category/sub/${slug}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8 mt-20 text-center">
        <p className="text-gray-600">Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-8 mt-20 text-center">
        <p className="text-red-600">Error loading categories: {error}</p>
        <Link to="/" className="text-yellow-600 hover:text-yellow-700 mt-4 inline-block">
          Go back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8 mt-20">
      <div className="mb-8">
        <nav className="text-sm breadcrumbs mb-4">
          <Link to="/" className="text-yellow-600 hover:text-yellow-700">Home</Link>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-600 capitalize">{mainCategoryName}</span>
        </nav>
        <h1 className="text-3xl font-bold text-slate-800 capitalize">{mainCategoryName}</h1>
        <p className="text-slate-600 mt-2">Choose a subcategory to explore specific products</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subcategories.length > 0 ? (
          subcategories.map((subCategory, index) => {
            // Get a sample product from this subcategory to show its image
            const sampleProduct = productsInMain.find(p => p.subCategory === subCategory);
            
            // Use product image directly (it's already a URL from Cloudinary)
            const imageUrl = sampleProduct?.image || '/placeholder-image.jpg';
            
            // Count products in this subcategory
            const productCount = productsInMain.filter(p => p.subCategory === subCategory).length;
            
            return (
              <div
                key={index}
                onClick={() => handleSubcategoryClick(subCategory)}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-200 hover:border-yellow-300 group overflow-hidden"
              >
                {/* Image section */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={imageUrl}
                    alt={subCategory}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = '/placeholder-image.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Content section */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-800 group-hover:text-yellow-700 transition-colors duration-300 mb-2">
                    {subCategory}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Explore {subCategory.toLowerCase()} products and solutions
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-yellow-600 group-hover:text-yellow-700">
                      <span className="text-sm font-medium">View Products</span>
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </div>
                    <div className="text-xs text-slate-400">
                      {productCount} product{productCount !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-slate-500">
              <p className="text-lg font-medium">No subcategories found for {mainCategoryName}</p>
              <p className="mt-2">This category might not have any products yet</p>
              <Link 
                to="/products"
                className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-600 text-white rounded-lg hover:from-yellow-700 hover:to-yellow-700 transition-all duration-300"
              >
                View All Products
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subcategories;