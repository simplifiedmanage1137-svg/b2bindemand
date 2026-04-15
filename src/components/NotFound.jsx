import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from './Footer';

const NotFound = () => {
  return (
    <>
      <div className="min-h-[100vh] bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-[150px] font-bold text-[#005F73] leading-none mb-4">404</h1>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/"
                className="px-8 py-2 bg-[#005F73] text-white rounded-xl hover:bg-[#004C5C] transition-all duration-300 text-lg font-medium"
              >
                Go Home
              </Link>
              {/* <a
                href="mailto:support@b2bindemand.com"
                className="px-8 py-2 border-2 border-[#005F73] text-[#005F73] rounded-xl hover:bg-[#005F73] hover:text-white transition-all duration-300 text-lg font-medium"
              >
                Contact Support
              </a> */}
            </div>

            <motion.div
              className="mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="flex items-center justify-center space-x-4 text-gray-500">
                
                <Link to="/about-b2bindemand" className="hover:text-[#005F73] transition-colors">
                  About
                </Link>
                <span>•</span>
                <Link to="/blog" className="hover:text-[#005F73] transition-colors">
                  Blog
                </Link>
                <span>•</span>
                <Link to="/contact-us" className="hover:text-[#005F73] transition-colors">
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
