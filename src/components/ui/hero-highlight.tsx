"use client";
import { cn } from "@/lib/utils";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React from "react";

interface HeroHighlightProps {
  children: React.ReactNode;
  className?: string;
}

export const HeroHighlight = ({
  children,
  className = "",
}: HeroHighlightProps) => {
  const variants = {
    initial: {
      backgroundPosition: "0 0",
      opacity: 0,
      y: 20,
    },
    animate: {
      backgroundPosition: "0 100%",
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.span
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 1,
        ease: "easeOut",
      }}
      className={`relative inline-block ${className}`}
      style={{
        background: "linear-gradient(to right, #007CF0, #00DFD8)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundSize: "200% 200%",
      }}
    >
      {children}
    </motion.span>
  );
};

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.span
      initial={{
        backgroundSize: "0% 100%",
      }}
      animate={{
        backgroundSize: "100% 100%",
      }}
      transition={{
        duration: 2,
        ease: "linear",
        delay: 0.5,
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={cn(
        `relative inline-block pb-1   px-1 rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 dark:from-indigo-500 dark:to-purple-500`,
        className
      )}
    >
      {children}
    </motion.span>
  );
};
