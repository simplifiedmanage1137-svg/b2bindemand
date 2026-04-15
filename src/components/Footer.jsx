import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BackgroundBeamsWithCollision } from "./ui/background-beams";
import logo from "../assets/Frame 1000001911 1.svg";
import ISOCertified from "../assets/ISO-Certified.svg";
import DunAndBradstreet from "../assets/Dun_&_Bradstreet_Verified.svg";
import React, { useState, useEffect } from "react";
import Union from "../assets/Icon/Union.svg";
import LinkedIn from "../assets/social_icon/LinkedIn.png";
import Facebook from "../assets/social_icon/Facebook.png";
import Twitter from "../assets/social_icon/Twitter.png";
import YouTube from "../assets/social_icon/YouTube.png";
import emailjs from '@emailjs/browser';
import ChatbotComponent from './chatbot/ChatbotComponent';

const Footer = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init('FWXDgNP6A3TBK3Y55');

    // Load any existing subscribers
    const loadSubscribers = () => {
      try {
        return JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
      } catch (error) {
        console.error('Error loading subscribers:', error);
        return [];
      }
    };
    loadSubscribers();
  }, []);

  const sendEmails = async (subscriberEmail) => {
    try {
      // Send welcome email to subscriber
      const subscriberResult = await emailjs.send(
        'service_m0cz9oe',
        'template_clr75s2',
        {
          user_email: subscriberEmail,
          user_name: subscriberEmail.split('@')[0],
          brand_color: '#FF6B2C',
          primary_color: '#035271',
          message: 'Thank you for subscribing to our newsletter!',
          background_color: 'rgba(255, 255, 255, 0.9)',
          shadow: '0 2px 4px rgba(0,0,0,0.1)'
        },
        'FWXDgNP6A3TBK3Y55'
      );

      // Send notification to admin
      const adminResult = await emailjs.send(
        'service_m0cz9oe',
        'template_3iyjdi6',
        {
          user_email: subscriberEmail,
          brand_color: '#FF6B2C',
          primary_color: '#035271',
          message: 'New newsletter subscription',
          background_color: 'rgba(255, 255, 255, 0.9)',
          shadow: '0 2px 4px rgba(0,0,0,0.1)'
        },
        'FWXDgNP6A3TBK3Y55'
      );

      return { subscriberResult, adminResult };
    } catch (error) {
      console.error('EmailJS Error:', error);
      throw new Error(error.text || error.message || 'Failed to send subscription emails');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate email
      if (!email || !email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
      if (subscribers.includes(email)) {
        throw new Error('This email is already subscribed to our newsletter!');
      }

      // Send emails
      await sendEmails(email);

      // Save to localStorage only after successful email sending
      subscribers.push(email);
      localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));

      // Show success state with brand orange color
      setSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error('Submission Error:', error);
      setError(error.message || 'Failed to subscribe. Please try again.');
      setSubmitted(false);
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://in.linkedin.com/company/b2b-indemand-pl",
      image: LinkedIn,
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/b2bindemandpune",
      image: Facebook,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/b2bindemand?lang=en",
      image: Twitter,
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@B2BinDemand728",
      image: YouTube,
    },
  ];

  return (
    <BackgroundBeamsWithCollision>
      <footer className="relative bg-gradient-to-b from-white to-gray-50 text-gray-800 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center mb-6">
                <img src={logo} alt="B2BInDemand Logo" className="h-10" />
              </Link>
              <div className="space-y-2 text-sm">
                <p className="hover:text-[#005F73] ">
                  <a href="tel:+13252677472">+1 325-267-7472</a>
                </p>
                <p className="hover:text-[#005F73] ">
                  <a href="tel:+13029669297">+1 302-966-9297</a>
                </p>
                <p className="hover:text-[#005F73] ">
                  <a href="mailto:sales@b2bindemand.com">sales@b2bindemand.com</a>
                </p>
                <div className="pt-2">
                  <p className="hover:text-[#005F73] ">
                    Wilmington, Delaware, US
                  </p>
                  <p className="hover:text-[#005F73] ">
                    Pune, India
                  </p>
                  <p className="hover:text-[#005F73] ">
                    Ahmedabad, India
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <img src={ISOCertified} alt="ISO Certified" className="h-12" />
              </div>
              <div className="flex items-center gap-4 pt-4">
                <img
                  src={DunAndBradstreet}
                  alt="Dun & Bradstreet Verified"
                  className="h-12"
                />
              </div>
            </div>

            {/* Main Navigation Sections */}
            <div className="lg:col-span-3 grid grid-cols-1  lg:grid-cols-3 gap-8 pt-3">
              {/* First Row */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Solutions</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link to="/campaigns" className="hover:text-[#005F73]">
                      Campaigns+
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/event-based-lead-generation"
                      className="hover:text-[#005F73]"
                    >
                      Event-Based Lead Generation
                    </Link>
                  </li>
                  <li>
                    <Link to="/intent-targeting" className="hover:text-[#005F73]">
                      Intent Targeting
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/smart-syndication"
                      className="hover:text-[#005F73]"
                    >
                      Smart Syndication
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/about-b2bindemand"
                      className="text-sm hover:text-[#005F73]"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/b2bindemand-careers"
                      className="text-sm hover:text-[#005F73]"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/faqs"
                      className="text-sm hover:text-[#005F73]"
                    >
                      FAQs
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link to="/blog" className="hover:text-[#005F73]">
                      Blogs
                    </Link>
                  </li>
                  <li>
                    <Link to="/Resources/Library" className="hover:text-[#005F73]">
                    Library
                    </Link>
                  </li>
                 
                  <li>
                    {/* <Link
                    to="/webinars/podcasts"
                    className="hover:text-[#005F73]"
                  >
                    Webinars/Podcasts
                  </Link> */}
                  </li>
                  {/* <li>
                  <Link to="/whitepapers" className="hover:text-[#005F73]">
                    Whitepapers/E-books
                  </Link>
                </li> */}
                </ul>
              </div>

              {/* Second Row */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Publication Sites </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://b2bconnecthub.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#005F73] flex items-center space-x-1"
                    >
                      <span>B2B Connect Hub</span>
                      <img
                        src={Union}
                        alt="B2B Connect Hub"
                        className="w-3 h-3"
                      />
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://siliconmedianetwork.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#005F73] flex items-center space-x-1"
                    >
                      <span>Silicon Media Network</span>
                      <img
                        src={Union}
                        alt="Silicon Media Network"
                        className="w-3 h-3"
                      />
                    </a>
                  </li>
                  {/* <li>
                  <a
                    href="https://ContentSyndication.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#005F73] flex items-center space-x-1"
                  >
                    <span>ContentSyndication.ai</span>
                    <img
                      src={Union}
                      alt="ContentSyndication.ai"
                      className="w-3 h-3"
                    />
                  </a>
                </li> */}
                </ul>
              </div>
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold mb-4 sm:mb-6">
                  Subscribe to our Newsletter:
                </h3>
                <div className="w-full max-w-[500px] px-4 sm:px-0">
                  {error && !submitted && (
                    <div className="bg-red-50 bg-opacity-90 backdrop-blur-sm rounded-lg p-4 mb-4 animate-fade-in shadow-md">
                      <p className="text-red-500 text-sm">{error}</p>
                    </div>
                  )}
                  {submitted ? (
                    <div className="bg-green-50 bg-opacity-90 backdrop-blur-sm rounded-lg p-4 sm:p-5 animate-fade-in shadow-md">
                      <p className="text-[#FF6B2C] font-medium text-sm sm:text-base flex items-center">
                        <svg className="w-5 h-5 mr-2 text-[#FF6B2C] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Thank you for subscribing!
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-0">
                      <div className="relative flex-1">
                        <label htmlFor="footer-email" className="sr-only">Email address</label>
                        <input
                          type="email"
                          id="footer-email"
                          name="email"
                          className="w-full px-4 py-3 rounded-lg sm:rounded-r-none border border-[#035271] focus:outline-none focus:ring-2 focus:ring-[#035271] focus:border-transparent transition-all duration-200 text-sm sm:text-base placeholder-gray-400"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full sm:w-auto min-w-[120px] bg-[#035271] text-white px-6 py-3 rounded-lg sm:rounded-l-none sm:border-l-0 hover:bg-[#E65A1F] focus:outline-none focus:ring-2 focus:ring-[#035271] focus:ring-offset-2 transition-all duration-200 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
                        disabled={!email || loading}
                      >
                        {loading ? (
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <>
                            <span>Subscribe</span>
                            <svg className="w-4 h-4 ml-2 -mr-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Chatbot */}
          {/* <ChatbotComponent /> */}

          {/* Social Media Links */}
          <AnimatePresence>
            {isVisible && (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className="fixed right-4 bottom-16 z-50 "
              >
                <motion.button
                  onClick={() => setIsOpen(!isOpen)}
                  className="bg-[#005F73] hover:bg-[#E65A1F] text-white p-4 rounded-full shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                    />
                  </svg>
                </motion.button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 20 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-2 space-y-4"
                    >
                      {socialLinks.map((social, index) => (
                        <motion.a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-gray-600 hover:text-[#005F73] transition-colors duration-200"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.1, x: -5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <img src={social.image} alt={social.name} className="w-8 h-8" />
                        </motion.a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Section */}
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row  justify-between items-center">
            <div className="flex items-center justify-center gap-2">
              <Link to="/privacy-policy" className="text-sm hover:text-[#005F73]">
                Privacy Policy
              </Link>
              <span className="text-sm text-gray-500 h-full flex items-center">|</span>
              <Link to="/unsubscribe" className="text-sm hover:text-[#005F73]">
                Unsubscribe
              </Link>
            </div>

            <div className="text-sm mt-4 md:mt-0  text-gray-500">
              &copy; Copyright 2025 B2BInDemand. All Rights Reserved.
            </div>
          </div>
        </div>

        {/* Background Beams Effect */}
        <BackgroundBeamsWithCollision
          className="absolute top-0 left-0 w-full h-full z-0"
          beamColor1="#FF6B2C"
          beamColor2="#035271"
          beamOpacity={0.1}
        />

        {/* Semi-transparent overlay with blur */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-[1]" />
      </footer>
    </BackgroundBeamsWithCollision>
  );
};

export default Footer;
