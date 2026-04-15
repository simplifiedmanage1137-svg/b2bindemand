import React, { useState, useEffect } from 'react';
import styles from './styles/SmartSyndication.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from './Footer';
import Connect_with_buyers from "../assets/Connect_with_buyers.svg";
import researchStrategyImage from "../assets/reseach_strategy.svg";
import Prioritize from "../assets/Prioritize.svg";
import Hyper_Personalized from "../assets/Hyper_Personalized.svg";
import Warm_Lead from "../assets/Warm_Lead.svg";
import Track_Optimize from "../assets/Track_Optimize.svg";
import tent_banner from "../assets/Icon/tent_banner.svg";
import message_search from "../assets/Icon/message_search.svg";
import refresh from "../assets/Icon/refresh.svg";
import people_bottom_card from "../assets/Icon/people_bottom_card.svg";
import radar_three from "../assets/Icon/radar_three.svg";
import Find_the from "../assets/Find_the.svg";
import Turn_Intent from "../assets/Turn_Intent.svg"
import Real_Time from "../assets/Real_Time.svg"
import Verified_Content from "../assets/Verified_Content.png";
import A_Deep_Dive from "../assets/A_Deep_Dive.png";
import Casestudy_3 from "../assets/Casestudy_3.png";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import { Link } from 'react-router-dom';
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

const IntentTargeting = () => {
  const { title, description, keywords, ogImage } = seoConfig.intentTargeting;
  const [activeItem, setActiveItem] = useState('research');
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
      text: "Working with this team has transformed our lead generation process. The results speak for themselves - our pipeline is consistently full of qualified prospects.",
      name: "Sarah Johnson",
      position: "Marketing Director, TechCorp"
    },
    {
      text: "The smart syndication approach helped us reach decision-makers we couldn't before. Our content engagement has increased by 300%.",
      name: "Michael Chen",
      position: "Growth Lead, InnovateX"
    },
    {
      text: "Exceptional results and professional service. They've become an integral part of our marketing strategy.",
      name: "Emily Rodriguez",
      position: "CMO, DataFlow Systems"
    }
  ];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const workItems = {
    research: {
      title: 'ICP Research & Audience Mapping',
      content: 'We define your perfect-fit prospects, ensuring your content reaches the right industries, job titles, and decision-makers.'
    },
    distribution: {
      title: 'Multi-Channel Content Distribution',
      content: 'We strategically distribute your content across multiple channels to maximize reach and engagement.'
    },
    qualification: {
      title: 'Lead Qualification & Intent Tracking',
      content: 'We qualify leads based on engagement and track intent signals to identify high-potential prospects.'
    },
    handoff: {
      title: 'Sales-Ready Lead Handoff',
      content: 'We deliver qualified leads directly to your sales team, ready for conversion.'
    },
    optimization: {
      title: 'Performance Optimization & Scaling',
      content: 'We continuously optimize campaigns and scale successful strategies for better results.'
    }
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
        <link rel="canonical" href="https://b2bindemand.com/intent-targeting" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-[5rem] sm:py-16 lg:py-20">
        <h3 className="text-xl sm:text-2xl font-medium text-[#FF6B2C] mb-6 sm:mb-8 lg:mb-10 text-center lg:text-left">
          {getPageName(currentPath)}
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Content */}
          <div className="mt-0 sm:mt-[-1rem] lg:mt-[-2rem] text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl font-bold leading-tight mb-3 sm:mb-4">
              Connect with buyers
              when they’re
              {/* <br className="hidden sm:block" /> */}
              <span className="text-[#FF6B2C]"> ready</span> to act
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
                src={Connect_with_buyers}
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


      {/* Client Logo Slider Section */}
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

      {/* Why Smart Syndication Section */}
      <div className={styles.whySection} style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className={styles.whyContent}>
          <h2 className={styles.whyHeading}>
            Why <span className={styles.highlight}>Intent Targeting</span>
          </h2>
          <p className={styles.whyDescription}>
            Most marketing efforts push messages out, hoping to capture interest.
            But with intent targeting, we flip the script. We connect you with
            businesses that are actively searching for solutions like yours—so
            you spend less time convincing and more time closing.
          </p>
        </div>

        <div className={styles.featureCards}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <img
                src={Find_the}
                alt=""
                className={styles.featureIconImage}
                style={{ width: "70px", height: "70px" }}
              />
            </div>
            <h3 className={styles.featureTitle}>Find the Buyers Already Looking for a Solution</h3>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <img
                src={Turn_Intent}
                alt=""
                className={styles.featureIconImage}
                style={{ width: "70px", height: "70px" }}
              />
            </div>
            <h3 className={styles.featureTitle}>Turn Intent into Sales Conversations</h3>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <img
                src={Real_Time}
                alt=""
                className={styles.featureIconImage}
                style={{ width: "70px", height: "70px" }}
              />
            </div>
            <h3 className={styles.featureTitle}>Real-Time Insights for Smarter Sales & Marketing</h3>
          </div>
        </div>
      </div>

      {/* How Smart Syndication Works Section */}
      {/* <div className={styles.howItWorksSection} style={{ border: '1px solid #4285F4', borderRadius: '8px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 className={styles.sectionTitle}>How Smart Syndication
        <span className={styles.highlight}>Work</span> {' '}
        </h2>
        <div className={styles.contentWrapper}>
          <div className={styles.itemsList}>
            {Object.entries(workItems).map(([key, item]) => (
              <motion.div
                key={key}
                className={`${styles.workItem} ${activeItem === key ? styles.active : ''}`}
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
          <div 
            className={styles.contentDisplay}
          >
            <div className={styles.contentBox}>
              <img src="/assets/user-business.svg" alt="Business User" className={styles.sectionIcon} style={{ marginBottom: '1rem' }} />
              <h3>{workItems[activeItem].title}</h3>
              <p>{workItems[activeItem].content}</p>
            </div>
          </div>
        </div>
      </div> */}

      {/* How Intent Targeting */}
      <div
        className={styles.getSection}
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">
          How Intent Targeting <span className="text-[#FF6B2C]"> Works</span>
        </h2>

        <div className="flex flex-col md:flex-row border border-gray-100 rounded-lg shadow-sm items-center justify-between gap-8 sm:gap-12 lg:gap-16 p-6 sm:p-8 mt-8 sm:mt-12">
          {/* Left: Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <img
              src={researchStrategyImage}
              alt="Research and Strategy Process"
              className="w-full max-w-[250px] sm:max-w-[300px] h-auto object-contain"
            />
          </div>

          {/* Right: Text */}
          <div className="w-full md:w-1/2 space-y-4 sm:space-y-6 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-medium text-gray-400">
              Identify Buying Signals
            </h3>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              We search and track trends, competitor engagement, and content consumption to pinpoint high-intent prospects.
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row border border-gray-100 rounded-lg shadow-sm items-center justify-between gap-8 sm:gap-12 lg:gap-16 p-6 sm:p-8 mt-8 sm:mt-12">
          {/* Left: Text */}
          <div className="w-full md:w-1/2 space-y-4 sm:space-y-6 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-medium text-gray-400">
              Prioritize & Score Leads
            </h3>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Prospects are scored based on their behavior, interactions, and engagement level to focus efforts on the best-fit buyers.
            </p>
          </div>

          {/* Right: Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img
              src={Prioritize}
              alt="Multi-Touch Engagement Process"
              className="w-full max-w-[250px] sm:max-w-[300px] h-auto object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row border border-gray-100 rounded-lg shadow-sm items-center justify-between gap-8 sm:gap-12 lg:gap-16 p-6 sm:p-8 mt-8 sm:mt-12">
          {/* Left: Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <img
              src={Hyper_Personalized}
              alt="Qualification and Lead Scoring Process"
              className="w-full max-w-[250px] sm:max-w-[300px] h-auto object-contain"
            />
          </div>

          {/* Right: Text */}
          <div className="w-full md:w-1/2 space-y-4 sm:space-y-6 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-medium text-gray-400">
              Hyper-Personalized Outreach
            </h3>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Your messaging is tailored based on what each prospect is researching and where they are in their buying journey.
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row border border-gray-100 rounded-lg shadow-sm items-center justify-between gap-8 sm:gap-12 lg:gap-16 p-6 sm:p-8 mt-8 sm:mt-12">
          {/* Left: Text */}
          <div className="w-full md:w-1/2 space-y-4 sm:space-y-6 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-medium text-gray-400">
              Warm Lead Handoff to Sales
            </h3>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Your team gets a steady flow of high-intent leads, cutting down on wasted time and cold conversations.
            </p>
          </div>

          {/* Right: Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img
              src={Warm_Lead}
              alt="Meeting Booking and Handoff Process"
              className="w-full max-w-[250px] sm:max-w-[300px] h-auto object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row border border-gray-100 rounded-lg shadow-sm items-center justify-between gap-8 sm:gap-12 lg:gap-16 p-6 sm:p-8 mt-8 sm:mt-12">
          {/* Left: Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <img
              src={Track_Optimize}
              alt="Optimization and Scaling Process"
              className="w-full max-w-[250px] sm:max-w-[300px] h-auto object-contain"
            />
          </div>

          {/* Right: Text */}
          <div className="w-full md:w-1/2 space-y-4 sm:space-y-6 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-medium text-gray-400">
              Track, Optimize & Scale
            </h3>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              We analyze engagement patterns and adjust the strategy to improve results over time.
            </p>
          </div>
        </div>
      </div>


      {/* What You Get with Smart Syndication Section */}
      <div className={styles.getSection} style={{ maxWidth: '750px', margin: '4rem auto', padding: '0rem' }}>
        <h2 className={styles.sectionTitle}>
          What You <span className={styles.highlight}>Get</span> with Intent Targeting
        </h2>
        <div className={styles.getFeatures}>
          <div className={styles.getFeatureItem}>
            <div className={styles.getFeatureIcon}><img src={tent_banner} alt="Pipeline filled with buyers" /></div>
            <div className={styles.getFeatureText}>Pipeline filled with buyers actively searching for solutions.</div>
          </div>
          <div className={styles.getFeatureItem}>
            <div className={styles.getFeatureIcon}><img src={message_search} alt="Higher response rates" /></div>
            <div className={styles.getFeatureText}>Higher response rates from decision-makers in research mode.</div>
          </div>
          <div className={styles.getFeatureItem}>
            <div className={styles.getFeatureIcon}><img src={refresh} alt="Shorter sales cycles" /></div>
            <div className={styles.getFeatureText}>Shorter sales cycles by engaging leads at the right time</div>
          </div>
          <div className={styles.getFeatureItem}>
            <div className={styles.getFeatureIcon}><img src={people_bottom_card} alt="Less wasted effort on unqualified prospects" /></div>
            <div className={styles.getFeatureText}> Less wasted effort on unqualified prospects.</div>
          </div>
          <div className={styles.getFeatureItem}>
            <div className={styles.getFeatureIcon}><img src={radar_three} alt="Actionable insights to refine targeting and messaging" /></div>
            <div className={styles.getFeatureText}>Actionable insights to refine targeting and messaging.</div>
          </div>
        </div>
      </div>

      {/* Testimonial Slider Section */}
      {/* <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 overflow-hidden">
        <div className="relative">
         
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center sm:text-left max-w-[500px]">
              See How They got Their Job{" "}
              <span className="text-[#FF6B2C]">Done</span>...
            </h2>
            <div className="flex gap-3 relative">
              <div className="absolute inset-0 bg-[#FFF8E7] -skew-x-12 rounded-full w-[100px] sm:w-[120px] h-full -z-10"></div>
              <button
                className="w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full flex items-center justify-center bg-[#FFC107] text-white shadow-md hover:bg-[#FFB300] active:bg-[#FFA000] transition-colors"
                onClick={() => handleSlide("prev")}
                aria-label="Previous slide"
              >
                &#8592;
              </button>

              <button
                className="w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full flex items-center justify-center bg-[#FFC107] text-white shadow-md hover:bg-[#FFB300] active:bg-[#FFA000] transition-colors"
                onClick={() => handleSlide("next")}
                aria-label="Next slide"
              >
                &#8594;
              </button>
            </div>
          </div>
          <div
            ref={carouselRef}
            className="flex gap-3 sm:gap-5 lg:gap-8 overflow-x-hidden scroll-smooth"
          >
            <div className="flex gap-3 sm:gap-5 lg:gap-8 pb-3 sm:pb-5 lg:pb-8 px-1 sm:px-3 lg:px-4">
              {cardData.map((card) => (
                <div key={card.id} className="min-w-[260px] sm:min-w-[400px] lg:min-w-[600px] bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg transition-transform hover:scale-[1.02] duration-300">
                  <div className="flex flex-col sm:flex-row h-full">
                    <div className="w-full sm:w-1/2 p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 lg:mb-4">
                        {card.title.split(card.highlightText).map((part, index, array) => (
                          <React.Fragment key={index}>
                            {part}
                            {index < array.length - 1 && (
                              <span className="text-[#FF6B2C]">{card.highlightText}</span>
                            )}
                          </React.Fragment>
                        ))}
                      </h3>
                      <div
                        className="flex items-center text-[#FF6B2C] hover:gap-2 transition-all cursor-pointer group mt-auto"
                        onClick={() => handlePdfDownload(card)}
                      >
                        <span className="text-sm sm:text-base">Read</span>
                        <span className="ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform">
                          &#8594;
                        </span>
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2 h-40 sm:h-auto">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover rounded-b-lg sm:rounded-none sm:rounded-r-xl lg:rounded-r-2xl"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div> */}

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

      {/* Demand Generation Section */}
      <div className={styles.demandGenSection}>
        <h1 className={styles.demandGenTitle}>
          Reach Buyers Before They Even <br /> Hit '
          <span className={styles.highlight}>Request a Demo</span>'
        </h1>
        <p className={styles.demandGenSubtitle}>
          The right timing changes everything. Let’s help you engage high- <br />
          intent prospects<span className={styles.subtitleGray}> before your competitors do.</span>
        </p>
        <div className={styles.callButtonWrapper}>
          <Link to="https://calendly.com/rohit-b2bindemand/30min?month=2025-03" target="_blank" className={styles.bookCallButton}>Book a call</Link>
        </div>
        {/* <div className={styles.metricsContainer}>
          <div className={styles.metricItem}>
            <div className={styles.metricValue}>100+</div>
            <div className={styles.metricLabel}>Opportunities Yearly</div>
          </div>
          <div className={styles.metricItem}>
            <div className={styles.metricValue}>13%</div>
            <div className={styles.metricLabel}>Deal Closing Rate</div>
          </div>
          <div className={styles.metricItem}>
            <div className={styles.metricValue}>9:1</div>
            <div className={styles.metricLabel}>ROI Achieved</div>
          </div>
        </div> */}
      </div>

      <Footer />
    </div>

  );
};

export default IntentTargeting;