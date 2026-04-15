import React, { useState } from "react";
import { motion } from "framer-motion";

export const CardSpotlight = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      className="group relative w-full overflow-hidden rounded-xl shadow-xl"
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="hover"
      variants={{
        initial: { scale: 1 },
        hover: {
          scale: 1.02,
          transition: { duration: 0.3, ease: "easeInOut" },
        },
      }}
      style={{
        backgroundColor: "#035271",
      }}
    >
      {/* Semi-transparent white overlay with blur */}
      <div 
        className="absolute inset-0 backdrop-blur-[2px] bg-white/10 transition-all duration-300"
      />

      {/* Interactive spotlight effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out pointer-events-none"
        style={{
          background: `
            radial-gradient(
              800px circle at ${mousePosition.x}px ${mousePosition.y}px,
              rgba(255, 107, 44, 0.2),
              transparent 40%
            )
          `,
          backdropFilter: 'blur(2px)',
        }}
      />

      {/* Accent color gradient */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 107, 44, 0.15), transparent 60%)',
          backdropFilter: 'blur(1px)',
        }}
      />

      {/* Content wrapper */}
      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
};
