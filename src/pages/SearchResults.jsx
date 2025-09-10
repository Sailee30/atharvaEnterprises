import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import productsData from '../components/Products.json';

// Helper function to get image based on product ID (placeholder)
const getProductImage = (productId) => {
  return `/assets/${productId}.jpg`;
};

// Theme colors to match styling
const themeColors = {
  primary: '#FBBF24', // Yellow-400
  secondary: '#FEF3C7', // Yellow-100
  accent: '#F59E0B', // Yellow-500
  dark: '#111827' // Gray-900
};

// Convert category name to URL slug
const categoryToSlug = (category) => {
  return category.toLowerCase().replace(/\s+/g, '-');
};

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('query') || '';
  
  // State for pagination and sorting
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const productsPerPage = 12;
  
  // Search products based on query
  const searchResults = useMemo(() => {
    if (!query) return [];
    
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    
    return productsData.filter(product => {
      // Search in product name, description, and categories
      const searchString = `${product.name} ${product.description} ${product.mainCategory} ${product.subCategory}`.toLowerCase();
      
      // Check if at least one search term matches
      return searchTerms.some(term => searchString.includes(term));
    });
  }, [query]);
  
  // Sort search results
  const sortedResults = useMemo(() => {
    let sorted = [...searchResults];
    
    switch (sortBy) {
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'relevance':
      default:
        return sorted;
    }
  }, [searchResults, sortBy]);
  
  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedResults.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedResults.length / productsPerPage);

  // Handle page changes
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  
  // Reset to page 1 when query or sort option changes
  useEffect(() => {
    setCurrentPage(1);
  }, [query, sortBy]);
  
  return (
    <div className="min-h-screen relative overflow-hidden"
         style={{
             background: `radial-gradient(circle at 90% 10%, ${themeColors.secondary}40, transparent 30%),
                         radial-gradient(circle at 10% 90%, ${themeColors.secondary}40, transparent 30%),
                         white`
         }}>
      {/* Decorative background elements */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-10" 
           style={{ backgroundColor: themeColors.primary }}></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full opacity-10" 
           style={{ backgroundColor: themeColors.accent }}></div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="text-sm text-gray-500 hover:text-yellow-400">Home</Link>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700 ml-1 md:ml-2">Product Search</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Search Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-medium mb-4">Product Search</h1>
          <p className="text-gray-600 max-w-3xl">
            {searchResults.length > 0
              ? `Found ${searchResults.length} products matching "${query}"`
              : `No products found for "${query}". Try different keywords or explore our product categories.`
            }
          </p>
        </div>

        {/* New Search Form */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const newQuery = formData.get('search');
              navigate(`/search?query=${encodeURIComponent(newQuery)}`);
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="flex-grow">
              <input
                type="text"
                name="search"
                defaultValue={query}
                placeholder="Search products..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-yellow-400 hover:text-gray-900 transition-colors font-medium"
            >
              Search Products
            </button>
          </form>
        </div>

        {/* No results message */}
        {searchResults.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-10 text-center">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Products Found</h3>
            <p className="text-gray-600 mb-4">Try different search terms or browse our product catalog.</p>
            <Link 
              to="/products" 
              className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-500 transition-colors"
            >
              Explore Catalog
            </Link>
          </div>
        )}

        {/* Results Sorting and View Mode */}
        {searchResults.length > 0 && (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="text-sm text-gray-600">
              Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, sortedResults.length)} of {sortedResults.length} products
            </div>
            
            <div className="flex gap-4 items-center">
              {/* View mode toggles */}
              <div className="flex border border-gray-200 rounded-md overflow-hidden">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'bg-white'}`}
                  aria-label="Grid view"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white'}`}
                  aria-label="List view"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              {/* Sort dropdown */}
              <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-3 pr-10 py-2 text-sm border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 appearance-none"
                >
                  <option value="relevance">Relevance</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Results Grid View */}
        {viewMode === 'grid' && searchResults.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {currentProducts.map((product) => (
              <div 
                key={product.id} 
                className="group cursor-pointer"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative rounded-xl overflow-hidden bg-white shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                      <img 
                        src={getProductImage(product.id)} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      {/* Display both categories */}
                      <div className="absolute top-3 left-3 px-3 py-1 rounded text-xs font-medium" 
                           style={{ backgroundColor: themeColors.primary, color: themeColors.dark }}>
                        {product.mainCategory}
                      </div>
                      
                      <div className="absolute top-9 left-3 px-3 py-1 rounded text-xs font-medium bg-white/80 text-gray-700">
                        {product.subCategory}
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 text-white py-2 px-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <div className="font-medium text-sm flex justify-between items-center">
                          <span>View Specifications</span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-medium text-base mb-1 truncate">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2" title={product.description}>
                        {product.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Search Results List View */}
        {viewMode === 'list' && searchResults.length > 0 && (
          <div className="space-y-4 mb-12">
            {currentProducts.map((product) => (
              <div 
                key={product.id} 
                className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md flex"
              >
                <Link to={`/product/${product.id}`} className="flex w-full">
                  <div className="w-1/3 lg:w-1/4 relative">
                    <div className="aspect-[4/3] relative overflow-hidden bg-gray-50 h-full">
                      <img 
                        src={getProductImage(product.id)} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      {/* Display both main and sub categories */}
                      <div className="absolute top-3 left-3 px-3 py-1 rounded text-xs font-medium" 
                           style={{ backgroundColor: themeColors.primary, color: themeColors.dark }}>
                        {product.mainCategory}
                      </div>
                      
                      <div className="absolute top-9 left-3 px-3 py-1 rounded text-xs font-medium bg-white/80 text-gray-700">
                        {product.subCategory}
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-2/3 lg:w-3/4 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                    
                    <div className="flex gap-2 mt-2 sm:mt-0">
                      <span className="px-3 py-1 rounded-md text-sm font-medium bg-gray-900 text-white transition-colors hover:bg-yellow-400 hover:text-gray-900">
                        View Specifications
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {searchResults.length > productsPerPage && (
          <div className="flex justify-center mt-10">
            <div className="flex flex-wrap space-x-2">
              <button 
                onClick={prevPage} 
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md ${
                  currentPage === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Previous
              </button>
              
              {[...Array(totalPages)].map((_, index) => {
                if (
                  index === 0 || 
                  index === totalPages - 1 || 
                  (index >= currentPage - 2 && index <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`px-4 py-2 rounded-md ${
                        currentPage === index + 1 
                          ? 'bg-yellow-400 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {index + 1}
                    </button>
                  );
                }
                
                if (index === 1 && currentPage > 3) {
                  return <span key="start-ellipsis" className="px-3 py-2">...</span>;
                }
                
                if (index === totalPages - 2 && currentPage < totalPages - 2) {
                  return <span key="end-ellipsis" className="px-3 py-2">...</span>;
                }
                
                return null;
              })}
              
              <button 
                onClick={nextPage} 
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md ${
                  currentPage === totalPages 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Related Categories */}
        {searchResults.length > 0 && (
          <div className="mt-16 mb-12 p-8 bg-gray-50 rounded-xl border border-gray-100">
            <h2 className="text-xl font-medium mb-4">Explore Product Categories</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...new Set(currentProducts.map(product => product.mainCategory))]
                .slice(0, 4)
                .map((category, index) => (
                  <Link 
                    key={index}
                    to={`/category/main/${categoryToSlug(category)}`}
                    className="px-4 py-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all flex items-center space-x-2"
                  >
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: themeColors.primary }}></span>
                    <span className="font-medium text-sm">{category}</span>
                  </Link>
                ))
              }
            </div>
            
            <div className="mt-6 text-center">
              <Link 
                to="/products"
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white text-sm rounded-md hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300"
              >
                Explore Full Catalog
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;