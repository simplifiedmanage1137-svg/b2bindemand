import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
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
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <motion.div
        variants={variants}
        initial="initial"
        animate={animate ? "animate" : "initial"}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "absolute inset-0 rounded-lg bg-gradient-to-r from-[#F26C1E] via-[#0066b2] to-[#F26C1E] opacity-60 group-hover:opacity-100 transition-opacity",
          "blur-xl group-hover:blur-xl",
          "animate-gradient"
        )}
      />
      <div className={cn("relative", className)}>{children}</div>
    </div>
  );
};