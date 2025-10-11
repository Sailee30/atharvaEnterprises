import React from "react";

// Mock logo imports for demo - replace with your actual imports
import nilfisklogo from "../assets/nilfisk.png";
import ingersollogo from "../assets/ingersol.jpeg"
import arologo from "../assets/download.jpg"
import stanlylogo from "../assets/stanly.png"
import tristarlogo from "../assets/tristar.jpg"
import leisterlogo from "../assets/tristar.jpg"
import weldylogo from "../assets/tristar.jpg"

const LogosCarousel = () => {
  const logos = [
    tristarlogo,
    nilfisklogo,
    ingersollogo,
    arologo,
    stanlylogo,
  ];

  return (
    <section className="py-16 relative z-10 text-gray-800 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Trusted by Leading Industries
        </h2>

        {/* Carousel Container */}
        <div className="relative w-full overflow-hidden mask-gradient">
          <div className="carousel-track">
            {/* First set of logos */}
            {logos.map((logo, i) => (
              <div
                key={`first-${i}`}
                className="carousel-item"
              >
                <img
                  src={logo}
                  alt={`Partner logo ${i + 1}`}
                  className="max-h-20 max-w-40 object-contain transition-all duration-500 hover:scale-125"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {logos.map((logo, i) => (
              <div
                key={`second-${i}`}
                className="carousel-item"
              >
                <img
                  src={logo}
                  alt={`Partner logo ${i + 1}`}
                  className="max-h-20 max-w-40 object-contain transition-all duration-500 hover:scale-125"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Internal Styles */}
      <style jsx global>{`
        .carousel-track {
          display: flex;
          width: fit-content;
          animation: scroll-infinite 30s linear infinite;
          gap: 2rem;
        }
        
        .carousel-item {
          flex: none;
          backdrop-filter: blur(12px);
          background: rgba(255, 255, 255, 0.3);
          border: 1px solid rgba(229, 231, 235, 1);
          border-radius: 0.75rem;
          padding: 1.5rem;
          height: 10rem; /* Increased from 6rem */
          width: 14rem; /* Slightly wider for balance */
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.5s ease;
        }
        
        .carousel-item:hover {
          transform: scale(1.1);
          box-shadow: 0 0 25px rgba(0, 0, 0, 0.1);
          animation-play-state: paused;
        }
        
        .mask-gradient {
          mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }
        
        @keyframes scroll-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        /* Pause animation on hover over the entire section */
        .carousel-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default LogosCarousel;
