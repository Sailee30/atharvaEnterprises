import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-16 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full filter blur-[150px] opacity-5"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-400 rounded-full filter blur-[150px] opacity-5"></div>
      
      <div className="container max-w-5xl mx-auto px-8 relative z-10">
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-12 gap-x-8 mb-14">
          {/* Logo and About Section */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
            <a href="/" className="mb-6 transform hover:scale-105 transition-transform duration-300">
              <img 
                src="https://cdn.prod.website-files.com/65b9cce908217ff5cd624b00/65bc9d1bf0d88e12d9cc0fe5_Atharva Enterpriseso-light-logo.svg" 
                alt="Atharva Enterprises" 
                className="h-12" 
              />
            </a>
            <p className="text-gray-400 text-sm leading-relaxed text-center lg:text-left">
              At Atharva Enterpriseso, we embark on a relentless pursuit of excellence, driven by a passion for craftsmanship and innovation. Our story is woven with a commitment to providing artisans.
            </p>
          </div>
          
          {/* Contact Information */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8">
            {/* Location */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-yellow-400 bg-opacity-10 flex items-center justify-center mr-3">
                  <img 
                    src="https://cdn.prod.website-files.com/65b9cce908217ff5cd624b00/65bca05bc197e35d9301a50e_location.svg"
                    alt="Location Icon" 
                    className="w-5 h-5" 
                  />
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
                <div className="w-10 h-10 rounded-full bg-yellow-400 bg-opacity-10 flex items-center justify-center mr-3">
                  <img 
                    src="https://cdn.prod.website-files.com/65b9cce908217ff5cd624b00/65bb6feb52f5fa819e7c9f83_email-icon.svg" 
                    alt="Email Icon" 
                    className="w-5 h-5" 
                  />
                </div>
                <h3 className="text-white text-lg font-semibold">Email address</h3>
              </div>
              <a 
                href="mailto:atharvaenterprises9999@gmail.com" 
                className="text-gray-400 text-sm hover:text-yellow-400 transition-colors duration-300 break-all"
              >
                atharvaenterprises9999@gmail.com
              </a>
            </div>

            {/* Phone */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-yellow-400 bg-opacity-10 flex items-center justify-center mr-3">
                  <img 
                    src="https://cdn.prod.website-files.com/65b9cce908217ff5cd624b00/65bb6feb01c83bcbe0bfc579_phone-icon.svg" 
                    alt="Phone Icon" 
                    className="w-5 h-5" 
                  />
                </div>
                <h3 className="text-white text-lg font-semibold">Contact number</h3>
              </div>
              <div className="flex flex-col text-sm">
                <a href="tel:+9175930939" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">+91 9175930939</a>
                <a href="tel:+918669660939" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">+91 8669660939</a>
                <a href="tel:+919175964828" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">+91 9175964828</a>
                <a href="tel:+918600380939" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">+91 8600380939</a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Social Media Section with separator */}
        <div className="relative pt-10 mb-10">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
          </div>
          
          <div className="flex flex-col items-center">
            <h3 className="text-white text-lg font-semibold mb-6">Follow us on</h3>
            <div className="flex space-x-6">
              {[
                { href: "https://www.facebook.com/", icon: "facebook.svg", alt: "Facebook" },
                { href: "https://www.instagram.com/", icon: "instagram.svg", alt: "Instagram" },
                { href: "https://twitter.com/", icon: "twitter-x.svg", alt: "Twitter" },
                { href: "https://www.linkedin.com/", icon: "linkedin.svg", alt: "LinkedIn" }
              ].map(({ href, icon, alt }) => (
                <a 
                  key={alt}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-yellow-400 flex items-center justify-center transition-colors duration-300"
                >
                  <img 
                    src={`https://cdn.prod.website-files.com/65b9cce908217ff5cd624b00/65b9fcfbf3805ab420ff71d9_${icon}`} 
                    alt={alt} 
                    className="w-5 h-5" 
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Copyright with subtle separator */}
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-px bg-gray-800"></div>
          <div className="pt-6 flex items-center justify-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Atharva Enterprises, Pune. All rights reserved.
            </p>
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
