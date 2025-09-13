import React, { useEffect, useState } from "react";
import { ArrowRight, Users, Globe, Sparkles, Building2, Calendar, MapPin, CheckCircle } from "lucide-react";
import nilfisklogo from "../assets/nilfisk.png";
import ingersollogo from "../assets/ingersol.jpeg"
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
      image: nilfisklogo,
      description: [
        "Global leader in professional cleaning equipment since 1906",
        "Comprehensive range of floor care and vacuum solutions",
        "High-pressure washers for industrial applications",
        "Serving 100+ countries with innovative cleaning technology"
      ],
      badge: "Global Leader",
      founded: "1906",
      countries: "100+",
      highlight: "Danish Innovation",
      color: "emerald"
    },
    {
      id: 2,
      title: "INGERSOLL RAND",
      image: ingersollogo,
      description: [
        "Mission-critical air, fluid, and energy solutions",
        "Premium compressors and power tools",
        "40+ renowned industrial brands under one roof",
        "Serving diverse industries with reliable equipment"
      ],
      badge: "Industrial Pioneer",
      founded: "2020",
      brands: "40+",
      highlight: "Multi-Brand Excellence",
      color: "blue"
    },
    {
      id: 3,
      title: "ARO",
      image: arologo,
      description: [
        "90-year legacy in fluid management systems",
        "Adaptable, Reliable, Outstanding performance",
        "Long operating life with service excellence",
        "Trusted pumps for critical applications"
      ],
      badge: "Quality Excellence",
      founded: "90+ Years",
      specialty: "Fluid Management",
      highlight: "Proven Reliability",
      color: "violet"
    },
    {
      id: 4,
      title: "STANLEY",
      image: stanlylogo,
      description: [
        "Industry-leading tool innovation and quality",
        "Advanced outdoor equipment solutions",
        "Engineered fasteners for professional use",
        "Continuous innovation in tool technology"
      ],
      badge: "Tool Innovation",
      founded: "2010",
      location: "Connecticut, USA",
      highlight: "Innovation Leader",
      color: "amber"
    },
    {
      id: 5,
      title: "TRISTAR",
      image: tristarlogo,
      description: [
        "Explosion-proof cleaning equipment specialist",
        "High-pressure washers for petrochemical facilities",
        "Specialized maintenance tools for oil refining",
        "Safety-first approach in demanding environments"
      ],
      badge: "Safety First",
      founded: "Established Leader",
      specialty: "Petrochemical Solutions",
      highlight: "Safety & Reliability",
      color: "rose"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      emerald: {
        gradient: "from-yellow-500 to-amber-500",
        bg: "bg-yellow-50",
        text: "text-yellow-700",
        border: "border-yellow-200",
        glow: "shadow-yellow-200/50"
      },
      blue: {
        gradient: "from-amber-500 to-yellow-500",
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        glow: "shadow-amber-200/50"
      },
      violet: {
        gradient: "from-yellow-600 to-orange-500",
        bg: "bg-yellow-50",
        text: "text-orange-700",
        border: "border-yellow-200",
        glow: "shadow-yellow-200/50"
      },
      amber: {
        gradient: "from-amber-600 to-yellow-500",
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        glow: "shadow-amber-200/50"
      },
      rose: {
        gradient: "from-orange-500 to-amber-500",
        bg: "bg-orange-50",
        text: "text-orange-700",
        border: "border-orange-200",
        glow: "shadow-orange-200/50"
      }
    };
    return colors[color] || colors.amber;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(251,191,36,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(245,158,11,0.1),transparent_50%)]"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2 text-yellow-300" />
              Trusted Global Partners
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Industries We
              <span className="block bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                Empower
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
              Delivering premium industrial solutions to enhance operational excellence across global markets
            </p>

            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-yellow-300 mb-1">5+</div>
                <div className="text-slate-300 text-sm">Global Partners</div>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-yellow-300 mb-1">100+</div>
                <div className="text-slate-300 text-sm">Countries</div>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-yellow-300 mb-1">50+</div>
                <div className="text-slate-300 text-sm">Industries</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Industries Section */}
      <div className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Our Trusted Partners</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full mx-auto"></div>
          </div>

          <div className="space-y-8">
            {industries.map((industry, index) => (
              <div
                key={industry.id}
                id={`card-${industry.id}`}
                className={`industry-card group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-slate-100 ${
                  isVisible[`card-${industry.id}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="grid md:grid-cols-5 gap-0">
                  {/* Image Section - Clean with no overlays */}
                  <div className="md:col-span-2 relative h-64 md:h-auto overflow-hidden">
                    <img
                      src={industry.image}
                      alt={industry.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="md:col-span-3 p-6">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors duration-300">
                      {industry.title}
                    </h3>

                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center text-slate-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span className="text-sm">Est. {industry.founded}</span>
                      </div>
                      {industry.location && (
                        <div className="flex items-center text-slate-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{industry.location}</span>
                        </div>
                      )}
                      {industry.countries && (
                        <div className="flex items-center text-slate-600">
                          <Globe className="w-4 h-4 mr-1" />
                          <span className="text-sm">{industry.countries} Countries</span>
                        </div>
                      )}
                      {industry.brands && (
                        <div className="flex items-center text-slate-600">
                          <Building2 className="w-4 h-4 mr-1" />
                          <span className="text-sm">{industry.brands} Brands</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      {industry.description.map((point, idx) => (
                        <div key={idx} className="flex items-start">
                          <CheckCircle className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${getColorClasses(industry.color).text}`} />
                          <span className="text-slate-700 text-sm leading-relaxed">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(251,191,36,0.1),transparent_50%)]"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-yellow-500/20 backdrop-blur-md border border-yellow-500/30 rounded-full text-yellow-300 font-medium mb-6">
              <Users className="w-4 h-4 mr-2" />
              Join Our Partner Network
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Ready to Transform Your Industry?
            </h2>
            <p className="text-base text-slate-300 mb-8 max-w-2xl mx-auto">
              Partner with Atharva Enterprises and unlock new possibilities for growth and innovation
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group px-8 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                <span className="flex items-center justify-center">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
              
              <button className="px-8 py-3 border border-white/30 text-white hover:bg-white/10 font-semibold rounded-lg transition-all duration-300 backdrop-blur-sm">
                View Our Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Industries;