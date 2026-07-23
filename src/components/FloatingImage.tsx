import { motion, useScroll, useTransform, HTMLMotionProps } from "framer-motion";
import { useRef } from "react";

interface FloatingImageProps extends HTMLMotionProps<"img"> {
  parallaxOffset?: number; // Distance for scroll parallax
  floatOffset?: number; // Distance for infinite float
  duration?: number; // Duration of infinite float
}

export function FloatingImage({
  parallaxOffset = 0,
  floatOffset = 8,
  duration = 6,
  className,
  style,
  ...props
}: FloatingImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  
  // Parallax based on scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [-parallaxOffset, parallaxOffset]);

  return (
    <motion.div ref={ref} style={{ y, width: "100%", height: "100%", ...style }} className={className}>
      <motion.img
        {...props}
        animate={{ 
          y: [0, -floatOffset, 0], 
          rotate: [0, 0.5, 0],
          scale: [1, 1.01, 1]
        }}
        transition={{ 
          duration: duration, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
    </motion.div>
  );
}
