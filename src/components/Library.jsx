import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import { ReactComponent as MicIcon } from "../assets/Icon/Mic_voices.svg";
import { ReactComponent as FolderIcon } from "../assets/Icon/Notebook.svg";
import styles from "./styles/SmartSyndication.module.css";
import Footer from "./Footer";
import { seoConfig } from "../utils/seoConfig";

// Image imports
import The_InDemand from "../assets/Icon/The_InDemand.png";
import Blob4 from "../assets/Icon/Blob4.svg";
import newsletter from "../assets/newsletter.png";
import book_a_call from "../assets/book_a_call.png";
import Precision from "../assets/Library/Precision.png";
import Demystifying from "../assets/Library/Demystifying.png";
import The_Power from "../assets/Library/The_Power.png";
import Enhancing from "../assets/Library/Enhancing.png";
import Influencer from "../assets/Library/Influencer.png";
import Decoding from "../assets/Library/Decoding.png";
import Navigating from "../assets/Library/Navigating.png";
import From from "../assets/Library/From.png";
import Leveraging from "../assets/Library/Leveraging.png";
import Verified_Content from "../assets/Verified_Content.webp";
import A_Deep_Dive from "../assets/A_Deep_Dive.png";
import Casestudy_3 from "../assets/Casestudy_3.png";

const Library = () => {
  const { title, description, keywords, ogImage } = seoConfig.library;
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All"); // Default tab

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() !== "") {
      setSubmitted(true);
      setEmail(""); // Clear input after submission
    }
  };


  const location = useLocation();
  const currentPath = location.pathname; // Get the current path (e.g., "/campaigns")

  // Format the pathname to a readable page name
  const getPageName = (path) => {
    const name = path.split("/").pop(); // Extract the last part of the path
    return name.charAt(0).toUpperCase() + name.slice(1); // Capitalize the first letter
  };


  const categories = [
    "All",
    // "E-books",
    "Case Studies",
    // "One Sheeters",
    // "ABM",
    // "Email Marketing",
  ];

  const posts = [

    {
      id: 'amplifying-marketing-impact-with-mql-generation',
      title: "Amplifying Marketing Impact with MQL Generation",
      image: Verified_Content,
      link: "/case-study/amplifying-marketing-impact-with-mql-generation",
      category: "Case Studies"
    },
    {
      id: 'driving-13000-qualified-leads-for-microsoft-azure',
      title: "Driving 13,000 Qualified Leads for Microsoft Azure",
      image: A_Deep_Dive,
      link: "/case-study/driving-13000-qualified-leads-for-microsoft-azure",
      category: "Case Studies"
    },
    {
      id: 'driving-high-quality-live-event-engagement-for-zoom',
      title: "Driving High Quality Live-Event Engagement for ZOOM",
      image: Casestudy_3,
      link: "/case-study/driving-high-quality-live-event-engagement-for-zoom",
      category: "Case Studies"
    },
    // {
    //   title: "Precision Unveiled: B2B Marketing Insights from Bullet Hole Analysis",
    //   image: Precision, 
    //   link: "#",
    //   category: "ABM",
    // },
  ];

  const handleSearch = () => {
    console.log("Search Query:", searchQuery);
    // Add search functionality here
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Filter posts based on active tab and search query
  const filteredPosts = posts.filter((post) => {
    const matchesTab = activeTab === "All" || post.category === activeTab;
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className={styles.smartSyndication}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <link rel="canonical" href="https://b2bindemand.com/library" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <h3 className="text-2xl font-medium text-[#FF6B2C] mb-6">
          Resources/{getPageName(currentPath)}
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="mt-[-0rem]">
            <h1 className="text-5xl font-bold leading-tight mb-4">The InDemand
              <span className="text-[#FF6B2C]"> Vault</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Deep dives, bold strategies, and real wins—because in B2B, results do the talking.
            </p>
            {/* <button className="bg-[#005F73] text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-[#004c5c] transition-colors">
            Subscribe
            </button> */}
          </div>

          {/* Right Image */}
          <div className="relative">
            <motion.img
              src={The_InDemand}
              alt="Full Funnel Outreach"
              className="w-full h-auto max-w-[600px]"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 text-center mt-20">
        <h1 className="text-4xl font-semibold text-gray-900 mb-16">
          Case Studies, E-Books, Reports— You Name It, <br /> We
          <span className="text-[#FF6B2C] font-semibold"> Have</span> It!
        </h1>
      </div>

      <div className="p-8 bg-white min-h-screen">
        <div className="container mx-auto px-16">
          {/* Search Bar and Tabs */}
          <div className="mb-8 flex justify-between items-center">
            {/* Search Bar */}
            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden max-w-lg">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 focus:outline-none"
              />
              <button
                onClick={handleSearch}
                className=" text-black px-4 py-2 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex space-x-4">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleTabChange(category)}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === category
                    ? "bg-[#FF6B2C] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Image Boxes */}
          {/* <div className="grid grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <div
                key={index}
                className="bg-[#EAEAEA] rounded-2xl shadow-md flex flex-col items-center p-4 overflow-hidden transform transition-transform duration-300 hover:scale-105"
              >
                {post.category === "Case Studies" ? (
                  <Link to={post.link} className="w-full">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="p-6">
                      <h3 className="text-xl hover:text-[#FF6B2C] cursor-pointer hover:underline font-semibold text-gray-900 mb-4 transition-colors duration-300">
                        {post.title}
                      </h3>
                     
                    </div>
                  </Link>
                ) : (
                  <>
                    <Link to={post.link} className="w-full">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="p-6">
                      <h3 className="text-xl hover:text-[#FF6B2C] cursor-pointer hover:underline font-semibold text-gray-900 mb-4">
                        {post.title}
                      </h3>
                      <a
                        href={post.link}
                        className="text-[#FF6B2C] hover:underline cursor-pointer"
                      >
                        Read More
                      </a>
                    </div>
                    </Link>
                  </>
                )}
              </div>
            ))}
          </div> */}



          <div className="grid grid-cols-3 gap-8 transition-colors duration-300 rounded-lg">
            {filteredPosts.map((post, index) => (
              <div
                key={index}
                className="rounded-2xl shadow-md flex flex-col items-center pt-8 overflow-hidden transform transition-transform duration-300 hover:scale-105"
              >
                {post.category === "Case Studies" ? (
                  <Link to={post.link} className="w-full">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="p-6">
                      <h3 className="text-xl hover:text-[#FF6B2C] cursor-pointer hover:underline font-semibold text-gray-900 mb-4 transition-colors duration-300">
                        {post.title}
                      </h3>

                    </div>
                  </Link>
                ) : (
                  <>

                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Explore More Button */}

        {/* <div className="flex justify-center items-center mt-20">
          <a
            href="/your-link-here" // Replace with your desired link
            className="bg-white text-black font-normal hover:bg-[#035271] hover:text-white transition-colors duration-200 py-2 px-6 rounded-lg text-lg shadow-lg flex items-center space-x-2"
          >
            <span>
              <span className="text-[#FF6B2C] hover:text-white font-normal">
                Load more
              </span>{" "}
            </span>
            <ChevronDoubleRightIcon className="w-5 h-5 text-[#FF6B2C]" />
          </a>
        </div>
        */}

        {/* Resources Section */}
        <div className={styles.demandGenSection}>
          <h1
            className={styles.demandGenTitle}
            style={{
              fontSize: "2rem",
              textAlign: "center",
              fontWeight: "normal",
            }}
          >
            Find the Rest of Our
            <span className={styles.highlight}> Resources</span> Here
          </h1>

          <div className="flex justify-center gap-6 mt-20">
            {/* Box 1: Webinars/Podcasts */}
            <div className="relative bg-[#FDE7DE] shadow-md rounded-3xl w-[10rem] h-[10rem] flex flex-col items-center justify-center">
              {/* Top-right Icon */}
              <MicIcon className="absolute top-[-1.25rem] right-3 w-[3.5rem] h-[3.5rem]" />
              <p className="text-center font-medium">
                Webinars/ <br /> Podcasts
              </p>
            </div>

            {/* Box 2: E-books/Whitepapers/Case Studies */}
            <div className="relative bg-[#FDE7DE] shadow-md rounded-3xl w-[10rem] h-[10rem] flex flex-col items-center justify-center">
              {/* Top-right Icon */}
              <FolderIcon className="absolute top-[-1.25rem] right-[-0.25rem] w-[4.5rem] h-[4.5rem]" />
              <p className="text-center font-medium">
                E-books/ <br /> Whitepapers/ <br /> Case Studies
              </p>
            </div>
          </div>
        </div>

        {/* Subscribe Section */}
        <div className="container mx-auto px-4 text-center mt-20">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">
            Need Some
            <span className="text-[#FF6B2C] font-semibold"> More</span> Help?
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get in touch with us for a deeper dive into your problems
          </p>
        </div>

        {/* Subscribe Button */}
        <div className="flex justify-center items-center mt-10">
          <Link
            to="https://calendly.com/rohit-b2bindemand/30min?month=2025-03"
            target="_blank"
            className="bg-[#035271] text-white px-6 py-3 rounded-lg hover:bg-[#E65A1F] transition-colors duration-200"
          >
            Book a call
          </Link>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gray-50 py-12 border-2 border-[#FEB315] rounded-3xl mt-20">
          <div className="container mx-auto px-12">
            <div className="flex flex-col md:flex-row items-center justify-between">
              {/* Left Side: Text and Input */}
              <div className="w-full md:w-1/2 pr-0 md:pr-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Might as well subscribe to our{" "}
                  <span className="text-[#FEB315]"> newsletter </span>
                  while you’re here!
                </h2>

                <p className="text-gray-500 mb-6">
                  We promise it’ll be fun reading our badger stories!
                </p>

                {/* Combined Input and Button */}
                <div className="w-[80%]">
                  {submitted ? (
                    <p className="text-green-600 font-medium">
                      Thank you for subscribing!
                    </p>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="flex rounded-full overflow-hidden border border-[#035271]"
                    >
                      <input
                        type="email"
                        className="w-full px-4 py-3 focus:outline-none"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <button
                        type="submit"
                        className="bg-[#035271] rounded-full text-white px-6 py-3 hover:bg-[#E65A1F] transition-colors duration-200"
                      >
                        Subscribe
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Right Side: Image */}
              <div className="w-full md:w-1/2 mt-8 md:mt-0">
                <div className="rounded-lg overflow-hidden h-[300px]">
                  <img
                    src={newsletter} // Replace with your image path
                    alt="Newsletter Image"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Side: Text and Button */}
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                With an <span className="text-[#FF6B2C]">expertise </span>
                like this, it’s hard to resist your future results set by us...
              </h2>
              <p className="text-gray-500 mb-6">
                Book a free consultation NOW!
              </p>
              <Link to="https://calendly.com/rohit-b2bindemand/30min?month=2025-03" target="_blank" className="bg-[#035271] text-white px-6 py-3 rounded-lg hover:bg-[#E65A1F] transition-colors duration-200">
                Book a call
              </Link>
            </div>

            {/* Right Side: Image (Half Out of Screen) */}
            <div className="w-full md:w-1/2 relative">
              <div className="rounded-l-lg overflow-hidden md:mr-[-25%]">
                <img
                  src={book_a_call} // Replace with your image path
                  alt="Consultation Image"
                  className="w-full h-full object-cover rounded-l-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-12" />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Library;
