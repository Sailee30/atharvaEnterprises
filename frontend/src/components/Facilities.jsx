import React from 'react';
import atharvaImage from '../assets/atharvaaa.jpeg';

const Facilities = () => {
  return (
    <section className="py-12 bg-gray-900 text-white relative overflow-hidden">
      <div className="container max-w-5xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Image */}
          <div className="relative overflow-hidden min-h-[250px] rounded-lg">
            <img 
              src="{atharvaImage}"
              alt="Atharva Enterprises Journey"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          
          {/* Right Column */}
          <div className="py-6">
            <h2 className="text-2xl font-medium mb-3">Our Journey</h2>
            <p className="text-gray-300 text-sm mb-4">
              At Atharva Enterprises, we embark on a relentless pursuit of excellence, driven by a passion for craftsmanship and innovation. Our story is woven with a commitment to providing artisans.
            </p>
            <a 
              href="/about-us" 
              className="inline-block bg-yellow-500 text-black font-medium py-2 px-5 rounded-md hover:bg-yellow-600 transition-colors duration-300 mb-6 text-sm"
            >
              Know more about us
            </a>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <h3 className="text-2xl font-medium mb-1">
                  800<span className="text-yellow-500">+</span>
                </h3>
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
  );
};

export default Facilities;
