import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 2000); // Show after 2 seconds
      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex-1 text-sm text-gray-700 mr-8">
          <p>
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
            By clicking "Accept", you consent to our use of cookies. Read more in our{' '}
            <Link to="/cookie-policy" className="text-blue-600 hover:text-blue-800">
              Cookie Policy
            </Link>
            {' '}and{' '}
            <Link to="/gdpr-policy" className="text-blue-600 hover:text-blue-800">
              GDPR Policy
            </Link>
            .
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-4">
          <button
            onClick={handleAccept}
            className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#035271] hover:bg-[#023e54] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
