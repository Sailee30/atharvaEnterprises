import React from "react";
import { ArrowRight } from "lucide-react";
import nilfisklogo from "../assets/nilfisk.png";
import ingersollogo from "../assets/ingersoll.png"
import arologo from "../assets/download.jpg"
import stanlylogo from "../assets/stanly.png"
import tristarlogo from "../assets/tristar.jpg"

const Industries = () => {
  const industries = [
    {
      id: 1,
      title: "NILFISK",
      image:
       nilfisklogo,
      description:
        "Nilfisk is a global leader in professional and consumer cleaning equipment, founded in Denmark in 1906, offering a broad range of products including floor care, vacuum cleaners, and high-pressure washers. The company serves a professional market across various industries and also provides cleaning solutions for domestic consumers. With a focus on innovation and sustainability, Nilfisk operates in over 100 countries, providing a trusted network of products and after-sales services. ",
    },
    {
      id: 2,
      title: "INGERSOLL RAND",
      image:
       ingersollogo,
      description:
        "Ingersoll Rand is a global industrial products company formed in 2020 that provides mission-critical air, fluid, and energy solutions, including compressors, power tools, and lifting equipment. The company offers a broad range of products under more than 40 brands and serves diverse industries such as manufacturing, construction, and food and beverage. With a focus on sustainability and efficiency, Ingersoll Rand aims to enhance industrial productivity worldwide. ",
    },
    {
      id: 3,
      title: "ARO",
      image:
       arologo,
      description:
        "ARO stands for Adaptable, Reliable, Outstanding quality and performance. This world-renowned brand is a part of the bigger Ingersoll Rand industrial manufacturing company that has been around for over a century now. ARO is backed by a 90-year legacy of designing and engineering pumps that boast reliable performance, long operating life, and service excellence. Their fluid management products for different industries are expertly crafted from their AODD pumps, piston pumps, peristaltic pumps, pneumatic valves and cylinders, regulators, and lubricators among others .",
    },
    {
      id: 4,
      title: "STANLY",
      image:
        stanlylogo,
      description:
        "Stanley Black & Decker is a global manufacturer and innovator in tools, outdoor equipment, and engineered fasteners, known for brands like DeWalt and Stanley. The company was formed in 2010 from the merger of The Stanley Works and Black & Decker, and is headquartered in New Britain, Connecticut. Beyond its core business, the company is also involved in security products and infrastructure development. ",
    },
    {
      id: 5,
      title: "TRISTAR",
      image:
        tristarlogo,
      description:
        "Explosion-proof cleaning equipment, high-pressure washers, and specialized maintenance tools for petrochemical and oil refining facilities.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Industries We Serve
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              We provide specialized industrial tools and equipment across
              various industries, helping businesses enhance efficiency,
              productivity, and operational excellence.
            </p>
          </div>
        </div>
      </div>

      {/* Small neat gap */}
      <div className="h-12"></div>

      {/* Cards Section - 2 per row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {industries.map((industry) => (
            <div
              key={industry.id}
              className="overflow-hidden rounded-2xl shadow-2xl bg-white group transition-transform duration-500 hover:scale-[1.02]"
            >
              {/* Image on top */}
              <div className="overflow-hidden h-64">
                <img
                  src={industry.image}
                  alt={industry.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                />
              </div>

              {/* Content below */}
              <div className="p-8">
                <h3 className="font-[Courgette] text-2xl lg:text-3xl font-bold text-gray-900 mb-4 transition-colors duration-500 group-hover:text-[#A9DFBF]">
                  {industry.title}
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                  {industry.description}
                </p>
                <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-lg transition-all duration-400 group">
                  
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gray-100 relative z-20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Don't See Your Industry?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              We work with businesses across many sectors. Contact us to discuss
              how Atharva Enterprises can support your specific industry needs.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300 transform hover:scale-105">
              Contact Us Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Industries;
