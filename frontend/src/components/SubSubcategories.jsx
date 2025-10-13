import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';

const categoryToSlug = (category) => category?.toLowerCase().replace(/\s+/g, '-') || '';
const slugToCategory = (slug) => slug?.replace(/-/g, ' ') || '';

const SubSubcategories = () => {
  const { subCategory } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const subCategoryName = subCategory ? slugToCategory(subCategory) : '';
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await productAPI.getAll();
        
        if (res.success && Array.isArray(res.data)) {
          setProducts(res.data);
          console.log('✅ Products fetched:', res.data.length);
        } else {
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
  
  // Filter products for this subcategory (case-insensitive)
  const productsInSub = products.filter(p => {
    const productSubCategory = (p.subCategory || '').toLowerCase();
    return productSubCategory === subCategoryName.toLowerCase();
  });
  
  // Get unique sub-subcategories
  const subSubcategories = [...new Set(
    productsInSub
      .map(p => p.subSubCategory || '')
      .filter(Boolean)
  )];
  
  // Get main category for breadcrumb
  const mainCategory = productsInSub[0]?.mainCategory || '';
  
  // Get products without sub-subcategory (direct products in subcategory)
  const directProducts = productsInSub.filter(p => !p.subSubCategory);
  
  console.log('📊 SubCategory:', subCategoryName);
  console.log('📊 Products in sub:', productsInSub.length);
  console.log('📊 SubSubcategories:', subSubcategories);
  console.log('📊 Direct products:', directProducts.length);
  
  const handleSubSubcategoryClick = (subSubCategory) => {
    const slug = categoryToSlug(subSubCategory);
    // Navigate to products page filtered by subSubCategory
    navigate(`/products?mainCategory=${encodeURIComponent(mainCategory)}&subCategory=${encodeURIComponent(subCategoryName)}&subSubCategory=${encodeURIComponent(subSubCategory)}`);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
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
        <p className="text-red-600">Error: {error}</p>
        <Link to="/" className="text-yellow-600 hover:text-yellow-700 mt-4 inline-block">
          Go back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8 mt-20">
      {/* Breadcrumbs */}
      <div className="mb-8">
        <nav className="text-sm breadcrumbs mb-4">
          <Link to="/" className="text-yellow-600 hover:text-yellow-700">Home</Link>
          <span className="mx-2 text-slate-400">/</span>
          <Link 
            to={`/subcategories/${categoryToSlug(mainCategory)}`}
            className="text-yellow-600 hover:text-yellow-700 capitalize"
          >
            {mainCategory}
          </Link>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-600 capitalize">{subCategoryName}</span>
        </nav>
        <h1 className="text-3xl font-bold text-slate-800 capitalize">{subCategoryName}</h1>
        <p className="text-slate-600 mt-2">
          {subSubcategories.length > 0 
            ? 'Choose a specific product type to view available items'
            : 'Browse available products'}
        </p>
      </div>

      {/* Sub-Subcategories Grid */}
      {subSubcategories.length > 0 && (
        <>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Product Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {subSubcategories.map((subSubCategory, index) => {
              const sampleProduct = productsInSub.find(p => p.subSubCategory === subSubCategory);
              const imageUrl = sampleProduct?.image || '/placeholder-image.jpg';
              const productCount = productsInSub.filter(p => p.subSubCategory === subSubCategory).length;
              
              return (
                <div
                  key={index}
                  onClick={() => handleSubSubcategoryClick(subSubCategory)}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-200 hover:border-yellow-300 group overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={imageUrl}
                      alt={subSubCategory}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = '/placeholder-image.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-slate-800 group-hover:text-yellow-700 transition-colors duration-300 mb-2">
                      {subSubCategory}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4">
                      View all {subSubCategory.toLowerCase()} products
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
            })}
          </div>
        </>
      )}

      {/* Direct Products (no sub-subcategory) */}
      {directProducts.length > 0 && (
        <>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            {subSubcategories.length > 0 ? 'Other Products' : 'All Products'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {directProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-200 hover:border-yellow-300 group overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = '/placeholder-image.jpg';
                    }}
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-slate-800 group-hover:text-yellow-700 transition-colors duration-300 mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  {product.specs && (
                    <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                      {product.specs}
                    </p>
                  )}
                  {product.priceRange && (
                    <p className="text-yellow-600 font-semibold">
                      {product.priceRange}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Empty State */}
      {subSubcategories.length === 0 && directProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No Products Found</h3>
            <p className="text-slate-600 mb-6">
              There are no products in this subcategory yet.
            </p>
            <div className="space-y-3">
              <Link 
                to={`/subcategories/${categoryToSlug(mainCategory)}`}
                className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-600 text-white rounded-lg hover:from-yellow-700 hover:to-yellow-700 transition-all duration-300 font-medium"
              >
                ← Back to {mainCategory} Subcategories
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Back Link */}
      {(subSubcategories.length > 0 || directProducts.length > 0) && (
        <div className="mt-8 text-center">
          <Link 
            to={`/subcategories/${categoryToSlug(mainCategory)}`}
            className="text-sm text-yellow-600 hover:text-yellow-700 transition-colors inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to {mainCategory} Subcategories
          </Link>
        </div>
      )}
    </div>
  );
};

export default SubSubcategories;