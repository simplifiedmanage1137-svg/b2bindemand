import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { cn } from "../../utils/cn";

export const TextGenerateEffect = ({ words, className }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: [0, 1],
      y: [20, 0],
      transition: { duration: 1 },
    });
  }, [controls]);

  return (
    <motion.span
      className={cn("inline-block", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
    >
      {words}
    </motion.span>
  );
};