import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import productsData from '../components/Products.json';
import atharvalogo from '../assets/atharvaa.png';

// Get unique categories
const getCategoriesStructure = () => {
  const mainCategories = [...new Set(productsData.map(p => p.mainCategory))];
  const categoryStructure = {};
  mainCategories.forEach(mainCategory => {
    const productsInMain = productsData.filter(p => p.mainCategory === mainCategory);
    const subcategories = [...new Set(productsInMain.map(p => p.subCategory))];
    categoryStructure[mainCategory] = subcategories.sort();
  });
  return { mainCategories: mainCategories.sort(), categoryStructure };
};

// Convert category name to slug
const categoryToSlug = (category) => category.toLowerCase().replace(/\s+/g, '-');

const Navbar = () => {
  const navigate = useNavigate();
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // kept intact
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedMobileCategory, setExpandedMobileCategory] = useState(null);
  const [activeMainCategory, setActiveMainCategory] = useState(null);

  const { mainCategories, categoryStructure } = useMemo(() => getCategoriesStructure(), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const navbarElement = document.getElementById('navbar-container');
      if ((isProductsOpen || isSearchOpen) && navbarElement && !navbarElement.contains(e.target)) {
        setIsProductsOpen(false);
        setIsSearchOpen(false);
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

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    setIsSearchOpen(false);
  };

  const toggleMobileCategory = (category) => {
    setExpandedMobileCategory(expandedMobileCategory === category ? null : category);
  };

  const handleCategoryHover = (category) => setActiveMainCategory(category);

  const handleCategoryClick = (type, category) => {
    const slug = categoryToSlug(category);
    navigate(`/category/${type}/${slug}`);
    setIsProductsOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      id="navbar-container"
      className="w-full fixed top-0 z-30 transition-all duration-500 bg-white/10 backdrop-blur-md shadow-xl"
    >
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-black py-1 animate-pulse">
        <div className="container max-w-5xl mx-auto px-8 text-center text-xs font-semibold tracking-wide">
          ✨ New 2025 catalog launched — Explore our products now!
        </div>
      </div>

      <div className="container max-w-5xl mx-auto px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-1 lg:flex-none flex items-center justify-start">
            <Link to="/" className="relative group flex items-center space-x-3">
              <img
                src={atharvalogo}
                alt="Atharva Enterprises"
                className="h-14 md:h-16 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
              />
              <span className="text-xl md:text-2xl font-bold text-gray-900 tracking-wide group-hover:text-yellow-500 transition-colors duration-300">
                Atharva Enterprises
              </span>
            </Link>
          </div>

          {/* Center Navigation */}
          <div className="hidden lg:flex flex-1 justify-center">
            <div className="flex space-x-6 items-center">
              <Link
                to="/about-us"
                className="font-medium text-sm text-gray-800 hover:text-yellow-500 transition-all duration-300 relative group py-2"
              >
                About Us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-500 group-hover:w-full"></span>
              </Link>

              {/* Products Dropdown */}
              <div className="relative group">
                <button
                  onClick={toggleProductsDropdown}
                  className="font-medium text-sm text-gray-800 hover:text-yellow-500 transition-all duration-300 flex items-center py-2"
                >
                  Products
                  <svg
                    className={`w-3 h-3 ml-1 transition-transform duration-500 ${
                      isProductsOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                {isProductsOpen && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 mt-3 w-screen max-w-4xl bg-white shadow-2xl rounded-2xl z-10 border border-gray-200 animate-fade-in-up">
                    {/* Sidebar */}
                    <div className="flex h-96">
                      <div className="w-64 bg-gray-50 p-4 overflow-y-auto border-r border-gray-100">
                        <h3 className="font-semibold text-sm mb-3 text-gray-500 uppercase tracking-widest">
                          Categories
                        </h3>
                        <ul className="space-y-1">
                          <li>
                            <Link
                              to="/products"
                              className="block w-full px-3 py-2 rounded-md text-sm transition-colors hover:bg-gray-100"
                              onClick={() => setIsProductsOpen(false)}
                            >
                              All Products
                            </Link>
                          </li>
                          {mainCategories.map((mainCategory, index) => (
                            <li key={index}>
                              <button
                                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all ${
                                  activeMainCategory === mainCategory
                                    ? 'bg-yellow-100 text-yellow-600 font-medium'
                                    : 'hover:bg-gray-100'
                                }`}
                                onMouseEnter={() => handleCategoryHover(mainCategory)}
                                onClick={() => handleCategoryHover(mainCategory)}
                              >
                                {mainCategory}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Subcategories */}
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
                                className="text-sm font-semibold text-yellow-500 hover:text-yellow-600 hover:underline"
                                onClick={() => setIsProductsOpen(false)}
                              >
                                View All
                              </Link>
                            </div>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                              {categoryStructure[activeMainCategory].map((subCategory, i) => (
                                <button
                                  key={i}
                                  className="text-sm text-gray-700 hover:text-yellow-500 py-2 border-b border-gray-50 transition-colors text-left"
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
                    {/* Catalog CTA */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-100 p-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-sm">🚀 New Product Catalog</h3>
                        <p className="text-xs text-gray-600">Discover our latest innovations</p>
                      </div>
                      <Link
                        to="/catalog"
                        className="px-4 py-1.5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-medium text-xs rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-400 transition-all duration-300"
                      >
                        Download
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/industries"
                className="font-medium text-sm text-gray-800 hover:text-yellow-500 transition-all duration-300 relative group py-2"
              >
                Partners
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-500 group-hover:w-full"></span>
              </Link>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex-1 lg:flex-none flex justify-end items-center space-x-3">
            {/* Search */}
            <div className="relative">
              <button
                onClick={toggleSearch}
                className="p-2 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-yellow-400 hover:to-yellow-300 hover:text-gray-900 transition-all duration-500 shadow-sm"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              {isSearchOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white shadow-2xl rounded-xl z-10 p-4 border border-gray-100 animate-fade-in-up">
                  <form onSubmit={handleSearch} className="flex flex-col space-y-2">
                    <div className="flex items-center border border-gray-200 rounded-lg px-2 py-1.5">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Search products..."
                        className="flex-grow px-2 text-sm focus:outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-3 py-1.5 rounded-lg hover:from-yellow-400 hover:to-yellow-500 hover:text-gray-900 transition-all duration-500 text-xs font-semibold shadow-md"
                    >
                      Search
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Contact Us Button */}
            <Link
              to="/contact-us"
              className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold text-xs shadow-md hover:from-yellow-400 hover:to-yellow-500 hover:text-gray-900 transition-all duration-500"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span>Contact Us</span>
            </Link>

            {/* Mobile Menu */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-full bg-gray-100 hover:bg-yellow-400 hover:text-gray-900 transition-all duration-500 shadow-sm"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (unchanged, can style further) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 max-h-90vh overflow-y-auto transition-all duration-500 animate-fade-in-down">
          {/* ... keep same code as yours here for mobile nav ... */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
