import React from 'react';
import atharva from '../assets/atharvaa.png';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-16 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full filter blur-[150px] opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full filter blur-[150px] opacity-10"></div>
      
      <div className="container max-w-5xl mx-auto px-8 relative z-10">
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-12 gap-x-8 mb-14">
          {/* Logo and About Section */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
            {/* Logo + Text beside it */}
            <a 
              href="/" 
              className="mb-6 flex items-center space-x-3 transform hover:scale-105 transition-transform duration-300"
            >
              <img 
                src={atharva} 
                alt="Atharva Enterprises" 
                className="h-12" 
              />
              <span className="text-xl font-semibold text-white">Atharva Enterprises</span>
            </a>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed text-center lg:text-left">
              At Atharva Enterprises, we embark on a relentless pursuit of excellence, driven by a passion for craftsmanship and innovation. Our story is woven with a commitment to providing artisans.
            </p>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8">
            {/* Location */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-800/30 to-gray-700/30 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <h3 className="text-white text-lg font-semibold">Our location</h3>
              </div>
              <div className="text-gray-400 text-sm leading-relaxed text-center md:text-left">
                OFFICE ADD : SR. NO 46/1/2/2, HOUSE NO.A20, SARJA BUILDING,<br />
                LANE NO.1, VIDYA NAGAR, PIMPLE GURAV, PUNE. 411061
              </div>
            </div>
            
            {/* Email */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-800/30 to-gray-700/30 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <h3 className="text-white text-lg font-semibold">Email address</h3>
              </div>
              <a 
                href="mailto:atharvaenterprises9999@gmail.com" 
                className="text-gray-400 text-sm hover:text-gray-200 transition-colors duration-300 break-all"
              >
                atharvaenterprises9999@gmail.com
              </a>
            </div>

            {/* Phone */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-800/30 to-gray-700/30 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <h3 className="text-white text-lg font-semibold">Contact number</h3>
              </div>
              <div className="flex flex-col text-sm">
                <a href="tel:+9175930939" className="text-gray-400 hover:text-gray-200 transition-colors duration-300">+91 9175930939</a>
                <a href="tel:+918669660939" className="text-gray-400 hover:text-gray-200 transition-colors duration-300">+91 8669660939</a>
                <a href="tel:+919175964828" className="text-gray-400 hover:text-gray-200 transition-colors duration-300">+91 9175964828</a>
                <a href="tel:+918600380939" className="text-gray-400 hover:text-gray-200 transition-colors duration-300">+91 8600380939</a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Social Media Section with separator */}
        <div className="relative pt-10 mb-10">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
          </div>
          
          <div className="flex flex-col items-center">
            <h3 className="text-white text-lg font-semibold mb-6">Follow us on</h3>
            <div className="flex space-x-6">
              {/* Facebook */}
              <a 
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-500 flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a 
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-500 flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Twitter/X */}
              <a 
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-500 flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-500 flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright with Admin Link */}
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-px bg-gray-800"></div>
          <div className="pt-6 flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Atharva Enterprises, Pune. All rights reserved.
            </p>
            
            {/* Admin Link - Small and subtle */}
            <a 
              href="/admin/login"
              className="text-gray-600 hover:text-gray-400 text-xs transition-colors duration-300 flex items-center gap-1"
              title="Admin Access"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
              </svg>
              Admin
            </a>
          </div>
        </div>
      </div>
      
      {/* Tool background image */}
      <div className="absolute bottom-0 right-0 opacity-20 pointer-events-none">
        <img 
          src="https://cdn.prod.website-files.com/65b9cce908217ff5cd624b00/65bcb42c6cc543edf858ed83_footer-vector.png" 
          alt="Tool Illustration" 
          className="w-64 md:w-72 lg:w-80" 
        />
      </div>
    </footer>
  );
};

export default Footer;
