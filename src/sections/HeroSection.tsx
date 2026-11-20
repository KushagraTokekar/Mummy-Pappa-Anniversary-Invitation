import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Calendar, Sparkles } from 'lucide-react';
import { anniversaryConfig } from '../data/anniversaryConfig';
import { SilverEmblem3D } from '../components/SilverEmblem3D';
import { FallbackImage } from '../components/FallbackImage';
import { SilverParticles } from '../components/SilverParticles';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transform
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-28 pb-20 px-4 sm:px-6"
    >
      {/* Background Parallax Layer */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none z-0"
      >
        <FallbackImage
          src={anniversaryConfig.couple.heroImage}
          alt="Parents 25th Anniversary Hero"
          aspect="landscape"
          className="w-full h-full object-cover scale-105 filter brightness-[0.38] contrast-[1.1]"
          containerClassName="w-full h-full"
        />

        {/* Deep Midnight & Charcoal Vignettes for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-dark via-midnight-dark/75 to-midnight-dark/85" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(13,14,18,0.88)_100%)]" />
      </motion.div>

      {/* Floating Stardust Particles */}
      <SilverParticles density={35} className="absolute inset-0 pointer-events-none z-10" />

      {/* Main Content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-20 max-w-4xl mx-auto text-center flex flex-col items-center"
      >
        {/* Silver Jubilee Medallion with Animated Frame */}
        <div className="mb-6 relative">
          <SilverEmblem3D size="md" />
        </div>

        {/* Pill Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-glass-card border border-silver-400/25 mb-4 shadow-silver-glow"
        >
          <Sparkles className="w-3.5 h-3.5 text-champagne" />
          <span className="text-xs uppercase font-serif tracking-[0.25em] text-champagne font-medium">
            {anniversaryConfig.event.subTitle}
          </span>
          <Sparkles className="w-3.5 h-3.5 text-champagne" />
        </motion.div>

        {/* Parents' Names in Large Premium Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-silver-gradient drop-shadow-2xl leading-[1.1] my-2"
        >
          {anniversaryConfig.couple.fatherName}
          <span className="block sm:inline sm:mx-4 font-script text-3xl sm:text-5xl md:text-6xl text-champagne font-normal">
            &amp;
          </span>
          {anniversaryConfig.couple.motherName}
        </motion.h1>

        {/* Date: 28 November 2026 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3 text-silver-200"
        >
          <div className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-midnight-card/85 border border-silver-400/25 backdrop-blur-md shadow-md">
            <Calendar className="w-4 h-4 text-champagne" />
            <span className="text-xs sm:text-sm font-semibold tracking-wider font-serif">
              {anniversaryConfig.event.day}, {anniversaryConfig.event.formattedDate}
            </span>
          </div>

          <div className="px-4 py-2 rounded-full bg-midnight-card/60 border border-silver-500/15 backdrop-blur-md text-xs tracking-widest text-silver-300 uppercase font-mono">
            {anniversaryConfig.event.title}
          </div>
        </motion.div>

        {/* Subtle Romantic Passage */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.8 }}
          className="mt-8 font-serif italic text-sm sm:text-base text-silver-300 max-w-xl mx-auto px-4 font-light leading-relaxed"
        >
          "A quarter century of love, understanding, and shared dreams. Together they built a home
          where hearts find peace and smiles never fade."
        </motion.p>

        {/* Scroll Cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-14 flex flex-col items-center gap-2 cursor-pointer select-none text-silver-400 hover:text-champagne transition-colors"
          onClick={() => {
            const nextSec = document.querySelector('#story');
            if (nextSec) nextSec.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-[10px] tracking-[0.25em] uppercase font-mono">
            Our Love Story
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-5 h-5 text-champagne" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
