import React from 'react';
import { motion } from 'framer-motion';

interface GenieWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export const GenieWrapper = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: GenieWrapperProps) => {
  const getInitialPos = () => {
    switch (direction) {
      case 'up':
        return { y: 45, x: 0 };
      case 'down':
        return { y: -45, x: 0 };
      case 'left':
        return { x: 45, y: 0 };
      case 'right':
        return { x: -45, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const pos = getInitialPos();

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.88,
        filter: 'blur(10px)',
        ...pos,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.16, 1, 0.3, 1], // Vanishing Genie Cubic Bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
