import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';

const categoryToSlug = (category) => {
  if (!category) return '';
  return category.toLowerCase().trim().replace(/\s+/g, '-');
};

const slugToCategory = (slug) => {
  if (!slug) return '';
  // Split by hyphen and capitalize each word
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const Subcategories = () => {
  const { mainCategory } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  console.log('🔑 URL Param mainCategory:', mainCategory);
  
  const mainCategoryName = mainCategory ? slugToCategory(mainCategory) : '';
  
  console.log('📝 Converted mainCategoryName:', mainCategoryName);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await productAPI.getAll();
        
        if (res.success && Array.isArray(res.data)) {
          setProducts(res.data);
          console.log('✅ Products fetched from backend:', res.data.length);
          console.log('📋 All products:', res.data);
          
          // Log each product's mainCategory
          res.data.forEach((p, i) => {
            console.log(`Product ${i + 1}: "${p.mainCategory}" (ID: ${p.id})`);
          });
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
  }, [mainCategory]);
  
  // Filter products for this main category (case-insensitive, trim whitespace)
  const productsInMain = products.filter(p => {
    if (!p.mainCategory) {
      console.log('⚠️ Product missing mainCategory:', p);
      return false;
    }
    
    const productMainCategory = p.mainCategory.toLowerCase().trim();
    const searchCategory = mainCategoryName.toLowerCase().trim();
    
    const matches = productMainCategory === searchCategory;
    
    console.log(`🔍 Comparing: "${productMainCategory}" === "${searchCategory}" = ${matches}`);
    
    return matches;
  });
  
  // Get unique subcategories (filter out empty values)
  const subcategories = [...new Set(
    productsInMain
      .map(p => p.subCategory)
      .filter(sub => sub && sub.trim() !== '')
  )];
  
  console.log('🎯 Final Results:');
  console.log('  Main Category Name:', mainCategoryName);
  console.log('  Products in main category:', productsInMain.length);
  console.log('  Subcategories found:', subcategories);
  console.log('  Products:', productsInMain);
  
  const handleSubcategoryClick = (subCategory) => {
    const slug = categoryToSlug(subCategory);
    navigate(`/category/sub/${slug}`);

    
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8 mt-20 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mb-4"></div>
          <p className="text-gray-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-8 mt-20 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-600 mb-4">Error loading categories: {error}</p>
          <p className="text-sm text-red-500 mb-4">
            Please check your database connection and try again.
          </p>
          <Link to="/" className="text-yellow-600 hover:text-yellow-700 inline-block font-medium">
            Go back to home
          </Link>
        </div>
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
        
        {/* Debug info - Remove this in production */}
        {/*
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded text-sm">
          <p className="font-bold text-blue-900 mb-2">🐛 Debug Info:</p>
          <p className="text-blue-800">URL Param: <code className="bg-blue-100 px-1 rounded">{mainCategory}</code></p>
          <p className="text-blue-800">Converted Name: <code className="bg-blue-100 px-1 rounded">{mainCategoryName}</code></p>
          <p className="text-blue-800">Total Products: <code className="bg-blue-100 px-1 rounded">{products.length}</code></p>
          <p className="text-blue-800">Products in Category: <code className="bg-blue-100 px-1 rounded">{productsInMain.length}</code></p>
          <p className="text-blue-800">Subcategories: <code className="bg-blue-100 px-1 rounded">{subcategories.join(', ') || 'None'}</code></p>
          
          {products.length > 0 && (
            <div className="mt-2 pt-2 border-t border-blue-300">
              <p className="font-semibold text-blue-900 mb-1">All Products in Database:</p>
              {products.map((p, i) => (
                <p key={i} className="text-xs text-blue-700">
                  {i + 1}. {p.title} - Main: "{p.mainCategory}" | Sub: "{p.subCategory}"
                </p>
              ))}
            </div>
          )}
        </div>*/}
      </div> 

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subcategories.length > 0 ? (
          subcategories.map((subCategory, index) => {
            const sampleProduct = productsInMain.find(p => p.subCategory === subCategory);
            const imageUrl = sampleProduct?.image || '/placeholder-image.jpg';
            const productCount = productsInMain.filter(p => p.subCategory === subCategory).length;
            
            return (
              <div
                key={index}
                onClick={() => handleSubcategoryClick(subCategory)}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-200 hover:border-yellow-300 group overflow-hidden"
              >
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
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 max-w-2xl mx-auto">
              <div className="text-slate-700">
                <p className="text-lg font-medium mb-2">No subcategories found for "{mainCategoryName}"</p>
                
                {productsInMain.length > 0 ? (
                  <div>
                    <p className="mt-2 mb-6">Found {productsInMain.length} products in this category without subcategories</p>
                    
                    {/* Show products directly */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                      {productsInMain.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => navigate(`/product/${product.id}`)}
                          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-200 hover:border-yellow-300"
                        >
                          <div className="relative h-48 overflow-hidden bg-gray-100">
                            <img
                              src={product.image || '/placeholder-image.jpg'}
                              alt={product.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = '/placeholder-image.jpg';
                              }}
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold text-slate-800 mb-2">{product.title}</h3>
                            {product.description && (
                              <p className="text-slate-600 text-sm line-clamp-2">{product.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="mt-2">This category might not have any products yet</p>
                )}
                
                <Link 
                  to="/products"
                  className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-600 text-white rounded-lg hover:from-yellow-700 hover:to-yellow-700 transition-all duration-300"
                >
                  View All Products
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subcategories;