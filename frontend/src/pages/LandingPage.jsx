import React, { useEffect, useState } from 'react';
import AtharvaLandingPage from "../components/AtharvaLandingPage";  
import Facilities from "../components/Facilities";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow space-y-16">
        <AtharvaLandingPage />  
        <Facilities />
        <Testimonials />
        <CTA />
      </main>
    </div>
  );
};

export default LandingPage;
