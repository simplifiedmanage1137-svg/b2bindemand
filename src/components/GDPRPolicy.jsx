import React from 'react';
import { Helmet } from 'react-helmet';
import Footer from './Footer';

const GDPRPolicy = () => {
  return (
    <>
      <Helmet>
        <title>GDPR Policy | B2BinDemand</title>
        <meta name="description" content="Learn about B2BinDemand's GDPR compliance and data protection policies." />
      </Helmet>
      <div className="min-h-screen bg-white pt-10">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-[#035271] mb-8">GDPR Policy</h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#035271] mb-4">Overview</h2>
              <p className="text-gray-700 mb-4">
                This policy outlines how B2BinDemand collects, processes, and protects personal data in accordance with the General Data Protection Regulation (GDPR).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#035271] mb-4">Your Data Rights</h2>
              <p className="text-gray-700 mb-4">Under GDPR, you have the following rights:</p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Right to access your personal data</li>
                <li>Right to rectification of inaccurate data</li>
                <li>Right to erasure ("right to be forgotten")</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#035271] mb-4">Data Processing</h2>
              <p className="text-gray-700 mb-4">
                We process personal data only when we have a legal basis to do so. This includes:
              </p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>When you have given consent</li>
                <li>To fulfill contractual obligations</li>
                <li>To comply with legal obligations</li>
                <li>To protect vital interests</li>
                <li>For legitimate business interests</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#035271] mb-4">Data Protection</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Encryption of personal data</li>
                <li>Regular security assessments</li>
                <li>Staff training on data protection</li>
                <li>Access controls and authentication</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#035271] mb-4">Contact Us</h2>
              <p className="text-gray-700">
                For any GDPR-related inquiries or to exercise your rights, please contact our Data Protection Officer.
              </p>
            </section>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default GDPRPolicy;
