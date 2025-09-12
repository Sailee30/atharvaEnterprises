import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "../assets/herosec.jpeg";
import img2 from "../assets/herosecc.jpeg";
import img3 from "../assets/heroseccc.jpeg";
import img4 from "../assets/herosecccc.jpeg";

const HeroSection = () => {
  const slides = [
    {
      title: "",
      description: "",
      image: img1,
    },
    {
      title: "",
      description: "",
      image: img2,
    },
    {
      title: "",
      description: "",
      image: img3,
    },
    {
      title: "",
      description: "",
      image: img4,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden mt-10">
      {/* Background Image Transition */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentSlide}
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/20"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white min-h-screen px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
              {slides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              {slides[currentSlide].description}
            </p>
            
          </motion.div>
        </AnimatePresence>

        {/* Indicators */}
        <div className="absolute bottom-10 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 w-3 rounded-full transition-all ${
                currentSlide === index ? "bg-white scale-110" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
