import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const Unsubscribe = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Send notification to admin using admin template
      await emailjs.send(
        'service_m0cz9oe',
        'template_3iyjdi6',
        {
          email: email,
          subject: '🔔 Unsubscribe Request',
          message: `A user has requested to unsubscribe from our communications.`,
          type: 'Unsubscribe Request',
          emoji: '📧',
          // Additional structured data for admin template
          user_email: email,
          request_type: 'Unsubscribe',
          timestamp: new Date().toLocaleString(),
          status: 'Pending'
        },
        'FWXDgNP6A3TBK3Y55'
      );

      // Send confirmation to user using user template
      await emailjs.send(
        'service_m0cz9oe',
        'template_clr75s2',
        {
          to_email: email,
          subject: 'Unsubscribe Request Confirmation',
          name: email.split('@')[0], // Basic personalization
          message: `
            We have received your request to unsubscribe from B2BinDemand communications.
            
            Our team will process your request within 24-48 hours. If you have any questions
            in the meantime, please don't hesitate to contact our support team.
            
            Thank you for your past engagement with B2BinDemand.
          `,
          cta_text: 'Contact Support',
          cta_link: 'mailto:support@b2bindemand.com',
          footer_text: 'B2BinDemand - Your B2B Lead Generation Partner'
        },
        'FWXDgNP6A3TBK3Y55'
      );

      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      
      // Send error notification to admin
      try {
        await emailjs.send(
          'service_m0cz9oe',
          'template_3iyjdi6',
          {
            email: 'support@b2bindemand.com',
            subject: '⚠️ Unsubscribe Error',
            message: `Error processing unsubscribe request for ${email}. Error: ${error.message}`,
            type: 'Error Report',
            emoji: '⚠️',
            error_details: JSON.stringify(error)
          },
          'FWXDgNP6A3TBK3Y55'
        );
      } catch (adminError) {
        console.error('Admin notification error:', adminError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 font-[poppins]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-[#035271] mb-4">Unsubscribe from Communications</h1>
          <p className="text-gray-600 leading-relaxed">
            We're sorry to see you go. Enter your email address below, and we'll process your unsubscribe request within 24-48 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF6B2C] focus:border-transparent outline-none transition-all"
              placeholder="Enter your email address"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all
              ${isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-[#FF6B2C] hover:bg-[#035271]'
              }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : 'Unsubscribe'
            }
          </button>

          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 rounded-lg bg-green-50 text-green-700 text-center"
            >
              <p className="font-medium mb-1">Request Received</p>
              <p className="text-sm">Your unsubscribe request has been submitted. You'll receive a confirmation email shortly.</p>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 rounded-lg bg-red-50 text-red-700 text-center space-y-2"
            >
              <p className="font-medium">Something went wrong</p>
              <p className="text-sm">
                Please try again or contact our support team at{' '}
                <a 
                  href="mailto:support@b2bindemand.com" 
                  className="text-[#FF6B2C] hover:text-[#035271] underline font-medium"
                >
                  support@b2bindemand.com
                </a>
              </p>
            </motion.div>
          )}
        </form>
      </motion.div>
      
    </div>
    
  );
};

export default Unsubscribe;
