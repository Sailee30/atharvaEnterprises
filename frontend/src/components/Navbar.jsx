import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import productsData from '../components/Products.json';
import atharvalogo from '../assets/atharvaa.png';

// Get unique categories with 3-level structure
const getCategoriesStructure = () => {
  const mainCategories = [...new Set(productsData.map(p => p.mainCategory))];
  const categoryStructure = {};
  
  mainCategories.forEach(mainCategory => {
    const productsInMain = productsData.filter(p => p.mainCategory === mainCategory);
    const subcategories = [...new Set(productsInMain.map(p => p.subCategory))];
    categoryStructure[mainCategory] = {};
    
    subcategories.forEach(subCategory => {
      const productsInSub = productsInMain.filter(p => p.subCategory === subCategory);
      const subSubcategories = [...new Set(productsInSub.map(p => p.subSubCategory || null).filter(Boolean))];
      categoryStructure[mainCategory][subCategory] = subSubcategories.sort();
    });
  });
  
  return { mainCategories: mainCategories.sort(), categoryStructure };
};

// Convert category name to slug
const categoryToSlug = (category) => category.toLowerCase().replace(/\s+/g, '-');

const Navbar = () => {
  const navigate = useNavigate();
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isAllCategoriesOpen, setIsAllCategoriesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedMobileCategory, setExpandedMobileCategory] = useState(null);
  const [expandedMobileSubCategory, setExpandedMobileSubCategory] = useState(null);

  const { mainCategories, categoryStructure } = useMemo(() => getCategoriesStructure(), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const navbarElement = document.getElementById('navbar-container');
      if ((isProductsOpen || isAllCategoriesOpen || isSearchOpen) && navbarElement && !navbarElement.contains(e.target)) {
        setIsProductsOpen(false);
        setIsAllCategoriesOpen(false);
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProductsOpen, isAllCategoriesOpen, isSearchOpen]);

  const toggleProductsDropdown = () => {
    setIsProductsOpen(!isProductsOpen);
    if (isAllCategoriesOpen) setIsAllCategoriesOpen(false);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const toggleAllCategoriesDropdown = () => {
    setIsAllCategoriesOpen(!isAllCategoriesOpen);
    if (isProductsOpen) setIsProductsOpen(false);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isProductsOpen) setIsProductsOpen(false);
    if (isAllCategoriesOpen) setIsAllCategoriesOpen(false);
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    setIsSearchOpen(false);
  };

  const toggleMobileCategory = (category) => {
    setExpandedMobileCategory(expandedMobileCategory === category ? null : category);
    setExpandedMobileSubCategory(null); // Reset subcategory when main category changes
  };

  const toggleMobileSubCategory = (subCategory) => {
    setExpandedMobileSubCategory(expandedMobileSubCategory === subCategory ? null : subCategory);
  };

  const handleCategoryHover = (category) => {
    setActiveMainCategory(category);
    setActiveSubCategory(null); // Reset subcategory when main category changes
  };

  const handleSubCategoryHover = (subCategory) => {
    setActiveSubCategory(subCategory);
  };

 const handleCategoryClick = (type, category) => {
  const slug = categoryToSlug(category);
  
  if (type === 'main') {
    // Navigate to subcategories page for this main category
    navigate(`/subcategories/${slug}`);
  } else if (type === 'sub') {
    // Navigate to sub-subcategories page for this subcategory
    navigate(`/subsubcategories/${slug}`);
  } else if (type === 'subsub') {
    // Navigate to products page filtered by sub-subcategory
    navigate(`/category/subsub/${slug}`);
  }
  
  setIsProductsOpen(false);
  setIsAllCategoriesOpen(false);
  setMobileMenuOpen(false);
};

  return (
    <nav
      id="navbar-container"
      className={`w-full fixed top-0 z-30 transition-all duration-500 backdrop-blur-md ${
        isScrolled 
          ? 'bg-white/95 shadow-lg border-b border-slate-200/60' 
          : 'bg-white/90 shadow-sm border-b border-slate-100/50'
      }`}
    >
      <div className="container max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <img
                  src={atharvalogo}
                  alt="Atharva Enterprises"
                  className="h-11 w-11 object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent tracking-tight">
                ATHARVA ENTERPRISES
              </span>
            </div>
          </div>

          {/* Center Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            <Link
              to="/"
              className="text-sm font-semibold text-slate-700 hover:text-yellow-600 transition-all duration-300 relative group py-2"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/about-us"
              className="text-sm font-semibold text-slate-700 hover:text-yellow-600 transition-all duration-300 relative group py-2"
            >
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* Products Dropdown with 3-Level Structure */}
            <div className="relative">
              <button
                onClick={toggleProductsDropdown}
                className="text-sm font-semibold text-slate-700 hover:text-yellow-600 transition-all duration-300 flex items-center space-x-2 relative group py-2"
              >
                <span>Products</span>
                <svg
                  className={`w-4 h-4 transition-all duration-300 ${
                    isProductsOpen ? 'rotate-180 text-yellow-600' : 'group-hover:text-yellow-600'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
                </svg>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
              </button>

              {isProductsOpen && (
  <div className="absolute left-1/2 transform -translate-x-1/2 mt-3 w-80 bg-white/95 backdrop-blur-lg shadow-2xl rounded-2xl z-50 border border-slate-200/60 overflow-hidden">
    <div className="p-6">
      <h3 className="font-bold text-lg mb-4 text-slate-800">
        Product Categories
      </h3>
      <ul className="space-y-2">
        <li>
          <Link
            to="/products"
            className="block w-full px-4 py-3 rounded-xl text-sm transition-all duration-300 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-yellow-50 hover:text-yellow-700 font-medium border border-transparent hover:border-yellow-200/50"
            onClick={() => setIsProductsOpen(false)}
          >
            All Products
          </Link>
        </li>
        {mainCategories.map((mainCategory, index) => (
          <li key={index}>
            <button
              className="w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-300 font-medium border border-transparent hover:bg-gradient-to-r hover:from-yellow-100 hover:to-yellow-50 hover:text-yellow-700 hover:border-yellow-200/50"
              onClick={() => handleCategoryClick('main', mainCategory)}
            >
              {mainCategory}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
)}
            </div>

            {/* All Categories Dropdown - Enhanced for 3-Level */}
            <div className="relative">
              <button
                onClick={toggleAllCategoriesDropdown}
                className="text-sm font-semibold text-slate-700 hover:text-yellow-600 transition-all duration-300 flex items-center space-x-2 relative group py-2"
              >
                <span>Catalogs</span>
                <svg
                  className={`w-4 h-4 transition-all duration-300 ${
                    isAllCategoriesOpen ? 'rotate-180 text-yellow-600' : 'group-hover:text-yellow-600'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
                </svg>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
              </button>

              {isAllCategoriesOpen && (
  <div className="absolute left-0 mt-3 w-80 bg-white/95 backdrop-blur-lg shadow-2xl rounded-2xl z-50 border border-slate-200/60 overflow-hidden">
    <div className="p-6">
      <h3 className="font-bold text-lg mb-4 text-slate-800">
        All Categories
      </h3>
      <ul className="space-y-2">
        <li>
          <Link
            to="/products"
            className="block w-full px-4 py-3 rounded-xl text-sm transition-all duration-300 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-yellow-50 hover:text-yellow-700 font-medium border border-transparent hover:border-yellow-200/50"
            onClick={() => setIsAllCategoriesOpen(false)}
          >
            All Products
          </Link>
        </li>
        {mainCategories.map((mainCategory, index) => (
          <li key={index}>
            <button
              className="w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-300 font-medium border border-transparent hover:bg-gradient-to-r hover:from-yellow-100 hover:to-yellow-50 hover:text-yellow-700 hover:border-yellow-200/50"
              onClick={() => handleCategoryClick('main', mainCategory)}
            >
              {mainCategory}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
)}
            </div>

            <Link
              to="/industries"
              className="text-sm font-semibold text-slate-700 hover:text-yellow-600 transition-all duration-300 relative group py-2"
            >
              Partners
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/contact-us"
              className="text-sm font-semibold text-slate-700 hover:text-yellow-600 transition-all duration-300 relative group py-2"
            >
              Contact Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <button
                onClick={toggleSearch}
                className="p-3 text-slate-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-xl transition-all duration-300 group"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {isSearchOpen && (
                <div className="absolute right-0 mt-3 w-96 bg-white/95 backdrop-blur-lg shadow-2xl rounded-2xl z-50 p-6 border border-slate-200/60">
                  <form onSubmit={handleSearch} className="space-y-4">
                    <div className="relative">
                      <svg className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-12 pr-4 py-4 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-300 bg-white/80"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-yellow-600 to-yellow-600 hover:from-yellow-700 hover:to-yellow-700 text-white px-6 py-4 rounded-xl transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Search Products
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Mobile Menu */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-3 text-slate-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-xl transition-all duration-300"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-slate-200/60 shadow-2xl">
          <div className="px-6 py-6 space-y-6">
            {/* Mobile Search */}
            <form onSubmit={handleSearch}>
              <div className="relative">
                <svg className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-12 pr-20 py-4 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-600 text-white rounded-lg text-sm font-semibold hover:from-yellow-700 hover:to-yellow-700 transition-all duration-300"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Mobile Navigation Links */}
            <nav className="space-y-4">
              <Link
                to="/"
                className="block py-3 px-4 text-yellow-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-xl font-semibold transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              <Link
                to="/about-us"
                className="block py-3 px-4 text-yellow-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-xl font-semibold transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>

              {/* Mobile Products */}
              <div>
                <button
                  onClick={() => toggleMobileCategory('products')}
                  className="flex items-center justify-between w-full py-3 px-4 text-slate-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-xl font-semibold transition-all duration-300"
                >
                  Products
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${expandedMobileCategory === 'products' ? 'rotate-180 text-yellow-600' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>

                {expandedMobileCategory === 'products' && (
                  <div className="ml-4 mt-3 space-y-3 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl p-4">
                    <Link
                      to="/products"
                      className="block py-2 px-3 text-sm text-slate-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-lg font-medium transition-all duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      All Products
                    </Link>
                    {mainCategories.map((mainCategory, index) => (
                      <div key={index}>
                        <button
                          onClick={() => toggleMobileCategory(mainCategory)}
                          className="flex items-center justify-between w-full py-2 px-3 text-sm text-slate-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-lg font-medium transition-all duration-300"
                        >
                          {mainCategory}
                          <svg
                            className={`w-4 h-4 transition-transform duration-300 ${expandedMobileCategory === mainCategory ? 'rotate-180 text-yellow-600' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </button>
                        {expandedMobileCategory === mainCategory && (
                          <div className="ml-4 mt-2 space-y-2 bg-white/60 rounded-lg p-3">
                            <button
                              className="block w-full text-left py-2 px-3 text-xs text-slate-500 hover:text-yellow-700 hover:bg-yellow-50 rounded-md font-medium transition-all duration-300"
                              onClick={() => handleCategoryClick('main', mainCategory)}
                            >
                              View All {mainCategory}
                            </button>
                            {categoryStructure[mainCategory].map((subCategory, i) => (
                              <button
                                key={i}
                                className="block w-full text-left py-2 px-3 text-xs text-slate-500 hover:text-yellow-700 hover:bg-yellow-50 rounded-md font-medium transition-all duration-300"
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

              <Link
                to="/industries"
                className="block py-3 px-4 text-slate-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-xl font-semibold transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Partners
              </Link>

              <Link
                to="/contact-us"
                className="block py-3 px-4 text-slate-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-xl font-semibold transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
