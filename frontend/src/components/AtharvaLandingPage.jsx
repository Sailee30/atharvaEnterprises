import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AtharvaLandingPage = () => {
  // ============================================
  // HERO SECTION IMAGES - Rotating featured
  // ============================================
  const heroImages = [
    {
      id: 1,
      name: "Industrial Assembly Tools & Systems",
      image: "https://res.cloudinary.com/da9saax3a/image/upload/v1760772740/AT_iosrp2.jpg",
    },
    {
      id: 2,
      name: "Industrial Cleaning Solutions",
      image: "https://res.cloudinary.com/da9saax3a/image/upload/v1760772504/CS_gexgbw.jpg",
    },
    {
      id: 3,
      name: "Industrial Fluid Handling Solutions",
      image: "https://res.cloudinary.com/da9saax3a/image/upload/v1760772504/FH_hngq5i.webp",
    },
    {
      id: 4,
      name: "Industrial Lifting Solutions",
      image: "https://res.cloudinary.com/da9saax3a/image/upload/v1760772505/LS_qkdfmr.webp",
    },
    {
      id: 5,
      name: "Industrial Plasto Weld & Heating Solutions",
      image: "https://res.cloudinary.com/da9saax3a/image/upload/v1760772504/HS_mlqsqu.jpg",
    },
  ];

  // ============================================
  // CATEGORY SECTION IMAGES
  // ============================================
  const categories = [
    {
      id: 1,
      name: "Industrial Assembly Tools & Systems",
      image: "https://res.cloudinary.com/da9saax3a/image/upload/v1760772740/AT_iosrp2.jpg",
      color: "bg-blue-50",
    },
    {
      id: 2,
      name: "Industrial Cleaning Solutions",
      image: "https://res.cloudinary.com/da9saax3a/image/upload/v1760772504/CS_gexgbw.jpg",
      color: "bg-emerald-50",
    },
    {
      id: 3,
      name: "Industrial Fluid Handling Solutions",
      image: "https://res.cloudinary.com/da9saax3a/image/upload/v1760772504/FH_hngq5i.webp",
      color: "bg-orange-50",
    },
    {
      id: 4,
      name: "Industrial Lifting Solutions",
      image: "https://res.cloudinary.com/da9saax3a/image/upload/v1760772505/LS_qkdfmr.webp",
      color: "bg-yellow-50",
    },
    {
      id: 5,
      name: "Industrial Plasto Weld & Heating Solutions",
      image: "https://res.cloudinary.com/da9saax3a/image/upload/v1760772504/HS_mlqsqu.jpg",
      color: "bg-red-50",
    },
  ];

  // ============================================
  // NEW ARRIVAL SECTION PRODUCTS
  // ============================================
  const featuredProducts = [
    {
      id: 1,
      name: "WELDY HG Series Hot Air Guns",
      category: "Industrial Assembly Tools & Systems",
      image: "https://res.cloudinary.com/da9saax3a/image/upload/v1760772740/AT_iosrp2.jpg",
      isNew: true,
    },
    {
      id: 2,
      name: "NILFISK Professional Cleaners",
      category: "Industrial Cleaning Solutions",
      image: "https://res.cloudinary.com/da9saax3a/image/upload/v1760772504/CS_gexgbw.jpg",
      isNew: true,
    },
    {
      id: 3,
      name: "ARO Chemical Pumps",
      category: "Industrial Fluid Handling Solutions",
      image: "https://res.cloudinary.com/da9saax3a/image/upload/v1760772504/FH_hngq5i.webp",
      isNew: false,
    },
    {
      id: 4,
      name: "Heavy-Duty Chain Hoist",
      category: "Industrial Lifting Solutions",
      image: "https://res.cloudinary.com/da9saax3a/image/upload/v1760772505/LS_qkdfmr.webp",
      isNew: true,
    },
    {
      id: 5,
      name: "WELDY Professional Heat Gun",
      category: "Industrial Plasto Weld & Heating Solutions",
      image: "https://res.cloudinary.com/da9saax3a/image/upload/v1760772504/HS_mlqsqu.jpg",
      isNew: false,
    },
  ];

  const [heroIndex, setHeroIndex] = useState(0);
  const [categoryScrollPos, setCategoryScrollPos] = useState(0);

  // Auto-rotate hero slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const nextHero = () => {
    setHeroIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevHero = () => {
    setHeroIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const scrollCategories = (direction) => {
    const scrollAmount = 300;
    if (direction === "left") {
      setCategoryScrollPos(Math.max(0, categoryScrollPos - scrollAmount));
    } else {
      setCategoryScrollPos(categoryScrollPos + scrollAmount);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ===== HERO SECTION - SLIDING SLIDESHOW ===== */}
      <section className="relative w-full bg-white overflow-hidden">
        <div className="relative h-screen flex items-center">
          {/* Sliding Container */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div
              className="flex h-full transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${heroIndex * 100}%)`,
              }}
            >
              {heroImages.map((hero) => (
                <div
                  key={hero.id}
                  className="w-full h-full flex-shrink-0 relative flex items-center bg-white"
                >
                  {/* Left Content */}
                  <div className="w-1/2 px-12 z-20 relative">
                    <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                      {hero.name}
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                      Professional-grade industrial solutions designed for performance and reliability
                    </p>
                    <div className="flex gap-4">
                      <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 px-10 rounded-lg transition-all">
                        Explore Products
                      </button>
                    </div>
                  </div>

                  {/* Right Image - Overlapping */}
                  <div className="absolute right-0 top-0 h-full w-3/5 flex items-center justify-center">
                    <img
                      src={hero.image}
                      alt={hero.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - Positioned at bottom */}
          <button
            onClick={prevHero}
            className="absolute left-8 bottom-6 z-20 bg-white/30 hover:bg-yellow-500 text-white p-4 rounded-full transition-all backdrop-blur-md border border-white/30"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={nextHero}
            className="absolute right-8 bottom-6 z-20 bg-white/30 hover:bg-yellow-500 text-white p-4 rounded-full transition-all backdrop-blur-md border border-white/30"
          >
            <ChevronRight size={32} />
          </button>

          {/* Navigation Dots */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setHeroIndex(idx)}
                className={`h-3 rounded-full transition-all ${
                  heroIndex === idx
                    ? "w-10 bg-yellow-500"
                    : "w-3 bg-gray-400 hover:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORY EXPLORATION SECTION - GEARO STYLE ===== */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
            Explore Categories
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Discover our comprehensive range of industrial solutions
          </p>

          {/* Category Carousel - Horizontal Scroll */}
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex gap-8 transition-transform duration-300 justify-center"
                style={{
                  transform: `translateX(-${categoryScrollPos}px)`,
                }}
              >
                {categories.map((category) => (
                  <a
                    key={category.id}
                    href={`/products/category/${encodeURIComponent(category.name)}`}
                    className="group flex flex-col items-center flex-shrink-0"
                  >
                    {/* Circle Container */}
                    <div className={`${category.color} rounded-full w-40 h-40 flex items-center justify-center overflow-hidden border-4 border-transparent hover:border-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl`}>
                      <img
                        src={category.image}
                        alt={category.name}
                        className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300 p-4"
                      />
                    </div>
                    {/* Category Name - Shortened */}
                    <h3 className="mt-4 text-sm font-semibold text-gray-900 text-center max-w-32 group-hover:text-yellow-600 transition-colors line-clamp-2">
                      {category.name}
                    </h3>
                  </a>
                ))}
              </div>
            </div>

            {/* Carousel Arrows */}
            <button
              onClick={() => scrollCategories("left")}
              className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-gray-900 hover:bg-yellow-500 text-white p-3 rounded-full transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scrollCategories("right")}
              className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-gray-900 hover:bg-yellow-500 text-white p-3 rounded-full transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>


    </div>
  );
};

export default AtharvaLandingPage;
