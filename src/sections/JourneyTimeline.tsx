import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, Sparkles } from 'lucide-react';
import { TIMELINE_DATA, type TimelineMilestone } from '../data/timeline';
import { FallbackImage } from '../components/FallbackImage';

export const JourneyTimeline: React.FC = () => {
  return (
    <section id="story" className="relative py-24 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-glass-card border border-silver-400/20 text-champagne text-xs tracking-[0.2em] uppercase font-mono mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Love Story</span>
          <Sparkles className="w-3.5 h-3.5" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-silver-gradient leading-tight mb-4"
        >
          "Every Love Story Is Beautiful, But Ours Is Our Favourite."
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-silver-300 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto"
        >
          Step into a quarter century of shared milestones, sacrifices, laughter, and an unbreakable
          bond that continues to inspire our family each day.
        </motion.p>
      </div>

      {/* Timeline Tree Container */}
      <div className="relative">
        {/* Central Vertical Spine Line */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px -translate-x-1/2 bg-gradient-to-b from-silver-400/10 via-silver-400/40 to-silver-400/10" />

        {/* Mobile Left Spine Line */}
        <div className="md:hidden absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-silver-400/10 via-silver-400/40 to-silver-400/10" />

        {/* Timeline Items */}
        <div className="space-y-16 md:space-y-24">
          {TIMELINE_DATA.map((milestone: TimelineMilestone, index: number) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Central Milestone Pin */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-midnight-dark border-2 border-silver-400 p-1 flex items-center justify-center shadow-xl shadow-black">
                    <div className="w-full h-full rounded-full bg-gradient-to-tr from-silver-400 via-white to-champagne flex items-center justify-center">
                      <Heart className="w-3.5 h-3.5 text-charcoal fill-charcoal" />
                    </div>
                  </div>
                </div>

                {/* Content Card Side */}
                <div className="w-full pl-16 md:pl-0 md:w-1/2 md:px-12">
                  <div
                    className="bg-glass-card rounded-2xl p-6 sm:p-8 border border-silver-400/25 shadow-xl transition-all duration-300 hover:border-silver-400/45 group md:text-left"
                  >
                    {/* Year badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-silver-500/15 border border-silver-400/25 text-champagne font-mono text-xs font-semibold tracking-wider">
                        <Calendar className="w-3 h-3 text-champagne" />
                        {milestone.year}
                      </span>
                      <span className="text-[11px] uppercase tracking-widest text-silver-400 font-serif">
                        Chapter {index + 1}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-silver-100 mb-1 group-hover:text-champagne transition-colors">
                      {milestone.title}
                    </h3>

                    <p className="font-serif italic text-xs text-champagne/90 mb-3">
                      {milestone.subtitle}
                    </p>

                    <p className="text-silver-300 text-xs sm:text-sm font-light leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Photo Side */}
                <div className="w-full pl-16 md:pl-0 md:w-1/2 md:px-12 mt-6 md:mt-0">
                  <div className="relative group max-w-md mx-auto rounded-2xl overflow-hidden border border-silver-400/30 p-1 bg-gradient-to-tr from-silver-600/30 via-transparent to-champagne/30 shadow-2xl">
                    <div className="rounded-xl overflow-hidden">
                      <FallbackImage
                        src={milestone.image}
                        alt={milestone.title}
                        caption={milestone.subtitle}
                        aspect="landscape"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
