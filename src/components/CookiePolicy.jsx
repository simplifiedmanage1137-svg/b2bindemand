import React from 'react';
import { Helmet } from 'react-helmet';
import Footer from './Footer';

const CookiePolicy = () => {
  return (
    <>
      <Helmet>
        <title>Cookie Policy | B2BinDemand</title>
        <meta name="description" content="Learn about how B2BinDemand uses cookies to enhance your browsing experience." />
      </Helmet>
      <div className="min-h-screen bg-white pt-10">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-[#035271] mb-8">Cookie Policy</h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#035271] mb-4">What Are Cookies</h2>
              <p className="text-gray-700 mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
                They are widely used to make websites work more efficiently and provide a better user experience.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#035271] mb-4">How We Use Cookies</h2>
              <p className="text-gray-700 mb-4">
                We use cookies for various purposes including:
              </p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Essential cookies for website functionality</li>
                <li>Analytics cookies to understand user behavior</li>
                <li>Preference cookies to remember your settings</li>
                <li>Marketing cookies for targeted advertising</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#035271] mb-4">Managing Cookies</h2>
              <p className="text-gray-700 mb-4">
                You can control and manage cookies in various ways. Please note that removing or blocking cookies can impact your user experience and parts of our website may no longer be fully accessible.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#035271] mb-4">Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about our use of cookies, please contact us.
              </p>
            </section>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CookiePolicy;
