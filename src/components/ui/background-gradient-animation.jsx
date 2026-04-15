import { motion } from "framer-motion";
import React from "react";

export const BackgroundGradientAnimation = ({
  children,
  className = "",
  containerClassName = "",
  colors = ["#0066FF", "#F26C1E", "#FFB800"],
  duration = 12,
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${containerClassName}`}>
      <motion.div
        initial="initial"
        animate="animate"
        variants={variants}
        transition={{
          duration: duration,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          background: `linear-gradient(to right, ${colors.join(", ")})`,
        }}
        className={`absolute inset-0 h-full bg-gradient-to-r opacity-30 ${className}`}
      />
      {children}
    </div>
  );
};
