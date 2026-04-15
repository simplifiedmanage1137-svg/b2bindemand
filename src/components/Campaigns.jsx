import React, { useState, useEffect } from "react";
import styles from "./styles/SmartSyndication.module.css";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "./Footer";
import fullFunnelImage from "../assets/Your_Full-Funnel.png";
import researchStrategyImage from "../assets/reseach_strategy.svg";
import Multi_Touch_Engagement from "../assets/Multi_Touch_Engagement.svg";
import Qualification_and_Lead_Scoring from "../assets/Qualification_and_Lead_Scoring.svg";
import Meeting_Booking_and_Handoff from "../assets/Meeting_Booking_and_Handoff.svg";
import Optimization_and_Scaling from "../assets/Optimization_and_Scaling.svg";
import createIcon from "../assets/create.svg";
import timeIcon from "../assets/time.svg";
import Scalable from "../assets/Scalable.svg";
import Dedicated_Team from "../assets/Icon/Dedicated_Team.webp";
import A_Deep_Dive from "../assets/A_Deep_Dive.png";
import Casestudy_3 from "../assets/Casestudy_3.png";
import Verified_Content from "../assets/Verified_Content.webp";
import radar from "../assets/Icon/radar.svg";
import manual_gear from "../assets/Icon/manual-gear.svg";
import video_file from "../assets/Icon/video_file.svg";
import block_two from "../assets/Icon/block-two.svg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import TypeWriter from "./TypeWriter";
import { Helmet } from 'react-helmet';
import { seoConfig } from '../utils/seoConfig';
import WatermarkedImage from "./WatermarkedImage";

import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import CaseStudySection from "./common/CaseStudySection";

const cardData = [
  {
    id: 'amplifying-marketing-impact-with-mql-generation',
    title: ['Amplifying Marketing Impact with MQL Generation'],
    highlightText: '',
    image: Verified_Content,
    downloadPdf: '/pdfs/amplifying-marketing-impact-with-mql-generation-case-study.pdf',
  },
  {
    id: 'driving-13000-qualified-leads-for-microsoft-azure',
    title: ['Driving 13,000 Qualified Leads for Microsoft Azure'],
    highlightText: '',
    image: A_Deep_Dive,
    downloadPdf: '/pdfs/driving-13000-qualified-leads-for-microsoft-azure-case-study.pdf',
  },
  {
    id: 'driving-high-quality-live-event-engagement-for-zoom',
    title: ['Driving High Quality Live-Event Engagement for ZOOM'],
    highlightText: '',
    image: Casestudy_3,
    downloadPdf: '/pdfs/driving-high-quality-live-event-engagement-for-zoom-case-study.pdf',
  },
];

const Campaigns = () => {
  const { title, description, keywords, ogImage } = seoConfig.campaigns;
  const [activeItem, setActiveItem] = useState("research");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    jobTitle: '',
    businessEmail: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.firstName.trim()) {
      errors.firstName = "First name is required";
    }
    if (!data.jobTitle.trim()) {
      errors.jobTitle = "Job title is required";
    }
    if (!data.businessEmail.trim()) {
      errors.businessEmail = "Business email is required";
    } else if (!validateEmail(data.businessEmail)) {
      errors.businessEmail = "Please enter a valid business email";
    }
    return errors;
  };

  const handlePdfDownload = (pdfInfo) => {
    setSelectedPdf(pdfInfo);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowSuccessMessage(true);

      try {
        const baseUrl = process.env.NODE_ENV === 'development' ? '' : process.env.PUBLIC_URL;
        const pdfPath = `${baseUrl}/assets/pdf/${selectedPdf.downloadPdf}`;

        // First try to open in new tab
        const newWindow = window.open(pdfPath, '_blank');

        // If popup was blocked or failed, fallback to download
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          const link = document.createElement('a');
          link.href = pdfPath;
          link.download = selectedPdf.downloadPdf;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }

        // Close modal and reset form
        setTimeout(() => {
          setIsSubmitting(false);
          setIsModalOpen(false);
          setShowSuccessMessage(false);
          setFormData({ firstName: '', jobTitle: '', businessEmail: '' });
          setSelectedPdf(null);
        }, 1500);
      } catch (downloadError) {
        console.error('PDF access error:', downloadError);
        setFormErrors({
          submit: "Unable to access the PDF. Please ensure you have a PDF viewer installed or try a different browser."
        });
        setIsSubmitting(false);
        setShowSuccessMessage(false);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmitting(false);
      setFormErrors({
        submit: "Something went wrong. Please try again or contact support if the issue persists."
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCaseStudyClick = (card) => {
    navigate(`/case-study/${card.id}`);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const location = useLocation();
  const currentPath = location.pathname; // Get the current path (e.g., "/campaigns")

  // Format the pathname to a readable page name
  const getPageName = (path) => {
    const name = path.split("/").pop(); // Extract the last part of the path
    return name.charAt(0).toUpperCase() + name.slice(1); // Capitalize the first letter
  };

  const testimonials = [
    {
      text: "The event-based approach transformed how we connect with prospects. We're seeing 40% higher engagement rates at industry events.",
      name: "David Wilson",
      position: "VP of Sales, TechGrowth",
    },
    {
      text: "Their event intelligence helped us identify and engage with key decision-makers before, during, and after major industry conferences.",
      name: "Lisa Chang",
      position: "Marketing Manager, EventPro",
    },
    {
      text: "We've doubled our qualified leads from industry events since implementing their event-based strategy.",
      name: "Mark Thompson",
      position: "Business Development Director, LeadGen Solutions",
    },
  ];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const workItems = {
    research: {
      title: "Event Intelligence Gathering",
      content:
        "We identify high-value industry events and analyze attendee profiles to target decision-makers most likely to need your solution.",
    },
    distribution: {
      title: "Pre-Event Engagement",
      content:
        "We create targeted campaigns to connect with potential prospects before the event, setting the stage for meaningful conversations.",
    },
    qualification: {
      title: "Event Engagement Optimization",
      content:
        "We help you maximize event presence through strategic booth placement, content delivery, and real-time lead qualification.",
    },
    handoff: {
      title: "Post-Event Follow-up",
      content:
        "We implement personalized follow-up strategies to convert event connections into sales opportunities.",
    },
    optimization: {
      title: "ROI Analysis & Strategy Refinement",
      content:
        "We measure event performance and refine strategies to continuously improve lead generation results.",
    },
  };

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
    { src: "/logos/redHat.png", alt: "Red Hat" },
  ];

  // const handleSlide = (direction) => {
  //   if (direction === 'next') {
  //     setCurrentSlide(prev => (prev + 1) % 3);
  //   } else {
  //     setCurrentSlide(prev => (prev - 1 + 3) % 3);
  //   }
  // };

  const carouselRef = useRef(null);

  const handleSlide = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 600; // Adjust scroll distance based on card width
      if (direction === "next") {
        carouselRef.current.scrollLeft += scrollAmount;
      } else {
        carouselRef.current.scrollLeft -= scrollAmount;
      }
    }
  };

  return (
    <div className={styles.smartSyndication}>
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
        <link rel="canonical" href="https://b2bindemand.com/campaigns" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-[5rem] sm:py-16 lg:py-20">
        
        <h3 className="text-xl sm:text-2xl font-medium text-[#FF6B2C] mb-6 sm:mb-8 lg:mb-10 text-center lg:text-left">
          {getPageName(currentPath)}+
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Content */}
          <div className="mt-0 sm:mt-[-1rem] lg:mt-[-2rem] text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl font-bold leading-tight mb-3 sm:mb-4">
              Your Full-Funnel
              <br className="hidden sm:block" />
              <span className="text-[#FF6B2C]"> Outreach</span> Engine
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              We Book Meetings. You Close Deals.
            </p>
            <Link to="/contact-us" className="bg-[#005F73] text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-[#004c5c] transition-colors">
              Get a Quote
            </Link>
          </div>

          {/* Right Image */}
          <div className="relative group">
            <motion.img
              src={fullFunnelImage}
              alt="Full Funnel Outreach"
              className="w-full h-auto max-w-[600px] relative transition-all duration-300 group-hover:scale-105"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="absolute inset-0 flex items-end justify-end pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div
                className="pointer-events-auto transform 
      lg:translate-x-[-30px] lg:translate-y-[-35px] 
      md:translate-x-[-25px] md:translate-y-[-30px] 
      sm:translate-x-[-15px] sm:translate-y-[-20px] 
      translate-x-[-10px] translate-y-[-15px] 
      text-base xs:text-[12px]"
              >
                <TypeWriter
                  messages={[
                    "Can you tell me more?",
                    "I want to register"
                  ]}
                  delay={80}
                  loop={true}
                />
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Client Logos - Infinite Scroll */}
      <div className="relative mb-24 overflow-hidden">
        {/* <div className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-white to-transparent z-20" />
            <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-white to-transparent z-20" /> */}

        <div className="flex animate-scroll">
          {[...clientLogos, ...clientLogos].map((logo, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 mx-8"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-8 w-auto grayscale hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why Event-Based Lead Generation Section */}
      <div
        className={styles.whySection}
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        <div className={styles.whyContent}>
          <h2 className={styles.whyHeading}>
            Why Choose <br />{" "}
            <span className={styles.highlight}>Campaigns+</span>
          </h2>
          <p className={styles.whyDescription}>
            B2B sales is a battlefield. Securing meetings with decision-makers
            isn’t just about sending emails—it’s about the right message,
            timing, and execution. We handle your entire outreach process,
            ensuring your pipeline is filled with qualified, high-intent
            prospects ready for a sales conversation!
          </p>
        </div>

        <div className={styles.featureCards}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <img
                src={createIcon}
                alt="Multi-Channel Outreach"
                className={styles.featureIconImage}
                style={{ width: "70px", height: "70px" }}
              />
            </div>
            <h3 className={styles.featureTitle}>Multi-Channel Outreach</h3>
          </div>

          <div className={styles.featureCard} >
            <div className={styles.featureIcon} >
              <img
                src={timeIcon}
                alt="Meetings with High-Intent Buyers"
                className={styles.featureIconImage}
                style={{ width: "70px", height: "70px", }}
              />
            </div>
            <h3 className={styles.featureTitle}>
              Meetings with High-Intent Buyers
            </h3>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <img
                src={Scalable}
                alt="Scalable Growth & Measurable Results"
                className={styles.featureIconImage}
                style={{ width: "70px", height: "70px" }}
              />
            </div>
            <h3 className={styles.featureTitle}>
              Scalable Growth & Measurable Results
            </h3>
          </div>
        </div>
      </div>

      {/* How Campaign+ work */}
      <div
        className={styles.getSection}
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        <h2 className={styles.sectionTitle}>
          How Campaigns+ <span className={styles.highlight}> Works</span>
        </h2>


        <div className="flex flex-col md:flex-row border border-gray-100 rounded-lg shadow-sm items-center justify-between gap-8 sm:gap-12 lg:gap-16 p-6 sm:p-8 mt-8 sm:mt-12">
          {/* Left: Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <img
              src={researchStrategyImage}
              alt="Research & Strategy Process"
              className="w-full max-w-[250px] sm:max-w-[300px] h-auto object-contain"
            />
          </div>

          {/* Right: Text */}
          <div className="w-full md:w-1/2 space-y-4 sm:space-y-6 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-medium text-gray-400">
              Research & Strategy
            </h3>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              We analyze your ideal customer profile (ICP), competitors, and messaging strategy to craft a data-driven outreach plan.
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row border border-gray-100 rounded-lg shadow-sm items-center justify-between gap-8 sm:gap-12 lg:gap-16 p-6 sm:p-8 mt-8 sm:mt-12">
          {/* Left: Text */}
          <div className="w-full md:w-1/2 space-y-4 sm:space-y-6 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-medium text-gray-400">
              Multi-Touch Engagement
            </h3>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Your campaign runs across email, LinkedIn, and cold calls, ensuring maximum reach and engagement.
            </p>
          </div>

          {/* Right: Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img
              src={Multi_Touch_Engagement}
              alt="Multi-Touch Engagement Process"
              className="w-full max-w-[250px] sm:max-w-[300px] h-auto object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row border border-gray-100 rounded-lg shadow-sm items-center justify-between gap-8 sm:gap-12 lg:gap-16 p-6 sm:p-8 mt-8 sm:mt-12">
          {/* Left: Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <img
              src={Qualification_and_Lead_Scoring}
              alt="Qualification and Lead Scoring Process"
              className="w-full max-w-[250px] sm:max-w-[300px] h-auto object-contain"
            />
          </div>

          {/* Right: Text */}
          <div className="w-full md:w-1/2 space-y-4 sm:space-y-6 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-medium text-gray-400">
              Qualification & Lead Scoring
            </h3>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              We identify high-intent prospects, nurture them, and qualify them
              before booking meetings.
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row border border-gray-100 rounded-lg shadow-sm items-center justify-between gap-8 sm:gap-12 lg:gap-16 p-6 sm:p-8 mt-8 sm:mt-12">
          {/* Left: Text */}
          <div className="w-full md:w-1/2 space-y-4 sm:space-y-6 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-medium text-gray-400">
              Meeting Booking & Handoff
            </h3>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Your team receives scheduled meetings with decision-makers, along
              with key insights to drive the conversation.
            </p>
          </div>

          {/* Right: Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img
              src={Meeting_Booking_and_Handoff}
              alt="Meeting Booking and Handoff Process"
              className="w-full max-w-[250px] sm:max-w-[300px] h-auto object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row border border-gray-100 rounded-lg shadow-sm items-center justify-between gap-8 sm:gap-12 lg:gap-16 p-6 sm:p-8 mt-8 sm:mt-12">
          {/* Left: Image */}
          <div className="w-full md:w-1/2 px-4">
            <img
              src={Optimization_and_Scaling}
              alt="Business Process"
              className="w-[300px] h-[250px]"
            />
          </div>

          {/* Right: Text */}
          <div className="w-full md:w-1/2 space-y-6 px-4">
            <h3 className="text-3xl font-medium text-gray-400">
              Optimization & Scaling
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              We refine and optimize every touchpoint for higher conversions,
              ensuring long-term success.
            </p>
          </div>
        </div>
      </div>

      {/* What You Get Section */}
      <div
        className={styles.getSection}
        style={{ maxWidth: "750px", margin: "4rem auto", padding: "2rem" }}
      >
        <h2 className={styles.sectionTitle}>
          What You <span className={styles.highlight}>Get</span> with Campaigns+
        </h2>
        <div className={styles.getFeatures}>
          <div className={styles.getFeatureItem}>
            <div className={styles.getFeatureIcon}>
              <img src={Dedicated_Team} alt="Dedicated Team" />
            </div>
            <div className={styles.getFeatureText}>Dedicated Team</div>
          </div>
          <div className={styles.getFeatureItem}>
            <div className={styles.getFeatureIcon}>
              {" "}
              <img src={radar} alt="Custom Prospect List" />{" "}
            </div>
            <div className={styles.getFeatureText}>Custom Prospect List</div>
          </div>
          <div className={styles.getFeatureItem}>
            <div className={styles.getFeatureIcon}>
              <img src={manual_gear} alt="Multi-Channel Sequences" />{" "}
            </div>
            <div className={styles.getFeatureText}>Multi-Channel Sequences</div>
          </div>
          <div className={styles.getFeatureItem}>
            <div className={styles.getFeatureIcon}>
              <img src={video_file} alt="High-Intent Meetings" />{" "}
            </div>
            <div className={styles.getFeatureText}>High-Intent Meetings</div>
          </div>
          <div className={styles.getFeatureItem}>
            <div className={styles.getFeatureIcon}>
              <img src={block_two} alt="Live Performance Dashboard" />
            </div>
            <div className={styles.getFeatureText}>
              Live Performance Dashboard
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Section */}
      <CaseStudySection
        title="See How They got Their Job"
        highlightText="Done..."
        cards={cardData}
        onCardClick={handleCaseStudyClick}
      />

      {/* Call to Action Section */}
      <div className={styles.demandGenSection}>
        <h1 className={styles.demandGenTitle}>
          Ready to Book
          <span className={styles.highlight}> More Meetings?</span>
        </h1>
        <p className={styles.demandGenSubtitle}>
          Let’s take the guesswork out of outbound and fill your pipeline with{" "}
          <br />
          <span className={styles.subtitleGray}> sales-ready prospects</span>
        </p>
        <div className={styles.callButtonWrapper}>
          <Link to="https://calendly.com/rohit-b2bindemand/30min?month=2025-03" target="_blank" className={styles.bookCallButton}>Book a call</Link>
        </div>
        <div className={styles.metricsContainer}>
          <div className={styles.metricItem}>
            <div className={styles.metricValue}>100+</div>
            <div className={styles.metricLabel}>Opportunities Yearly</div>
          </div>
          <div className="w-0.5 h-22 bg-gray-400"></div>

          <div className={styles.metricItem}>
            <div className={styles.metricValue}>13%</div>
            <div className={styles.metricLabel}>Deal Closing Rate</div>
          </div>

          <div className="w-0.5 h-22 bg-gray-400"></div>

          <div className={styles.metricItem}>
            <div className={styles.metricValue}>9:1</div>
            <div className={styles.metricLabel}>ROI Achieved</div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && !isSubmitting && setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl p-8 max-w-md w-full relative shadow-2xl"
            >
              <button
                onClick={() => !isSubmitting && setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>

              <motion.div
                className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-2xl font-bold text-gray-900 mb-3">Download Case Study</h2>
                  <p className="text-base sm:text-base text-gray-600">Fill out this form to download the PDF.</p>
                </div>

                <form
                  onSubmit={handleFormSubmit}
                  className="space-y-4"
                  noValidate
                  aria-label="Case study download form"
                >
                  <div className="mb-4">
                    <label htmlFor="firstName" className="sr-only">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      className={`w-full px-4 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005F73] ${formErrors.firstName ? 'border-red-500' : 'border-gray-200 focus:border-[#005F73]'
                        } transition-all duration-200`}
                      disabled={isSubmitting}
                      aria-invalid={formErrors.firstName ? 'true' : 'false'}
                      aria-describedby={formErrors.firstName ? 'firstName-error' : undefined}
                      required
                    />
                    {formErrors.firstName && (
                      <p id="firstName-error" className="mt-1 text-sm text-red-500" role="alert">{formErrors.firstName}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="jobTitle" className="sr-only">Job Title</label>
                    <input
                      type="text"
                      id="jobTitle"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      placeholder="Job Title"
                      className={`w-full px-4 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005F73] ${formErrors.jobTitle ? 'border-red-500' : 'border-gray-200 focus:border-[#005F73]'
                        } transition-all duration-200`}
                      disabled={isSubmitting}
                      aria-invalid={formErrors.jobTitle ? 'true' : 'false'}
                      aria-describedby={formErrors.jobTitle ? 'jobTitle-error' : undefined}
                      required
                    />
                    {formErrors.jobTitle && (
                      <p id="jobTitle-error" className="mt-1 text-sm text-red-500" role="alert">{formErrors.jobTitle}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="businessEmail" className="sr-only">Business Email</label>
                    <input
                      type="email"
                      id="businessEmail"
                      name="businessEmail"
                      value={formData.businessEmail}
                      onChange={handleInputChange}
                      placeholder="Business Email"
                      className={`w-full px-4 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005F73] ${formErrors.businessEmail ? 'border-red-500' : 'border-gray-200 focus:border-[#005F73]'
                        } transition-all duration-200`}
                      disabled={isSubmitting}
                      aria-invalid={formErrors.businessEmail ? 'true' : 'false'}
                      aria-describedby={formErrors.businessEmail ? 'businessEmail-error' : undefined}
                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    />
                    {formErrors.businessEmail && (
                      <p id="businessEmail-error" className="mt-1 text-sm text-red-500" role="alert">{formErrors.businessEmail}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className={`w-full bg-[#005F73] text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-[#004c5c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005F73] transition-all duration-200 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-[#005F73]/25 hover:translate-y-[-1px] active:translate-y-0'
                      }`}
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center" aria-hidden="true">
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Submitting...</span>
                      </span>
                    ) : (
                      'Submit'
                    )}
                  </button>

                  {showSuccessMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <p className="text-green-800 text-center">Thank you! Your case study has been sent to your email.</p>
                    </motion.div>
                  )}
                </form>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Campaigns;
