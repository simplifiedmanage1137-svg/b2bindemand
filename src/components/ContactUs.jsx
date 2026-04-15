import React, { useState, useEffect } from "react";
import styles from "./styles/SmartSyndication.module.css";
import Footer from "./Footer";
import EBOK_MOCKUP_01 from "../assets/EBOK_MOCKUP_01.svg";
import { motion, AnimatePresence } from "framer-motion";
import EbookPDF from "../assets/pdf/Ebook.pdf";
import emailjs from '@emailjs/browser';
import WorldMap from "../assets/world.svg";
import { BackgroundBeamsWithCollision } from "../components/ui/background-beams";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    message: "",
    source: "",
    agree: false,
  });

  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  useEffect(() => {
    emailjs.init('FWXDgNP6A3TBK3Y55');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, success: false, error: null });

    try {
      // Send email to admin
      const adminEmailResult = await emailjs.send(
        'service_m0cz9oe',
        'template_3iyjdi6',
        {
          user_email: formData.email,
          user_name: formData.name,
          phone: formData.phone,
          budget: formData.budget,
          message: formData.message,
          source: formData.source,
          brand_color: '#FF6B2C',
          primary_color: '#035271'
        },
        'FWXDgNP6A3TBK3Y55'
      );

      // Send confirmation email to customer
      const customerEmailResult = await emailjs.send(
        'service_m0cz9oe',
        'template_clr75s2',
        {
          user_email: formData.email,
          user_name: formData.name,
          brand_color: '#FF6B2C',
          primary_color: '#035271',
          message: 'Thank you for contacting us! We will get back to you shortly.'
        },
        'FWXDgNP6A3TBK3Y55'
      );

      if (adminEmailResult.status === 200 && customerEmailResult.status === 200) {
        setSubmitStatus({
          loading: false,
          success: true,
          error: null
        });
        
        // Clear form
        setFormData({
          name: "",
          email: "",
          phone: "",
          budget: "",
          message: "",
          source: "",
          agree: false,
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Contact Form Error:', error);
      setSubmitStatus({
        loading: false,
        success: false,
        error: error.message || 'Failed to send message. Please try again.'
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [guideFormData, setGuideFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    agree: false,
  });

  const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "India",
    "Japan",
    "Singapore",
    "Other",
  ];

  const handleGuideFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGuideFormData({
      ...guideFormData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleGuideDownload = async (e) => {
    e.preventDefault();
    
    try {
      const link = document.createElement('a');
      link.href = EbookPDF;
      link.download = 'B2BInDemand-Guide.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setShowGuideModal(false);
      setShowThankYouModal(true);

      setTimeout(() => {
        setShowThankYouModal(false);
        setGuideFormData({
          fullName: "",
          email: "",
          phone: "",
          company: "",
          country: "",
          agree: false,
        });
      }, 3000);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Error downloading the guide. Please try again.');
    }
  };

  useEffect(() => {
    if (showGuideModal || showThankYouModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showGuideModal, showThankYouModal]);

  return (
    <div className={`${styles.smartSyndication} overflow-x-hidden`}>
      <BackgroundBeamsWithCollision>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-[5rem] sm:py-20">
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-medium text-[#FF6B2C] mb-6"
        >
          Contact Us
        </motion.h3>

        {/* Main Content Section */}
        <div className="mx-auto px-0 sm:px-4 pt-5">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left Side: Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-1/2 space-y-6 sm:space-y-8 relative z-10"
            >
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6">
                Do More With{" "}
                <motion.span 
                  initial={{ color: "#000" }}
                  animate={{ color: "#FF6B2C" }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  Less
                </motion.span>
              </h1>
              <p className="text-base sm:text-lg text-gray-700 break-words">
                It's time to take back control of your <br className="hidden sm:block" /> pipeline with the{" "}
                <b>right strategy</b> this time.
              </p>

              {/* Contact Information */}
              <div className="space-y-4 sm:space-y-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <p className="text-gray-600">
                    Need some other queries?
                    <a
                      href="mailto:sales@b2bindemand.com"
                      className="block mt-2 text-[#FF6B2C] hover:text-[#E65A1F] transition-colors duration-200"
                    >
                      sales@b2bindemand.com
                    </a>
                  </p>
                  <p className="text-gray-600 mt-4">
                    Looking for a cave? (Don't worry, our badgers are friendly!)
                    <a
                      href="mailto:hr@b2bindemand.com"
                      className="block mt-2 text-[#FF6B2C] hover:text-[#E65A1F] transition-colors duration-200"
                    >
                      hr@b2bindemand.com
                    </a>
                  </p>
                </motion.div>

                {/* World Map with Location Indicator */}
                <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px]">
                  <img 
                    src={WorldMap}
                    alt="World Map"
                    className="w-full h-full object-contain transition-transform duration-300"
                  />
                  {/* Location Indicator */}
                  {/* <div className="pointer-events-none absolute z-[60] flex h-24 sm:h-32 md:h-40 w-48 sm:w-64 md:w-96 items-center justify-center opacity-100 transition duration-500 right-[8%] sm:right-[2%] md:right-[-4%] lg:right-[-1%] top-[25%] sm:top-[20%] md:top-[21%]" style={{ transform: 'translateZ(1px)' }}>
                    <div className="relative h-full w-full">
                
                      <div className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-2 sm:mt-3 md:mt-4 -translate-x-1/2 -translate-y-1/2" style={{ perspective: '800px', transform: 'rotateX(70deg) translateZ(0px)' }}>
                        <div className="absolute left-1/2 top-1/2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-sky-500/[0.08] shadow-[0_4px_4px_sm:0_6px_6px_md:0_8px_10px_rgb(0_0_0/0.4)] dark:bg-sky-500/[0.2] animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                        <div className="absolute left-1/2 top-1/2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-sky-500/[0.08] shadow-[0_4px_4px_sm:0_6px_6px_md:0_8px_10px_rgb(0_0_0/0.4)] dark:bg-sky-500/[0.2] animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]" style={{ animationDelay: '0.3s' }}></div>
                        <div className="absolute left-1/2 top-1/2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-sky-500/[0.08] shadow-[0_4px_4px_sm:0_6px_6px_md:0_8px_10px_rgb(0_0_0/0.4)] dark:bg-sky-500/[0.2] animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]" style={{ animationDelay: '0.6s' }}></div>
                      </div>
                   
                      <div className="absolute bottom-1/2 right-1/2 z-40 h-[2px] w-[2px] sm:h-[3px] sm:w-[3px] md:h-[4px] md:w-[4px] translate-x-[1px] sm:translate-x-[1.25px] md:translate-x-[1.5px] translate-y-[10px] sm:translate-y-[12px] md:translate-y-[14px] rounded-full bg-blue-600 blur-[2px] sm:blur-[2.5px] md:blur-[3px]"></div>
                      <div className="absolute bottom-1/2 right-1/2 z-40 h-[1px] w-[1px] sm:h-[1.5px] sm:w-[1.5px] md:h-[2px] md:w-[2px] translate-x-[0.25px] sm:translate-x-[0.375px] md:translate-x-[0.5px] translate-y-[10px] sm:translate-y-[12px] md:translate-y-[14px] rounded-full bg-blue-300"></div>
                    </div>
                  </div> */}
                </div>
                
              </div>

              {/* Badger Images with Animation */}
              {/* <div className="relative h-48 mt-12 hidden lg:block">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="absolute -right-[-6rem] top-[-14rem] z-0"
                >
                  <img
                    src={Badger_with_sunglasses}
                    alt="Badger"
                    className="w-32 h-32 object-contain transform hover:scale-110 transition-transform duration-300"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                  className="absolute -right-16 top-16"
                >
                  <img
                    src={Badger_with_sunglasses}
                    alt="Badger"
                    className="w-24 h-24 object-contain transform hover:scale-110 transition-transform duration-300"
                  />
                </motion.div>
              </div> */}
            </motion.div>

            {/* Right Side: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full lg:w-1/2"
            >
              <div className="bg-white mt-4 p-4 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-5 max-w-full">
                  {submitStatus.success && (
                    <div className="bg-green-50 text-green-800 p-4 rounded-xl mb-6">
                      Thank you for contacting us! We'll get back to you shortly.
                    </div>
                  )}
                  
                  {submitStatus.error && (
                    <div className="bg-red-50 text-red-800 p-4 rounded-xl mb-6">
                      {submitStatus.error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* Name Field */}
                    <div className="col-span-1">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B2C] focus:border-transparent transition-all duration-200"
                        placeholder="Name *"
                        required
                        disabled={submitStatus.loading}
                      />
                    </div>

                    {/* Business Email Field */}
                    <div className="col-span-1">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B2C] focus:border-transparent transition-all duration-200"
                        placeholder="Business Email *"
                        required
                        disabled={submitStatus.loading}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* Phone Number Field */}
                    <div className="col-span-1">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B2C] focus:border-transparent transition-all duration-200"
                        placeholder="Phone Number *"
                        required
                        disabled={submitStatus.loading}
                      />
                    </div>

                    {/* Budget Field */}
                    <div className="col-span-1">
                      <input
                        type="text"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B2C] focus:border-transparent transition-all duration-200"
                        placeholder="Estimated Budget *"
                        required
                        disabled={submitStatus.loading}
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B2C] focus:border-transparent transition-all duration-200"
                      placeholder="Anything specific you want us to know?"
                      disabled={submitStatus.loading}
                    />
                  </div>

                  {/* Source Field */}
                  <div>
                    <input
                      type="text"
                      name="source"
                      value={formData.source}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B2C] focus:border-transparent transition-all duration-200"
                      placeholder="How did you hear about us?"
                      disabled={submitStatus.loading}
                    />
                  </div>

                  {/* Privacy Policy Checkbox */}
                  <div className="flex items-start space-x-3 py-2">
                    <input
                      type="checkbox"
                      name="agree"
                      checked={formData.agree}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 text-[#FF6B2C] border-gray-300 rounded focus:ring-2 focus:ring-[#FF6B2C] transition-colors duration-200"
                      required
                      disabled={submitStatus.loading}
                    />
                    <label className="text-sm text-gray-600">
                      By submitting this form, you agree to our Privacy Policy *
                    </label>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full bg-gradient-to-r from-[#FF9B04] to-[#FF6B2C] text-white px-6 py-3.5 rounded-xl font-medium hover:shadow-lg transition-all duration-200 ${
                      submitStatus.loading || !formData.agree ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                    disabled={submitStatus.loading || !formData.agree}
                  >
                    {submitStatus.loading ? 'Submitting...' : 'Let\'s Connect'}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Curved Bottom Section */}
      <div className="relative bg-[#cfd4d7] pt-16 pb-32 overflow-hidden">
        {/* Curved Bottom (Full Width) */}
        <div 
  className="absolute bottom-0 left-0 w-full h-32 bg-white rounded-t-full translate-y-1/2"
/>


        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Left Side - Text Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2 space-y-6 text-center md:text-left"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Get the best out of our services...
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                The exact work processes and strategies we follow, now exclusively available for you!
              </p>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-[#FF9B04] to-[#FF6B2C] text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-200"
                onClick={() => setShowGuideModal(true)}
              >
                Get My Guide!
              </motion.button>
            </motion.div>

            {/* Right Side - Image */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:w-1/2 mt-8 md:mt-0"
            >
              <img
                src={EBOK_MOCKUP_01}
                alt="Services Guide"
                className="w-full h-auto object-contain transform hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          </div>
        </div>
      </div>
      </BackgroundBeamsWithCollision>
      {/* Guide Download Modal */}
      <AnimatePresence>
        {showGuideModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setShowGuideModal(false)}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center z-50 px-4"
              style={{ pointerEvents: "none" }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
                style={{ pointerEvents: "auto" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 sm:p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Download Your Free Guide
                    </h3>
                    <button
                      onClick={() => setShowGuideModal(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <form onSubmit={handleGuideDownload} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        name="fullName"
                        value={guideFormData.fullName}
                        onChange={handleGuideFormChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B2C] focus:border-transparent transition-all duration-200"
                        placeholder="Full Name *"
                        required
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        name="email"
                        value={guideFormData.email}
                        onChange={handleGuideFormChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B2C] focus:border-transparent transition-all duration-200"
                        placeholder="Email *"
                        required
                      />
                    </div>

                    <div>
                      <input
                        type="tel"
                        name="phone"
                        value={guideFormData.phone}
                        onChange={handleGuideFormChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B2C] focus:border-transparent transition-all duration-200"
                        placeholder="Phone Number *"
                        required
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="company"
                        value={guideFormData.company}
                        onChange={handleGuideFormChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B2C] focus:border-transparent transition-all duration-200"
                        placeholder="Company Name *"
                        required
                      />
                    </div>

                    <div>
                      <select
                        name="country"
                        value={guideFormData.country}
                        onChange={handleGuideFormChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B2C] focus:border-transparent transition-all duration-200 bg-white"
                        required
                      >
                        <option value="">Select Country *</option>
                        {countries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="agree"
                        checked={guideFormData.agree}
                        onChange={handleGuideFormChange}
                        className="mt-1 w-4 h-4 text-[#FF6B2C] border-gray-300 rounded focus:ring-[#FF6B2C] transition-colors duration-200"
                        required
                      />
                      <label className="text-sm text-gray-600">
                        I agree to receive updates and marketing communications from B2BInDemand *
                      </label>
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-[#FF9B04] to-[#FF6B2C] text-white px-6 py-3.5 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
                    >
                      Download Guide
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Thank You Modal */}
      <AnimatePresence>
        {showThankYouModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setShowThankYouModal(false)}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center z-50 px-4"
              style={{ pointerEvents: "none" }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 text-center"
                style={{ pointerEvents: "auto" }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-16 h-16 mx-auto mb-4 text-[#FF6B2C]"
                >
                  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-600 mb-6">
                  Your guide is being downloaded. We've sent a copy to your email as well.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowThankYouModal(false)}
                  className="bg-gradient-to-r from-[#FF9B04] to-[#FF6B2C] text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
                >
                  Close
                </motion.button>
              </motion.div>
            </motion.div>
            
          </>
          
        )}
        <Footer />
      </AnimatePresence>

      
    </div>
  );
};

export default ContactUs;
