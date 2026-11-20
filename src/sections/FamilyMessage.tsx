import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Quote, Sparkles } from 'lucide-react';
import { anniversaryConfig } from '../data/anniversaryConfig';
import { FallbackImage } from '../components/FallbackImage';

export const FamilyMessage: React.FC = () => {
  return (
    <section id="family" className="relative py-24 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-champagne/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-glass-card border border-silver-400/20 text-champagne text-xs tracking-[0.2em] uppercase font-mono mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Gratitude</span>
          <Sparkles className="w-3.5 h-3.5" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-silver-gradient leading-tight mb-4"
        >
          {anniversaryConfig.messages.familyMessageHeading}
        </motion.h2>
      </div>

      {/* Main Dual Grid: Emotional Note + Family Photo */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Family Letter Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="lg:col-span-7 bg-glass-card rounded-3xl p-8 sm:p-10 md:p-12 border border-silver-400/30 shadow-2xl relative overflow-hidden"
        >
          {/* Quote watermark */}
          <Quote className="absolute -top-4 -right-4 w-32 h-32 text-silver-400/5 rotate-12 pointer-events-none" />

          {/* Core Message */}
          <div className="space-y-6 text-silver-200 text-sm sm:text-base md:text-lg font-light leading-relaxed">
            <p>
              {anniversaryConfig.messages.familyMessage}
            </p>

            <p>
              As we celebrate this special milestone, we would love to have you with us to make the
              occasion even more memorable.
            </p>
          </div>

          {/* Children / Personal Note */}
          <div className="mt-8 pt-8 border-t border-silver-500/20 bg-midnight-dark/60 rounded-2xl p-6 border border-silver-400/15">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-4 h-4 text-champagne fill-champagne" />
              <span className="font-serif text-xs uppercase tracking-widest text-champagne font-semibold">
                A Note From The Children
              </span>
            </div>

            <p className="font-serif italic text-silver-100 text-sm sm:text-base leading-relaxed">
              "{anniversaryConfig.messages.personalMessageFromChildren}"
            </p>

            <div className="mt-4 flex items-center justify-between text-xs text-silver-400 font-mono tracking-wider uppercase">
              <span>{anniversaryConfig.hosts.familyName}</span>
              <span className="text-champagne font-serif">✦ 2001 - 2026 ✦</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Family Photograph Frame */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-5"
        >
          <div className="relative group rounded-3xl overflow-hidden p-2 bg-gradient-to-tr from-silver-500/40 via-champagne/30 to-silver-400/20 border border-silver-400/40 shadow-2xl">
            <div className="rounded-2xl overflow-hidden shadow-inner">
              <FallbackImage
                src="/images/family-photo.jpg"
                alt="Family Together 25th Anniversary"
                caption="Blessed with love, sacrifices, laughter, and countless memories"
                aspect="portrait"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Corner Ornaments */}
            <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-champagne/70" />
            <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-champagne/70" />
            <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-champagne/70" />
            <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-champagne/70" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
