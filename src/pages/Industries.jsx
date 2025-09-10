import React from 'react';
import { ArrowRight } from 'lucide-react';

// Import your existing components - adjust paths as needed
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

const Industries = () => {
  // Industries data based on Atharva Enterprises' focus
  const industries = [
    {
      id: 1,
      title: "Manufacturing & Production",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Industrial assembly tools, hydraulic torque wrenches, and precision equipment for manufacturing lines, ensuring optimal production efficiency and quality control."
    },
    {
      id: 2,
      title: "Automotive Industry",
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Specialized automotive assembly tools, torque wrenches, air impact tools, and precision fastening equipment for vehicle manufacturing and service centers."
    },
    {
      id: 3,
      title: "Heavy Engineering",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Heavy-duty hydraulic tools, industrial-grade cleaning equipment, and material handling solutions for large-scale engineering projects."
    },
    {
      id: 4,
      title: "Construction & Infrastructure",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Construction machinery, cleaning solutions for equipment maintenance, and material handling tools for infrastructure development projects."
    },
    {
      id: 5,
      title: "Oil, Gas & Petrochemicals",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Explosion-proof cleaning equipment, high-pressure washers, and specialized maintenance tools for petrochemical and oil refining facilities."
    },
    {
      id: 6,
      title: "Food & Beverage Processing",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Food-grade cleaning equipment, vacuum cleaners, and specialized maintenance tools ensuring hygiene standards in food processing facilities."
    },
    {
      id: 7,
      title: "Textile & Garment",
      image: "https://images.unsplash.com/photo-1520637836862-4d197d17c0a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Industrial cleaning solutions for textile machinery, cutting tools for fabric processing, and maintenance equipment for garment manufacturing."
    },
    {
      id: 8,
      title: "Steel & Metal Processing",
      image: "https://images.unsplash.com/photo-1565888815-7e4f0d7d1c8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Heavy-duty hydraulic tools, cutting equipment, industrial assembly tools, and cleaning solutions for steel mills and metal fabrication units."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Uncomment and adjust import paths when integrating */}
      {/* <Navbar /> */}
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Industries We Serve
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              We provide specialized industrial tools and equipment across various industries, helping businesses enhance efficiency, productivity, and operational excellence.
            </p>
          </div>
        </div>
      </div>

      {/* Industries Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {industries.map((industry) => (
            <div
              key={industry.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={industry.image}
                  alt={industry.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {industry.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {industry.description}
                </p>
                
                {/* Learn More Button */}
                <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Don't See Your Industry?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              We work with businesses across many sectors. Contact us to discuss how Atharva Enterprises can support your specific industry needs.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300 transform hover:scale-105">
              Contact Us Today
            </button>
          </div>
        </div>
      </div>

      {/* Uncomment when integrating */}
      {/* <Footer /> */}
    </div>
  );
};

export default Industries;