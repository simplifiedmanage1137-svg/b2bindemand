import { useState, useEffect } from "react";
import BusinessIcon from "../../assets/34_Business.svg";
import NISAnnual from "../../assets/NIS_Annual.svg";
import Bookmark_Tabs from "../../assets/Icon/Bookmark_Tabs.svg";
import { Link } from "react-router-dom";
import { fetchBlogPosts } from "../../data/blogData";

export const ResourcesSection = () => {
  const [resources, setResources] = useState([
    {
      id: 1,
      title: "Latest Blog Post",
      description: "Lead Generation",
      thumbnail: BusinessIcon,
    },
    {
      id: 2,
      title: "Featured Article",
      description: "Content Syndication",
      thumbnail: NISAnnual,
    },
  ]);
  const [loading, setLoading] = useState(true);

  const slugify = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with dashes
      .trim(); // Remove leading/trailing spaces
  };

  useEffect(() => {
    const loadResources = async () => {
      try {
        const data = await fetchBlogPosts();
        const allPosts = data?.allPosts || [];
        if (allPosts.length >= 2) {
          setResources([
            {
              id: allPosts[0].id,
              title: allPosts[0].title,
              description: allPosts[0].category,
              thumbnail: BusinessIcon,
            },
            {
              id: allPosts[1].id,
              title: allPosts[1].title,
              description: allPosts[1].category,
              thumbnail: NISAnnual,
            },
          ]);
        }
      } catch (error) {
        console.error('Error loading resources:', error);
        // Default resources are already set in initial state
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, []);
  if (loading) {
    return (
      <div className="w-full py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading resources...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-12 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading section */}
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-normal mb-4">
            Hungry for{" "}
            <span className="bg-[#FFB800] px-3 py-1.5 italic text-white rounded-lg inline-block mt-2">
              resources?
            </span>
            <img
              src={Bookmark_Tabs}
              alt="Bookmark_Tabs"
              className="w-8 h-8 sm:w-10 sm:h-10 inline-block"
              style={{ top: "18px", left: "-9px", position: "relative" }}
            />{" "}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            We have case studies, whitepapers, blogs...
            <br />
            ...all ready for you to devour!
          </p>
        </div>

        {/* Resources grid */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch gap-6 sm:gap-8">
          {/* Resource cards */}
          {resources.map((resource, idx) => (
            <Link
              key={idx}
              to={`/blog/${slugify(resource.title)}`}
              className="w-full sm:w-[30%] group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="aspect-[4/3] relative bg-[#f8d89c] flex items-center justify-center p-6 sm:p-8">
                <img
                  src={resource.thumbnail}
                  alt={resource.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-4 sm:p-6">
                <p className="text-xs sm:text-sm text-gray-600 mb-2">
                  {resource.description}
                </p>
                <h3 
                  className="text-base sm:text-lg font-bold group-hover:text-[#F26C1E] hover:underline transition-colors"
                  dangerouslySetInnerHTML={{ __html: resource.title }}
                />
              </div>
            </Link>
          ))}

          {/* "There's more" section */}
          <div className="w-full sm:w-[30%] flex items-center justify-center sm:justify-start border-t sm:border-t-0 sm:border-l border-gray-400 pt-6 sm:pt-0">
            <div className="text-center sm:text-left">
              <div className="flex flex-col items-center sm:items-start gap-1">
                <p className="text-2xl sm:text-3xl font-medium">There's more</p>
                <p className="text-2xl sm:text-3xl font-medium">waiting for you</p>
                <Link
                  dir="rtl"
                  to="/blog"
                  className="bg-[#ffd62e] px-6 sm:px-8 py-1 text-white hover:underline text-2xl sm:text-3xl font-bold rounded-s-lg hover:bg-[#ffd62e]/90 transition-colors mt-1"
                >
                  Here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
