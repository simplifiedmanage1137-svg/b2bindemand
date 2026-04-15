import React, { useEffect, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import healthy_recognition from "../assets/Icon/healthy_recognition.svg";
import badgerimg from "../assets/Badger with sunglasses 1.svg";
import ellipseImg from "../assets/Ellipse 10.svg";
import rectangleImg from "../assets/Rectangle 30.svg";
import Footer from "../components/Footer";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { CardSpotlight } from "../components/ui/CardSpotlight";
import arrowIcon from "../assets/with_us_arrow.svg";
import mapIcon from "../assets/Icon/map_icon.svg";
import { ResourcesSection } from "../components/ui/resources-section";
import TestimonialPic from "../assets/TestimonialPic/TestimonialPic.png";
import TestimonialPic2 from "../assets/TestimonialPic/TestimonialPic2.webp";
import TestimonialPic3 from "../assets/TestimonialPic/TestimonialPic3.webp";
import { Link } from "react-router-dom";
import levelimg from "../assets/Icon/level.svg";
import Thinking_Face from "../assets/Icon/Thinking_Face.svg";
import Raising_Hands from "../assets/Icon/Raising_Hands.svg";
import Now from "../assets/Icon/Now.svg";
import MediaKitPDF from "../assets/pdf/B2BinDemand_Master_Media_2025.pdf";
import emailjs from '@emailjs/browser';
import { BackgroundBeamsWithCollision } from "../components/ui/background-beams";
import { Helmet } from 'react-helmet';
import { seoConfig } from '../utils/seoConfig';

const Home = () => {
  const { title, description, keywords, ogImage } = seoConfig.home;

  const [showMediaKitModal, setShowMediaKitModal] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [mediaKitFormData, setMediaKitFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    country: "",
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Mobile screen detection
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const countries = [
    "United States", "United Kingdom", "Canada", "Australia",
    "Germany", "France", "India", "Japan", "Singapore", "Other"
  ];

  const [formState, setFormState] = useState({
    isSubmitting: false,
    errors: {},
  });

  const validateForm = () => {
    const errors = {};
    if (!mediaKitFormData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    if (!mediaKitFormData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(mediaKitFormData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!mediaKitFormData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    }
    if (!mediaKitFormData.companyName.trim()) {
      errors.companyName = 'Company name is required';
    }
    if (!mediaKitFormData.country) {
      errors.country = 'Country is required';
    }
    return errors;
  };

  const handleMediaKitFormChange = (e) => {
    const { name, value } = e.target;
    setMediaKitFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (formState.errors[name]) {
      setFormState(prev => ({
        ...prev,
        errors: {
          ...prev.errors,
          [name]: ''
        }
      }));
    }
  };

  useEffect(() => {
    emailjs.init('FWXDgNP6A3TBK3Y55');
  }, []);

  const handleMediaKitDownload = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormState(prev => ({ ...prev, errors }));

    if (Object.keys(errors).length === 0) {
      setFormState(prev => ({ ...prev, isSubmitting: true }));
      try {
        // Download MediaKit
        const link = document.createElement('a');
        link.href = MediaKitPDF;
        link.download = 'B2BinDemand-MediaKit-2025.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Send welcome email to user with MediaKit
        await emailjs.send(
          'service_m0cz9oe',
          'template_clr75s2',
          {
            user_email: mediaKitFormData.email,
            user_name: mediaKitFormData.fullName,
            brand_color: '#FF6B2C',
            primary_color: '#035271',
            message: `
          
            Thank you for your interest in B2BinDemand. You can download our Media Kit using this link: ${MediaKitPDF}
            
            Our team will contact you shortly to discuss how we can help your business grow.
            
            Best regards,
            B2BinDemand Team`,
            background_color: 'rgba(255, 255, 255, 0.9)',
            shadow: '0 2px 4px rgba(0,0,0,0.1)'
          },
          'FWXDgNP6A3TBK3Y55'
        );

        // Send notification to admin
        await emailjs.send(
          'service_m0cz9oe',
          'template_3iyjdi6',
          {
            user_email: mediaKitFormData.email,
            brand_color: '#FF6B2C',
            primary_color: '#035271',
            message: `New Media Kit Download
            
            Contact Details:
            - Name: ${mediaKitFormData.fullName}
            - Email: ${mediaKitFormData.email}
            - Phone: ${mediaKitFormData.phoneNumber}
            - Company: ${mediaKitFormData.companyName}
            - Country: ${mediaKitFormData.country}
            
            Media Kit Link: ${MediaKitPDF}`,
            background_color: 'rgba(255, 255, 255, 0.9)',
            shadow: '0 2px 4px rgba(0,0,0,0.1)'
          },
          'FWXDgNP6A3TBK3Y55'
        );

        // Reset form and show success message
        setMediaKitFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          companyName: "",
          country: "",
        });
        setFormState(prev => ({ ...prev, errors: {} }));
        setShowMediaKitModal(false);
        setShowThankYouModal(true);
      } catch (error) {
        console.error('Error handling Media Kit download:', error);
        alert('Failed to send emails. Please try again.');
      } finally {
        setFormState(prev => ({ ...prev, isSubmitting: false }));
      }
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();

  const testimonials = [
    {
      id: 1,
      content:
        "B2BInDemand's expertise in lead generation has been instrumental in our growth. Their strategic approach and deep understanding of our industry helped us connect with high-quality prospects.",
      author: "Sarah Johnson",
      position: "Marketing Director",
      company: "TechCorp Solutions",
      image: TestimonialPic,
    },
    {
      id: 2,
      content:
        "Working with B2BInDemand transformed our sales pipeline. Their targeted approach and quality leads have significantly improved our conversion rates.",
      author: "Michael Chen",
      position: "Sales Manager",
      company: "InnovateHub",
      image: TestimonialPic2,
    },
    {
      id: 3,
      content:
        "The results we've achieved with B2BInDemand have exceeded our expectations. Their team's dedication and expertise make them a valuable partner in our growth journey.",
      author: "Emily Rodriguez",
      position: "CEO",
      company: "GrowthForce",
      image: TestimonialPic3,
    },
  ];

  const clientLogos = [
    { src: "/logos/Dell.png", alt: "Dell" },
    { src: "/logos/intel.png", alt: "Intel" },
    { src: "/logos/microsoft.png", alt: "Microsoft" },
    { src: "/logos/oracle.png", alt: "Oracle" },
    { src: "/logos/rubrik.png", alt: "Rubrik" },
    { src: "/logos/slack.png", alt: "Slack" },
    { src: "/logos/verizon.png", alt: "Verizon" },
    { src: "/logos/zeta.png", alt: "Zeta" },
    { src: "/logos/microfocus.png", alt: "Micro Focus" },
    { src: "/logos/oneTrust.png", alt: "One Trust" },
    { src: "/logos/redhat.png", alt: "Red Hat" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const slideNext = async () => {
      const nextIndex = (currentIndex + 1) % testimonials.length;

      // If we're at the end of the original set, smoothly reset
      if (currentIndex === testimonials.length - 1) {
        await controls.start({
          x: `-${testimonials.length * 100}%`,
          transition: {
            duration: 1.5,
            ease: [0.4, 0.0, 0.2, 1], // Custom easing for smoother motion
          },
        });
        // Instantly jump back to the start without animation
        await controls.set({ x: "0%" });
        setCurrentIndex(0);
      } else {
        // Normal slide
        await controls.start({
          x: `-${nextIndex * 100}%`,
          transition: {
            duration: 1.5,
            ease: [0.4, 0.0, 0.2, 1],
          },
        });
        setCurrentIndex(nextIndex);
      }
    };

    const testimonialContainer = document.querySelector(
      ".testimonial-container"
    );
    if (testimonialContainer) {
      testimonialContainer.addEventListener("mouseenter", () =>
        setIsPaused(true)
      );
      testimonialContainer.addEventListener("mouseleave", () =>
        setIsPaused(false)
      );
    }

    const timer = setInterval(() => {
      if (!isPaused) {
        slideNext();
      }
    }, 4000); // Increased interval for slower transitions

    // Cleanup function
    return () => {
      clearInterval(timer);
      if (testimonialContainer) {
        testimonialContainer.removeEventListener("mouseenter", () =>
          setIsPaused(true)
        );
        testimonialContainer.removeEventListener("mouseleave", () =>
          setIsPaused(false)
        );
      }
    };
  }, [currentIndex, isPaused, testimonials.length, controls]);


  useEffect(() => {
    const handleScroll = () => {
      if (showMediaKitModal || showThankYouModal) {
        // Store current scroll position
        const scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.overflow = 'hidden';
      } else {
        // Restore scroll position
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        document.body.style.overflow = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    };

    handleScroll();
    return () => {
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.body.style.overflow = '';
    };
  }, [showMediaKitModal, showThankYouModal]);

  const handleModalClose = () => {
    setShowMediaKitModal(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 font-poppins">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        {/* Additional SEO */}
        <link rel="canonical" href="https://b2bindemand.com/" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      {/* Add NOBS Banner */}
      <div className="hidden lg:block absolute top-[160px] right-0 w-[250px] sm:w-[300px] h-[40px] sm:h-[30px] z-0 transform rotate-45 translate-x-[50px] sm:translate-x-[100px] translate-y-[-15px] bg-[#FFB800] shadow-lg overflow-hidden">
        <div
          className="animate-scroll whitespace-nowrap inline-flex"
          style={{
            animation: 'scroll 50s linear infinite',
            fontSize: 'clamp(14px, 2vw, 18px)'
          }}
        >
          <div className="inline-flex font-medium">#NOBS #NOBS #NOBS #NOBS #NOBS #NOBS #NOBS #NOBS #NOBS #NOBS #NOBS #NOBS</div>
          <div className="inline-flex font-medium">#NOBS #NOBS #NOBS #NOBS #NOBS #NOBS #NOBS #NOBS #NOBS #NOBS #NOBS #NOBS</div>
          <div className="inline-flex font-medium">#NOBS #NOBS #NOBS #NOBS #NOBS #NOBS #NOBS #NOBS #NOBS #NOBS #NOBS #NOBS</div>
          <div className="inline-flex font-medium">#NOBS #NOBS #NOBS #NOBS #NOBS #NOBS #NOBS #NOBS #NOBS #NOBS #NOBS #NOBS</div>
        </div>
      </div>

      <BackgroundBeamsWithCollision>

      {/* Mobile NOBS Banner */}
      {/* <div className="lg:hidden absolute top-[100px] right-0 w-[200px] h-[35px] z-0 transform rotate-45 translate-x-[50px] translate-y-[-15px] bg-[#FFB800] shadow-lg overflow-hidden">
        <div 
          className="animate-scroll whitespace-nowrap inline-flex" 
          style={{ 
            animation: 'scroll 50s linear infinite',
            fontSize: '14px'
          }}
        >
          <div className="inline-flex font-medium">#NOBS#NOBS#NOBS#NOBS#NOBS#NOBS#NOBS#NOBS#NOBS#NOBS#NOBS#NOBS</div>
          <div className="inline-flex font-medium">#NOBS#NOBS#NOBS#NOBS#NOBS#NOBS#NOBS#NOBS#NOBS#NOBS#NOBS#NOBS</div>
        </div>
      </div>  */}

      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      </motion.div>

      <main className="relative w-full overflow-x-hidden min-h-screen">
        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[120px] w-full">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <p className="inline-block bg-white/50 text-base sm:text-lg text-blue-600 dark:text-sky-400 backdrop-blur-sm rounded-full px-4 py-1.5 font-medium">
              A Trusted{" "}
              <span className="text-[#0066B2] font-bold">Lead Generation</span>{" "}
              Agency
            </p>
          </div>

          {/* Main Hero Content */}
          <div className="text-center max-w-3xl mx-auto mb-16 pt-[20px] relative">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 blur-3xl transform rotate-12 rounded-full"></div>
              <div className="absolute inset-0 bg-gradient-to-l from-orange-400/20 to-pink-400/20 blur-3xl transform -rotate-12 rounded-full"></div>
            </div>
            <p className="text-lg sm:text-xl text-black mb-8 font-bold text-[#F26C1E]">
              Real Pipeline. Real Revenue.
            </p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-[#000000] tracking-wide relative z-10 leading-tight"
            >
              Stop chasing{" "}
              <span className="inline-block bg-[#F26C1E] text-white px-2.5 sm:px-3 py-0.5 rounded-md sm:rounded-lg">
                leads
              </span>
              .{" "}
              <span className="inline-block mt-3 sm:mt-4">
                Start catching{" "}
                <span className="relative inline-block pb-4 sm:pb-5">
                  buyers
                  <img
                    src={Now}
                    alt=""
                    aria-hidden="true"
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-0.5 w-[88px] sm:w-[110px] md:w-[130px] h-auto pointer-events-none"
                  />
                </span>
                .
              </span>
            </motion.h1>

            <p className="text-base sm:text-lg text-black mb-8 pt-[30px] pb-4 max-w-2xl mx-auto">
              Get actual in-market buyers delivered to your pipeline, qualified,
              intent-scored, and ready to talk to your sales team.
            </p>

            <div className="mt-8 sm:mt-16 relative">
              <div className="absolute -inset-2 sm:-inset-4 rounded-full"></div>
              <Link
                to="/contact-us"
                className="relative inline-flex items-center justify-center bg-[#005F73] hover:bg-[#004C5C] text-white px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg md:text-xl font-medium tracking-wide rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Get a Quote
              </Link>
            </div>
          </div>

          {/* Client Logos Section */}
          <div className="relative mb-24 w-full overflow-hidden">
            <InfiniteMovingCards
              items={clientLogos}
              speed="normal"
              direction="left"
              pauseOnHover={true}
              className="py-4"
            >
              {(logo) => (
                <div className="mx-4 sm:mx-8">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-6 sm:h-8 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              )}
            </InfiniteMovingCards>
          </div>

          {/* "We don't just deliver leads" Section */}
          <div className="text-center mb-24 mt-32 relative w-full">
            {/* Background Rectangle */}
            <div className="absolute inset-0 w-screen left-[50%] transform -translate-x-1/2 -z-20">
              <img
                src={rectangleImg}
                alt="Background Rectangle"
                className="w-full h-auto object-cover min-w-[1920px]"
                style={{
                  maxWidth: 'none',
                  width: '100vw',
                  position: 'relative',
                  left: '50%',
                  top: '-13rem',
                  transform: 'translateX(-50%)',
                }}
              />
            </div>

            {/* Floating Ellipse */}
            <motion.img
              src={ellipseImg}
              alt="Background Ellipse"
              className="absolute right-[-50px] sm:right-[-25px] top-[-100px] transform -translate-y-1/2 z-10 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] lg:w-[250px] lg:h-[250px]"
              animate={{
                x: [-30, 30, -30],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

          
          </div>

          {/* Features Grid */}
          <div className="flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10 gap-6 sm:gap-8 pt-10 mt-[12rem]">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#0A2D4D] text-center mb-12 relative z-10">
              We don't just find leads we find the ones already looking 👀
            </h2>

            <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-6 sm:gap-8">
              {/* Left card (With over 10+ years of experience) */}
              <div className="w-full lg:w-1/3">
                <CardSpotlight>
                  <div className="relative w-full h-64 sm:h-80">
                    {/* Card content */}
                    <div className="relative h-full w-full p-6 sm:p-8 flex flex-col items-center justify-center">
                      {/* Top-right image */}
                      <img
                        src={levelimg}
                        alt="Level"
                        className="absolute top-4 sm:top-5 right-4 sm:right-5 w-[6rem] h-[6rem] sm:w-[8rem] sm:h-[8rem] z-20"
                      />

                      {/* Heading with modern styling */}
                      <p className="text-xl sm:text-2xl font-normal text-white text-center sm:text-right pt-24 sm:pt-[140px] z-20">
                        With over <span className="font-bold">10+ years</span> of
                        experience, we know the difference between a lead and a
                        buyer. We go after the buyers.
                      </p>
                    </div>
                  </div>
                </CardSpotlight>
              </div>

              {/* Right card (Accumulate your sales) */}
              <motion.div
                className="bg-white p-6 sm:p-8 rounded-2xl h-auto sm:h-80 shadow-lg flex flex-col justify-center w-full lg:w-2/4 relative"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Top-left image */}
                <img
                  src={healthy_recognition}
                  alt="healthy_recognition"
                  className="absolute top-0 left-4 sm:left-6 w-20 h-20 sm:w-[8rem] sm:h-[8rem] pt-4 sm:pt-6"
                />

                {/* Top-right image */}
                <img
                  src={badgerimg}
                  alt="badger"
                  className="absolute top-0 right-0 h-14 sm:h-[8rem]"
                />

                {/* Text content */}
                <p className="text-black text-sm sm:text-base lg:text-lg text-left pt-20 sm:pt-[100px]">
                  We build accurate, intent-verified prospect databases and run
                  precision campaigns personalised to{" "}
                  <span className="font-bold">maximise</span> your pipeline
                  conversion, not just your lead count.
                </p>
              </motion.div>
            </div>
          </div>

          <div className=" bg-gray-50 flex flex-col justify-center items-center p-4 sm:p-8 space-y-8 sm:space-y-12">
            {/* Main content container */}
            <div className="flex flex-col md:flex-row justify-center items-center w-full max-w-6xl gap-8 sm:gap-12">
              {/* Left section (text content) */}
              <div className="text-center md:text-left md:w-1/2 lg:w-1/3 space-y-4 sm:space-y-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-gray-900 leading-tight tracking-tight">
                  With us, you have 0{" "}
                  <span className="bg-[#FFB800] px-3 py-1.5 italic text-white rounded-lg inline-block mt-2">
                   guesswork
                  </span>{" "}
                  in your pipeline.
                </h2>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed tracking-wide">
                Every lead we deliver has been filtered for intent, fit, and timing. Not just scraped
from a list.
{" "}
                  {/* <span className="font-semibold text-gray-900 px-1">
                    VIP pipeline flow
                  </span>{" "}
                  within your reach, done for you already! */}
                </p>
              </div>

              {/* Right section (interactive cards) */}
              <div className="w-full md:w-1/2">
                <div className="rounded-2xl w-full overflow-hidden">
                  <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
                    {/* Campaigns+ card */}
                    <Link to="/campaigns" className="block">
                      <div className="bg-[#E7E7E7] border border-[#C4C4C4] text-gray-900 p-4 sm:p-6 shadow-xl rounded-xl flex justify-between items-center hover:bg-[#035271] hover:text-white transition-all duration-300 cursor-pointer group">
                        <span className="font-medium text-lg sm:text-xl tracking-wide">
                          Campaigns+
                        </span>
                        <img
                          src={arrowIcon}
                          alt="arrow"
                          className="w-[5rem] h-5 sm:w-4.5 sm:h-6 text-[#FFB800] group-hover:text-white transform group-hover:translate-x-2 transition-all duration-300"
                        />
                      </div>
                    </Link>

                    {/* Smart Syndication card */}
                    <Link to="/smart-syndication" className="block">
                      <div className="bg-[#E7E7E7] border border-[#C4C4C4] text-gray-900 p-4 sm:p-6 shadow-xl rounded-xl flex justify-between items-center hover:bg-[#035271] hover:text-white transition-all duration-300 cursor-pointer group">
                        <span className="font-medium text-lg sm:text-xl tracking-wide">
                          Smart Syndication
                        </span>
                        <img
                          src={arrowIcon}
                          alt="arrow"
                          className="w-[5rem] h-5 sm:w-4.5 sm:h-6 text-[#FFB800] group-hover:text-white transform group-hover:translate-x-2 transition-all duration-300"
                        />
                      </div>
                    </Link>

                    {/* Intent Targeting card */}
                    <Link to="/intent-targeting" className="block">
                      <div className="bg-[#E7E7E7] border border-[#C4C4C4] text-gray-900 p-4 sm:p-6 shadow-xl rounded-xl flex justify-between items-center hover:bg-[#035271] hover:text-white transition-all duration-300 cursor-pointer group">
                        <span className="font-medium text-lg sm:text-xl tracking-wide">
                          Intent Targeting
                        </span>
                        <img
                          src={arrowIcon}
                          alt="arrow"
                          className="w-[5rem] h-5 sm:w-4.5 sm:h-6 text-[#FFB800] group-hover:text-white transform group-hover:translate-x-2 transition-all duration-300"
                        />
                      </div>
                    </Link>

                    {/* Event-Based Lead Generation card */}
                    <Link to="/event-based-lead-generation" className="block">
                      <div className="bg-[#E7E7E7] border border-[#C4C4C4] text-gray-900 p-4 sm:p-6 shadow-xl rounded-xl flex justify-between items-center hover:bg-[#035271] hover:text-white transition-all duration-300 cursor-pointer group">
                        <span className="font-medium text-lg sm:text-xl tracking-wide">
                          Event-Based Lead Generation
                        </span>
                        <img
                          src={arrowIcon}
                          alt="arrow"
                          className="w-[5rem] h-5 sm:w-4.5 sm:h-6 text-[#FFB800] group-hover:text-white transform group-hover:translate-x-2 transition-all duration-300"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Book a call button */}
            <div className="mt-8 sm:mt-16 relative">
              <div className="absolute -inset-2 sm:-inset-4 rounded-full"></div>
              <Link to="https://calendly.com/rohit-b2bindemand/30min?month=2025-03" target="_blank"
                
                className="relative bg-[#005F73] hover:bg-[#004C5C] text-white px-6 sm:px-10 py-3 sm:py-4 text-lg sm:text-xl font-medium tracking-wide rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Book a call
              </Link>
            
            </div>
          </div>

          <div className="relative w-full max-w-5xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-4xl font-normal text-black text-[40px] pt-[50px]">
                Now, you're wondering why we're{" "}
                <span className="bg-[#FFB800] px-3 py-1.5 italic text-white rounded-lg inline-block mt-2">
                  the best?
                </span>
                <img
                  src={Thinking_Face}
                  alt="Thinking_Face"
                  className="w-10 h-10 inline-block"
                  style={{ top: "22px", left: "-11px", position: "relative" }}
                />{" "}
              </h2>
              <p className="text-gray-600 pt-4 text-[24px]">
                Companies big and small trust us <br></br> with their
                pipeline...{" "}
                <img
                  src={Raising_Hands}
                  alt="Raising_Hands"
                  className="w-8 h-8 inline-block"
                />
              </p>
            </div>

            <div className="h-[400px] rounded-md flex flex-col antialiased dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
              <InfiniteMovingCards
                items={testimonials}
                direction="left"
                speed="slow"
                pauseOnHover={true}
                className="py-4"
              >
                {(testimonial) => (
                  <div
                    key={testimonial.id}
                    className="w-[300px] h-[300px] relative flex-shrink-0 mx-2 group overflow-hidden rounded-xl"
                  >
                    {/* Orange accent glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6B2C]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-20" />

                    <img
                      src={testimonial.image}
                      alt={testimonial.content}
                      className="h-full w-full object-cover rounded-xl shadow-lg group-hover:scale-110 transition-all duration-500"
                    />
                  </div>
                )}
              </InfiniteMovingCards>
            </div>
          </div>

          <div className="relative w-full max-w-7xl mx-auto py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
            {/* Flex container for text and cards */}
            <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
              {/* Left section (text content) */}
              <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 mx-auto mt-8 sm:mt-[50px]">
                <h2 className="text-3xl sm:text-4xl font-normal mb-4 leading-normal tracking-wide">
                  With {""}
                  <span className="text-[#F26C1E] font-bold"> 
                  results {""}
                  </span>
                  like these, <br />
                  why would you go anywhere else?
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 mb-8 relative z-10">
                  Take a look at our{" "}
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block bg-gradient-to-r from-[#FFB800] to-[#FF9B04] text-[#035271] px-3 py-1.5 rounded-xl font-medium cursor-pointer transition-all duration-300 hover:shadow-lg hover:bg-opacity-90 border-b-2 border-[#035271] backdrop-blur-[8px]"
                    onClick={() => setShowMediaKitModal(true)}
                  >
                    <span className="relative z-10 flex items-center">
                      <span>Mediakit</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </span>
                  </motion.span>
                </p>
              </div>

              {/* Right section (cards with overlay) */}
              <div className="w-full md:w-1/2 px-4">
                <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 group/cards">
                  {/* Overlay with Map Icon - Only visible on desktop hover */}
                  {!isMobile && (
                    <motion.div
                      className="absolute inset-0 z-20 bg-[#FFF8E7] rounded-2xl shadow-lg opacity-0 invisible group-hover/cards:visible group-hover/cards:opacity-100 flex items-center justify-center transition-all duration-700"
                      initial={{ scale: 0.5, rotate: -15 }}
                      whileHover={{
                        scale: 1,
                        rotate: 0,
                        transition: { type: "spring", stiffness: 300, damping: 20 },
                      }}
                    >
                      <motion.img
                        src={mapIcon}
                        alt="Map Icon"
                        className="w-2/3 h-2/3 sm:w-4/5 sm:h-4/5 object-contain"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                      />
                    </motion.div>
                  )}

                  {/* Cards with conditional animations */}
                  {[
                    { value: "100%", text: " Leads generated in-house" },
                    { value: "120M+", text: "Verified buyer profiles" },
                    { value: "120+", text: "Countries Reach" },
                    { value: "45k", text: "Campaigns delivered" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className={`bg-[#FFF8E7] p-5 sm:p-6 md:p-8 rounded-2xl shadow-lg border border-orange-400 text-center flex flex-col items-center justify-center h-40 sm:h-44 ${!isMobile ? 'transition-transform duration-300 hover:scale-95' : ''}`}
                      initial={!isMobile ? { opacity: 0, y: 20 } : false}
                      animate={!isMobile ? { opacity: 1, y: 0 } : false}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <h3 className="text-[#005F73] text-4xl sm:text-5xl md:text-6xl font-bold mb-2">
                        {item.value}
                      </h3>
                      <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-tight text-center">
                        {item.text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="min-h-screen bg-gray-100">
            {/* Resources Section */}
            <ResourcesSection />
          </div>
        </div>
      </main>

      <AnimatePresence>
        {showMediaKitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => handleModalClose()}
            className="fixed inset-0 bg-black/30 backdrop-blur-[8px] z-[150] flex items-center justify-center p-4"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white bg-opacity-90 backdrop-blur-[12px] rounded-2xl p-6 max-w-lg w-full relative shadow-2xl border border-gray-100 z-[160] max-h-[90vh]"
            >
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-[#035271] mb-2">Download Media Kit 2025</h3>
                    <p className="text-gray-600 text-sm">Fill out the form to get instant access</p>
                  </div>
                  <motion.button
                    onClick={() => handleModalClose()}
                    className="text-gray-400 hover:text-[#FF6B2C] transition-colors p-2 hover:bg-gray-100/80 rounded-full backdrop-blur-[8px]"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                <form onSubmit={handleMediaKitDownload} className="space-y-4">
                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        type="text"
                        name="fullName"
                        value={mediaKitFormData.fullName}
                        onChange={handleMediaKitFormChange}
                        className={`w-full px-4 py-3 bg-white bg-opacity-90 backdrop-blur-sm border ${formState.errors.fullName ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B2C] focus:border-transparent transition-all duration-200`}
                        placeholder="Full Name *"
                        required
                      />
                      {formState.errors.fullName && <p className="text-red-500 text-sm mt-1">{formState.errors.fullName}</p>}
                    </div>

                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={mediaKitFormData.email}
                        onChange={handleMediaKitFormChange}
                        className={`w-full px-4 py-3 bg-white bg-opacity-90 backdrop-blur-sm border ${formState.errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B2C] focus:border-transparent transition-all duration-200`}
                        placeholder="Email Address *"
                        required
                      />
                      {formState.errors.email && <p className="text-red-500 text-sm mt-1">{formState.errors.email}</p>}
                    </div>

                    <div className="relative">
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={mediaKitFormData.phoneNumber}
                        onChange={handleMediaKitFormChange}
                        className={`w-full px-4 py-3 bg-white bg-opacity-90 backdrop-blur-sm border ${formState.errors.phoneNumber ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B2C] focus:border-transparent transition-all duration-200`}
                        placeholder="Phone Number *"
                        required
                      />
                      {formState.errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{formState.errors.phoneNumber}</p>}
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        name="companyName"
                        value={mediaKitFormData.companyName}
                        onChange={handleMediaKitFormChange}
                        className={`w-full px-4 py-3 bg-white bg-opacity-90 backdrop-blur-sm border ${formState.errors.companyName ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B2C] focus:border-transparent transition-all duration-200`}
                        placeholder="Company Name *"
                        required
                      />
                      {formState.errors.companyName && <p className="text-red-500 text-sm mt-1">{formState.errors.companyName}</p>}
                    </div>

                    <div className="relative">
                      <select
                        name="country"
                        value={mediaKitFormData.country}
                        onChange={handleMediaKitFormChange}
                        className={`w-full px-4 py-3 bg-white bg-opacity-90 backdrop-blur-sm border ${formState.errors.country ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B2C] focus:border-transparent transition-all duration-200`}
                        required
                      >
                        <option value="">Select Country *</option>
                        {countries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                      {formState.errors.country && <p className="text-red-500 text-sm mt-1">{formState.errors.country}</p>}
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={formState.isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full bg-gradient-to-r from-[#FFB800] to-[#FF9B04] text-[#035271] px-6 py-3.5 rounded-xl font-medium transition-all duration-200 backdrop-blur-sm ${formState.isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg'}`}
                  >
                    {formState.isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#035271]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <span>Download Media Kit</span>
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </span>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showThankYouModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-[8px] z-[150] flex items-center justify-center p-4"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              className="bg-white bg-opacity-90 backdrop-blur-[12px] rounded-2xl p-8 max-w-md w-full relative shadow-2xl border border-gray-100"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-gradient-to-r from-[#FFB800] to-[#FF9B04]"
                >
                  <svg className="w-8 h-8 text-[#035271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl font-bold text-[#035271] mb-4"
                >
                  Thank You!
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-600 mb-6"
                >
                  Your Media Kit download has started. We've also sent a copy to your email for future reference.
                </motion.p>
                <motion.button
                  onClick={() => setShowThankYouModal(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-[#FFB800] to-[#FF9B04] text-[#035271] px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg flex items-center justify-center mx-auto"
                >
                  <span>Close</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      </BackgroundBeamsWithCollision>
      <Footer />
    </div>
  );
};

export default Home;

<style jsx>{`
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  .animate-scroll {
    animation: scroll 20s linear infinite;
    display: flex;
  }
  @media (prefers-reduced-motion: reduce) {
    .animate-scroll {
      animation: none;
    }
  }
  @font-face {
    font-family: "Poppins";
    src: url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");
  }
  .font-poppins {
    font-family: "Poppins", sans-serif;
  }
  @keyframes border-flow {
    0% {
      clip-path: inset(0 98% 98% 0);
    }
    25% {
      clip-path: inset(0 0 98% 0);
    }
    50% {
      clip-path: inset(0 0 0 98%);
    }
    75% {
      clip-path: inset(98% 0 0 0);
    }
    100% {
      clip-path: inset(0 98% 98% 0);
    }
  }
  .animate-border-flow::before {
    content: "";
    animation: border-flow 3s linear infinite;
  }
`}</style>;
