import React, { useState, useEffect } from "react";
import styles from "./styles/SmartSyndication.module.css";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "./Footer";
import Turn_Industry_Events from "../assets/Turn_Industry_Events.png";
import every_user from "../assets/every_user.svg";
import Pre_Event_Outreach from "../assets/Pre_Event_Outreach.svg";
import On_Site_Lead_Engagement from "../assets/On_Site_Lead_Engagement.svg";
import Post_Event_Follow_Ups from "../assets/Post_Event_Follow_Ups.svg";
import Data_Optimization from "../assets/Data_Optimization.svg";
import online_meeting from "../assets/Icon/online_meeting.svg";
import hold_seeds from "../assets/Icon/hold_seeds.svg";
import cross_ring_two from "../assets/Icon/cross_ring_two.svg";
import nine_points_connected from "../assets/Icon/nine_points_connected.svg";
import { useLocation } from "react-router-dom";
import Verified_Content from "../assets/Verified_Content.png";
import A_Deep_Dive from "../assets/A_Deep_Dive.png";
import Casestudy_3 from "../assets/Casestudy_3.png";
import Make_Meaningful from "../assets/Make_Meaningful.svg";
import Turn_Conversations from "../assets/Turn_Conversations.svg";
import Get_in from "../assets/Get_in.svg";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { Helmet } from 'react-helmet';
import { seoConfig } from '../utils/seoConfig';
import CaseStudySection from './common/CaseStudySection';
import { useNavigate } from "react-router-dom";

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

const EventBasedLeadGeneration = () => {
  const { title, description, keywords, ogImage } = seoConfig.eventBasedLeadGen;
  const [activeItem, setActiveItem] = useState("research");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
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

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const navigate = useNavigate();

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

  const handleCaseStudyClick = (card) => {
    navigate(`/case-study/${card.id}`);
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
        const pdfPath = `${baseUrl}/assets/pdf/${selectedPdf.pdfName}`;

        // First try to open in new tab
        const newWindow = window.open(pdfPath, '_blank');

        // If popup was blocked or failed, fallback to download
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          const link = document.createElement('a');
          link.href = pdfPath;
          link.download = selectedPdf.pdfName;
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
      image: every_user,
      title: "Research & Targeting",
      content:
        "We identify high-value industry events and analyze attendee profiles to target decision-makers most likely to need your solution.",
    },
    distribution: {
      image: Pre_Event_Outreach,
      title: "Pre-Event Outreach",
      content:
        "We create targeted campaigns to connect with potential prospects before the event, setting the stage for meaningful conversations.",
    },
    qualification: {
      image: On_Site_Lead_Engagement,
      title: "On-Site Lead Engagement",
      content:
        "We help you maximize event presence through strategic booth placement, content delivery, and real-time lead qualification.",
    },
    handoff: {
      image: Post_Event_Follow_Ups,
      title: "Post-Event Follow-Ups",
      content:
        "We implement personalized follow-up strategies to convert event connections into sales opportunities.",
    },
    optimization: {
      image: Data_Optimization,
      title: "Data & Optimization",
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
    { src: "/logos/sophos.png", alt: "Sophos" },
    { src: "/logos/verizon.png", alt: "Verizon" },
    { src: "/logos/zeta.png", alt: "Zeta" },
    { src: "/logos/microfocus.png", alt: "Micro Focus" },
    { src: "/logos/oneTrust.png", alt: "One Trust" },
    { src: "/logos/redHat.png", alt: "Red Hat" },
  ];


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

        {/* Canonical URL */}
        <link rel="canonical" href="https://b2bindemand.com/event-based-lead-generation" />
      </Helmet>

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-[5rem] sm:py-16 lg:py-20">
        <h3 className="text-xl sm:text-2xl font-medium text-[#FF6B2C] mb-6 sm:mb-8 lg:mb-10 text-center lg:text-left">
          {getPageName(currentPath)}
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Content */}
          <div className="mt-0 sm:mt-[-1rem] lg:mt-[-2rem] text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl font-bold leading-tight mb-3 sm:mb-4">
            Turn Industry <br /> Events into <br/>
              {/* <br className="hidden sm:block" /> */}
              <span className="text-[#FF6B2C]"> Sales Opportunities</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl lg:max-w-none mx-auto lg:mx-0">
            Find prospects who are already looking for what you offer.
            </p>
            <Link
              to="/contact-us"
              className="inline-flex items-center justify-center bg-[#005F73] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-base sm:text-lg font-medium hover:bg-[#004c5c] transition-all duration-200 hover:shadow-lg hover:shadow-[#005F73]/25 hover:translate-y-[-2px] active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005F73]"
            >
              Get a Quote
            </Link>
          </div>

          {/* Right Image */}
          <div className="relative mt-8 lg:mt-0 flex justify-center lg:justify-end">
            <motion.div className="w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[600px] xl:max-w-[650px]">
              <motion.img
                src={Turn_Industry_Events}
                alt="Full Funnel Outreach"
                className="w-full h-auto pt-4 sm:pt-6 lg:pt-10"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut"
                }}
              />
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
            Why{" "}
            <span className={styles.highlight}>
              Event-Based Lead Generation
            </span>
          </h2>
          <p className={styles.whyDescription}>
            The best meetings don’t happen by chance—they’re planned.  No wasted
            time. No missed connections. Just real conversations with the right
            people. With Event-Based Lead Generation, we help you identify,
            engage, and convert high-value prospects—before, during, and after
            the event.
          </p>
        </div>

        <div className={styles.featureCards}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}> <img
              src={Make_Meaningful}
              alt="Make meaningful event-based B2B connections"
              className={styles.featureIconImage}
              style={{ width: "70px", height: "70px" }}
            /></div>
            <h3 className={styles.featureTitle}>
              Make Meaningful Connections
              On-Site
            </h3>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><img
              src={Turn_Conversations}
              alt="Turn conversations into sales conversions"
              className={styles.featureIconImage}
              style={{ width: "70px", height: "70px" }}
            /></div>
            <h3 className={styles.featureTitle}>
              Turn Conversations into Conversions After the Event
            </h3>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><img
              src={Get_in}
              alt="Get in front of the right decision makers before the event"
              className={styles.featureIconImage}
              style={{ width: "70px", height: "70px" }}
            /></div>
            <h3 className={styles.featureTitle}>
              Get in Front of the Right People Before the Event
            </h3>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div
        className={styles.howItWorksSection}
        style={{
          border: "1px solid #4285F4",
          borderRadius: "8px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h2 className={styles.sectionTitle}>
          How Event-Based Lead Generation
          <span className={styles.highlight}> Works</span>
        </h2>
        <div className={styles.contentWrapper}>
          <div className={styles.itemsList}>
            {Object.entries(workItems).map(([key, item]) => (
              <motion.div
                key={key}
                className={`${styles.workItem} ${activeItem === key ? styles.active : ""
                  }`}
                onClick={() => setActiveItem(key)}
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className={styles.itemTitle}>{item.title}</span>
                <motion.span
                  className={styles.arrow}
                  animate={{ x: activeItem === key ? 10 : 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  →
                </motion.span>
              </motion.div>
            ))}
          </div>
          <div className={styles.contentDisplay}>
            <div className={styles.contentBox} style={{ position: "relative" }}>
              <img
                src={workItems[activeItem].image}
                alt={workItems[activeItem].title}
                className="top-0 right-0 w-[8rem] h-[8rem] m-4 mb-12"
              />
              <h3>{workItems[activeItem].title}</h3>
              <p>{workItems[activeItem].content}</p>
            </div>
          </div>
        </div>
      </div>

      {/* What You Get Section */}
      <div
        className={styles.getSection}
        style={{ maxWidth: "760px", margin: "4rem auto", padding: "2rem" }}
      >
        <h2 className={styles.sectionTitle}>
          What You Get with <br />
          Event-Based Lead Generation
        </h2>
        <div className={styles.getFeatures}>
          <div className={styles.getFeatureItem}>
            <div className={styles.getFeatureIcon}><img src={online_meeting} alt="More qualified meetings booked before the event." /></div>
            <div className={styles.getFeatureText}>
              More qualified meetings booked before the event.
            </div>
          </div>
          <div className={styles.getFeatureItem}>
            <div className={styles.getFeatureIcon}><img src={hold_seeds} alt="Stronger connections with decision-makers." /></div>
            <div className={styles.getFeatureText}>
              Stronger connections with decision-makers.
            </div>
          </div>
          <div className={styles.getFeatureItem}>
            <div className={styles.getFeatureIcon}><img src={cross_ring_two} alt="Follow-ups that keep deals moving." /></div>
            <div className={styles.getFeatureText}>
              Follow-ups that keep deals moving.
            </div>
          </div>
          <div className={styles.getFeatureItem}>
            <div className={styles.getFeatureIcon}><img src={nine_points_connected} alt="More qualified meetings booked before the event." /></div>
            <div className={styles.getFeatureText}>
              Higher ROI from every event you attend.
            </div>
          </div>

        </div>
      </div>

      {/* Testimonial Slider Section */}
      <CaseStudySection
        title="See How They got Their Job"
        highlightText="Done..."
        cards={cardData}
        onCardClick={handleCaseStudyClick}
      />



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

      {/* Call to Action Section */}
      <div className={styles.demandGenSection}>
        <h1 className={styles.demandGenTitle}>
          Turn Events into Revenue, Not <br />
          <span className={styles.highlight}>Just Conversations</span>
        </h1>
        <p className={styles.demandGenSubtitle}>
          Let’s make sure your next event isn’t just a networking opportunity—{" "}
          <br />
          <span className={styles.subtitleGray}> it’s a sales accelerator. </span>
        </p>
        <div className={styles.callButtonWrapper}>
          <Link to="https://calendly.com/rohit-b2bindemand/30min?month=2025-03" target="_blank" className={styles.bookCallButton}>Book a call</Link>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default EventBasedLeadGeneration;
