import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import productsData from '../components/Products.json';

// Get unique main categories and their subcategories
const getCategoriesStructure = () => {
  // Get unique main categories
  const mainCategories = [...new Set(productsData.map(product => product.mainCategory))];
  
  // For each main category, get its subcategories
  const categoryStructure = {};
  
  mainCategories.forEach(mainCategory => {
    // Get all products with this main category
    const productsInMainCategory = productsData.filter(product => 
      product.mainCategory === mainCategory
    );
    
    // Get unique subcategories for this main category
    const subcategories = [...new Set(productsInMainCategory.map(product => 
      product.subCategory
    ))];
    
    // Store the subcategories for this main category
    categoryStructure[mainCategory] = subcategories.sort();
  });
  
  return {
    mainCategories: mainCategories.sort(),
    categoryStructure
  };
};

// Convert category name to URL slug
const categoryToSlug = (category) => {
  return category.toLowerCase().replace(/\s+/g, '-');
};

const Navbar = () => {
  const navigate = useNavigate();
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedMobileCategory, setExpandedMobileCategory] = useState(null);
  const [activeMainCategory, setActiveMainCategory] = useState(null);
  
  // Get category structure using useMemo to prevent recalculation on every render
  const { mainCategories, categoryStructure } = useMemo(() => {
    return getCategoriesStructure();
  }, []);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProductsOpen || isSearchOpen) {
        // Check if click is outside dropdown areas
        const navbarElement = document.getElementById('navbar-container');
        if (navbarElement && !navbarElement.contains(event.target)) {
          setIsProductsOpen(false);
          setIsSearchOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProductsOpen, isSearchOpen]);

  const toggleProductsDropdown = () => {
    setIsProductsOpen(!isProductsOpen);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isProductsOpen) setIsProductsOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Here you would typically handle the search
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    setIsSearchOpen(false);
  };
  
  const toggleMobileCategory = (category) => {
    if (expandedMobileCategory === category) {
      setExpandedMobileCategory(null);
    } else {
      setExpandedMobileCategory(category);
    }
  };

  const handleCategoryHover = (category) => {
    setActiveMainCategory(category);
  };

  const handleCategoryClick = (type, category) => {
    const slug = categoryToSlug(category);
    navigate(`/category/${type}/${slug}`);
    setIsProductsOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <nav id="navbar-container" className={`w-full fixed top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'}`}>
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-black py-1">
        <div className="container max-w-5xl mx-auto px-8 text-center text-xs font-medium">
          New products now available! Check out our 2025 catalog.
        </div>
      </div>
      
      <div className="container max-w-5xl mx-auto px-8 py-2">
        <div className="flex justify-between items-center">
          {/* Logo - Centered on Mobile, Left on Desktop */}
          <div className="flex-1 lg:flex-none flex justify-start">
            <Link to="/" className="relative group">
              <img 
                src="https://cdn.prod.website-files.com/65b9cce908217ff5cd624b00/65bb4424e5513bc04508ecbc_Atharva Enterpriseso-logo.svg" 
                alt="Atharva Enterprises" 
                className="h-7 md:h-8 transition-all duration-300"
              />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
          
          {/* Center Navigation - Hidden on Mobile */}
          <div className="hidden lg:flex flex-1 justify-center">
            <div className="flex space-x-6 items-center">
              <Link to="/about-us" className="font-medium text-sm text-gray-800 hover:text-yellow-400 transition-all duration-300 relative group py-2">
                About Us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <div className="relative group">
                <button 
                  onClick={toggleProductsDropdown}
                  className="font-medium text-sm text-gray-800 hover:text-yellow-400 transition-all duration-300 flex items-center py-2"
                >
                  Products
                  <svg 
                    className={`w-3 h-3 ml-1 transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                
                {/* Products Dropdown - Two-Column Layout with Category Navigation */}
                {isProductsOpen && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-screen max-w-4xl bg-white shadow-xl rounded-lg z-10 overflow-hidden transition-all duration-300 opacity-100 border border-gray-100">
                    <div className="flex h-96">
                      {/* Category Navigation Sidebar */}
                      <div className="w-64 bg-gray-50 p-4 overflow-y-auto border-r border-gray-100">
                        <h3 className="font-semibold text-sm mb-3 text-gray-500 uppercase tracking-wider">Categories</h3>
                        <ul className="space-y-1">
                          {/* View All Products option */}
                          <li>
                            <Link
                              to="/products"
                              className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors hover:bg-gray-100`}
                              onClick={() => setIsProductsOpen(false)}
                            >
                              All Products
                            </Link>
                          </li>
                          {mainCategories.map((mainCategory, index) => (
                            <li key={index}>
                              <button
                                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${activeMainCategory === mainCategory ? 'bg-yellow-100 text-yellow-600 font-medium' : 'hover:bg-gray-100'}`}
                                onMouseEnter={() => handleCategoryHover(mainCategory)}
                                onClick={() => handleCategoryHover(mainCategory)}
                              >
                                {mainCategory}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Subcategories Display Area */}
                      <div className="flex-1 p-6 overflow-y-auto">
                        {activeMainCategory ? (
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h2 className="font-semibold text-lg">{activeMainCategory}</h2>
                                <p className="text-sm text-gray-500">Professional-grade equipment</p>
                              </div>
                              <Link 
                                to={`/category/main/${categoryToSlug(activeMainCategory)}`}
                                className="text-sm font-medium text-yellow-500 hover:text-yellow-600 hover:underline"
                                onClick={() => setIsProductsOpen(false)}
                              >
                                View All
                              </Link>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                              {categoryStructure[activeMainCategory].map((subCategory, subIndex) => (
                                <button 
                                  key={subIndex}
                                  className="text-sm text-gray-700 hover:text-yellow-400 py-2 border-b border-gray-50 transition-colors text-left"
                                  onClick={() => handleCategoryClick('sub', subCategory)}
                                >
                                  {subCategory}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="h-full flex items-center justify-center text-gray-400">
                            <p>Select a category</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Product Catalog Download - Fixed at Bottom */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-100 p-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-sm">New Product Catalog</h3>
                        <p className="text-xs text-gray-600">Discover our latest innovations</p>
                      </div>
                      <Link 
                        to="/catalog" 
                        className="inline-flex items-center justify-center px-3 py-1.5 bg-gray-900 text-white text-xs rounded-md hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300"
                      >
                        Download
                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <Link to="/services" className="font-medium text-sm text-gray-800 hover:text-yellow-400 transition-all duration-300 relative group py-2">
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/industries" className="font-medium text-sm text-gray-800 hover:text-yellow-400 transition-all duration-300 relative group py-2">
                Partners
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          </div>
          
          {/* Right Actions */}
          <div className="flex-1 lg:flex-none flex justify-end items-center space-x-1 md:space-x-3">
            {/* Search */}
            <div className="relative">
              <button 
                onClick={toggleSearch} 
                className="p-1 text-gray-700 hover:text-yellow-400 transition-colors duration-300 rounded-full hover:bg-gray-100"
                aria-label="Search"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
              
              {/* Search Popup */}
              {isSearchOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white shadow-lg rounded-lg z-10 p-3 border border-gray-100 overflow-hidden">
                  <form onSubmit={handleSearch} className="flex flex-col">
                    <div className="flex items-center border-b border-gray-200 pb-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                      <input 
                        type="text" 
                        placeholder="Search products..." 
                        className="flex-grow px-2 py-1 text-sm focus:outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="pt-2 flex justify-between items-center">
                      <div className="text-xs text-gray-500">Press Enter to search</div>
                      <button 
                        type="submit"
                        className="bg-gray-900 text-white px-3 py-1 rounded-md hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 text-xs font-medium"
                      >
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
            
            {/* Contact Us Button */}
            <Link 
              to="/contact-us" 
              className="hidden md:flex items-center space-x-1 bg-gray-900 text-white px-3 py-1.5 rounded-md hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 text-xs"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span className="font-medium">Contact Us</span>
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="lg:hidden p-1 text-gray-700 hover:text-yellow-400 transition-colors duration-300 rounded-full hover:bg-gray-100"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Improved Mobile Menu with Accordion */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 max-h-90vh overflow-y-auto transition-all duration-300">
          <div className="container max-w-5xl mx-auto py-3 px-6 space-y-1">
            <Link to="/" className="block font-medium text-sm text-gray-800 hover:text-yellow-400 py-2 px-3 rounded-md hover:bg-gray-50">
              Home
            </Link>
            <Link to="/about-us" className="block font-medium text-sm text-gray-800 hover:text-yellow-400 py-2 px-3 rounded-md hover:bg-gray-50">
              About Us
            </Link>
            
            {/* Products Accordion Menu */}
            <div className="rounded-md overflow-hidden">
              <button 
                onClick={() => toggleMobileCategory('products')}
                className="flex items-center justify-between w-full font-medium text-sm text-gray-800 hover:text-yellow-400 py-2 px-3 hover:bg-gray-50 rounded-md"
              >
                <span>Products</span>
                <svg 
                  className={`w-3 h-3 transition-transform duration-300 ${expandedMobileCategory === 'products' ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              {expandedMobileCategory === 'products' && (
                <div className="mt-1 ml-3 border-l-2 border-gray-100 pl-3 space-y-1">
                  {/* View all products option */}
                  <Link
                    to="/products"
                    className="block font-medium text-sm text-yellow-500 hover:text-yellow-600 py-1 px-2 rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    All Products
                  </Link>
                  
                  {mainCategories.map((mainCategory, index) => (
                    <div key={index} className="py-1">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => handleCategoryClick('main', mainCategory)}
                          className="font-medium text-sm text-yellow-500 hover:text-yellow-600 py-1 px-2 rounded"
                        >
                          {mainCategory}
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleMobileCategory(`sub-${mainCategory}`);
                          }}
                          className="p-1"
                        >
                          <svg 
                            className={`w-3 h-3 transition-transform duration-300 ${expandedMobileCategory === `sub-${mainCategory}` ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </button>
                      </div>
                      
                      {expandedMobileCategory === `sub-${mainCategory}` && (
                        <div className="ml-2 pl-2 border-l border-gray-100 space-y-0.5 mt-1 mb-2">
                          {categoryStructure[mainCategory].map((subCategory, subIndex) => (
                            <button 
                              key={subIndex}
                              className="block text-xs text-gray-600 hover:text-yellow-400 hover:bg-gray-50 py-1.5 px-2 rounded w-full text-left"
                              onClick={() => handleCategoryClick('sub', subCategory)}
                            >
                              {subCategory}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <Link to="/services" className="block font-medium text-sm text-gray-800 hover:text-yellow-400 py-2 px-3 rounded-md hover:bg-gray-50">
              Services
            </Link>
            <Link to="/industries" className="block font-medium text-sm text-gray-800 hover:text-yellow-400 py-2 px-3 rounded-md hover:bg-gray-50">
              Industries
            </Link>
            
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mt-3 mx-1 relative bg-gray-50 rounded-md overflow-hidden flex items-center px-3 py-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <input 
                type="text" 
                placeholder="Search products..." 
                className="flex-grow px-2 py-1 text-sm bg-transparent focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="ml-2 bg-gray-900 text-white px-3 py-1 rounded-md hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 text-xs font-medium"
              >
                Search
              </button>
            </form>
            
            {/* Mobile Contact Button */}
            <Link 
              to="/contact-us" 
              className="flex items-center justify-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 mt-3 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span className="font-medium">Contact Us</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;