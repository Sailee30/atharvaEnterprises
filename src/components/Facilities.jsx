import React from 'react';

const Facilities = () => {
  return (
    <>
      {/* Craftsmanship Journey Section */}
      <section className="py-12 bg-gray-900 text-white relative overflow-hidden">
        <div className="container max-w-5xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Column - Marquee */}
            <div className="relative overflow-hidden min-h-[250px] rounded-lg">
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
              <div 
                className="absolute inset-0 bg-cover bg-center rounded-lg"
                style={{
                  backgroundImage: "url('https://cdn.prod.website-files.com/65b9cce908217ff5cd624b00/65bb6feb8d54a6bc2dfca9f6_about-image.jpg')"
                }}
              ></div>
              <div className="absolute bottom-0 left-0 right-0 py-3 overflow-hidden">
                <div className="whitespace-nowrap animate-marquee flex">
                  {[...Array(7)].map((_, index) => (
                    <div key={index} className="inline-block mx-4">
                      <span className="text-white text-sm">Free shipping on orders over </span>
                      <span className="text-yellow-500 font-medium text-sm">$150</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="py-6">
              <h2 className="text-2xl font-medium mb-3">Our craftsmanship journey</h2>
              <p className="text-gray-300 text-sm mb-4">
                At Atharva Enterpriseso, we embark on a relentless pursuit of excellence, driven by a passion for craftsmanship and innovation. Our story is woven with a commitment to providing artisans.
              </p>
              <a 
                href="/about-us" 
                className="inline-block bg-yellow-500 text-black font-medium py-2 px-5 rounded-md hover:bg-yellow-600 transition-colors duration-300 mb-6 text-sm"
              >
                Know more about us
              </a>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <h3 className="text-2xl font-medium mb-1">30</h3>
                  <p className="text-gray-300 text-xs">Total tools</p>
                </div>
                <div>
                  <h3 className="text-2xl font-medium mb-1">
                    350<span className="text-yellow-500">+</span>
                  </h3>
                  <p className="text-gray-300 text-xs">Happy customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Facilities;
