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

const Subcategories = () => {
  const { mainCategory } = useParams();
  const navigate = useNavigate();
  
  // Convert slug back to category name
  const mainCategoryName = slugToCategory(mainCategory);
  
  // Find all subcategories for this main category
  const productsInMain = productsData.filter(p => 
    p.mainCategory.toLowerCase() === mainCategoryName.toLowerCase()
  );
  
  const subcategories = [...new Set(productsInMain.map(p => p.subCategory))];
  
  const handleSubcategoryClick = (subCategory) => {
    const slug = categoryToSlug(subCategory);
    navigate(`/subsubcategories/${slug}`);
  };

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
        {subcategories.map((subCategory, index) => {
          // Get a sample product from this subcategory to show its image
          const sampleProduct = productsInMain.find(p => p.subCategory === subCategory);
          
          return (
            <div
              key={index}
              onClick={() => handleSubcategoryClick(subCategory)}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-200 hover:border-yellow-300 group overflow-hidden"
            >
              {/* Image section */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={getProductImage(sampleProduct?.id)}
                  alt={subCategory}
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
                    {productsInMain.filter(p => p.subCategory === subCategory).length} products
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {subcategories.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-500">
            <p className="text-lg font-medium">No subcategories found</p>
            <p className="mt-2">This main category might not have subcategories defined</p>
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
  );
};

export default Subcategories;