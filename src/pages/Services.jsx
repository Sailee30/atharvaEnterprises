import React from 'react';
import { 
  Package, 
  Settings, 
  Wrench, 
  GraduationCap, 
  Shield, 
  Truck, 
  HeartHandshake, 
  BarChart3 
} from 'lucide-react';

// Import your existing components - adjust paths as needed
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

const Services = () => {
  // Services data based on Atharva Enterprises' offerings
  const services = [
    {
      id: 1,
      title: "Industrial Equipment Supply",
      icon: Package,
      description: "Comprehensive supply of industrial tools including hydraulic torque wrenches, assembly tools, cleaning equipment, and material handling solutions from trusted global manufacturers."
    },
    {
      id: 2,
      title: "Installation & Commissioning",
      icon: Settings,
      description: "Professional installation and commissioning services for industrial machinery ensuring optimal performance, safety compliance, and seamless integration with existing systems."
    },
    {
      id: 3,
      title: "Maintenance & After-Sales Support",
      icon: Wrench,
      description: "Comprehensive maintenance services, spare parts supply, and 24/7 technical support to minimize equipment downtime and extend operational lifecycle."
    },
    {
      id: 4,
      title: "Technical Training & Consultation",
      icon: GraduationCap,
      description: "Expert technical training programs for equipment operation, maintenance best practices, and safety protocols to maximize your team's operational efficiency."
    },
    {
      id: 5,
      title: "Equipment Rental Solutions",
      icon: Shield,
      description: "Flexible rental options for specialized industrial tools and equipment, perfect for short-term projects or when testing equipment before purchase."
    },
    {
      id: 6,
      title: "Customized Solutions",
      icon: Truck,
      description: "Tailored equipment solutions designed to meet specific industrial requirements, including custom modifications and specialized tool configurations."
    },
    {
      id: 7,
      title: "On-Site Technical Support",
      icon: HeartHandshake,
      description: "Dedicated on-site technical support with experienced engineers ready to resolve operational challenges and provide hands-on assistance when needed."
    },
    {
      id: 8,
      title: "Performance Optimization",
      icon: BarChart3,
      description: "Equipment performance analysis, efficiency audits, and optimization strategies to enhance productivity, reduce operational costs, and improve overall performance."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Uncomment and adjust import paths when integrating */}
      {/* <Navbar /> */}
      
      {/* Hero Section with Gradient Background */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              From industrial equipment supply to comprehensive maintenance, we offer end-to-end solutions for manufacturing and industrial businesses.
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 hover:border-blue-200 relative overflow-hidden"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Gradient Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-200 rounded-2xl transition-colors duration-300"></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Service Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We follow a systematic approach to ensure quality service delivery and customer satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Requirement Analysis", desc: "Understanding your specific industrial needs" },
              { step: "02", title: "Solution Design", desc: "Developing customized equipment solutions" },
              { step: "03", title: "Implementation", desc: "Professional installation & commissioning" },
              { step: "04", title: "Ongoing Support", desc: "Maintenance, training & technical support" }
            ].map((process, index) => (
              <div key={index} className="text-center relative">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  {process.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{process.title}</h3>
                <p className="text-gray-600">{process.desc}</p>
                
                {/* Connector Line */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 transform translate-x-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Enhance Your Industrial Operations?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Partner with Atharva Enterprises for reliable industrial equipment and expert technical solutions that drive operational excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg">
                Get Quote
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Uncomment when integrating */}
      {/* <Footer /> */}
    </div>
  );
};

export default Services;