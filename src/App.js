import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "animate.css";

// Component imports
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Components from "./components/Components";
import Code from "./components/Code";
import Campaigns from "./components/Campaigns";
import AboutB2BInDemand from "./components/AboutB2BInDemand";
import Blog from "./components/Blog";
import IntentTargeting from "./components/IntentTargeting";
import SmartSyndication from "./components/SmartSyndication";
import EventBasedLeadGeneration from "./components/EventBasedLeadGeneration";
import Careers from "./components/CareersComponent";
import ContactUs from "./components/ContactUs";
import Podcasts from "./components/Podcasts";
import Library from "./components/Library";
import BlogDetails from "./components/BlogDetails";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Unsubscribe from "./components/Unsubscribe";
import NotFound from "./components/NotFound";
import FAQ from "./components/FAQ";
import Sitemap from "./components/Sitemap";
import CaseStudyDetails from "./components/CaseStudyDetails";
import CookiePolicy from "./components/CookiePolicy";
import GDPRPolicy from "./components/GDPRPolicy";
import Pricing from "./components/Pricing";
import Audience from "./components/Audience";
import ROICalculator from "./components/ROICalculator";

function App() {
  //   ReactGA.initialize("YOUR_GOOGLE_ANALYTICS_ID");
  // ReactGA.send("pageview");
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/components" element={<Components />} />
        <Route path="/code" element={<Code />} />
        <Route path="/code/:componentName" element={<Code />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/intent-targeting" element={<IntentTargeting />} />
        <Route path="/smart-syndication" element={<SmartSyndication />} />
        <Route path="/event-based-lead-generation" element={<EventBasedLeadGeneration />} />
        <Route path="/about-b2bindemand" element={<AboutB2BInDemand />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/b2bindemand-careers" element={<Careers />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/webinars/podcasts" element={<Podcasts />} />
        <Route path="/resources/library" element={<Library />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/gdpr-policy" element={<GDPRPolicy />} />
        <Route path="/unsubscribe" element={<Unsubscribe />} />
        <Route path="/library" element={<Library />} />
        <Route path="/case-study/:id" element={<CaseStudyDetails />} />
        <Route path="/case-study/:id/:slug" element={<CaseStudyDetails />} />
        <Route path="/faqs" element={<FAQ />} />
        <Route path="/sitemap" element={<Sitemap />} />
        {/* 404 route - must be last */}
        <Route path="*" element={<NotFound />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/audience" element={<Audience />} />
        <Route path="/roi-calculator" element={<ROICalculator />} />
      </Routes>
    </div>
  );
}

export default App;