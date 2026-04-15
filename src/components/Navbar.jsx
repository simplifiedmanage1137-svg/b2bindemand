import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/Website-logo.png";
import { Link } from 'react-router-dom';
import NavDropdown from "./NavDropdown";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isOpen]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 w-full bg-white/75 backdrop-blur-lg z-50 border-b border-gray-100"
    >
      <nav className="px-4 md:px-6 py-4 max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center gap-8">
          {/* Logo Section */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link to="/" className="flex items-center">
              <img src={logo} alt="B2BInDemand Logo" className="h-12 w-auto" />
            </Link>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-4 ml-2">
            {[
              { title: "Solutions", dropdownItems: ["Campaigns+", "Intent Targeting", "Smart Syndication", "Event-Based Lead Generation"] },
              { title: "Resources", dropdownItems: ["Blog", "Library"] },
              { title: "About Us", dropdownItems: ["About B2BInDemand", "Careers"] },
              { title: "Publication Sites", dropdownItems: ["B2B Connect Hub", "Silicon Media Network"] },
            ].map((menuItem) => (
              <motion.div 
                key={menuItem.title} 
                whileHover={{ y: -2 }}
                className="group"
              >
                <NavDropdown
                  title={menuItem.title}
                  isHovered={hoveredItem === menuItem.title}
                  onHover={() => setHoveredItem(menuItem.title)}
                  onLeave={() => setHoveredItem(null)}
                  dropdownItems={menuItem.dropdownItems}
                  isActive={isActive(`/${menuItem.title.toLowerCase().replace(/\s+/g, '-')}`)}
                  className="group-hover:text-[#FF6B2C]"
                />
              </motion.div>
            ))}

            {/* Library as a Standalone Menu Item */}
            {/* <motion.div whileHover={{ y: -2 }}>
              <NavLink 
                to="/Resources/Library" 
                className={({ isActive }) => 
                  `text-[15px] font-medium transition-colors duration-200 ${
                    isActive ? 'text-[#FF6B2C]' : 'text-gray-700 hover:text-gray-900'
                  }`
                }
              >
                Library
              </NavLink>
            </motion.div> */}
          </div>

          {/* Contact Us Button */}
          <div className="hidden lg:block">
            <Link to="/contact-us">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`relative px-6 py-2.5 text-white text-[15px] font-medium rounded-lg overflow-hidden group ${
                  location.pathname === '/contact-us' 
                    ? 'bg-[#F26C1E]/90' 
                    : 'bg-[#F26C1E] hover:bg-[#F26C1E]/90'
                }`}
              >
                Contact Us
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 hover:text-[#FF6B2C] transition-colors duration-200 relative z-50"
            aria-label="Toggle mobile menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 transition-colors duration-200 ${isOpen ? 'text-[#FF6B2C]' : 'text-gray-700'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-x-0 top-[72px] bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100/20 z-40"
            >
              <div className="py-2 px-4 max-w-[1400px] mx-auto">
                {[
                  { title: "Solutions", items: ["Campaigns+", "Intent Targeting", "Smart Syndication", "Event-Based Lead Generation"] },
                  { title: "Resources", items: ["Blog", "Library"] },
                  { title: "About Us", items: ["About B2BInDemand", "Careers"] },
                  { title: "Publication Sites", items: ["B2B Connect Hub", "Silicon Media Network"] },
                ].map((menuItem) => (
                  <MobileNavItem
                    key={menuItem.title}
                    title={menuItem.title}
                    items={menuItem.items}
                    isActive={isActive(`/${menuItem.title.toLowerCase().replace(/\s+/g, '-')}`)}
                    onClose={() => setIsOpen(false)}
                  />
                ))}
                <Link to="/contact-us" onClick={() => setIsOpen(false)}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full px-5 py-2.5 mt-2 text-white text-[15px] font-medium rounded-lg ${
                      location.pathname === '/contact-us'
                        ? 'bg-[#F26C1E]/90'
                        : 'bg-[#F26C1E] hover:bg-[#F26C1E]/90'
                    }`}
                  >
                    Contact Us
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

// MobileNavItem component for mobile menu items
const MobileNavItem = ({ title, items, isActive, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const getItemPath = (item) => {
    const itemToPath = {
      "Campaigns+": "/campaigns",
      "Intent Targeting": "/intent-targeting",
      "Smart Syndication": "/smart-syndication",
      "Event-Based Lead Generation": "/event-based-lead-generation",
      "About B2BInDemand": "/about-b2bindemand",
      "Careers": "/b2bindemand-careers",
      "B2B Connect Hub": "https://b2bconnecthub.com/",
      "Silicon Media Network": "https://siliconmedianetwork.com/",
      Podcasts: "/podcasts",
      Library: "/library",
    };
    return itemToPath[item] || `/${item.toLowerCase().replace(/\s+/g, "-")}`;
  };

  const isExternalLink = (item) => {
    return item === "B2B Connect Hub" || item === "Silicon Media Network";
  };

  const handleItemClick = (e, item) => {
    if (isExternalLink(item)) {
      e.stopPropagation();
      window.open(getItemPath(item), '_blank', 'noopener,noreferrer');
    }
    onClose();
  };

  return (
    <div className="border-b border-gray-100">
      <button
        className="w-full py-4 px-6 flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className={`text-medium font-medium ${isActive ? "text-[#FF6B2C]" : "text-gray-700"}`}>
          {title}
        </span>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${isExpanded ? "text-[#FF6B2C]" : "text-gray-400"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-gray-50"
          >
            {items.map((item, index) => (
              isExternalLink(item) ? (
                <button
                  key={index}
                  onClick={(e) => handleItemClick(e, item)}
                  className={`w-full block py-3 px-8 text-base transition-colors duration-200 text-left ${
                    location.pathname === getItemPath(item)
                      ? "text-[#FF6B2C] bg-orange-50"
                      : "text-gray-600 hover:text-[#FF6B2C] hover:bg-orange-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{item}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </button>
              ) : (
                <Link
                  key={index}
                  to={getItemPath(item)}
                  className={`block py-3 px-8 text-base transition-colors duration-200 ${
                    location.pathname === getItemPath(item)
                      ? "text-[#FF6B2C] bg-orange-50"
                      : "text-gray-600 hover:text-[#FF6B2C] hover:bg-orange-50"
                  }`}
                  onClick={onClose}
                >
                  {item}
                </Link>
              )
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
