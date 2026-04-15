import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const SparklesCore = ({
  id,
  background,
  minSize,
  maxSize,
  particleDensity,
  className,
  particleColor,
}) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const particleCount = Math.floor((window.innerWidth * particleDensity) / 100);
    const newParticles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (maxSize - minSize) + minSize,
    }));
    setParticles(newParticles);
  }, [minSize, maxSize, particleDensity]);

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden", className)}
      style={{ background }}
    >
      {particles.map((particle, i) => (
        <motion.div
          key={`${id}-particle-${i}`}
          animate={{
            x: [
              `${particle.x}%`,
              `${particle.x + (Math.random() * 10 - 5)}%`,
              `${particle.x}%`,
            ],
            y: [
              `${particle.y}%`,
              `${particle.y + (Math.random() * 10 - 5)}%`,
              `${particle.y}%`,
            ],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            background: particleColor,
            opacity: 0.2,
          }}
        />
      ))}
    </div>
  );
};