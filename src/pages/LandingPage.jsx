import React, { useEffect, useState } from 'react';
import HeroSection from "../components/HeroSection";
import Products from "../components/Products";
import Facilities from "../components/Facilities";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate page loading for smoother transitions
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section with Slider */}
        <HeroSection />
        {/* New Arrival Products Section */}
        <Products />
        {/* About & Facilities Section */}
        <Facilities />
        {/* Testimonials Section */}
        <Testimonials />
        {/* Call to Action - Sales Section */}
        <CTA />
      </main>

    </div>
  );
};

export default LandingPage;