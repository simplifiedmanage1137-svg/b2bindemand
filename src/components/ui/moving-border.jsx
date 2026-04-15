import React from "react";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";

export const MovingBorder = ({
  children,
  duration = 2000,
  className,
  containerClassName,
  borderClassName,
  as: Component = "div",
}) => {
  return (
    <Component className={cn("relative", containerClassName)}>
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: duration / 1000, ease: "linear", repeat: Infinity }}
        className="absolute inset-0"
      >
        <div
          className={cn(
            "w-full h-full rounded-lg bg-gradient-to-r from-[#F26C1E] to-[#0066b2]",
            borderClassName
          )}
        />
      </motion.div>
      <div className={cn("relative", className)}>{children}</div>
    </Component>
  );
};