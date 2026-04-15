import React, { useState, useEffect } from "react";
import styles from "./styles/SmartSyndication.module.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Blog_hero_img from "../assets/Icon/Blog_hero_img.png";
import { ReactComponent as MicIcon } from "../assets/Icon/Mic_voices.svg";
import { ReactComponent as FolderIcon } from "../assets/Icon/Notebook.svg";
import newsletter from "../assets/newsletter.png";
import book_a_call from "../assets/book_a_call.png";
import { blogData, fetchBlogPosts } from "../data/blogData";
import emailjs from '@emailjs/browser';
import { Helmet } from 'react-helmet';
import { seoConfig } from '../utils/seoConfig';

const Blog = () => {
  const { title, description, keywords, ogImage } = seoConfig.blog;

  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [posts, setPosts] = useState(blogData);
  const [loading, setLoading] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState(30);
  const [error, setError] = useState("");

  const calculateReadingTime = (content) => {
    if (!content) return '1 min read';
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchBlogPosts();
        if (fetchedPosts) {
          const postsWithReadTime = fetchedPosts.allPosts.map(post => ({
            ...post,
            readTime: calculateReadingTime(post.content)
          }));
          setPosts({ ...fetchedPosts, allPosts: postsWithReadTime });
        }
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (email.trim() !== "") {
  //     setSubmitted(true);
  //     setEmail("");
  //   }
  // };

  const decodeHtmlEntities = (text) => {
    // Create a DOMParser to safely parse HTML entities
    const parser = new DOMParser();
    const dom = parser.parseFromString(
      `<!doctype html><body>${text}`, 'text/html'
    );
    return dom.body.textContent;
  };

  const slugify = (title) => {
    if (!title) return '';
    
    // First decode any HTML entities
    const decodedTitle = decodeHtmlEntities(title);
    
    return decodedTitle
      .toLowerCase()
      // Handle apostrophes and quotes
      .replace(/['']s\b/g, 's')  // Replace "'s" with "s"
      .replace(/[''""]/g, '')    // Remove quotes and apostrophes
      // Handle other special characters
      .replace(/[^a-z0-9-\s]/g, '') // Remove special chars except hyphens
      .replace(/\s+/g, '-')      // Replace spaces with single hyphens
      .replace(/-+/g, '-')       // Replace multiple hyphens with single hyphen
      .trim()                    // Remove leading/trailing spaces
      .replace(/^-+|-+$/g, '');  // Remove leading/trailing hyphens
  };

  useEffect(() => {
    emailjs.init('FWXDgNP6A3TBK3Y55');
  }, []);

  const sendEmails = async (subscriberEmail) => {
    try {
      // Send welcome email to subscriber
      const subscriberResult = await emailjs.send(
        'service_m0cz9oe',
        'template_clr75s2',
        {
          user_email: subscriberEmail,
          user_name: subscriberEmail.split('@')[0],
          brand_color: '#FF6B2C',
          primary_color: '#035271',
          message: 'Thank you for subscribing to our newsletter!',
          background_color: 'rgba(255, 255, 255, 0.9)',
          shadow: '0 2px 4px rgba(0,0,0,0.1)'
        },
        'FWXDgNP6A3TBK3Y55'
      );

      // Send notification to admin
      const adminResult = await emailjs.send(
        'service_m0cz9oe',
        'template_3iyjdi6',
        {
          user_email: subscriberEmail,
          brand_color: '#FF6B2C',
          primary_color: '#035271',
          message: 'New newsletter subscription',
          background_color: 'rgba(255, 255, 255, 0.9)',
          shadow: '0 2px 4px rgba(0,0,0,0.1)'
        },
        'FWXDgNP6A3TBK3Y55'
      );

      return { subscriberResult, adminResult };
    } catch (error) {
      console.error('EmailJS Error:', error);
      throw new Error(error.text || error.message || 'Failed to send subscription emails');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate email
      if (!email || !email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
      if (subscribers.includes(email)) {
        throw new Error('This email is already subscribed to our newsletter!');
      }

      // Send emails
      await sendEmails(email);

      // Save to localStorage only after successful email sending
      subscribers.push(email);
      localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));

      // Show success state with brand orange color
      setSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error('Submission Error:', error);
      setError(error.message || 'Failed to subscribe. Please try again.');
      setSubmitted(false);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    "AI",
    "ABM",
    "B2B Appointment Setting",
    "Cybersecurity",
    "Content Syndication",
    "Email Marketing",
    "Event Registration/Webinar Registration",
    "Lead Generation",
    "Marketing Strategy",
    "BANT",
    "Telemarketing",
  ];

  const filteredPosts = (posts.allPosts || []).filter(post => {
    const matchesTab = activeTab === "all" || post.category === activeTab;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const displayedPosts = filteredPosts.slice(0, visiblePosts);
  const hasMorePosts = filteredPosts.length > visiblePosts;

  const loadMore = () => {
    setVisiblePosts(prev => prev + 30);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF6B2C]"></div>
      </div>
    );
  }

  return (
    <div className={styles.smartSyndication}>
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
        <link rel="canonical" href="https://b2bindemand.com/blog" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="blog" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h3 className="text-2xl font-medium text-[#FF6B2C] mb-6">Blog</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="mt-[-0rem]">
            <h1 className="text-5xl font-bold leading-tight mb-4">
              The InDemand<span className="text-[#FF6B2C]"> Blog</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Get the necessary information for B2B at your fingertips!
            </p>
          </div>
          <div className="relative">
            <motion.img
              src={Blog_hero_img}
              alt="Blog Hero"
              className="w-full h-auto max-w-[600px]"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full md:w-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${activeTab === "all"
                  ? "bg-[#FF6B2C] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              All
            </button>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${activeTab === tab
                    ? "bg-[#FF6B2C] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-[20rem]">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B2C] focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 pt-4 sm:gap-6">
          {displayedPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${slugify(post.title)}`}
              className="block group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3
                  className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-[#FF6B2C] transition-colors duration-200 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: post.title }}
                />
                <div className="mt-2 flex items-center justify-between text-xs sm:text-sm text-gray-600">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <div className="mt-3">
                  <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs sm:text-sm font-medium text-gray-700">
                    {post.category}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {hasMorePosts && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMore}
              className="px-6 py-3 bg-[#FF6B2C] text-white rounded-lg font-medium hover:bg-[#e55a1f] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B2C]"
            >
              See More
            </button>
          </div>
        )}
      </div>

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

      {/* Newsletter Section with Image */}
      <div className="bg-gray-50 py-8 sm:py-12 border-2 border-[#FEB315] rounded-2xl sm:rounded-3xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-12">
            {/* Left Side: Text and Input */}
            <div className="w-full md:w-1/2 pr-0 md:pr-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
                Might as well subscribe to our{" "}
                <span className="text-[#FEB315]">newsletter</span>
                {" "}while you're here!
              </h2>

              <p className="text-gray-500 text-sm sm:text-base mb-4 sm:mb-6">
                We promise it'll be fun reading our badger stories!
              </p>

              {/* Combined Input and Button */}
              <div className="w-full max-w-[500px] relative">
                {error && !submitted && (
                  <div className="absolute -top-12 left-0 right-0">
                    <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4 animate-fade-in shadow-md">
                      <p className="text-[#FF6B2C] text-sm flex items-center">
                        <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                      </p>
                    </div>
                  </div>
                )}
                {submitted ? (
                  <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4 animate-fade-in shadow-md">
                    <p className="text-[#FF6B2C] font-medium text-sm sm:text-base flex items-center">
                      <svg className="w-5 h-5 mr-2 text-[#FF6B2C] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Thank you for subscribing!
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-0 relative"
                  >
                    <div className="relative flex-1">
                      <label htmlFor="blog-email" className="sr-only">Email address</label>
                      <input
                        type="email"
                        id="blog-email"
                        name="email"
                        className="w-full px-4 py-3 rounded-lg sm:rounded-r-none border border-[#035271] focus:outline-none focus:ring-2 focus:ring-[#035271] focus:border-transparent transition-all duration-200 text-sm sm:text-base placeholder-gray-400 bg-white bg-opacity-90 backdrop-blur-sm"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full sm:w-auto min-w-[120px] bg-[#035271] text-white px-6 py-3 rounded-lg sm:rounded-l-none sm:border-l-0 hover:bg-[#E65A1F] transition-colors duration-200"
                    >
                      {loading ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <>
                          <span>Subscribe</span>
                          {/* <svg className="w-4 h-4 ml-2 -mr-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg> */}
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right Side: Image */}
            <div className="w-full md:w-1/2">
              <div className="rounded-lg overflow-hidden h-[200px] sm:h-[250px] md:h-[300px] shadow-lg">
                <img
                  src={newsletter}
                  alt="Newsletter"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Book a Call Section */}
      <div className="py-12 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Side: Text and Button */}
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                With an <span className="text-[#FF6B2C]">expertise </span>
                like this, it's hard to resist your future results set by us...
              </h2>
              <p className="text-gray-500 mb-6">
                Book a free consultation NOW!
              </p>
              <Link
                to="https://calendly.com/rohit-b2bindemand/30min?month=2025-03"
                target="_blank"
                className="bg-[#035271] text-white px-6 py-3 rounded-lg hover:bg-[#E65A1F] transition-colors duration-200"
              >
                Book a call
              </Link>
            </div>

            {/* Right Side: Image */}
            <div className="w-full md:w-1/2 relative">
              <div className="rounded-l-lg overflow-hidden md:mr-[-25%]">
                <img
                  src={book_a_call}
                  alt="Consultation"
                  className="w-full h-full object-cover rounded-l-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
