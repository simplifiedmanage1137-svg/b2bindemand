import React from 'react';
import { motion } from 'framer-motion';
import word_map from "../assets/Icon/WordMapAnimation.svg";

const locations = [
  {
    id: 1,
    name: 'Sales and CXX Delaware, USA',
    coordinates: { x: '29%', y: '42%' },
  },
  {
    id: 2,
    name: 'Sales Office London, UK',
    coordinates: { x: '47%', y: '33%' },
  },
  {
    id: 3,
    name: 'Headquarters Ahmedabad, India',
    coordinates: { x: '64%', y: '53%' },
  },
  {
    id: 4,
    name: 'Delivery Center Pune, India',
    coordinates: { x: '65%', y: '56%' },
  },
];

const WorldMap = () => {
  return (
    <div className="relative w-full">
      {/* Base Map Image */}
      <div className="relative w-full max-w-[900px] mx-auto">
        <img
          src={word_map}
          alt="Global Presence"
          className="w-full h-auto"
        />

        {/* Animated Location Markers */}
        {locations.map((location) => (
          <div
            key={location.id}
            className="absolute"
            style={{
              left: location.coordinates.x,
              top: location.coordinates.y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Marker Container */}
            <div className="relative group">
              {/* Pulsing Background */}
              <motion.div
                className="absolute -inset-1.5 rounded-full bg-[#FF6B2C]"
                initial={{ opacity: 0.4, scale: 1 }}
                animate={{ opacity: 0, scale: 1.8 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeOut"
                }}
              />
              
              {/* Main Dot */}
              <motion.div
                className="w-2 h-2 bg-[#FF6B2C] rounded-full relative z-10"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut"
                }}
              />

              {/* Location Label */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-1 group-hover:translate-x-0 pointer-events-none z-20">
                <div className="bg-[#FF6B2C] text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
                  {location.name}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorldMap;
