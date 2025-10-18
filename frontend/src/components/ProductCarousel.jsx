import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Eye, Download, Share2 } from "lucide-react";

const ProductCarousel = () => {
  const categories = [
    {
      id: 1,
      name: "Industrial Assembly Tools & Systems",
      description: "Professional-grade tools for precision assembly and welding",
      products: [
        {
          id: "p1",
          name: "WELDY HG Series Hot Air Guns",
          image: "https://via.placeholder.com/300x300?text=WELDY+Hot+Air+Gun",
          badge: "NEW",
          specs: "Ceramic heating, 2000W"
        },
        {
          id: "p2",
          name: "Assembly Tool Kit Pro",
          image: "https://via.placeholder.com/300x300?text=Assembly+Tools",
          badge: "BESTSELLER",
          specs: "18-piece set"
        },
        {
          id: "p3",
          name: "Advanced Fastening System",
          image: "https://via.placeholder.com/300x300?text=Fastening+System",
          badge: "POPULAR",
          specs: "Industrial-grade"
        },
        {
          id: "p4",
          name: "Precision Welding Unit",
          image: "https://via.placeholder.com/300x300?text=Welding+Unit",
          specs: "Heavy-duty"
        },
      ],
    },
    {
      id: 2,
      name: "Industrial Cleaning Solutions",
      description: "Advanced cleaning systems for industrial and commercial use",
      products: [
        {
          id: "p5",
          name: "NILFISK Professional Cleaners",
          image: "https://via.placeholder.com/300x300?text=NILFISK+Cleaner",
          badge: "FEATURED",
          specs: "High-pressure 250bar"
        },
        {
          id: "p6",
          name: "High-Pressure Washing Unit",
          image: "https://via.placeholder.com/300x300?text=Pressure+Washer",
          specs: "3000 PSI"
        },
        {
          id: "p7",
          name: "Eco-Friendly Cleaner",
          image: "https://via.placeholder.com/300x300?text=Eco+Cleaner",
          badge: "SUSTAINABLE",
          specs: "Biodegradable"
        },
        {
          id: "p8",
          name: "Steam Cleaning System",
          image: "https://via.placeholder.com/300x300?text=Steam+Cleaner",
          specs: "180°C steam"
        },
      ],
    },
    {
      id: 3,
      name: "Industrial Fluid Handling Solutions",
      description: "Precision fluid management and chemical pumping systems",
      products: [
        {
          id: "p9",
          name: "ARO Chemical Pumps",
          image: "https://via.placeholder.com/300x300?text=ARO+Chemical+Pump",
          badge: "TRUSTED",
          specs: "5-55 GPM"
        },
        {
          id: "p10",
          name: "ARO Piston Pump Package",
          image: "https://via.placeholder.com/300x300?text=ARO+Piston+Pump",
          specs: "Complete kit"
        },
        {
          id: "p11",
          name: "Fluid Management System",
          image: "https://via.placeholder.com/300x300?text=Fluid+System",
          badge: "ADVANCED",
          specs: "Automated control"
        },
        {
          id: "p12",
          name: "Precision Dispenser Unit",
          image: "https://via.placeholder.com/300x300?text=Dispenser+Unit",
          specs: "±0.1% accuracy"
        },
      ],
    },
    {
      id: 4,
      name: "Industrial Lifting Solutions",
      description: "Heavy-duty lifting and material handling equipment",
      products: [
        {
          id: "p13",
          name: "Heavy-Duty Crane System",
          image: "https://via.placeholder.com/300x300?text=Crane+System",
          badge: "RELIABLE",
          specs: "Up to 10 tons"
        },
        {
          id: "p14",
          name: "Compact Lifting Unit",
          image: "https://via.placeholder.com/300x300?text=Lifting+Unit",
          specs: "Space-efficient"
        },
        {
          id: "p15",
          name: "Smart Hoist System",
          image: "https://via.placeholder.com/300x300?text=Hoist+System",
          badge: "INNOVATIVE",
          specs: "Smart controls"
        },
        {
          id: "p16",
          name: "Material Handling Bridge",
          image: "https://via.placeholder.com/300x300?text=Handling+Bridge",
          specs: "Custom solutions"
        },
      ],
    },
  ];

  // ===== STATE MANAGEMENT =====
  const [activeCategory, setActiveCategory] = useState(0);
  const [carouselPos, setCarouselPos] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // ===== CAROUSEL LOGIC =====
  const productsPerView = 4;
  const totalProducts = categories[activeCategory].products.length;
  const maxPos = Math.max(0, totalProducts - productsPerView);

  const nextProduct = () => {
    setCarouselPos((prev) => Math.min(prev + 1, maxPos));
  };

  const prevProduct = () => {
    setCarouselPos((prev) => Math.max(prev - 1, 0));
  };

  const handleCategoryChange = (index) => {
    setActiveCategory(index);
    setCarouselPos(0);
    setHoveredProduct(null);
  };

  const visibleProducts = categories[activeCategory].products.slice(
    carouselPos,
    carouselPos + productsPerView
  );

  const currentCategory = categories[activeCategory];

  // ===== RENDER =====
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container max-w-7xl mx-auto px-8">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold uppercase tracking-wider">
              Product Lineup
            </span>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Our Product Categories
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Comprehensive industrial solutions across all categories to meet your operational needs
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-8 pb-8 border-b-2 border-gray-200">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(index)}
              className={`group relative px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-sm ${
                activeCategory === index
                  ? "bg-yellow-500 text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {category.name}
              {activeCategory === index && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-yellow-600 rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        <div className="mb-12 text-center">
          <p className="text-gray-600 text-base leading-relaxed max-w-2xl mx-auto">
            {currentCategory.description}
          </p>
        </div>

        <div className="relative group">
          <button
            onClick={prevProduct}
            disabled={carouselPos === 0}
            className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-gray-900 hover:bg-yellow-500 disabled:bg-gray-300 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 disabled:cursor-not-allowed group-hover:opacity-100 opacity-60"
            aria-label="Previous products"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="grid grid-cols-4 gap-6 px-4">
            {visibleProducts.map((product, idx) => (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                className="group/card relative bg-white rounded-xl border-2 border-gray-200 hover:border-yellow-500 overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1"
              >
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 h-56 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500"
                  />

                  {product.badge && (
                    <div className="absolute top-3 right-3 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      {product.badge}
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-5">
                  <h3 className="text-sm font-bold text-gray-900 line-clamp-2 group-hover/card:text-yellow-600 transition-colors mb-2">
                    {product.name}
                  </h3>

                  <div className="inline-block text-xs text-gray-500 font-medium mb-3">
                    {product.specs}
                  </div>

                  <div className="h-px bg-gray-200 mb-3 group-hover/card:bg-yellow-300 transition-colors" />

                  <div className="flex items-center justify-between opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                    <button
                      className="flex items-center gap-1 text-yellow-600 hover:text-yellow-700 font-semibold text-xs transition-colors"
                      aria-label="View product details"
                    >
                      <Eye size={16} />
                      <span>View</span>
                    </button>
                    <div className="flex gap-2">
                      <button
                        className="text-gray-500 hover:text-yellow-600 transition-colors p-1 rounded hover:bg-yellow-50"
                        aria-label="Download specs"
                      >
                        <Download size={16} />
                      </button>
                      <button
                        className="text-gray-500 hover:text-yellow-600 transition-colors p-1 rounded hover:bg-yellow-50"
                        aria-label="Share product"
                      >
                        <Share2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-1 -right-1 w-12 h-12 bg-yellow-50 rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
            ))}
          </div>

          <button
            onClick={nextProduct}
            disabled={carouselPos >= maxPos}
            className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-gray-900 hover:bg-yellow-500 disabled:bg-gray-300 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 disabled:cursor-not-allowed group-hover:opacity-100 opacity-60"
            aria-label="Next products"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="mt-10 text-center">
          <div className="inline-block">
            <p className="text-gray-700 font-semibold mb-3">
              Showing {Math.min(carouselPos + 1, totalProducts)} -{" "}
              {Math.min(carouselPos + productsPerView, totalProducts)} of{" "}
              {totalProducts} products
            </p>
            <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-300 rounded-full"
                style={{
                  width: `${((Math.min(carouselPos + productsPerView, totalProducts)) / totalProducts) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
