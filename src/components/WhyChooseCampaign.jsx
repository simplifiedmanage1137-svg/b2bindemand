import React from 'react';
import { motion } from "framer-motion";

const WhyChooseCampaign = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-6 pt-32 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Content */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-6xl font-bold mb-8"
          >
            Why Choose
            <br />
            <span className="text-[#F26C1E]">Campaign+</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 mb-12 max-w-2xl leading-relaxed"
          >
            B2B sales is a battlefield. Securing meetings with decision-makers isn't
            just about sending emails—it's about the right message, timing, and
            execution. We handle your entire outreach process, ensuring your
            pipeline is filled with qualified, high-intent prospects ready for a sales
            conversation!
          </motion.p>
        </div>

        {/* Right Content - Feature Cards */}
        <div className="bg-black rounded-[44px] p-8 shadow-2xl">
          <div className="space-y-4">
            {/* Multi-Channel Outreach Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#e2f6fc] p-6 rounded-[14px] flex items-center gap-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center">
                <svg
                  className="w-full h-full text-[#F26C1E]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-black">Multi-Channel Outreach</h3>
            </motion.div>

            {/* Meetings Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#e2f6fc] p-6 rounded-[14px] flex items-center gap-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center">
                <svg
                  className="w-full h-full text-[#F26C1E]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-black">Meetings with High-Intent Buyers</h3>
            </motion.div>

            {/* Scalable Growth Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#e2f6fc] p-6 rounded-[14px] flex items-center gap-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center">
                <svg
                  className="w-full h-full text-[#F26C1E]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-black">Scalable Growth & Measurable Results</h3>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseCampaign;