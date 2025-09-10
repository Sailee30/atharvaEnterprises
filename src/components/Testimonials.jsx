import React from 'react';

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

  return (
    <section className="py-16 bg-white">
      {/* Added max-w-5xl to limit width and add space on sides */}
      <div className="container max-w-5xl mx-auto px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-medium">What Our Customers Say</h2>
        </div>
        
        {/* Adjusted grid layout with more space between cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center mb-3">
                {/* Made avatar slightly smaller */}
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-3">
                  {/* Reduced font size */}
                  <h3 className="font-medium text-base">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              {/* Limited testimonial height with line clamp */}
              <p className="text-gray-700 text-sm line-clamp-4">{testimonial.testimonial}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;