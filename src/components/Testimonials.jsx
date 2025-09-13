import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Emma watson",
      role: "Co-Founder",
      image: "https://cdn.prod.website-files.com/65b9cce908217ff5cd624b00/65bc862cd6b9ad76b0c043cc_testimonial-image-02.png",
      testimonial: "Our partnership with Atharva Enterpriseso has been a key factor in our growth. Their commitment to excellence aligns perfectly with our values, and it reflects in the success."
    },
    {
      id: 2,
      name: "Louis ferguson",
      role: "Web developer",
      image: "https://cdn.prod.website-files.com/65b9cce908217ff5cd624b00/65bc862c887641cbcbbcfe14_testimonial-image-04.png",
      testimonial: "Our passion for customer excellence is just one reason why we are the market leader. We've always worked very hard to give our customers the best experience."
    },
    {
      id: 3,
      name: "Samuel bishop",
      role: "CEO of blogzine",
      image: "https://cdn.prod.website-files.com/65b9cce908217ff5cd624b00/65bc862c49e267ad2b58d858_testimonial-image-01.png",
      testimonial: "Two before narrow not relied on how except moment myself Dejection assurance Mrs led certainly So gate at no only none open Betrayed."
    },
    {
      id: 4,
      name: "Jacqueline miller",
      role: "Director",
      image: "https://cdn.prod.website-files.com/65b9cce908217ff5cd624b00/65bc862cd2fcedb8b2a0a72d_testimonial-image-03.png",
      testimonial: "Was out laughter raptures returned outweigh. Luckily cheered Colonel I do we attack highest enabled. Tried law yet style child. The bore of true of no be deal."
    },
    {
      id: 5,
      name: "Carolyn Ortiz",
      role: "CEO",
      image: "https://cdn.prod.website-files.com/65b9cce908217ff5cd624b00/65fe8249ce9ca62b68f0a7fa_testimonial-image-05.png",
      testimonial: "Had to return an item, and the process was smooth. The team promptly addressed my concerns, and I got a refund without any hassle. I feel secure shopping on this."
    },
    {
      id: 6,
      name: "Lori Stevens",
      role: "Manager",
      image: "https://cdn.prod.website-files.com/65b9cce908217ff5cd624b00/65fe822961e9120bf5429053_testimonial-image-06.png",
      testimonial: "In no impression, assistance contrasted Manners she wishing justice hastily new anxious At discovery discourse departure objection we Few extensive add delighted."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlay, testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container max-w-6xl mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 text-lg">Don't just take our word for it - hear from our satisfied customers</p>
        </div>
        
        {/* Carousel Container */}
        <div 
          className="relative overflow-hidden rounded-2xl bg-white shadow-lg"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          {/* Testimonials Slider */}
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0 p-12">
                <div className="max-w-4xl mx-auto text-center">
                  {/* Quote Icon */}
                  <div className="text-6xl text-blue-200 mb-6">"</div>
                  
                  {/* Testimonial Text */}
                  <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 font-light">
                    {testimonial.testimonial}
                  </blockquote>
                  
                  {/* Customer Info */}
                  <div className="flex items-center justify-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                    />
                    <div className="ml-4 text-left">
                      <h3 className="font-semibold text-lg text-gray-800">{testimonial.name}</h3>
                      <p className="text-yellow-600 font-medium">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 hover:text-blue-600 rounded-full p-3 shadow-lg transition-all duration-200 hover:shadow-xl group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 hover:text-blue-600 rounded-full p-3 shadow-lg transition-all duration-200 hover:shadow-xl group"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
        </div>
        
        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-yellow-600 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Auto-play Toggle */}
        <div className="text-center mt-6">
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="text-sm text-yellow-600 hover:text-yellow-800 transition-colors"
          >
            {isAutoPlay ? 'Pause' : 'Resume'} Auto-play
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;