import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Volume2 } from 'lucide-react';
import { anniversaryConfig } from '../data/anniversaryConfig';
import { SilverParticles } from '../components/SilverParticles';

interface CinematicIntroProps {
  isOpen: boolean;
  onOpenInvitation: () => void;
  onSkipIntro: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({
  isOpen,
  onOpenInvitation,
  onSkipIntro,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="cinematic-curtain"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: 'blur(12px)',
            transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-midnight-dark text-silver-100 px-6 select-none overflow-hidden"
        >
          {/* Subtle Floating Silver Particles */}
          <SilverParticles density={45} className="absolute inset-0 pointer-events-none" />

          {/* Ambient Radial Spotlight */}
          <div className="absolute w-[600px] h-[600px] rounded-full bg-radial-gradient from-silver-400/10 via-champagne/5 to-transparent blur-3xl pointer-events-none" />

          {/* Top Skip-Intro Button */}
          <div className="absolute top-6 right-6 z-20">
            <button
              onClick={onSkipIntro}
              className="text-xs uppercase tracking-widest text-silver-400 hover:text-champagne transition-colors px-3.5 py-1.5 rounded-full border border-silver-500/20 bg-midnight-card/60 backdrop-blur-md"
            >
              Skip Intro
            </button>
          </div>

          {/* Center Stage Presentation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
            className="relative z-10 max-w-xl w-full text-center flex flex-col items-center"
          >
            {/* Animated Silver "25" Emblem */}
            <motion.div
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative my-4 flex items-center justify-center"
            >
              {/* Silver Halo Glow */}
              <div className="absolute w-40 h-40 rounded-full bg-silver-300/15 blur-2xl animate-pulseGlow" />

              {/* 25 Number */}
              <div className="relative font-display text-7xl sm:text-8xl md:text-9xl font-black tracking-tight text-silver-gradient drop-shadow-[0_10px_30px_rgba(255,255,255,0.35)] leading-none">
                25
              </div>

              {/* Decorative Stars */}
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-2 -right-4 text-champagne opacity-85"
              >
                ✦
              </motion.span>
              <motion.span
                animate={{ rotate: -360 }}
                transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
                className="absolute -bottom-1 -left-4 text-silver-400 opacity-70 text-sm"
              >
                ✦
              </motion.span>
            </motion.div>

            {/* Tagline: "Twenty-Five Years of Togetherness" */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9 }}
              className="font-serif italic text-base sm:text-xl text-champagne tracking-wide font-light mb-3"
            >
              "{anniversaryConfig.messages.tagline}"
            </motion.p>

            {/* Parents' Names */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, delay: 1.3 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-silver-100 mb-3"
            >
              {anniversaryConfig.couple.fatherName}
              <span className="inline-block text-champagne mx-2.5 font-script text-3xl sm:text-4xl font-normal">
                &amp;
              </span>
              {anniversaryConfig.couple.motherName}
            </motion.h1>

            {/* Subtitle: "A journey of love, laughter, memories and forever." */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0, delay: 1.7 }}
              className="text-xs sm:text-sm text-silver-300 font-light max-w-md mx-auto leading-relaxed mb-8 px-4"
            >
              {anniversaryConfig.messages.subtitle}
            </motion.p>

            {/* Prominent Button: "OPEN YOUR INVITATION" */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.1 }}
              className="relative"
            >
              {/* Outer Pulse glow */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-silver-400 via-champagne to-silver-400 opacity-60 blur-md animate-pulseGlow" />

              <button
                onClick={onOpenInvitation}
                className="relative group px-9 sm:px-11 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#FFFFFF] via-[#F3F4F6] to-[#E8DCC5] text-charcoal font-serif font-bold tracking-[0.16em] uppercase text-xs sm:text-sm shadow-2xl flex items-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-champagne-600 transition-transform group-hover:rotate-45" />
                <span>Open Your Invitation</span>
                <ArrowRight className="w-4 h-4 text-charcoal transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>

            {/* Sound Notice */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.5 }}
              className="text-[11px] text-silver-400/80 font-mono tracking-widest mt-6 flex items-center justify-center gap-1.5"
            >
              <Volume2 className="w-3.5 h-3.5 text-champagne" />
              <span>Turn on sound for the best experience</span>
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
