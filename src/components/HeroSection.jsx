import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);
  
  const slides = [
    {
      title: "Power Tools",
      productTitle: "Cordless Electric Drill",
      description: "High-performance cordless drills designed for industrial applications with superior torque and durability.",
      image: img1,
      specs: [
        { label: "Type:", value: "Cordless Drill" },
        { label: "Chuck Capacity:", value: "0-20mm" },
        { label: "Power Output:", value: "600 W" }
      ],
      link: "/category/electronics"
    },
    {
      title: "Cutting Tools",
      productTitle: "Precision Wire Cutter",
      description: "Engineered for clean and accurate cuts, ideal for electrical and industrial installations.",
      image: img2,
      specs: [
        { label: "Type:", value: "Wire Cutter" },
        { label: "Blade Material:", value: "Hardened Steel" },
        { label: "Capacity:", value: "Up to 10mm" }
      ],
      link: "/category/tools/cutting"
    },
    {
      title: "Plumbing Solutions",
      productTitle: "Rotary Pipe Cutter",
      description: "Robust tools for precise pipe cutting, suitable for heavy-duty plumbing tasks.",
      image: img3,
      specs: [
        { label: "Type:", value: "Pipe Cutter" },
        { label: "Pipe Capacity:", value: "3-50mm" },
        { label: "Material:", value: "Stainless Steel" }
      ],
      link: "/category/plumbing"
    },
    {
      title: "Hand Tools",
      productTitle: "Adjustable Wrench Set",
      description: "Versatile wrench set for various industrial applications, designed for reliability and ease of use.",
      image: img4,
      specs: [
        { label: "Type:", value: "Adjustable Wrench" },
        { label: "Size Range:", value: "6-32mm" },
        { label: "Material:", value: "Chrome Vanadium" }
      ],
      link: "/category/tools/hand-tools"
    }
  ];

  // Theme colors for a professional catalog
  const themeColors = {
    primary: '#1E3A8A', // Blue-900
    secondary: '#E5E7EB', // Gray-200
    accent: '#3B82F6', // Blue-500
    dark: '#333333', // Dark gray for text
    darkAlpha: 'rgba(17, 24, 39, 0.8)'
  };

  useEffect(() => {
    startAutoScroll();
    return () => clearInterval(intervalRef.current);
  }, [currentSlide]);
  
  const startAutoScroll = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      handleNext();
    }, 6000);
  };

  const handleNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    
    setTimeout(() => setIsAnimating(false), 750);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    
    setTimeout(() => setIsAnimating(false), 750);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    
    setIsAnimating(true);
    setCurrentSlide(index);
    
    setTimeout(() => setIsAnimating(false), 750);
    startAutoScroll();
  };

  const activeSlide = slides[currentSlide];

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-6"
      style={{
        background: `radial-gradient(circle at 80% 20%, ${themeColors.secondary}55, transparent 40%), 
                    radial-gradient(circle at 20% 80%, ${themeColors.secondary}70, transparent 50%), 
                    white`
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute rounded-full blur-3xl opacity-20"
          initial={{ x: "-20%", y: "-20%" }}
          animate={{ 
            x: "0%", 
            y: "0%",
            backgroundColor: themeColors.primary
          }}
          transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          style={{ width: '45%', height: '45%', top: '15%', left: '10%' }}
        />
        <motion.div 
          className="absolute rounded-full blur-3xl opacity-15"
          initial={{ x: 0.2, y: 0.2 }}
          animate={{ 
            x: 0, 
            y: 0,
            backgroundColor: themeColors.accent
          }}
          transition={{ duration: 3, ease: "easeInOut", delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
          style={{ width: '35%', height: '35%', bottom: 0.15, right: '10%' }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-20">
        <div className="flex justify-center mb-8">
          <motion.div 
            className="relative px-6 py-2 rounded-full bg-white/80 shadow-md"
            style={{ border: `1px solid ${themeColors.secondary}` }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-semibold tracking-widest uppercase" 
                  style={{ color: themeColors.primary }}>
              Industrial Product Catalog
            </span>
          </motion.div>
        </div>
        
        <div className="flex flex-col items-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-center uppercase tracking-tighter mb-12 relative z-0"
            style={{ color: themeColors.dark }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            key={`title-${currentSlide}`}
          >
            {activeSlide.title}
          </motion.h1>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full mx-auto">
            <motion.div 
              className="md:col-span-4 space-y-4"
              key={`info-${currentSlide}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-2xl font-semibold tracking-tight">{activeSlide.productTitle}</h3>
              <p className="text-gray-600 text-base leading-relaxed">{activeSlide.description}</p>
            </motion.div>
            
            <div className="md:col-span-4 flex flex-col items-center justify-center">
              <div className="relative h-80 w-full flex items-center justify-center -mt-12">
                <motion.img
                  key={`image-${currentSlide}`}
                  src={activeSlide.image}
                  alt={activeSlide.productTitle}
                  className="h-80 object-contain relative z-20"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.7 }}
                />
              </div>
              
              <div className="flex items-center justify-center gap-6 mt-8">
                <button 
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full flex items-center justify-center border transition-all hover:shadow-lg"
                  style={{ borderColor: themeColors.primary }}
                >
                  <svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="group-hover:scale-110 transition-transform"
                  >
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                
                <div className="flex gap-3">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`transition-all duration-300 h-2.5 rounded-full ${
                        currentSlide === index ? 'w-8' : 'w-2.5 bg-gray-300'
                      }`}
                      style={{ 
                        backgroundColor: currentSlide === index ? themeColors.primary : undefined
                      }}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full flex items-center justify-center border transition-all hover:shadow-lg"
                  style={{ borderColor: themeColors.primary }}
                >
                  <svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="group-hover:scale-110 transition-transform"
                  >
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <motion.div 
              className="md:col-span-4 space-y-4"
              key={`specs-${currentSlide}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.7 }}
            >
              <div 
                className="rounded-xl p-5 space-y-4 bg-white/90 shadow-sm"
                style={{ border: `1px solid ${themeColors.secondary}` }}
              >
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <span 
                    className="w-2 h-8 rounded-full inline-block"
                    style={{ backgroundColor: themeColors.primary }}
                  ></span>
                  Specifications
                </h3>
                
                {activeSlide.specs.map((spec, index) => (
                  <div key={index} className="flex justify-between pb-3 text-base border-b border-gray-100 last:border-0">
                    <span className="text-gray-500">{spec.label}</span>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
              
              <a 
                href={activeSlide.link}
                className="group flex items-center justify-between w-full p-4 rounded-xl bg-white/90 border shadow-sm transition-all hover:shadow-md"
                style={{ borderColor: themeColors.secondary }}
              >
                <span className="font-semibold text-base">Explore Category</span>
                <span 
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
                  style={{ backgroundColor: themeColors.primary }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full">
        <div className="h-20 bg-gradient-to-t from-gray-50 to-transparent"></div>
        <div className="h-2" style={{ backgroundColor: themeColors.primary, opacity: 0.3 }}></div>
      </div>
    </section>
  );
};

export default HeroSection;