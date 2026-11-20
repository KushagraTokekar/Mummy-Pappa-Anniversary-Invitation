import React from 'react';
import { motion } from 'framer-motion';

interface SilverEmblemProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SilverEmblem3D: React.FC<SilverEmblemProps> = ({ size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36 md:w-44 md:h-44',
    lg: 'w-48 h-48 md:w-60 md:h-60',
  };

  return (
    <motion.div
      className={`relative flex items-center justify-center select-none ${sizeMap[size]} ${className}`}
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Outer ambient glow */}
      <div className="absolute inset-0 rounded-full bg-silver-400/20 blur-xl animate-pulseGlow" />

      {/* Rotating outer filigree ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-silver-400/30 border-dashed"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 45, ease: 'linear' }}
      />

      {/* Counter-rotating decorative dots ring */}
      <motion.div
        className="absolute inset-2 rounded-full border border-champagne-300/25 border-dotted"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
      />

      {/* Main metallic embossed medallion */}
      <div className="relative w-[85%] h-[85%] rounded-full p-[2px] bg-gradient-to-tr from-silver-600 via-white to-silver-700 shadow-2xl shadow-black/80 flex items-center justify-center">
        {/* Inner dark satin disc */}
        <div className="w-full h-full rounded-full bg-gradient-to-b from-[#181d29] via-[#0f131a] to-[#0a0c10] flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
          
          {/* Shimmer light sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />

          {/* Laurel Crown */}
          <svg
            className="w-8 h-5 text-silver-300/80 mb-0.5 filter drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]"
            viewBox="0 0 24 16"
            fill="currentColor"
          >
            <path d="M12 1L14 5L18 3L16 8L20 9L16 12L18 15L12 13L6 15L8 12L4 9L8 8L6 3L10 5Z" opacity="0.9" />
          </svg>

          {/* Roman / Numeral '25' */}
          <div className="font-display font-black tracking-tight text-3xl md:text-5xl text-silver-gradient drop-shadow-[0_2px_10px_rgba(255,255,255,0.4)] leading-none">
            25
          </div>

          {/* Jubilee Subtext */}
          <span className="text-[8px] md:text-[10px] tracking-[0.28em] uppercase font-semibold text-champagne-300/90 mt-1 font-serif">
            Silver Jubilee
          </span>

          {/* Bottom subtle star */}
          <div className="flex items-center gap-1 mt-1">
            <span className="w-1 h-1 rounded-full bg-silver-400" />
            <span className="text-[10px] text-gold-400">★</span>
            <span className="w-1 h-1 rounded-full bg-silver-400" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
