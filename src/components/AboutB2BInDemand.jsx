import React, { useState } from "react";
import Footer from "./Footer";
import { motion } from "framer-motion";
import Blob4 from "../assets/Icon/Blob4.svg";
import preview_open from "../assets/Icon/preview-open.svg";
import system from "../assets/Icon/system.svg";
import protect from "../assets/Icon/protect.svg";
import parachute from "../assets/Icon/parachute.svg";
import tips from "../assets/Icon/tips.svg";
import Rohit_Sharma from "../assets/Icon/Rohit_Sharma.svg";
import Pravin_Pewde from "../assets/Icon/Pravin_Pewde.png";
import Anil_Kale from "../assets/Icon/Anil_Kale.png";
import Anand_modi from "../assets/Icon/Anand_modi.png";
import Rohit_Z from "../assets/Icon/Saurabh_G.png";
import Swekcha from "../assets/Icon/SwekchaT.png";
import Janhavi from "../assets/Icon/Janhavi.png";
import Now from "../assets/Icon/Now.svg";
import { Link } from "react-router-dom";
import { BackgroundBeamsWithCollision } from "../components/ui/background-beams";
import { Helmet } from 'react-helmet';
import { seoConfig } from '../utils/seoConfig';
import WorldMap from './WorldMap';

const AboutUs = () => {
  const { title, description, keywords, ogImage } = seoConfig.about;

  const [activeValue, setActiveValue] = useState("transparency");
  const [visibleTeamMembers, setVisibleTeamMembers] = useState(5);

  const teamMembers = [
    {
      name: "Anand Modi",
      designation: "Managing Director",
      image: Anand_modi, // Dummy image
      linkedin: "https://www.linkedin.com/in/im-anand-modi", // LinkedIn link
    },
    {
      name: "Saurabh Ghosh",
      designation: "Business development Manager",
      image: Rohit_Z, // Dummy image
      linkedin: "https://www.linkedin.com/in/saurab-g-sam-b7435a216/", // LinkedIn link
    },

    {
      name: "Pravin Pawde",
      designation: "Head of IT",
      image: Pravin_Pewde, // Dummy image
      linkedin: "https://www.linkedin.com/in/pravin-pawde", // LinkedIn link
    },
    {
      name: "Swekcha Tiwari",
      designation: "Manager, Key Accounts & HR",
      image: Swekcha,
      linkedin: "https://www.linkedin.com/in/swekcha-tiwari-20a1ba205/",
    },
    {
      name: "Rohit Sharma",
      designation: "Manager, Inside Sales",
      image: Rohit_Sharma, // Dummy image
      linkedin: "https://www.linkedin.com/in/rohit-sharma-47b63771/", // LinkedIn link
    },
    {
      name: "Janhavi Patil",
      designation: "Brand Marketing Lead",
      image: Janhavi,
      linkedin: "https://www.linkedin.com/in/janhavepatiil/",
    },
    {
      name: "Anil Kale",
      designation: "Sr. Web Developer",
      image: Anil_Kale,
      linkedin: "https://www.linkedin.com/in/anil-k-460706a1",
    },

  ];

  const values = [
    {
      id: 'transparency',
      title: 'Transparency',
      icon: preview_open,
      description: (
        <>

          <br />
          We believe in complete transparency in everything we do. Our processes, pricing, and results are always clear and accessible.
        </>
      ),
      color: '#035271'
    },
    {
      id: 'collaboration',
      title: 'Collaboration',
      icon: system,
      description: (
        <>
          We don’t just work for our clients; we work with them. Every strategy, campaign, and lead-gen effort is built on open communication, shared vision, and mutual trust.
          <br /> <br />
          Internally, our teams thrive on cross-functional collaboration, ensuring every initiative is powered by diverse insights and innovative thinking.
          <br /> <br />
          Because real success isn’t a solo game—it’s a collective victory.
        </>
      ),
      color: '#2563EB'
    },
    {
      id: 'innovation',
      title: 'Innovation',
      icon: protect,
      description: (
        <>
          Always One Step Ahead. <br /><br />
          The market moves fast, and so do we. Innovation isn’t just a buzzword at B2BinDemand—it’s how we operate. From cutting-edge targeting to AI-driven insights, we stay ahead of trends so our clients don’t just keep up—they lead. Because the best strategies aren’t recycled—they’re reimagined.
        </>
      ),
      color: '#059669'
    },
    {
      id: 'accountability',
      title: 'Accountability',
      icon: parachute,
      description: (
        <>
          We Own It, Every Time <br /> <br />
          No excuses, no passing the buck. At B2BinDemand, we take full responsibility for every campaign we run. If something’s not working, we fix it. If there’s a better way, we find it. We measure success the same way you do—through results that actually matter.
        </>
      ),
      color: '#7C3AED'
    },
    {
      id: 'integrity',
      title: 'Integrity',
      icon: tips,
      description: (
        <>
          At B2BinDemand, integrity isn’t just a value—it’s the foundation of everything we do. <br /> <br />
          We believe in honesty over hype, results over promises, and transparency over tactics. Whether it’s delivering high-quality leads, optimizing demand-gen strategies, or advising our clients, we stay true to our word—no shortcuts, no compromises.
        </>
      ),
      color: '#DC2626'
    }
  ];

  return (
    <div>
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
        <link rel="canonical" href="https://b2bindemand.com/about-b2bindemand" />
      </Helmet>
      <BackgroundBeamsWithCollision>
      
      {/* Background Blob Image */}
      <img
        src={Blob4}
        alt="About-bg"
        className="w-1/4 md:w-1/5 lg:w-1/6 h-auto absolute z-0 ml-16 md:ml-32 lg:ml-48"
        style={{ marginTop: "-5rem" }}
      />

      {/* About Us Section */}
      <div className="container mx-auto relative z-10">
        
        {/* <div className="relative overflow-hidden">
        <h3 className="text-2xl font-medium text-[#FF6B2C] pl-4 pb-4">
          About Us
        </h3>
      </div> */}

        {/* Growth Section */}
        <div className="text-center mb-16 mt-32 relative">
          {/* Background Image */}
          {/* <div className="absolute top-[-150px] left-0 w-full z-0">
          <img
            src={rectangleImg}
            alt="Background Rectangle"
            className="w-full h-auto opacity-50"
          />
        </div> */}

       
          {/* Content */}
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
              We Care About Your <br />

              <span className="text-[#FF6B2C] font-semibold">
                Growth
                <img
                  src={Now}
                  alt="icon"
                  className="absolute left-1/2 transform -translate-x-1/2 mt-1 h-15 w-15"
                />
              </span>

            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl pt-4 mx-auto">
              B2BinDemand has been a trusted growth partner to companies across the
              globe.
            </p>
          </div>
        </div>


        {/* Mission and Vision Section */}
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mission Section */}
            <motion.div
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-1 bg-orange-500"></div>
                  <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
                </div>
                <div className="pl-11">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    To make B2B lead generation smarter, faster, and genuinely
                    impactful—so businesses connect with the right people, not just
                    more people.
                  </p>
                  <p className="mt-4 text-gray-500">
                    We help businesses stop chasing and start closing by connecting
                    them with real, high-intent buyers who are ready to convert.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Vision Section */}
            <motion.div
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-1 bg-orange-500"></div>
                  <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
                </div>
                <div className="pl-11">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    A world where B2B marketing isn't about chasing leads but building
                    real demand that drives growth.
                  </p>
                  <p className="mt-4 text-gray-500">
                    We envision a future where every B2B connection is meaningful,
                    every campaign drives value, and every business finds its perfect
                    match.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Values Section */}
        <div className="container mx-auto px-4 py-24 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Our <span className="text-[#FF6B2C]">Values</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              We grow, you grow—it's that simple. Our values drive everything we do, shaping how we deliver exceptional results for our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Values List */}
            <div className="space-y-3">
              {values.map((value) => (
                <motion.div
                  key={value.id}
                  className={`group flex items-center gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer transition-all duration-300 ${activeValue === value.id ? 'bg-white shadow-lg' : 'hover:bg-gray-50'
                    }`}
                  onClick={() => setActiveValue(value.id)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300`}
                    style={{
                      backgroundColor: activeValue === value.id ? value.color : '#F3F4F6',
                      opacity: activeValue === value.id ? 1 : 0.7
                    }}
                  >
                    <img
                      src={value.icon}
                      alt={value.title}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <div>
                    <h3
                      className={`font-semibold transition-colors duration-300 ${activeValue === value.id ? 'text-gray-900' : 'text-gray-600'
                        }`}
                    >
                      {value.title}
                    </h3>
                  </div>
                  {activeValue === value.id && (
                    <motion.div
                      className="ml-auto"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Active Value Details */}
            <motion.div
              key={activeValue}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: values.find(v => v.id === activeValue)?.color }}
                >
                  <img
                    src={values.find(v => v.id === activeValue)?.icon}
                    alt={values.find(v => v.id === activeValue)?.title}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {values.find(v => v.id === activeValue)?.title}
                </h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                {values.find(v => v.id === activeValue)?.description}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Meet the Team Section */}
        <div id="meet-the-team" className="container mx-auto px-4 py-24 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Meet the <span className="text-[#035271]">Team</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate minds driving innovation and excellence
            </p>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
            {teamMembers.slice(0, visibleTeamMembers).map((member, index) => (
              <div key={index} className="flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group relative rounded-2xl overflow-hidden bg-white"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Overlay with blur effect */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm flex items-center justify-center">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transform -translate-y-10 group-hover:translate-y-0 transition-transform duration-300 bg-white/90 p-3 rounded-full hover:bg-white"
                      >
                        <svg className="w-6 h-6 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>
                <div className="text-center mt-4">
                  <h3 className="font-semibold text-lg text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.designation}</p>
                </div>
              </div>
            ))}
          </div>


          {/* Load More Button */}
          {visibleTeamMembers < teamMembers.length && (
            <motion.div
              className="flex justify-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                onClick={() => setVisibleTeamMembers(prev => Math.min(prev + 5, teamMembers.length))}
                className="group relative px-8 py-4 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl font-medium">
                    Give a <span className="text-[#035271] font-bold">look</span> in here
                  </span>
                  <motion.div
                    className="text-[#035271]"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.div>
                </div>
                <div className="absolute inset-x-0 h-1 bottom-0 bg-gradient-to-r from-[#035271] to-[#0481af] rounded-b-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Call to Action Section */}
        <div className="container mx-auto px-4 mt-20">
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-gray-900">
              Let us handle the{" "}
              <span className="text-[#FF6B2C]">funnel</span> now!
            </h1>
          </div>
          <div className="flex justify-center items-center mt-10">
            <Link
              to="/contact-us"
              className="bg-[#035271] text-white font-semibold py-2 px-6 rounded-lg text-2xl shadow-lg flex items-center space-x-2"
            >
              <span>Get in Touch</span>
            </Link>
          </div>
        </div>

        {/* Global Presence Section */}
        <div className="container mx-auto px-4 sm:px-8 lg:px-16 py-12 mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-1 w-[70%] mx-auto">
              <h2 className="text-4xl font-bold text-gray-900">
                We’re <span className="text-[#FF6B2C]">Global</span>
              </h2>
              <p className="text-gray-600 mt-4 text-lg">
                B2BinDemand has presence in major parts of the world! And now, you
                can reach us from any corner.
              </p>
            </div>
            <div className="md:col-span-2 flex justify-center">
              <WorldMap />
            </div>
          </div>
        </div>

        {/* Final Call to Action Section */}
        <div className="container mx-auto px-4 mt-20">
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-gray-900 mb-4">
              Ready to see <span className="text-[#FF6B2C]">results</span>?
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get your spot booked for free consultations today!
            </p>
          </div>
          <div className="flex justify-center items-center mt-10 mb-20">
            <Link
              to="https://calendly.com/rohit-b2bindemand/30min?month=2025-03"
              target="_blank"
              className="bg-[#035271] text-white font-semibold py-2 px-6 rounded-lg text-2xl shadow-lg flex items-center space-x-2"
            >
              <span>Book a call</span>
            </Link>
          </div>
        </div>

        

        {/* Footer */}
        <Footer />
        
      </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
};

export default AboutUs;
