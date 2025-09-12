import React from 'react';
import LogosCarousel from '../components/LogosCarousel';

// Theme colors to match other components
const themeColors = {
  primary: '#FBBF24', // Yellow-400
  secondary: '#FEF3C7', // Yellow-100
  accent: '#F59E0B', // Yellow-500
  dark: '#111827' // Gray-900
};

const AboutUs = () => {
  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'Rakesh varane',
      position: 'Founder & CEO',
      bio: 'With over 25 years of experience in industrial equipment, Rakesh founded Atharva Enterprises with a vision to provide quality solutions to businesses across India.',
    },
    {
      id: 2,
      name: 'Ketaki Varane',
      position: 'Technical Director',
      bio: 'Ketaki brings 15+ years of technical expertise, ensuring our clients receive the most suitable equipment solutions tailored to their specific requirements.',
    },
    {
      id: 3,
      name: 'Vijay Chorghe',
      position: 'Sales Manager',
      bio: 'Vijay leads our sales team with a customer-first approach, focusing on building long-term relationships rather than just closing deals.',
    },
    {
      id: 4,
      name: 'Mahadev Chorghe',
      position: 'Customer Support Lead',
      bio: 'Mahadev ensures our clients receive prompt and effective support, heading our dedicated after-sales service department.',
    }
  ];

  // Company milestones
  const milestones = [
    {
      year: '2001',
      title: 'Company Founded',
      description: 'Atharva Enterprises was established as a small dealership for cleaning equipment.'
    },
    {
      year: '2008',
      title: 'Expansion of Product Range',
      description: 'Expanded our portfolio to include industrial machinery and specialized equipment.'
    },
    {
      year: '2013',
      title: 'National Presence',
      description: 'Opened regional offices across major cities in India, establishing a nationwide network.'
    },
    {
      year: '2017',
      title: 'Service Excellence Award',
      description: 'Received industry recognition for outstanding customer service and technical support.'
    },
    {
      year: '2022',
      title: 'Tech Integration',
      description: 'Launched digital solutions for equipment monitoring and maintenance scheduling.'
    }
  ];

  // Client testimonials
  const testimonials = [
    {
      id: 1,
      content: 'Atharva Enterprises has been our trusted partner for over a decade. Their equipment recommendations have significantly improved our operational efficiency.',
      author: 'TATA Group',
      company: 'TATA Group Ltd.'
    },
    {
      id: 2,
      content: "The technical expertise and after-sales support provided by the Atharva team is exceptional. They don't just sell equipment; they provide complete solutions.",
      author: 'Mahindra and Mahindra',
      company: 'Mahindra and Mahindra'
    },
    {
      id: 3,
      content: 'Working with Atharva Enterprises has streamlined our procurement process. They understand our needs and consistently deliver quality equipment on time.',
      author: 'Dana India',
      company: 'Dana India'
    },
     {
      id: 4,
      content: 'Working with Atharva Enterprises has streamlined our procurement process. They understand our needs and consistently deliver quality equipment on time.',
      author: 'Horiba',
      company: 'Horiba'
    },
      {
      id: 5,
      content: 'Working with Atharva Enterprises has streamlined our procurement process. They understand our needs and consistently deliver quality equipment on time.',
      author: 'Hyundai',
      company: 'Hyundai'
    },
      {
      id: 6,
      content: 'Working with Atharva Enterprises has streamlined our procurement process. They understand our needs and consistently deliver quality equipment on time.',
      author: 'TATA Toyo radiator',
      company: 'TATA Toyo radiator'
    },
      {
      id: 7,
      content: 'Working with Atharva Enterprises has streamlined our procurement process. They understand our needs and consistently deliver quality equipment on time.',
      author: 'Magna Cosmo',
      company: 'Magna Cosmo'
    },
      {
      id: 8,
      content: 'Working with Atharva Enterprises has streamlined our procurement process. They understand our needs and consistently deliver quality equipment on time.',
      author: 'Taco Punch Powetrain',
      company: 'Taco Punch Powetrain'
    },
      {
      id: 9,
      content: 'Working with Atharva Enterprises has streamlined our procurement process. They understand our needs and consistently deliver quality equipment on time.',
      author: 'TATA Autocomp Gotion',
      company: 'TATA Autocomp Gotion'
    },
      {
      id: 10,
      content: 'Working with Atharva Enterprises has streamlined our procurement process. They understand our needs and consistently deliver quality equipment on time.',
      author: 'Faith Automation',
      company: 'Faith Automation'
    },
      {
      id: 11,
      content: 'Working with Atharva Enterprises has streamlined our procurement process. They understand our needs and consistently deliver quality equipment on time.',
      author: 'Vinus Automation',
      company: 'Vinus Automation'
    },
      {
      id: 12,
      content: 'Working with Atharva Enterprises has streamlined our procurement process. They understand our needs and consistently deliver quality equipment on time.',
      author: 'Bharat Forge',
      company: 'Bharat Forge'
    },
      {
      id: 13,
      content: 'Working with Atharva Enterprises has streamlined our procurement process. They understand our needs and consistently deliver quality equipment on time.',
      author: 'Kalyani Technoforge',
      company: 'Kalyani Technoforge'
    },
      {
      id: 14,
      content: 'Working with Atharva Enterprises has streamlined our procurement process. They understand our needs and consistently deliver quality equipment on time.',
      author: 'Kalyani strategic',
      company: 'Kalyani strategic'
    } 

  ];

  return (
    <div className="min-h-screen relative overflow-hidden"
         style={{
           background: `radial-gradient(circle at 90% 10%, ${themeColors.secondary}40, transparent 30%),
                       radial-gradient(circle at 10% 90%, ${themeColors.secondary}40, transparent 30%),
                       white`
         }}>
      {/* Decorative background elements */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-10" 
           style={{ backgroundColor: themeColors.primary }}></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full opacity-10" 
           style={{ backgroundColor: themeColors.accent }}></div>
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative z-10">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block relative mb-3">
              <span className="inline-block px-4 py-1 rounded-full text-xs font-medium tracking-wide" 
                    style={{ backgroundColor: themeColors.secondary, color: themeColors.accent }}>
                ABOUT US
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-medium mb-6 tracking-tight">Your Trusted Equipment Partner</h1>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Atharva Enterprises is a premier dealership of industrial equipment, dedicated to providing high-quality solutions to businesses across diverse sectors.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2 relative">
              <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/api/placeholder/800/450" 
                  alt="Atharva Enterprises Headquarters" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-lg transform rotate-6"
                   style={{ backgroundColor: themeColors.primary }}></div>
              <div className="absolute -top-6 -left-6 w-16 h-16 rounded-lg transform -rotate-12"
                   style={{ backgroundColor: themeColors.accent, opacity: 0.7 }}></div>
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-2xl font-medium mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2001, Atharva Enterprises has grown from a small trading company into a trusted provider of industrial solutions across India.

Partnering with leading global brands, we deliver a wide range of products including industrial cleaning machines, assembly tools, material handling equipment, automation systems, fluid management, and calibration services.

Guided by our focus on Quality, Cost, and Delivery, we continue to support industries such as automotive, engineering, and manufacturing, helping businesses achieve efficiency and long-term success.
              </p>
              <p className="text-gray-600 mb-4">
                Today, we are proud to represent leading global manufacturers, offering a wide range of industrial equipment including cleaning machines, material handling equipment, construction machinery, and more.
              </p>
              <p className="text-gray-700 font-medium">
                Our commitment to quality, technical expertise, and exceptional customer service has made us the preferred partner for businesses looking to optimize their operations with reliable equipment.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission & Values Section */}
      <section className="py-16 relative z-10 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium mb-3">Our Mission & Values</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              At Atharva Enterprises, our guiding principles shape every aspect of our business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center"
                   style={{ backgroundColor: themeColors.secondary }}>
                <svg className="w-6 h-6" style={{ color: themeColors.accent }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.168 1.168a4 4 0 00-2.278.592l-.29.196V7.828a3 3 0 00-.879-2.12L9 4.172zM8 8.172V4h2v4.172a3 3 0 00.879 2.12l1.168 1.168a4 4 0 00-2.278.592l-.29.196V7.828a3 3 0 00-.879-2.12L8 4.172z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Quality First</h3>
              <p className="text-gray-600">
                We are committed to providing only the highest quality equipment that meets international standards and exceeds client expectations for performance and durability.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center"
                   style={{ backgroundColor: themeColors.secondary }}>
                <svg className="w-6 h-6" style={{ color: themeColors.accent }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Customer Partnership</h3>
              <p className="text-gray-600">
                We believe in building lasting relationships with our clients by understanding their unique needs and providing tailored solutions that drive their business success.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center"
                   style={{ backgroundColor: themeColors.secondary }}>
                <svg className="w-6 h-6" style={{ color: themeColors.accent }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Technical Excellence</h3>
              <p className="text-gray-600">
                Our team of technical experts ensures that every client receives the best technical advice, installation support, and after-sales service for optimal equipment performance.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Company Milestones */}
      <section className="py-16 relative z-10">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium mb-3">Our Journey</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Explore the key milestones that have shaped Atharva Enterprises into the company it is today.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>
            
            {/* Timeline items */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-1/2 px-6"></div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-4 border-white shadow-md"
                         style={{ backgroundColor: themeColors.primary }}></div>
                  </div>
                  
                  <div className="w-1/2 px-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                      <div className="inline-block px-3 py-1 rounded text-sm font-medium mb-2"
                           style={{ backgroundColor: themeColors.secondary, color: themeColors.accent }}>
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-medium mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 relative z-10 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium mb-3">Meet Our Team</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our dedicated team of professionals combines industry expertise with a passion for customer satisfaction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="group">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-square relative overflow-hidden">
                    <img 
                      src={member.image || "/api/placeholder/300/300"} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex gap-3 justify-center">
                        <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-gray-100">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                        <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-gray-100">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                          </svg>
                        </a>
                        <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-gray-100">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 text-center">
                    <h3 className="font-medium text-lg mb-1">{member.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{member.position}</p>
                    <p className="text-sm text-gray-600">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
            {/* Testimonials Section - UPDATED TO HORIZONTAL SCROLL */}
            <section className="py-16 relative z-10">
           <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12">
            <h2 className="text-3xl font-medium mb-3">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Hear from the businesses that have partnered with Atharva Enterprises.
            </p>
           </div>
          
           {/* Horizontal Scrolling Container */}
           <div className="relative">
            {/* Scroll Container */}
            <div className="overflow-x-auto pb-4 scrollbar-hide">
              <div className="flex gap-6 w-max">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 relative w-80 flex-shrink-0">
                    {/* Quote mark decoration */}
                    <div className="absolute top-4 right-4 opacity-10">
                      <svg className="w-16 h-16" style={{ color: themeColors.primary }} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    
                    <div className="mb-4">
                      {/* 5 star rating */}
                      <div className="flex mb-3">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5" style={{ color: themeColors.accent }} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      
                      <p className="text-gray-600 italic mb-6 leading-relaxed">"{testimonial.content}"</p>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                        <span className="text-gray-700 font-medium text-lg">{testimonial.author.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="font-medium">{testimonial.author}</h4>
                        <p className="text-sm text-gray-500">{testimonial.company}</p>
                      </div>
                    </div>
                    
                  </div>
                  
                ))}
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="flex justify-center mt-4">
              <p className="text-sm text-gray-500">← Scroll horizontally to see more testimonials →</p>
            </div>
          </div>
         </div>
          </section>
          <LogosCarousel />

           {/* Custom Scrollbar Styles */}
           <style jsx>{`
          .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
          display: none;
         }
        
         /* Custom scrollbar for better UX on desktop */
         @media (min-width: 768px) {
          .scrollbar-hide {
            scrollbar-width: thin;
            scrollbar-color: #cbd5e1 #f8fafc;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: block;
            height: 8px;
          }
          .scrollbar-hide::-webkit-scrollbar-track {
            background: #f8fafc;
            border-radius: 4px;
          }
          .scrollbar-hide::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
          }
          .scrollbar-hide::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutUs;