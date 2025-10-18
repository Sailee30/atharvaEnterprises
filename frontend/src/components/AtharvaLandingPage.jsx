import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AtharvaLandingPage = () => {
  // ============================================
  // HERO SECTION IMAGES - Rotating featured
  // CHANGE THESE URLs FOR HERO SECTION
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
  // CATEGORY SECTION IMAGES - Carousel display
  // CHANGE THESE URLs FOR CATEGORY SECTION
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
  // CHANGE THESE URLs FOR NEW ARRIVAL SECTION
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
  React.useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  // Hero slider functions
  const nextHero = () => {
    setHeroIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevHero = () => {
    setHeroIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  // Category scroll functions
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
      {/* ===== HERO SECTION - FEATURED PRODUCT SLIDER ===== */}
      <section className="relative w-full bg-white overflow-hidden">
        <div className="relative h-screen flex items-center">
          {/* Hero Content - Left Side */}
          <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
            <div className="max-w-2xl">
              <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                {heroImages[heroIndex].name}
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
          </div>

          {/* Hero Product Image - Right Side (Overlapping) */}
          <div className="absolute right-0 top-0 h-full w-1/2 flex items-center justify-center">
            <img
              src={heroImages[heroIndex].image}
              alt={heroImages[heroIndex].name}
              className="max-h-full max-w-full object-contain transition-all duration-500"
              style={{
                transform: `translateX(${(heroIndex) * 100}%)`,
              }}
            />
          </div>

          {/* Hero Navigation Arrows */}
          <button
            onClick={prevHero}
            className="absolute left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-4 rounded-full transition-all backdrop-blur"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={nextHero}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-4 rounded-full transition-all backdrop-blur"
          >
            <ChevronRight size={32} />
          </button>

          {/* Hero Navigation Dots */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setHeroIndex(idx)}
                className={`h-3 rounded-full transition-all ${
                  heroIndex === idx
                    ? "w-10 bg-yellow-500"
                    : "w-3 bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORY EXPLORATION SECTION ===== */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
            Explore Categories
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Discover our comprehensive range of industrial solutions
          </p>

          {/* Category Carousel */}
          <div className="relative">
            {/* Categories Container */}
            <div className="overflow-hidden">
              <div
                className="flex gap-6 transition-transform duration-300"
                style={{
                  transform: `translateX(-${categoryScrollPos}px)`,
                }}
              >
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex-shrink-0 w-80 group cursor-pointer"
                  >
                    <div
                      className={`${category.color} rounded-lg p-8 h-80 flex flex-col items-center justify-center overflow-hidden relative`}
                    >
                      <img
                        src={category.image}
                        alt={category.name}
                        className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900 text-center">
                      {category.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Arrows */}
            <button
              onClick={() => scrollCategories("left")}
              className="absolute -left-6 top-1/3 -translate-y-1/2 z-10 bg-gray-900 hover:bg-yellow-500 text-white p-3 rounded-full transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scrollCategories("right")}
              className="absolute -right-6 top-1/3 -translate-y-1/2 z-10 bg-gray-900 hover:bg-yellow-500 text-white p-3 rounded-full transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS / NEW ARRIVALS SECTION ===== */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
            New Arrival Products
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Check out our latest industrial solutions
          </p>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Product Image */}
                <div className="relative bg-gray-100 h-64 overflow-hidden flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                  {product.isNew && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                      NEW
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 px-4 rounded-lg transition-all">
                      View More
                    </button>
                    <button className="flex-1 border border-gray-300 hover:bg-gray-100 text-gray-900 font-semibold py-2 px-4 rounded-lg transition-all">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20 px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Transform Your Operations?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Discover our complete industrial solutions tailored to your specific needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 px-12 rounded-lg transition-all">
              View All Products
            </button>
            <button className="border-2 border-yellow-500 hover:bg-yellow-500 hover:text-gray-900 text-yellow-500 font-bold py-4 px-12 rounded-lg transition-all">
              Contact Sales
            </button>
          </div>
        </div>
      </section>


    </div>
  );
};

export default AtharvaLandingPage;
