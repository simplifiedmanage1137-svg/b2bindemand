// Complete BlogDetails component with global scroll behavior

import React, { useState, useEffect, useRef } from "react";
import styles from "./styles/SmartSyndication.module.css";
import { motion } from "framer-motion";
import Footer from "./Footer";
import { useParams, Link } from "react-router-dom";
import user_icon from "../assets/Icon/user_icon.webp";
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { Helmet } from 'react-helmet';
import { seoConfig } from '../utils/seoConfig';

const BlogDetails = () => {
  const { slug } = useParams();
  const { title: seoTitle, description: seoDesc, keywords: seoKeywords, ogImage: seoImage } = seoConfig.blogDetails;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    jobTitle: '',
    businessEmail: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [allPosts, setAllPosts] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const [headings, setHeadings] = useState([]);
  const [activeHeading, setActiveHeading] = useState("");
  const contentRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Disable body scroll and enable container scroll
  useEffect(() => {
    // Save original overflow style
    const originalOverflow = document.body.style.overflow;
    const originalHeight = document.body.style.height;
    
    // Disable body scroll
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    
    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.height = originalHeight;
    };
  }, []);

  const decodeHtmlEntities = (text) => {
    if (!text) return '';
    const parser = new DOMParser();
    const dom = parser.parseFromString(
      `<!doctype html><body>${text}`, 'text/html'
    );
    return dom.body.textContent;
  };

  const slugify = (title) => {
    if (!title) return '';

    const decodedTitle = decodeHtmlEntities(title);

    return decodedTitle
      .toLowerCase()
      .replace(/['']s\b/g, 's')
      .replace(/[''""]/g, '')
      .replace(/[^a-z0-9-\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
      .replace(/^-+|-+$/g, '');
  };

  useEffect(() => {
    emailjs.init('FWXDgNP6A3TBK3Y55');
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'hidden'; // Keep body scroll disabled
      document.body.style.height = '100vh';
    }
    return () => {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    };
  }, [isModalOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!data.jobTitle.trim()) {
      errors.jobTitle = "Job title is required";
    }

    if (!data.businessEmail.trim()) {
      errors.businessEmail = "Business email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.businessEmail)) {
      errors.businessEmail = "Invalid email address";
    }

    return errors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const pdfUrl = "/assets/pdf/Ebook.pdf";
      const fullPdfUrl = window.location.origin + pdfUrl;

      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = "B2BinDemand_Ebook.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      await Promise.all([
        emailjs.send(
          'service_m0cz9oe',
          'template_clr75s2',
          {
            to_name: formData.firstName,
            job_title: formData.jobTitle,
            to_email: formData.businessEmail,
            download_link: fullPdfUrl,
            brand_color_orange: '#FF6B2C',
            brand_color_blue: '#035271',
            gradient_from: '#FFB800',
            gradient_to: '#FF9B04',
            font_family: 'Arial',
          }
        ),
        emailjs.send(
          'service_m0cz9oe',
          'template_3iyjdi6',
          {
            user_name: formData.firstName,
            job_title: formData.jobTitle,
            user_email: formData.businessEmail,
            download_link: fullPdfUrl,
            brand_color_orange: '#FF6B2C',
            brand_color_blue: '#035271',
            emoji_user: '👤',
            emoji_email: '📧',
            emoji_job: '💼',
            emoji_download: '📥',
          }
        )
      ]);

      setShowSuccessMessage(true);
      setFormErrors({});

      setTimeout(() => {
        setIsModalOpen(false);
        setShowSuccessMessage(false);
        setFormData({ firstName: '', jobTitle: '', businessEmail: '' });
      }, 3000);
    } catch (error) {
      console.error('Form submission error:', error);
      setFormErrors(prev => ({
        ...prev,
        submit: "An error occurred while sending the email. Please try again later."
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubscribeSubmit = (e) => {
    e.preventDefault();
    if (email.trim() !== "") {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  const ShareButtons = () => {
    const [copied, setCopied] = useState(false);
    const blogUrl = window.location.href;
    const shareTitle = blog ? encodeURIComponent(decodeHtmlEntities(blog.title)) : encodeURIComponent("Check out this article from B2B inDemand");
    const shareDescription = encodeURIComponent("Discover valuable insights about B2B lead generation and sales development.");

    const handleCopyLink = () => {
      navigator.clipboard.writeText(blogUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="flex flex-col items-center gap-3">
        <p className="text-xs text-gray-400 font-medium">SHARE</p>
        <button
          onClick={() => window.open(`https://www.linkedin.com/shareArticle?url=${blogUrl}&title=${shareTitle}&summary=${shareDescription}`, "_blank")}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          aria-label="Share on LinkedIn"
        >
          <svg className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.68 1.68 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
          </svg>
        </button>

        <button
          onClick={() => window.open(`https://twitter.com/intent/tweet?url=${blogUrl}&text=${shareTitle}&hashtags=B2B,LeadGeneration`, "_blank")}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          aria-label="Share on X"
        >
          <svg className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>

        <button
          onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${blogUrl}&quote=${shareTitle}`, "_blank")}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          aria-label="Share on Facebook"
        >
          <svg className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
          </svg>
        </button>

        <button
          onClick={() => window.open(`https://api.whatsapp.com/send?text=${shareTitle}%20${blogUrl}`, "_blank")}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          aria-label="Share on WhatsApp"
        >
          <svg className="h-5 w-5 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </button>

        <div className="w-8 h-px bg-gray-200 my-1"></div>

        <button
          onClick={handleCopyLink}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors relative"
          aria-label="Copy link"
        >
          <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {copied && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap z-50">
              Link Copied!
            </div>
          )}
        </button>
      </div>
    );
  };

  const generateHeadingId = (text, index) => {
    return `heading-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
  };

  const normalizeText = (text) => {
    return text?.replace(/\s+/g, ' ').trim() || '';
  };

  const injectHeadingIdsIntoHtml = (htmlContent) => {
    if (!htmlContent) return htmlContent;
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    const headingTags = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headingTags.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = generateHeadingId(normalizeText(heading.textContent), index);
      }
    });

    let pseudoIndex = 0;
    const candidateBlocks = doc.querySelectorAll('p, div, li');
    candidateBlocks.forEach((block) => {
      if (block.querySelector('h1, h2, h3, h4, h5, h6')) return;

      const strongElement = block.querySelector('strong, b');
      if (!strongElement) return;

      const blockText = normalizeText(block.textContent);
      const strongText = normalizeText(strongElement.textContent);
      if (!strongText || strongText.length < 8 || strongText.length > 120) return;
      if (blockText !== strongText && !blockText.startsWith(strongText)) return;

      if (!block.id) {
        block.id = generateHeadingId(strongText, pseudoIndex);
      }
      block.setAttribute('data-toc', 'true');
      pseudoIndex += 1;
    });

    return doc.body.innerHTML;
  };

  const extractHeadingsFromDOM = () => {
    if (!contentRef.current) return [];

    const root = contentRef.current;
    const headingElements = root.querySelectorAll('h1, h2, h3, h4, h5, h6, [data-toc="true"]');
    const headingList = [];

    Array.from(headingElements).forEach((heading, index) => {
      if (!heading.id) {
        heading.id = generateHeadingId(normalizeText(heading.textContent), index);
      }

      const level = heading.dataset.toc === 'true'
        ? 2
        : parseInt(heading.tagName[1], 10);

      const text = normalizeText(heading.textContent);
      if (!text) return;

      headingList.push({
        id: heading.id,
        text,
        level,
      });
    });

    return headingList;
  };

  useEffect(() => {
    if (!blog?.content) return;

    const htmlWithIds = injectHeadingIdsIntoHtml(blog.content);
    if (htmlWithIds !== blog.content) {
      setBlog((prevBlog) => prevBlog ? { ...prevBlog, content: htmlWithIds } : prevBlog);
      return;
    }

    const extractAndSetHeadings = () => {
      if (!contentRef.current) return;
      const headingList = extractHeadingsFromDOM();
      if (headingList.length > 0) {
        setHeadings(headingList);
      }
    };

    const delays = [100, 300, 500, 800];
    const timeouts = delays.map((delay) => setTimeout(extractAndSetHeadings, delay));

    const observer = new MutationObserver((mutations) => {
      const shouldExtract = mutations.some((mutation) =>
        (mutation.type === 'childList' && mutation.addedNodes.length > 0) ||
        mutation.type === 'characterData'
      );
      if (shouldExtract) {
        extractAndSetHeadings();
      }
    });

    if (contentRef.current) {
      observer.observe(contentRef.current, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }

    return () => {
      timeouts.forEach(clearTimeout);
      observer.disconnect();
    };
  }, [blog?.content]);

  const scrollToHeading = (headingId) => {
    const element = document.getElementById(headingId);
    if (element && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const elementPosition = element.offsetTop - container.offsetTop - 100;

      container.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });

      setActiveHeading(headingId);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || headings.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop + 150;

      let currentHeading = "";
      for (let i = headings.length - 1; i >= 0; i--) {
        const headingElement = document.getElementById(headings[i].id);
        if (headingElement && headingElement.offsetTop - container.offsetTop <= scrollPosition) {
          currentHeading = headings[i].id;
          break;
        }
      }

      setActiveHeading(currentHeading);
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => container.removeEventListener('scroll', handleScroll);
  }, [headings]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`https://b2b-oldbackup.b2bindemand.com/wp-json/wp/v2/posts?slug=${slug}&_embed`);

        if (response.data.length === 0) {
          setError("Post not found");
          setLoading(false);
          return;
        }

        const post = response.data[0];

        const transformedPost = {
          id: post.id,
          slug: post.slug,
          title: decodeHtmlEntities(post.title.rendered),
          category: post._embedded?.['wp:term']?.[0]?.[0]?.name || "Lead Generation",
          image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "",
          author: post._embedded?.['wp:term']?.[0]?.[0]?.author || "B2B inDemand",
          date: new Date(post.date).toLocaleDateString(),
          dateISO: post.date,
          readTime: "5 min read",
          content: post.content.rendered
        };

        setBlog(transformedPost);

        const allPostsResponse = await axios.get('https://b2b-oldbackup.b2bindemand.com/wp-json/wp/v2/posts?_embed');
        const transformedPosts = allPostsResponse.data.map(post => ({
          id: post.id,
          slug: post.slug,
          title: decodeHtmlEntities(post.title.rendered),
          category: post._embedded?.['wp:term']?.[0]?.[0]?.name || "Lead Generation",
          image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "",
          author: post._embedded?.['wp:term']?.[0]?.[0]?.author || "B2B inDemand",
          date: new Date(post.date).toLocaleDateString(),
          readTime: "5 min read"
        }));

        setAllPosts(transformedPosts);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const handleDownload = () => {
    setIsModalOpen(true);
  };

  const getRelatedPosts = () => {
    if (!blog || !allPosts.length) return [];

    return allPosts
      .filter(post => post.id !== blog.id)
      .slice(0, 3);
  };

  const calculateReadingTime = (content) => {
    if (!content) {
      setReadingTime(1);
      return;
    }
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    setReadingTime(minutes);
  };

  const getReadingTimeDisplay = () => `${readingTime} min read`;

  useEffect(() => {
    if (blog?.content) {
      calculateReadingTime(blog.content);
    }
  }, [blog?.content]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF6B2C]"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  if (!blog) {
    return <div className="text-center py-10">Blog post not found</div>;
  }

  const pageTitle = seoTitle.replace("{{title}}", blog.title || "");
  const pageDesc = seoDesc.replace("{{excerpt}}", blog.excerpt || blog.description || "");
  const pageKeywords = seoKeywords.replace("{{keywords}}", blog.tags?.join(", ") || "");
  const pageImage = seoImage.replace("{{featuredImage}}", blog.featuredImage || blog.image || "");

  return (
    <div className={styles.smartSyndication} style={{ height: '100vh', overflow: 'hidden' }}>
      <Helmet>
        <title>{pageTitle || blog?.title || seoTitle}</title>
        <meta name="description" content={pageDesc || blog?.excerpt || seoDesc} />
        <meta name="keywords" content={`${blog?.categories?.join(", ") || ""}, ${pageKeywords || seoKeywords}`} />
        <meta property="og:title" content={pageTitle || blog?.title || seoTitle} />
        <meta property="og:description" content={pageDesc || blog?.excerpt || seoDesc} />
        <meta property="og:image" content={pageImage || blog?.featuredImage || seoImage} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={blog?.date} />
        <meta property="article:author" content={blog?.author} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`${window.location.origin}/blog/${slug}`} />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": "${blog?.title}",
              "image": "${blog?.featuredImage}",
              "author": {
                "@type": "Person",
                "name": "${blog?.author}"
              },
              "datePublished": "${blog?.date}",
              "description": "${blog?.excerpt}"
            }
          `}
        </script>
      </Helmet>
      
      {/* Main Container with fixed header and scrollable content */}
      <div className="flex flex-col h-full">
        {/* Scrollable Area */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto"
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link
              to="/blog"
              className="inline-flex items-center text-[#005F73] hover:text-[#004C5C] mb-8 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>

            {/* Blog Header */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-start lg:items-center py-4 sm:py-6 lg:py-8">
              <div className="mt-0 sm:mt-[-0rem] px-4 sm:px-6 lg:px-0 order-2 lg:order-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-3 sm:mb-4 tracking-tight text-gray-900">
                  {decodeHtmlEntities(blog.title)}
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8">{blog.category}</p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full max-w-lg p-4 sm:p-5 bg-white/90 backdrop-blur-sm shadow-sm border border-gray-100 rounded-lg space-y-4 sm:space-y-0 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                      <img
                        src={user_icon}
                        alt={blog.author}
                        className="rounded-full object-cover w-full h-full"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{blog.author}</p>
                      <p className="text-xs text-gray-500">
                        Email Marketing Manager
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm border-t sm:border-t-0 pt-4 sm:pt-0 w-full sm:w-auto">
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#005F73]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6l4 2"
                      ></path>
                      <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                    <span className="font-medium text-[#005F73]">{getReadingTimeDisplay()}</span>
                  </div>
                </div>
              </div>

              <div className="relative w-full px-4 sm:px-6 lg:px-0 mt-0 lg:mt-0 order-1 lg:order-2">
                <motion.div
                  className="relative aspect-[16/9] sm:aspect-[4/3] w-full max-w-[500px] mx-auto overflow-hidden rounded-lg shadow-lg bg-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div
                    className="absolute inset-0 bg-gray-200 animate-pulse"
                    style={{ opacity: imageLoaded ? 0 : 1 }}
                    aria-hidden="true"
                  />

                  <motion.img
                    src={blog.image}
                    alt={blog.title}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
                    style={{ opacity: imageLoaded ? 1 : 0 }}
                    onLoad={() => setImageLoaded(true)}
                  />
                </motion.div>
              </div>
            </div>

            {/* Article Section with 3 columns */}
            <div className="w-full mt-8 sm:mt-12 lg:mt-16">
              <div className="grid grid-cols-12 gap-8">
                {/* Left Column - Share Buttons (Sticky) */}
                <div className="hidden lg:block lg:col-span-2">
                  <div className="sticky top-16">
                    <div className="bg-white rounded-lg shadow-md border border-gray-100 p-1">
                      <ShareButtons />
                    </div>
                  </div>
                </div>

                {/* Middle Column - Article Content */}
                <div className="lg:col-span-7 col-span-12">
                  <div
                    ref={contentRef}
                    className="blog-content"
                    role="article"
                  >
                    <div
                      className="prose prose-sm sm:prose-base lg:prose-lg max-w-none
                      prose-headings:scroll-mt-24
                      prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
                      prose-h1:text-2xl sm:prose-h1:text-3xl lg:prose-h1:text-4xl prose-h1:mb-4 sm:prose-h1:mb-6 
                      prose-h2:text-xl sm:prose-h2:text-2xl lg:prose-h2:text-3xl prose-h2:mb-3 sm:prose-h2:mb-4 
                      prose-h3:text-lg sm:prose-h3:text-xl lg:prose-h3:text-2xl prose-h3:mb-2 sm:prose-h3:mb-3 
                      prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-3 sm:prose-p:mb-4 
                      prose-p:text-sm sm:prose-p:text-base lg:prose-p:text-lg
                      prose-a:text-[#035271] prose-a:no-underline hover:prose-a:underline
                      prose-strong:text-gray-900 prose-strong:font-semibold
                      prose-ul:list-disc prose-ul:pl-4 prose-ul:my-4 sm:prose-ul:my-6
                      prose-ol:list-decimal prose-ol:pl-4 prose-ol:my-4 sm:prose-ol:my-6
                      prose-li:text-gray-600 prose-li:mb-1.5 sm:prose-li:mb-2
                      prose-blockquote:border-l-4 prose-blockquote:border-[#035271] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-700
                      prose-img:rounded-xl prose-img:shadow-sm prose-img:w-full prose-img:max-w-full prose-img:my-6 prose-img:aspect-video
                      prose-code:text-[#035271] prose-code:bg-gray-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                      prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-3 sm:prose-pre:p-4 prose-pre:rounded-xl prose-pre:overflow-x-auto
                      prose-table:w-full prose-table:border-collapse prose-th:border prose-th:border-gray-300 prose-th:p-2 prose-td:border prose-td:border-gray-300 prose-td:p-2"
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                  </div>

                  {/* Article Footer */}
                  <footer className="border-t border-gray-100 mt-8 pt-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs sm:text-sm text-gray-500">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                        <time dateTime={blog.dateISO}>{blog.date}</time>
                        {blog.readTime && (
                          <>
                            <span className="hidden sm:block w-1 h-1 rounded-full bg-gray-300" />
                            <span>{getReadingTimeDisplay()}</span>
                          </>
                        )}
                      </div>
                      {blog.category && (
                        <span className="inline-block px-2.5 sm:px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs sm:text-sm">
                          {blog.category}
                        </span>
                      )}
                    </div>
                  </footer>
                </div>

                {/* Right Column - Table of Contents (Sticky) */}
                <div className="hidden lg:block lg:col-span-3">
                  <div className="sticky top-16">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                      <div className="bg-gradient-to-r from-[#035271] to-[#005F73] p-4">
                        <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                          </svg>
                          Table of Contents
                        </h3>
                      </div>

                      <div className="p-4 max-h-[500px] overflow-y-auto">
                        {headings.length > 0 ? (
                          <nav className="space-y-2" aria-label="Table of contents">
                            {headings.map((heading) => (
                              <button
                                key={heading.id}
                                onClick={() => scrollToHeading(heading.id)}
                                className={`
                                  w-full text-left transition-all duration-200 rounded-lg px-3 py-2 text-sm
                                  hover:bg-orange-50 hover:text-[#FF6B2C] focus:outline-none focus:ring-2 focus:ring-[#FF6B2C]
                                  ${activeHeading === heading.id
                                    ? 'bg-orange-50 text-[#FF6B2C] font-medium border-l-4 border-[#FF6B2C]'
                                    : 'text-gray-700 hover:border-l-4 hover:border-orange-200'
                                  }
                                `}
                                style={{
                                  paddingLeft: `${(heading.level - 1) * 16 + 12}px`
                                }}
                              >
                                <span className="line-clamp-2">{heading.text}</span>
                              </button>
                            ))}
                          </nav>
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-gray-500 text-sm">No headings found</p>
                          </div>
                        )}
                      </div>

                      {/* Download Button */}
                      <div className="border-t border-gray-100 p-4 bg-gray-50">
                        <button
                          onClick={handleDownload}
                          className="group flex items-center justify-center w-full gap-2 px-4 py-3 bg-gradient-to-r from-[#FF6B2C] to-[#E65A1F] text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-5-5 5 5 5-5" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5" />
                          </svg>
                          <span>Get the Ethical Practices Checklist</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden mt-8">
              {/* Mobile Share Bar */}
              <div className="mb-6">
                <div className="bg-white rounded-lg shadow-md border border-gray-100 p-4">
                  <p className="text-xs text-gray-400 font-medium text-center mb-3">SHARE THIS ARTICLE</p>
                  <div className="flex items-center justify-center gap-4">
                    <ShareButtons />
                  </div>
                </div>
              </div>

              {/* Mobile TOC */}
              {headings.length > 0 && (
                <div className="mb-6">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-r from-[#035271] to-[#005F73] p-4">
                      <h3 className="text-white font-semibold text-lg">Table of Contents</h3>
                    </div>
                    <div className="p-4">
                      {headings.map((heading) => (
                        <button
                          key={heading.id}
                          onClick={() => scrollToHeading(heading.id)}
                          className="w-full text-left py-2 text-sm text-gray-700 hover:text-[#FF6B2C]"
                        >
                          {heading.text}
                        </button>
                      ))}
                    </div>
                    <div className="p-4 bg-gray-50">
                      <button
                        onClick={handleDownload}
                        className="w-full px-4 py-2 bg-[#FF6B2C] text-white rounded-lg"
                      >
                        Download Media Kit
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Related Posts Section */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-8">Related Posts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {getRelatedPosts().map((post) => (
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
            </div>

            {/* Subscribe Section */}
            <div className="container mx-auto px-4 text-center mt-12 sm:mt-16 lg:mt-20 py-8 sm:py-12 lg:py-16">
              <div className="max-w-4xl mx-auto relative">
                <div className="absolute inset-0 -skew-y-2 bg-gradient-to-b from-orange-50 to-orange-100 rounded-3xl transform -rotate-1 opacity-50" aria-hidden="true" />
                <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-3xl" aria-hidden="true" />

                <div className="relative px-4 sm:px-6 py-8 sm:py-10 lg:py-12">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-3 sm:mb-4 tracking-tight">
                    <span className="text-[#FF6B2C] font-semibold inline-block relative group">
                      Subscribe
                      <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[#FF6B2C] opacity-20 rounded-full transform transition-transform group-hover:scale-x-110" aria-hidden="true" />
                    </span>
                    {" "}
                    <span className="inline-block">to Our Blog</span>
                  </h2>
                  <p className="text-base sm:text-lg text-gray-600 max-w-xl sm:max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10">
                    Get the latest updates NOW in your inbox!
                  </p>

                  <div className="max-w-md mx-auto">
                    {submitted ? (
                      <div className="bg-green-50 rounded-lg p-4 sm:p-5 flex items-center justify-center transform transition-all duration-300 animate-fade-in">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2 sm:mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-green-700 font-medium text-sm sm:text-base">
                          Thank you for subscribing!
                        </p>
                      </div>
                    ) : (
                      <form
                        onSubmit={handleSubscribeSubmit}
                        className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-1"
                      >
                        <div className="flex-1 relative group">
                          <label htmlFor="email" className="sr-only">Email address</label>
                          <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#FF6B2C] focus:border-[#FF6B2C] placeholder-gray-400 transition-shadow group-hover:shadow-md"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-[#FF6B2C] hover:bg-[#E65A1F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF6B2C] active:transform active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-sm hover:shadow-md"
                          disabled={!email}
                        >
                          <span>Subscribe</span>
                          <svg className="ml-2 -mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Need Help Section */}
            <div className="container mx-auto px-4 text-center mt-20">
              <h1 className="text-4xl font-semibold text-gray-900 mb-4">
                Need Some
                <span className="text-[#FF6B2C] font-semibold"> More</span> Help?
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get in touch with us for a deeper dive into your problems
              </p>
            </div>

            <div className="flex justify-center items-center mt-10 mb-10">
              <Link
                to="https://calendly.com/rohit-b2bindemand/30min?month=2025-03"
                target="_blank"
                className="bg-[#035271] text-white px-6 py-3 rounded-lg hover:bg-[#E65A1F] transition-colors duration-200"
              >
                Book a call
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
      {/* Download Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => !isSubmitting && setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white/95 p-6 text-left shadow-xl transition-all"
            onClick={(e) => {
              e.stopPropagation();
            }}
            tabIndex="-1"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (!isSubmitting) {
                  setIsModalOpen(false);
                }
              }}
              className={`absolute right-4 top-4 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF6B2C] rounded-full p-1 ${isSubmitting ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100'}`}
              disabled={isSubmitting}
              aria-label="Close modal"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mt-2">
              <h3 id="modal-title" className="text-2xl font-semibold text-[#035271] mb-2">
                Download Media Kit
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Please fill out this form to receive your free Media Kit
              </p>

              {showSuccessMessage ? (
                <div className="text-center py-8" role="alert" aria-live="polite">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-[#035271] mb-2">Thank you!</h3>
                  <p className="text-sm text-gray-500">Your Media Kit has been downloaded successfully. We've also sent you an email with a download link for future reference.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF6B2C] focus:border-[#FF6B2C] placeholder-gray-400
                        ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                      value={formData.firstName}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      placeholder="Enter your first name"
                      aria-invalid={!!formErrors.firstName}
                      aria-describedby={formErrors.firstName ? "firstName-error" : undefined}
                    />
                    {formErrors.firstName && (
                      <p id="firstName-error" className="mt-1 text-sm text-red-500">{formErrors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                      Job Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="jobTitle"
                      name="jobTitle"
                      required
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF6B2C] focus:border-[#FF6B2C] placeholder-gray-400
                        ${formErrors.jobTitle ? 'border-red-500' : 'border-gray-300'}`}
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      placeholder="Enter your job title"
                      aria-invalid={!!formErrors.jobTitle}
                      aria-describedby={formErrors.jobTitle ? "jobTitle-error" : undefined}
                    />
                    {formErrors.jobTitle && (
                      <p id="jobTitle-error" className="mt-1 text-sm text-red-500">{formErrors.jobTitle}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="businessEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Business Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="businessEmail"
                      name="businessEmail"
                      required
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF6B2C] focus:border-[#FF6B2C] placeholder-gray-400
                        ${formErrors.businessEmail ? 'border-red-500' : 'border-gray-300'}`}
                      value={formData.businessEmail}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      placeholder="Enter your company email"
                      aria-invalid={!!formErrors.businessEmail}
                      aria-describedby={formErrors.businessEmail ? "businessEmail-error" : undefined}
                    />
                    {formErrors.businessEmail && (
                      <p id="businessEmail-error" className="mt-1 text-sm text-red-500">{formErrors.businessEmail}</p>
                    )}
                  </div>

                  {formErrors.submit && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-600">{formErrors.submit}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-[#FFB800] to-[#FF9B04] text-white font-semibold rounded-lg shadow-md hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B2C] focus-visible:ring-offset-2 active:transform active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>Download Now</span>
                      </div>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;