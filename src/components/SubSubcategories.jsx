import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import productsData from '../components/Products.json';

// Dynamic image loading function
const getProductImage = (productId) => {
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

const categoryToSlug = (category) => category.toLowerCase().replace(/\s+/g, '-');
const slugToCategory = (slug) => slug.replace(/-/g, ' ');

const SubSubcategories = () => {
  const { subCategory } = useParams();
  const navigate = useNavigate();
  
  const subCategoryName = slugToCategory(subCategory);
  
  // Find all sub-subcategories for this subcategory
  const productsInSub = productsData.filter(p => 
    p.subCategory.toLowerCase() === subCategoryName.toLowerCase()
  );
  
  const subSubcategories = [...new Set(productsInSub.map(p => p.subSubCategory).filter(Boolean))];
  
  // Get the main category for breadcrumb
  const mainCategory = productsInSub[0]?.mainCategory || '';
  
  const handleSubSubcategoryClick = (subSubCategory) => {
    const slug = categoryToSlug(subSubCategory);
    navigate(`/category/subsub/${slug}`);
  };

  return (
    <div className="container mx-auto px-6 py-8 mt-20">
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
        <p className="text-slate-600 mt-2">Choose a specific product type to view available items</p>
      </div>

      {subSubcategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subSubcategories.map((subSubCategory, index) => {
            // Get a sample product from this sub-subcategory to show its image
            const sampleProduct = productsInSub.find(p => p.subSubCategory === subSubCategory);
            
            return (
              <div
                key={index}
                onClick={() => handleSubSubcategoryClick(subSubCategory)}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-200 hover:border-yellow-300 group overflow-hidden"
              >
                {/* Image section */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={getProductImage(sampleProduct?.id)}
                    alt={subSubCategory}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      try {
                        e.target.src = require('../assets/1.jpg');
                      } catch {
                        e.target.src = '/placeholder-image.jpg';
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Content section */}
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
                      {productsInSub.filter(p => p.subSubCategory === subSubCategory).length} products
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No Specific Product Types</h3>
            <p className="text-slate-600 mb-6">
              This subcategory contains products without further classification into specific types.
            </p>
            <div className="space-y-3">
              <Link 
                to={`/category/sub/${categoryToSlug(subCategoryName)}`}
                className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-600 text-white rounded-lg hover:from-yellow-700 hover:to-yellow-700 transition-all duration-300 font-medium"
              >
                View All {subCategoryName} Products
              </Link>
              <div className="text-center">
                <Link 
                  to={`/subcategories/${categoryToSlug(mainCategory)}`}
                  className="text-sm text-yellow-600 hover:text-yellow-700 transition-colors"
                >
                  ← Back to {mainCategory} Subcategories
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back to subcategories link */}
      {subSubcategories.length > 0 && (
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