import React, { useState } from 'react';
import Footer from './Footer';
import emailjs from '@emailjs/browser';
import { BackgroundBeamsWithCollision } from "../components/ui/background-beams";
import { seoConfig } from '../utils/seoConfig';
import { Helmet } from 'react-helmet';

const Careers = () => {
  const { title, description, keywords, ogImage } = seoConfig.careers;

  const [positions, setPositions] = useState([

    {
      title: 'Inside Sales Representative',
      department: 'Sales',
      location: 'On-site',
      type: 'Full-time',
      description: 'Join our sales team to drive growth and brand awareness.',
      requirements: [
        'Minimum 2 years of B2B sales experience',
        'Generate and qualify leads through outbound calls and emails',
        'Build and maintain a sales pipeline',
        'Collaborate with marketing to optimize outreach strategies'
      ]
    },
    {
      title: 'Business Development Manager',
      department: 'Sales',
      location: 'On-site',
      type: 'Full-time',
      description: 'We are looking for an experienced Business Development Manager.',
      requirements: [
        'Minimum 2-5 years of experience in B2B sales',
        'Drive revenue by expanding new and key accounts.',
        'Expand business in the UK/US by supporting marketing and sales outsourcing.',
        'Enhance client retention with cost savings and exceptional service.'
      ]
    },
    {
      title: 'Research Analyst',
      department: 'Research',
      location: 'On-site',
      type: 'Full-time',
      description: 'Join our research team to drive growth and brand awareness.',
      requirements: [
        'Minimum 1+ year of experience in Contact Discovery Quality Assurance',
        'Fluent communication skills (both written and spoken)',
        'Attention to detail and a passion for perfection',
        'Meticulous attention to detail that makes you stand out'
      ]
    },
    {
      "title": "Lead Generation Executive",
      "department": "Marketing",
      "location": "On-site",
      "type": "Full-time",
      "description": "We are looking for a dynamic Lead Generation Executive to join our content team.",
      "requirements": [
        "At least 1+ year of experience in B2B content strategy",
        "Excellent communication skills (both written & spoken)",
        "A goal-oriented mindset with the ability to generate quality leads"
      ]
    },
    {
      "title": "Appointment Generation",
      "department": "Marketing",
      "location": "On-site",
      "type": "Full-time",
      "description": "We are seeking a results-driven Appointment Generation to support our content team. ",
      "requirements": [
        "At least 1 year of experience in B2B content strategy or lead generation",
        "Proven track record in dialed AG campaigns",
        "Excellent communication and persuasion skills"
      ]
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    message: '',
    resume: null,
    currentLocation: '',
    currentCompany: '',
    linkedinUrl: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateLinkedInUrl = (url) => {
    return url.toLowerCase().includes('linkedin.com/in/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      resume: e.target.files[0]
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateLinkedInUrl(formData.linkedinUrl)) {
      setError('Please enter a valid LinkedIn profile URL (e.g., https://www.linkedin.com/in/your-profile)');
      return;
    }

    if (!window.confirm('Please review your application details before submitting. Would you like to proceed?')) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send notification to admin
      await emailjs.send(
        'service_m0cz9oe',
        'template_3iyjdi6',
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          position: formData.position,
          experience: formData.experience,
          message: formData.message,
          current_location: formData.currentLocation,
          current_company: formData.currentCompany || 'Not provided',
          linkedin_url: formData.linkedinUrl,
          subject: `New Job Application: ${formData.position}`,
          application_details: `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Position: ${formData.position}
Current Location: ${formData.currentLocation}
Current Company: ${formData.currentCompany || 'Not provided'}
LinkedIn: ${formData.linkedinUrl}
Years of Experience: ${formData.experience}
          `.trim()
        },
        'FWXDgNP6A3TBK3Y55'
      );

      // Send confirmation email to applicant
      await emailjs.send(
        'service_m0cz9oe',
        'template_clr75s2',
        {
          to_name: formData.name,
          to_email: formData.email,
          position: formData.position,
          company_name: 'B2BInDemand',
          message: `Thank you for applying for the ${formData.position} position at B2BInDemand. We have received your application and will review it shortly. We appreciate your interest in joining our team.`
        },
        'FWXDgNP6A3TBK3Y55'
      );

      setShowSuccess(true);
      setError('');
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        message: '',
        resume: null,
        currentLocation: '',
        currentCompany: '',
        linkedinUrl: ''
      });

      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Error sending email:', error);
      setError('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

        {/* Additional SEO */}
        <link rel="canonical" href="https://b2bindemand.com/b2bindemand-careers" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <BackgroundBeamsWithCollision>
      {/* Hero Section */}
      <div className="relative pt-[10rem] pb-32 overflow-hidden bg-gradient-to-r from-[#035271] to-[#FF6B2C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Join Our Team
            </h1>
            <p className="mt-6 text-xl text-gray-100 max-w-3xl mx-auto">
              Be part of our mission to revolutionize B2B demand generation. We're always looking for talented individuals who share our passion for excellence.
            </p>
          </div>
        </div>
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to right, #035271, #FF6B2C)',
          opacity: 0.95
        }}></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0px, rgba(255, 255, 255, 0.1) 2px, transparent 2px, transparent 8px)'
        }}></div>
      </div>
      {/* Current Openings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-[#035271] mb-8">Current Openings</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {positions.map((position, index) => (
                <div key={index} className="bg-gray-50 rounded-lg border-2 border-gray-100 shadow-sm p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 text-sm font-medium bg-[#FF6B2C] text-white rounded-full">
                      {position.department}
                    </span>
                    <span className="text-sm text-gray-500">{position.type}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#035271] mb-2">{position.title}</h3>
                  <p className="text-gray-600 mb-4">{position.description}</p>
                  <div className="space-y-2">
                    {position.requirements.map((req, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-[#FF6B2C] mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {req}
                      </div>
                    ))}

                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold text-[#035271] mb-8 text-center">Apply Now</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name<span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#FF6B2C] focus:border-[#FF6B2C]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email<span className="text-red-500">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#FF6B2C] focus:border-[#FF6B2C]"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number<span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#FF6B2C] focus:border-[#FF6B2C]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Location<span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="currentLocation"
                  value={formData.currentLocation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#FF6B2C] focus:border-[#FF6B2C]"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Company</label>
                <input
                  type="text"
                  name="currentCompany"
                  value={formData.currentCompany}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#FF6B2C] focus:border-[#FF6B2C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn URL<span className="text-red-500">*</span></label>
                <input
                  type="url"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleInputChange}
                  placeholder="https://www.linkedin.com/in/your-profile"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#FF6B2C] focus:border-[#FF6B2C]"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position<span className="text-red-500">*</span></label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#FF6B2C] focus:border-[#FF6B2C]"
                  required
                >
                  <option value="">Select a position</option>
                  {positions.map((pos, index) => (
                    <option key={index} value={pos.title}>{pos.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience<span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#FF6B2C] focus:border-[#FF6B2C]"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter<span className="text-red-500">*</span></label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#FF6B2C] focus:border-[#FF6B2C]"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Resume<span className="text-red-500">*</span></label>
              <input
                type="file"
                name="resume"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#FF6B2C] focus:border-[#FF6B2C]"
                required
              />
            </div>
            {error && (
              <div className="p-4 bg-red-50 border border-red-400 text-[#FF6B2C] rounded-md">
                {error}
              </div>
            )}

            {showSuccess && (
              <div className="mt-6 p-4 bg-green-50 border border-[#035271] text-[#035271] rounded-md">
                Your application has been submitted successfully. We'll be in touch soon!
              </div>
            )}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 bg-gradient-to-r from-[#FFB800] to-[#FF9B04] text-white font-medium rounded-md transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
                  }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
      </BackgroundBeamsWithCollision>

      <Footer />
    </div>
  );
};

export default Careers;
