import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { BackgroundBeamsWithCollision } from './ui/background-beams';
import Footer from './Footer';
import { seoConfig } from '../utils/seoConfig';

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const { title, description, keywords, ogImage } = seoConfig.faq;

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How can lead generation benefit my business?",
      answer: "Lead generation can benefit your business by providing a consistent stream of potential customers who have shown interest in your products or services, increasing your chances of conversions and revenue growth."
    },
    {
      question: "What types of businesses can benefit from lead generation services?",
      answer: "Lead generation services can benefit a wide range of businesses, including both B2B and B2C industries such as technology, consulting, real estate, healthcare, e-commerce, software development, and many more."
    },
    {
      question: "How can I ensure the quality of leads generated?",
      answer: "To ensure the quality of leads generated, we employ various strategies such as targeted audience segmentation, qualifying criteria, and lead scoring. Additionally, continuous monitoring and refining of lead generation campaigns help maintain a high-quality lead pipeline for your business."
    },
    {
      question: "How do you target the right audience for lead generation?",
      answer: "To target the right audience for lead generation, we leverage various techniques such as data analysis, market research, and customer profiling. By understanding your ideal customer's demographics, behaviors, and interests, we can tailor our lead generation strategies to effectively reach and engage the most relevant audience for your business."
    },
    {
      question: "Can lead generation services be customized for specific industries?",
      answer: "Yes, lead generation services can be customized to suit the specific needs and requirements of different industries. We understand that each industry has unique characteristics, target audience, and goals. Our lead generation strategies can be tailored to align with your industry's specific dynamics and maximize the generation of high-quality leads for your business."
    },
    {
      question: "How do you measure the success of a lead generation campaign?",
      answer: "The success of a lead generation campaign is measured through key performance indicators (KPIs) such as lead conversion rates, cost per lead, return on investment (ROI), and engagement metrics. By analyzing these metrics, we can evaluate the effectiveness of the campaign and make data-driven decisions for continuous improvement."
    },
    {
      question: "What is the cost of lead generation services?",
      answer: "The cost of lead generation services can vary depending on various factors, including the scope of the project, the target audience, the chosen lead generation methods, and the level of customization required. We provide tailored pricing options based on your specific requirements, ensuring you receive the best value for your investment. Contact us for a personalized quote."
    },
    {
      question: "How long does it take to see results from lead generation efforts?",
      answer: "The time it takes to see results from lead generation efforts can vary depending on factors such as your industry, target audience, lead generation strategies, and the complexity of your sales cycle. While some businesses may start seeing results within weeks, others may take several months. We work diligently to optimize campaigns for efficiency and strive to deliver measurable results as soon as possible."
    },
    {
      question: "Are there any guarantees for lead quality or lead conversion rates?",
      answer: "While we cannot provide guarantees for lead quality or lead conversion rates, we employ industry best practices and advanced targeting strategies to generate high-quality leads. Our focus is on delivering a steady flow of qualified leads, and we work closely with you to optimize campaigns for maximum conversion potential."
    },
    {
      question: "Do you provide lead nurturing services as well?",
      answer: "Yes, we provide lead nurturing services to help cultivate and engage leads throughout the buyer's journey. Our lead nurturing strategies aim to build relationships, provide relevant information, and move prospects closer to conversion, maximizing the chances of turning leads into loyal customers."
    },
    {
      question: "How do you handle data privacy and comply with regulations?",
      answer: "We prioritize data privacy and strictly adhere to regulations to ensure the security of your information. Our practices align with relevant data protection laws, including handling and storing data securely, obtaining necessary consents, and implementing measures to safeguard sensitive information. Your data privacy is of utmost importance to us."
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white to-gray-50 overflow-hidden">
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

        <link rel="canonical" href="https://b2bindemand.com/faqs" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <BackgroundBeamsWithCollision>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-[8rem] pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#005F73] mb-4 tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our lead generation services.
            </p>
          </motion.div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 lg:p-10">
            <div className="grid gap-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50/80 backdrop-blur-sm rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors duration-200"
                  >
                    <span className="text-lg font-medium text-[#005F73]">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-[#005F73]"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {expandedIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 py-4 text-gray-600 border-t border-gray-100 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
      <Footer />
    </div>
  );
};

export default FAQ;
