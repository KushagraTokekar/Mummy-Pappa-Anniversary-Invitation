import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Detect touch / coarse pointer
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(isCoarse);
    if (isCoarse) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button')
      ) {
        setIsHoveringClickable(true);
      } else {
        setIsHoveringClickable(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer subtle silver ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-silver-400/50 -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          width: isHoveringClickable ? 42 : 24,
          height: isHoveringClickable ? 42 : 24,
          backgroundColor: isHoveringClickable ? 'rgba(192, 192, 192, 0.12)' : 'transparent',
          borderColor: isHoveringClickable ? '#F7E7CE' : 'rgba(192, 192, 192, 0.45)',
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 350,
          mass: 0.4,
        }}
      />

      {/* Center pinpoint */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-silver-100 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_6px_#ffffff]"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{
          type: 'spring',
          damping: 40,
          stiffness: 800,
          mass: 0.1,
        }}
      />
    </div>
  );
};
