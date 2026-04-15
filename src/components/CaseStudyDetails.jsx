import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { seoConfig } from '../utils/seoConfig';
import Footer from './Footer';

// Asset imports
import Verified_Content from '../assets/Verified_Content.webp';
import A_Deep_Dive from '../assets/A_Deep_Dive.png';
import Casestudy_3 from '../assets/Casestudy_3.webp';
import Driving_High_Quality from '../assets/pdf/Driving_High_Quality.pdf';
import MicrosoftPdf from '../assets/pdf/Microsoft_Casestudy_Pdf.pdf';
import B2BinDemandPdf from '../assets/pdf/Driving_High_Quality.pdf';

const Toast = ({ message, type = 'success', onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`}
  >
    <div className="flex items-center">
      {type === 'success' ? (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
      {message}
    </div>
  </motion.div>
);

const CaseStudyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setLoading(false), 500);
  }, [id]);

  // Case studies data with correct PDF paths
  const caseStudies = {
    'amplifying-marketing-impact-with-mql-generation': {
      title: 'Amplifying Marketing Impact with MQL Generation',
      subtitle: 'A Case Study on Marketing Qualified Lead Generation',
      description: 'Discover how B2BinDemand\'s innovative approach transformed lead generation and amplified marketing impact through strategic MQL generation.',
      image: Verified_Content,
      downloadPdf: B2BinDemandPdf,
      stats: [
        { value: '250%', label: 'Increase in MQLs' },
        { value: '40%', label: 'Improved Conversion Rate' },
        { value: '2.8x', label: 'ROI Achievement' }
      ],
      content: [
        {
          title: 'The Challenge',
          text: 'The client needed to significantly increase their marketing qualified leads (MQLs) while maintaining high lead quality and optimizing their marketing spend.'
        },
        {
          title: 'Our Solution',
          text: 'We implemented a comprehensive MQL generation strategy combining targeted content syndication, advanced lead scoring, and multi-channel nurturing campaigns.'
        },
        {
          title: 'The Results',
          text: 'Our approach led to a 250% increase in MQLs, with a 40% improvement in lead-to-opportunity conversion rates, delivering a 2.8x return on investment.'
        }
      ]
    },
    'driving-13000-qualified-leads-for-microsoft-azure': {
      title: 'Driving 13,000 Qualified Leads for Microsoft Azure',
      subtitle: 'A Case Study on Targeted Content Syndication',
      description: 'Learn how we helped Microsoft optimize their B2B lead generation process.',
      image: A_Deep_Dive,
      downloadPdf: MicrosoftPdf,
      stats: [
        { value: '250%', label: 'Lead Quality Improvement' },
        { value: '40%', label: 'Cost Reduction' },
        { value: '3x', label: 'Pipeline Growth' }
      ],
      content: [
        {
          title: 'The Challenge',
          text: 'To generate 13,000 opt-in leads within a competitive Q4 (OND).'
        },
        {
          title: 'Our Solution',
          text: 'Leveraging inhouse properties with high-traffic ecosystem (Silicon Media Network, B2BConnectHub) to distribute Microsoft’s content to the right audiences, ensuring maximum visibility and engagement.'
        },
        {
          title: 'The Results',
          text: '13,000+ Opt-In Leads, Increased Landing Page Conversions, Upweight Budget'
        }
      ]
    },
    'driving-high-quality-live-event-engagement-for-zoom': {
      title: 'Driving High Quality Live-Event Engagement for ZOOM',
      subtitle: 'A Case Study on Targeted Email Marketing',
      description: 'Comprehensive guide covering all aspects of B2B marketing and lead generation.',
      image: Casestudy_3,
      downloadPdf: Driving_High_Quality,
      stats: [
        { value: '100+', label: 'Pages of Insights' },
        { value: '50+', label: 'Case Studies' },
        { value: '10+', label: 'Years Experience' }
      ],
      content: [
        {
          title: 'The Challenge',
          text: 'Zoom had a gold-standard event in the works, featuring the President of Product and Engineering at Zoom. But they needed quality attendance, not just numbers.'
        },
        {
          title: 'Our Solution',
          text: 'Building a highly personalized outreach strategy designed to attract, engage, and convert the right audience.'
        },
        {
          title: 'The Results',
          text: 'With an awesome 13.7% Conversion Rate & 38% attendance, Zoom now had a pre-qualified, high-value list ready for post-event nurturing.'
        }
      ]
    }
  };

  const caseStudy = caseStudies[id];

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Simulate API call for form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Log form data
      console.log('Form submitted:', formData);
      
      // Create a blob from the PDF file
      const response = await fetch(caseStudy.downloadPdf);
      const blob = await response.blob();
      
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = `${caseStudy.title.toLowerCase().replace(/\s+/g, '-')}.pdf`;
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
      });

      // Show success message
      showToast('PDF downloaded successfully!', 'success');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      setError('An error occurred while downloading the PDF. Please try again.');
      showToast('Failed to download PDF. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b pt-16 from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#005F73] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading case study...</p>
        </div>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Case Study Not Found</h1>
          <Link
            to="/Resources/Library"
            className="text-[#005F73] hover:text-[#004C5C] transition-colors duration-200"
          >
            Back to Library
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b pt-16 from-gray-50 to-white">
      <Helmet>
        <title>{`${caseStudy.title} | B2BinDemand Case Studies`}</title>
        <meta name="description" content={caseStudy.description} />
        <meta name="keywords" content={seoConfig.caseStudyDetails.keywords} />
        <meta property="og:title" content={`${caseStudy.title} | B2BinDemand Case Studies`} />
        <meta property="og:description" content={caseStudy.description} />
        <meta property="og:image" content={caseStudy.image} />
      </Helmet>

      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} />}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            to="/Resources/Library"
            className="inline-flex items-center text-[#005F73] hover:text-[#004C5C] mb-8 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Library
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={caseStudy.image}
                alt={caseStudy.title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* <div className="grid grid-cols-3 gap-4 mt-8">
              {caseStudy.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-gray-100 text-center hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-2xl font-bold text-[#005F73]">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div> */}
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100 p-8 shadow-lg"
            >
              <h1 className="text-2xl sm:text-2xl font-bold text-gray-900 mb-4">{caseStudy.title}</h1>
              <p className="text-lg text-gray-600">{caseStudy.subtitle}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100 p-8 shadow-lg"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Download the Full Case Study</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {error}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#005F73] focus:border-transparent transition-shadow duration-200"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#005F73] focus:border-transparent transition-shadow duration-200"
                    placeholder="Enter your business email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#005F73] focus:border-transparent transition-shadow duration-200"
                    placeholder="Enter your company name"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={submitting}
                  className={`w-full py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg ${
                    submitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-[#005F73] hover:bg-[#004C5C] text-white'
                  }`}
                >
                  {submitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    'Download PDF'
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {caseStudy.content.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{section.title}</h2>
              <p className="text-gray-600 leading-relaxed">{section.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="relative rounded-3xl overflow-hidden p-12 "
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Case Studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            {Object.entries(caseStudies)
              .filter(([key]) => key !== id)
              .slice(0, 3)
              .map(([key, study], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                >
                  <Link
                    to={`/case-study/${key}`}
                    className="group block bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 h-full transform hover:-translate-y-1"
                  >
                    
                    <div className="aspect-w-16 aspect-h-9 relative">
                      <img
                        src={study.image}
                        alt={study.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#005F73] transition-colors duration-200">
                        {study.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{study.subtitle}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>
      <hr className="my-8" />
      <Footer />
    </div>
  );
};

export default CaseStudyDetails;
