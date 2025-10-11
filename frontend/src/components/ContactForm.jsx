import React, { useState } from 'react';
import { Mail, Phone, Send } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-6 py-20 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-yellow-500 rounded-2xl mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-6xl font-bold text-slate-800 mb-6">
            Contact Us
          </h1>
          <p className="text-slate-600 text-xl leading-relaxed max-w-2xl mx-auto">
            Have questions or need assistance? Our team is here to help! Please feel free to reach out to us for 
            expert guidance, support, or questions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200">
            <div className="space-y-6">
              {/* Name Field */}
              <div className="group">
                <label htmlFor="name" className="block text-slate-700 font-semibold mb-3 text-sm uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-all duration-300 placeholder:text-slate-400 text-slate-700"
                />
              </div>

              {/* Email Field */}
              <div className="group">
                <label htmlFor="email" className="block text-slate-700 font-semibold mb-3 text-sm uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-5 py-4 pr-14 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-all duration-300 placeholder:text-slate-400 text-slate-700"
                  />
                  
                </div>
              </div>

              {/* Phone Field */}
              <div className="group">
                <label htmlFor="phone" className="block text-slate-700 font-semibold mb-3 text-sm uppercase tracking-wider">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                  className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-all duration-300 placeholder:text-slate-400 text-slate-700"
                />
              </div>

              {/* Message Field */}
              <div className="group">
                <label htmlFor="message" className="block text-slate-700 font-semibold mb-3 text-sm uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us more about how we can help you..."
                  rows="5"
                  required
                  className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-xl resize-none focus:outline-none focus:border-yellow-500 transition-all duration-300 placeholder:text-slate-400 text-slate-700"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 text-lg">Email Us</h3>
                    {/* <-- Changed to mailto link --> */}
                    <a
                      href="mailto:atharvaenterprises9999@gmail.com"
                      className="text-slate-600 hover:text-yellow-600 transition-colors"
                    >
                      atharvaenterprises9999<br/>@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 text-lg">Call Us</h3>
                    {/* <-- Changed to tel link --> */}
                    <a
                      href="tel:+919175930939"
                      className="text-slate-600 hover:text-yellow-600 transition-colors"
                    >
                      +91 9175930939
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info Card */}
            <div className="bg-slate-800 rounded-3xl p-8 text-white shadow-2xl">
              <h3 className="text-xl font-bold mb-4">Why Choose Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Expert technical support</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Fast response times</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Quality industrial solutions</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Trusted since 2017</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
