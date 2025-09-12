import React from "react";
import tristarlogo from "../assets/tristarr.png"
import nilfisklogo from "../assets/nilfisk.png";
import ingersollogo from "../assets/ingersoll.png"
import arologo from "../assets/download.jpg"
import stanlylogo from "../assets/stanly.png"
import leisterlogo from "../assets/leister.jpg"
import weldylogo from "../assets/weldy.png"

const LogosCarousel = () => {
  const logos = [
    tristarlogo,
   nilfisklogo,
    ingersollogo,
     arologo,
    stanlylogo,
    leisterlogo,
    weldylogo,
  ];

  return (
    <section className="py-16 relative z-10 text-gray-800 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Trusted by Leading Industries
        </h2>

        {/* Carousel */}
        <div className="relative w-full overflow-hidden">
          <div className="flex space-x-8 animate-scroll-slow">
            {logos.concat(logos).map((logo, i) => (
              <div
                key={i}
                className="backdrop-blur-md bg-white/30 border border-gray-200 rounded-xl p-6 h-24 w-52 flex items-center justify-center transform transition-all duration-500 hover:scale-110 hover:shadow-[0_0_25px_rgba(0,0,0,0.1)]"
              >
                <img
                  src={logo}
                  alt={`logo-${i}`}
                  className="max-h-12 max-w-40 object-contain transition-all duration-500 hover:scale-125"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scrolling Animation */}
      <style jsx>{`
        @keyframes scroll-slow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-slow {
          display: flex;
          width: max-content;
          animation: scroll-slow 25s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default LogosCarousel;
