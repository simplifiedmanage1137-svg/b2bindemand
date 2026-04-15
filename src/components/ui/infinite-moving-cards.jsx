import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
  children,
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;
    const containerWidth = scrollContainer.offsetWidth;
    const distanceToScroll = scrollWidth / 2;

    const duration = speed === "fast" ? 20 : speed === "normal" ? 30 : 40;

    const animation = scrollContainer.animate(
      [
        { transform: "translateX(0)" },
        {
          transform: `translateX(${direction === "left" ? -distanceToScroll : distanceToScroll}px)`,
        },
      ],
      {
        duration: duration * 1000,
        iterations: Infinity,
        easing: "linear",
      }
    );

    if (pauseOnHover) {
      scrollContainer.addEventListener("mouseenter", () => {
        animation.pause();
      });

      scrollContainer.addEventListener("mouseleave", () => {
        animation.play();
      });
    }

    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        animation.pause();
      } else {
        animation.play();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Handle mobile touch events
    let touchStart = 0;
    scrollContainer.addEventListener("touchstart", (e) => {
      touchStart = e.touches[0].pageX;
      animation.pause();
    });

    scrollContainer.addEventListener("touchend", () => {
      animation.play();
    });

    scrollContainer.addEventListener("touchmove", (e) => {
      const touchDiff = touchStart - e.touches[0].pageX;
      if (Math.abs(touchDiff) > 5) {
        e.preventDefault();
      }
    }, { passive: false });

    return () => {
      animation.cancel();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [direction, speed, pauseOnHover]);

  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      <div
        ref={containerRef}
        className="flex items-center whitespace-nowrap py-8"
      >
        {items.concat(items).map((item, idx) => (
          <motion.div
            key={idx}
            className="flex-shrink-0 relative group"
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            {children(item)}
            <motion.div
              className="absolute -bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-[#FF6B2C] to-[#FF8F6B] opacity-0 transform -translate-x-1/2"
              initial={{ width: "0%" }}
              whileHover={{ 
                width: "80%",
                opacity: 1,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
