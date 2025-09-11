import React from 'react';

const CTA = () => {
  return (
    <section id="offer-section" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container max-w-5xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Offer - Redesigned with elegant card */}
          <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-white">
              <div className="absolute inset-0 opacity-5">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="black" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-yellow-400 opacity-20"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-yellow-400 opacity-10"></div>
            
            {/* Content */}
            <div className="relative z-10 p-8 md:p-10">
              <div className="inline-block px-4 py-1 rounded-full bg-yellow-400 bg-opacity-10 border border-yellow-400 border-opacity-30 mb-4">
                <span className="text-xs font-medium uppercase tracking-wider text-yellow-600">Big Sale</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-medium text-gray-900 mb-4 leading-tight">
                Spring into savings: <br/><span className="text-yellow-500">shop our sale!</span>
              </h3>
              
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1">From:</div>
                <div className="text-xl font-medium text-gray-800 flex items-center">
                  <span className="mr-2">20% off</span>
                  <svg width="20" height="8" viewBox="0 0 20 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.3536 4.35355C19.5488 4.15829 19.5488 3.84171 19.3536 3.64645L16.1716 0.464466C15.9763 0.269204 15.6597 0.269204 15.4645 0.464466C15.2692 0.659728 15.2692 0.976311 15.4645 1.17157L18.2929 4L15.4645 6.82843C15.2692 7.02369 15.2692 7.34027 15.4645 7.53553C15.6597 7.7308 15.9763 7.7308 16.1716 7.53553L19.3536 4.35355ZM0 4.5H19V3.5H0V4.5Z" fill="#F59E0B"/>
                  </svg>
                  <span className="ml-2">50% off</span>
                </div>
              </div>
              
              <a 
                href="/sale-product" 
                className="inline-flex items-center group/btn font-medium relative overflow-hidden"
              >
                <span className="relative z-10 py-3 px-6 border-2 border-yellow-400 rounded-lg text-gray-900 bg-white group-hover/btn:text-white transition-colors duration-300">
                  Sale products
                </span>
                <span className="absolute inset-0 bg-yellow-400 transform translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300"></span>
                <svg className="w-5 h-5 ml-2 text-gray-900 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Right Offer - Elegant card with image background */}
          <div className="relative overflow-hidden rounded-2xl shadow-lg group hover:shadow-xl transition-all duration-500">
            {/* Background image with subtle overlay */}
            <div className="absolute inset-0">
              <img 
                src="https://cdn.prod.website-files.com/65b9cce908217ff5cd624b00/65bb6fed58dda83c3f4b4934_big-banner.jpg" 
                alt="Tools" 
                className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/30"></div>
              
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-filter backdrop-blur-sm"></div>
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 p-8 md:p-10 flex flex-col h-full justify-end text-white">
              <div className="mb-6">
                <div className="inline-block px-4 py-1 rounded-full bg-yellow-400 bg-opacity-20 mb-4 border border-yellow-400 border-opacity-30">
                  <span className="text-xs font-medium uppercase tracking-wider text-yellow-300">Limited Time</span>
                </div>
                <h3 className="text-xl md:text-2xl font-medium mb-2">
                  <span className="opacity-90">Flat </span>
                  <span className="text-yellow-400">5% off</span>
                  <span className="opacity-90"> on the first order</span>
                </h3>
                <h2 className="text-2xl md:text-3xl font-medium text-white"><span className="text-yellow-400">Atharva EnterprisesO</span> bars tool</h2>
              </div>
              
              <a 
                href="/shop" 
                className="inline-flex items-center group/btn font-medium relative overflow-hidden self-start"
              >
                <span className="relative z-10 py-3 px-6 bg-yellow-400 rounded-lg text-gray-900 group-hover/btn:bg-white transition-colors duration-300">
                  Shop now
                </span>
                <svg className="w-5 h-5 ml-2 text-gray-900 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;