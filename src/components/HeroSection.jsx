import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react"; // For navigation arrows
import img1 from "../assets/herosec.jpeg";
import img2 from "../assets/herosecc.jpeg";
import img3 from "../assets/heroseccc.jpeg";
import img4 from "../assets/herosecccc.jpeg";

const HeroSection = () => {
  const slides = [
    {
      title: "Industrial Excellence",
      description: "Delivering innovative solutions for modern industries.",
      image: img1,
    },
    {
      title: "Reliable Partnerships",
      description: "Building long-term trust with global leaders.",
      image: img2,
    },
    {
      title: "Cutting-Edge Technology",
      description: "Empowering growth with advanced engineering.",
      image: img3,
    },
    {
      title: "Sustainable Future",
      description: "Driving efficiency while caring for the planet.",
      image: img4,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0); // for slide animation

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Animation variants
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
    exit: (dir) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: { duration: 1, ease: "easeInOut" },
    }),
  };

  return (
    <section className="relative min-h-[100vh] w-full overflow-hidden">
      {/* Slides */}
      <div className="relative w-full h-screen">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.img
            key={currentSlide}
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/20"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 z-20">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              {slides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev / Next Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full"
      >
        <ChevronRight size={28} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-10 w-full flex justify-center gap-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-white scale-125"
                : "bg-gray-500 hover:bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
