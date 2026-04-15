import React, { useState, useEffect } from "react";
import styles from "./styles/SmartSyndication.module.css";
import { motion } from "framer-motion";
import Footer from "./Footer";
import B2B_Mastery_Janavi from "../assets/Icon/B2B_Mastery_Janavi.svg";
import Blob4 from "../assets/Icon/Blob4.svg";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import { ReactComponent as Page_With_Curl } from "../assets/Icon/Page_With_Curl.svg";
import { ReactComponent as FolderIcon } from "../assets/Icon/Notebook.svg";
import newsletter from "../assets/newsletter.png";
import Building from "../assets/Podcasts/Building.png";
import Mastering_Account from "../assets/Podcasts/Mastering_Account.png";
import Leveraging from "../assets/Podcasts/Leveraging.png";
import The_Future from "../assets/Podcasts/The_Future.png";
import Harnessing from "../assets/Podcasts/Harnessing.png";
import Optimizing from "../assets/Podcasts/Optimizing.png";
import Navigating from "../assets/Podcasts/Navigating.png";

import { useLocation } from "react-router-dom";

const Podcasts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Disable body scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isModalOpen]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Simulate form submission (e.g., API call)
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSubmitted(false); // Reset form state
    setEmail(""); // Clear input field
  };

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
    "Local Generation",
    "Health Care",
    "B2B Industry Secrets",
    "ABM",
  ];

  const posts = [
    {
      title: "Mastering Account-Based Marketing (ABM) for B2B Success",
      image: Mastering_Account, // Dummy image
      link: "#",
      category: "ABM",
    },
    {
      title: "Leveraging Data Analytics to Drive B2B Sales",
      image: Leveraging, // Dummy image
      link: "#",
      category: "B2B Industry Secrets",
    },
    {
      title: "Navigating the Complexities of B2B Content Marketing",
      image: Navigating, // Dummy image
      link: "#",
      category: "B2B Industry Secrets",
    },
    {
      title: "Optimizing Your B2B Sales Funnel for Maximum Conversion",
      image: Optimizing, // Dummy image
      link: "#",
      category: "Local Generation",
    },
    {
      title: "Harnessing the Power of Social Media in B2B Marketing",
      image: Harnessing, // Dummy image
      link: "#",
      category: "Health Care",
    },
    {
      title: "The Future of B2B E-commerce: Trends and Predictions",
      image: The_Future, // Dummy image
      link: "#",
      category: "ABM",
    },
  ];

  const handleSearch = () => {
    console.log("Search Query:", searchQuery);
    // Add search functionality here
  };

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Filter posts based on selected categories and search query
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(post.category);
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={styles.smartSyndication}>
      {/* Background Image */}
      {/* <img
        src={Blob4}
        alt="About-bg"
        className="absolute top-0 right-0 w-[50%] h-[10%] z-[-1] mr-[4rem]"
      /> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h3 className="text-2xl font-medium text-[#FF6B2C]">
          Webinar/{getPageName(currentPath)}
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="mt-[-0rem]">
            <h1 className="text-5xl font-bold leading-tight mb-4">
              <span className="text-[#FF6B2C]">B2B</span> Mastery
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Stay Ahead. Learn from Experts. Transform Your B2B Strategy.
            </p>
            <button
              className="bg-[#005F73] text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-[#004c5c] transition-colors"
              onClick={() => setIsModalOpen(true)}
            >
              Subscribe
            </button>

            {/* Modal Overlay */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                {/* Modal Content */}
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
                  {!isSubmitted ? (
                    <>
                      <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        Subscribe to Our Newsletter
                      </h2>
                      <form onSubmit={handleSubscribe}>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#005F73]"
                          required
                        />
                        <button
                          type="submit"
                          className="bg-[#005F73] text-white px-6 py-2 rounded-lg hover:bg-[#004c5c] transition-colors w-full"
                        >
                          Submit
                        </button>
                      </form>
                    </>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        Thank You!
                      </h2>
                      <p className="text-lg text-gray-600">
                        You have successfully subscribed.
                      </p>
                      <button
                        onClick={closeModal}
                        className="mt-4 bg-[#005F73] text-white px-6 py-2 rounded-lg hover:bg-[#004c5c] transition-colors w-full"
                      >
                        Close
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Image */}
          <div className="relative">
            <motion.img
              src={B2B_Mastery_Janavi}
              alt="Full Funnel Outreach"
              className="w-full h-auto max-w-[600px]"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-16 py-16 flex flex-col md:flex-row items-center gap-8">
        {/* Left Side - Text Content */}
        <div className="md:w-1/2 text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            See Our <span className="text-[#FF6B2C]">Latest</span> Webinar
          </h2>
          <p className="text-gray-600 mt-4">
            We don’t do boring. We do impactful. Our latest webinar is packed
            with real-world insights, battle-tested strategies, and no-fluff
            expertise to help you crack the code on lead gen and demand gen.
          </p>
          <p className="text-gray-600 mt-4">
            If you’re tired of chasing the wrong leads and want a pipeline that
            actually converts—this one's for you.
          </p>

          {/* See More Button */}
          <button className="mt-6 px-5 py-2 flex items-center bg-[#ffffff] text-[#FF6B2C] shadow-md rounded-lg font-normal hover:bg-[#FF6B2C] hover:text-white transition">
            See more
            <ChevronDoubleRightIcon className="w-5 h-5 ml-2" />
          </button>
        </div>

        {/* Right Side - Image Box */}
        <div className="md:w-1/2 flex justify-center rounded-full">
          <div className="w-[280px] h-[320px] bg-[#EAEAEA] rounded-2xl shadow-md flex flex-col items-center p-4">
            <img src={Building} alt="" />
            <p className="mt-4 text-center font-medium text-gray-800">
              Building Resilient B2B Strategies in Uncertain Times
            </p>
          </div>
        </div>
      </div>

      <div className="p-8 bg-white min-h-screen">
        <div className="container mx-auto px-16">
          {/* Search Bar */}
          <div className="mb-8 flex justify-center">
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
          </div>

          {/* Main Content - Categories and Image Boxes Side by Side */}
          <div className="flex">
            {/* Left Side - Categories (Fixed) */}
            <div className="w-1/4 pr-8 sticky top-8 h-screen overflow-y-auto">
              <h3 className="text-xl  font-semibold text-gray-900 mb-4">
                Categories
              </h3>
              {categories.map((category, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="w-4 h-4 text-[#FF6B2C] border-gray-300 rounded focus:ring-[#FF6B2C]"
                  />
                  <label htmlFor={category} className="ml-2 text-gray-700">
                    {category}
                  </label>
                </div>
              ))}

              <button className="mt-6 px-5 py-2 flex items-center bg-[#ffffff] text-[#FF6B2C] border rounded-lg font-normal hover:bg-[#FF6B2C] hover:text-white transition">
                See more
                <ChevronDoubleRightIcon className="w-5 h-5 ml-2" />
              </button>
            </div>

            {/* Right Side - Image Boxes (Scrollable) */}
            <div className="w-3/4 overflow-y-auto h-screen scrollbar-hide">
              <div className="grid grid-cols-2 gap-8">
                {filteredPosts.map((post, index) => (
                  <div
                    key={index}
                    className=" bg-[#EAEAEA] rounded-2xl shadow-md flex flex-col items-center p-4 overflow-hidden"
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-2xl"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        {post.title}
                      </h3>
                      <a
                        href={post.link} // Add the link to the post
                        className="text-[#FF6B2C] hover:underline cursor-pointer"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-20">
          <a
            href="/your-link-here" // Replace with your desired link
            className="bg-white text-black font-normal hover:bg-[#035271] hover:text-white transition-colors duration-200 py-2 px-6 rounded-lg text-lg shadow-lg flex items-center space-x-2"
          >
            <span>
              <span className="text-[#FF6B2C] hover:text-white font-normal">
                Explore more
              </span>{" "}
            </span>
            <ChevronDoubleRightIcon className="w-5 h-5 text-[#FF6B2C]" />
          </a>
        </div>

        <div className="container mx-auto px-4 text-center mt-20">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">
            <span className="text-[#FF6B2C] font-semibold">Subscribe</span> to
            Our Webinar Series
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get the latest updates NOW in your inbox!
          </p>
        </div>

        <div className="flex justify-center items-center mt-10">
          <span>
            <button
              className="bg-[#035271] text-white font-normal hover:bg-[#E65A1F] transition-colors duration-200 py-2 px-6 rounded-lg text-lg shadow-lg flex items-center space-x-2"
              onClick={() => setIsModalOpen(true)}
            >
              Subscribe
            </button>
          </span>{" "}
          <ChevronDoubleRightIcon className="w-5 h-5 text-white" />
          {/* Modal Overlay */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              {/* Modal Content */}
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
                {!isSubmitted ? (
                  <>
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">
                      Subscribe to Our Newsletter
                    </h2>
                    <form onSubmit={handleSubscribe}>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#005F73]"
                        required
                      />
                      <button
                        type="submit"
                        className="bg-[#005F73] text-white px-6 py-2 rounded-lg hover:bg-[#004c5c] transition-colors w-full"
                      >
                        Submit
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">
                      Thank You!
                    </h2>
                    <p className="text-lg text-gray-600">
                      You have successfully subscribed.
                    </p>
                    <button
                      onClick={closeModal}
                      className="mt-4 bg-[#005F73] text-white px-6 py-2 rounded-lg hover:bg-[#004c5c] transition-colors w-full"
                    >
                      Close
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

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
              <Page_With_Curl className="absolute top-[-1.25rem] right-3 w-[3.5rem] h-[3.5rem]" />
              <p className="text-center font-medium">Blog</p>
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

        <div className="bg-gray-50 py-12 border-2 border-[#FEB315] rounded-3xl ">
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Podcasts;
