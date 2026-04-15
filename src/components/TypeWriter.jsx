import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TypeWriter = ({ messages = [], delay = 150, loop = true }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const currentMessage = messages[messageIndex];

  useEffect(() => {
    let timer;
    
    const type = () => {
      if (!currentMessage) return;

      if (!isDeleting && displayText === currentMessage) {
        // Pause at the end of typing
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      } else if (isDeleting && displayText === '') {
        // Move to next message after deleting
        setIsDeleting(false);
        setMessageIndex((prev) => (prev + 1) % messages.length);
      } else {
        // Type or delete text
        timer = setTimeout(() => {
          setDisplayText(prev => {
            if (isDeleting) {
              return prev.slice(0, -1);
            }
            return currentMessage.slice(0, prev.length + 1);
          });
        }, isDeleting ? delay * 0.5 : delay);
      }
    };

    type();
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentMessage, delay, messages.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="px-6 py-3 transform hover:scale-105 transition-all duration-300"
    >
      <motion.span 
        className="text-[#000000] font-medium text-[12px] sm:text-lg md:text-xl lg:text-2xl whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {displayText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="ml-1 inline-block font-normal text-[#000000]"
        >
          |
        </motion.span>
      </motion.span>
    </motion.div>
  );
};

export default TypeWriter;
