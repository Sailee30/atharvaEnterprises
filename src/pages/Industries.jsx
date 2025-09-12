import React, { useEffect, useState } from "react";
import { ArrowRight, Award, Users, Globe, Sparkles, Building2, Calendar, MapPin, TrendingUp } from "lucide-react";
import nilfisklogo from "../assets/nilfisk.png";
import ingersollogo from "../assets/ingersoll.png"
import arologo from "../assets/download.jpg"
import stanlylogo from "../assets/stanly.png"
import tristarlogo from "../assets/tristar.jpg"

const Industries = () => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.industry-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const industries = [
    {
      id: 1,
      title: "NILFISK",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=600&fit=crop",
      description:
        "Nilfisk is a global leader in professional and consumer cleaning equipment, founded in Denmark in 1906, offering a broad range of products including floor care, vacuum cleaners, and high-pressure washers. The company serves a professional market across various industries and also provides cleaning solutions for domestic consumers.",
      badge: "Global Leader",
      founded: "1906",
      countries: "100+",
      highlight: "Innovation & Sustainability",
      color: "blue"
    },
    {
      id: 2,
      title: "INGERSOLL RAND",
      image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1200&h=600&fit=crop",
      description:
        "Ingersoll Rand is a global industrial products company formed in 2020 that provides mission-critical air, fluid, and energy solutions, including compressors, power tools, and lifting equipment. The company offers a broad range of products under more than 40 brands and serves diverse industries.",
      badge: "Industrial Pioneer",
      founded: "2020",
      brands: "40+",
      highlight: "40+ Global Brands",
      color: "green"
    },
    {
      id: 3,
      title: "ARO",
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&h=600&fit=crop",
      description:
        "ARO stands for Adaptable, Reliable, Outstanding quality and performance. This world-renowned brand is backed by a 90-year legacy of designing and engineering pumps that boast reliable performance, long operating life, and service excellence in fluid management.",
      badge: "Quality Excellence",
      founded: "90+ Years",
      specialty: "Fluid Management",
      highlight: "90 Years of Excellence",
      color: "purple"
    },
    {
      id: 4,
      title: "STANLEY",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop",
      description:
        "Stanley Black & Decker is a global manufacturer and innovator in tools, outdoor equipment, and engineered fasteners. The company was formed in 2010 from the merger of The Stanley Works and Black & Decker, and continues to lead in tool innovation and quality.",
      badge: "Tool Innovation",
      founded: "2010",
      location: "Connecticut, USA",
      highlight: "Industry Innovation Leader",
      color: "orange"
    },
    {
      id: 5,
      title: "TRISTAR",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=600&fit=crop",
      description:
        "Specializing in explosion-proof cleaning equipment, high-pressure washers, and specialized maintenance tools for petrochemical and oil refining facilities. TRISTAR ensures safety and reliability in the most demanding industrial environments.",
      badge: "Safety First",
      founded: "Established Leader",
      specialty: "Petrochemical Solutions",
      highlight: "Safety & Reliability",
      color: "red"
    },
    {
      id: 6,
      title: "LIESTER",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=600&fit=crop",
      description:
        "Specializing in explosion-proof cleaning equipment, high-pressure washers, and specialized maintenance tools for petrochemical and oil refining facilities. TRISTAR ensures safety and reliability in the most demanding industrial environments.",
      badge: "Safety First",
      founded: "Established Leader",
      specialty: "Petrochemical Solutions",
      highlight: "Safety & Reliability",
      color: "red"
    },
    {
      id: 6,
      title: "WELDY",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=600&fit=crop",
      description:
        "Specializing in explosion-proof cleaning equipment, high-pressure washers, and specialized maintenance tools for petrochemical and oil refining facilities. TRISTAR ensures safety and reliability in the most demanding industrial environments.",
      badge: "Safety First",
      founded: "Established Leader",
      specialty: "Petrochemical Solutions",
      highlight: "Safety & Reliability",
      color: "red"
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "from-blue-500 to-cyan-500",
      green: "from-emerald-500 to-teal-500",
      purple: "from-purple-500 to-pink-500",
      orange: "from-orange-500 to-yellow-500",
      red: "from-red-500 to-rose-500"
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-orange-500/10"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/20 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white font-medium mb-8 animate-fade-in">
              <Sparkles className="w-5 h-5 mr-2 text-yellow-400" />
              Trusted Partners Worldwide
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white animate-slide-up">
              Industries We
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Empower
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12 animate-fade-in-delayed">
              Delivering cutting-edge industrial solutions to enhance operational excellence across global markets
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 animate-scale-in">
                <div className="text-4xl font-bold text-yellow-400 mb-2">5+</div>
                <div className="text-gray-300">Global Partners</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 animate-scale-in delay-100">
                <div className="text-4xl font-bold text-yellow-400 mb-2">100+</div>
                <div className="text-gray-300">Countries</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 animate-scale-in delay-200">
                <div className="text-4xl font-bold text-yellow-400 mb-2">50+</div>
                <div className="text-gray-300">Industries</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Cards Section */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Trusted Partners</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto"></div>
          </div>

          {/* Vertical Cards */}
          <div className="space-y-12">
            {industries.map((industry, index) => (
              <div
                key={industry.id}
                id={`card-${industry.id}`}
                className={`industry-card group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 overflow-hidden transform-gpu perspective-1000 ${
                  isVisible[`card-${industry.id}`] ? 'animate-slide-in-modern' : 'opacity-0 translate-y-20'
                }`}
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Glassmorphism Border */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/5 to-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                {/* Animated Glow Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${getColorClasses(industry.color)} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700 animate-pulse-glow`}></div>
                
                <div className="relative bg-white rounded-3xl overflow-hidden backdrop-blur-sm">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image Section */}
                    <div className="relative h-80 md:h-full overflow-hidden">
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/20 z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-700"></div>
                      
                      {/* Dynamic Background Particles */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-1000">
                        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-float-1"></div>
                        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white/70 rounded-full animate-float-2"></div>
                        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-white/80 rounded-full animate-float-3"></div>
                      </div>

                      <img
                        src={industry.image}
                        alt={industry.title}
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-105"
                      />
                      
                      {/* Floating Badge */}
                      <div className="absolute top-6 left-6 z-20 transform transition-all duration-500 group-hover:scale-110">
                        <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${getColorClasses(industry.color)} text-white text-sm font-bold rounded-full shadow-2xl backdrop-blur-sm border border-white/20 hover:shadow-3xl transition-shadow duration-300`}>
                          <Award className="w-4 h-4 mr-2 animate-pulse-soft" />
                          {industry.badge}
                        </div>
                      </div>

                      {/* Highlight Tag */}
                      <div className="absolute bottom-6 left-6 z-20 bg-white/95 backdrop-blur-lg rounded-2xl px-6 py-3 shadow-2xl transform translate-y-20 group-hover:translate-y-0 transition-all duration-700 ease-out border border-white/30">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getColorClasses(industry.color)} animate-pulse`}></div>
                          <TrendingUp className="w-5 h-5 text-gray-700" />
                          <span className="text-gray-800 font-bold">{industry.highlight}</span>
                        </div>
                      </div>

                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                    </div>

                    {/* Content Section */}
                    <div className="relative p-8 md:p-12 group-hover:bg-gradient-to-br group-hover:from-gray-50/50 group-hover:to-white transition-all duration-700">
                      {/* Animated Background Decoration */}
                      <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${getColorClasses(industry.color)} opacity-0 group-hover:opacity-5 rounded-full blur-3xl transition-all duration-1000 animate-spin-slow`}></div>
                      <div className={`absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tl ${getColorClasses(industry.color)} opacity-0 group-hover:opacity-3 rounded-full blur-2xl transition-all duration-1000 delay-200`}></div>
                      
                      <div className="relative z-10">
                        {/* Title with Gradient Hover Effect */}
                        <h3 className="text-4xl font-bold text-gray-900 mb-6 transition-all duration-500 transform group-hover:translate-x-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:via-gray-700 group-hover:to-gray-900 group-hover:bg-clip-text">
                          {industry.title}
                        </h3>

                        {/* Meta Info with Staggered Animation */}
                        <div className="flex flex-wrap gap-4 mb-6">
                          <div className="flex items-center text-gray-600 transform transition-all duration-300 group-hover:translate-x-1 group-hover:text-gray-800">
                            <Calendar className="w-4 h-4 mr-2 group-hover:text-blue-500 transition-colors duration-300" />
                            <span className="text-sm font-medium">Est. {industry.founded}</span>
                          </div>
                          {industry.location && (
                            <div className="flex items-center text-gray-600 transform transition-all duration-300 delay-75 group-hover:translate-x-1 group-hover:text-gray-800">
                              <MapPin className="w-4 h-4 mr-2 group-hover:text-red-500 transition-colors duration-300" />
                              <span className="text-sm font-medium">{industry.location}</span>
                            </div>
                          )}
                          {industry.countries && (
                            <div className="flex items-center text-gray-600 transform transition-all duration-300 delay-100 group-hover:translate-x-1 group-hover:text-gray-800">
                              <Globe className="w-4 h-4 mr-2 group-hover:text-green-500 transition-colors duration-300" />
                              <span className="text-sm font-medium">{industry.countries} Countries</span>
                            </div>
                          )}
                          {industry.brands && (
                            <div className="flex items-center text-gray-600 transform transition-all duration-300 delay-150 group-hover:translate-x-1 group-hover:text-gray-800">
                              <Building2 className="w-4 h-4 mr-2 group-hover:text-purple-500 transition-colors duration-300" />
                              <span className="text-sm font-medium">{industry.brands} Brands</span>
                            </div>
                          )}
                        </div>

                        {/* Description with Reveal Effect */}
                        <div className="overflow-hidden">
                          <p className="text-gray-600 text-lg leading-relaxed mb-8 transform transition-all duration-700 group-hover:text-gray-700 group-hover:translate-x-1">
                            {industry.description}
                          </p>
                        </div>

                        {/* Enhanced CTA Button */}
                        <button className={`group/btn relative inline-flex items-center px-8 py-4 bg-gradient-to-r ${getColorClasses(industry.color)} text-white font-bold rounded-full overflow-hidden transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-95`}>
                          {/* Button Background Effects */}
                          <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                          
                          {/* Ripple Effect */}
                          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-active/btn:opacity-30 group-active/btn:animate-ping"></div>
                          
                          <span className="relative z-10 flex items-center">
                            Explore Partnership
                            <ArrowRight className="ml-3 h-5 w-5 group-hover/btn:translate-x-3 group-hover/btn:scale-110 transition-all duration-300" />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3D Tilt Effect Helper */}
                <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-white/10 via-transparent to-white/5"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-orange-500/10"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 bg-yellow-500/20 backdrop-blur-lg border border-yellow-500/30 rounded-full text-yellow-400 font-medium mb-8">
              <Users className="w-5 h-5 mr-2" />
              Join Our Partner Network
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Transform Your Industry?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Partner with Atharva Enterprises and unlock new possibilities for growth and innovation
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group px-10 py-5 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <span className="flex items-center justify-center">
                  Get Started Today
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </button>
              
              <button className="px-10 py-5 border-2 border-white/30 text-white hover:bg-white/10 font-bold rounded-full transition-all duration-300 backdrop-blur-sm">
                View Our Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-delayed {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          50% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-modern {
          from {
            opacity: 0;
            transform: translateY(80px) rotateX(10deg);
            filter: blur(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
            filter: blur(0px);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.02);
          }
        }

        @keyframes pulse-soft {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes float-1 {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes float-2 {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(360deg);
          }
        }

        @keyframes float-3 {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(270deg);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-fade-in-delayed {
          animation: fade-in-delayed 1.2s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }

        .animate-slide-in-modern {
          animation: slide-in-modern 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.6s ease-out forwards;
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .animate-pulse-soft {
          animation: pulse-soft 2s ease-in-out infinite;
        }

        .animate-float-1 {
          animation: float-1 6s ease-in-out infinite;
        }

        .animate-float-2 {
          animation: float-2 8s ease-in-out infinite;
        }

        .animate-float-3 {
          animation: float-3 7s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .delay-75 {
          animation-delay: 75ms;
        }

        .delay-100 {
          animation-delay: 100ms;
        }

        .delay-150 {
          animation-delay: 150ms;
        }

        .delay-200 {
          animation-delay: 200ms;
        }

        .delay-1000 {
          animation-delay: 1000ms;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }

        /* Enhanced hover effects for cards */
        .industry-card:hover {
          transform: translateY(-12px) rotateX(2deg);
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .industry-card:hover {
            transform: translateY(-8px) rotateX(0deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Industries;