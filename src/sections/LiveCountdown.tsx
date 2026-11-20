import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Hourglass } from 'lucide-react';
import { useCountdown } from '../hooks/useCountdown';
import { EVENT_CONFIG } from '../config/event';

export const LiveCountdown: React.FC = () => {
  const { days, hours, minutes, seconds, hasPassed } = useCountdown(EVENT_CONFIG.targetDateTimeIso);

  const timeUnits = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="bg-gradient-to-r from-silver-500/10 via-champagne-300/10 to-silver-500/10 p-[1px] rounded-3xl shadow-2xl">
        <div className="bg-midnight-dark/95 backdrop-blur-xl rounded-3xl p-8 sm:p-12 text-center border border-silver-400/20">
          
          {/* Header */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-glass-card border border-silver-400/20 text-champagne-300 text-xs tracking-[0.2em] uppercase font-mono mb-4">
            <Hourglass className="w-3.5 h-3.5 animate-spin text-champagne-300" style={{ animationDuration: '6s' }} />
            <span>Live Countdown</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-silver-gradient mb-2">
            Counting Down To Forever
          </h3>

          <p className="text-xs sm:text-sm text-silver-300 font-light mb-8 max-w-md mx-auto">
            Every passing second brings us closer to this once-in-a-lifetime Silver Jubilee celebration.
          </p>

          {/* Countdown Boxes or Passed Banner */}
          {hasPassed ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-8 px-6 rounded-2xl bg-gradient-to-r from-silver-500/20 via-champagne-300/20 to-silver-500/20 border border-champagne-300/30 text-champagne-200"
            >
              <h4 className="font-serif text-xl sm:text-2xl font-bold mb-2">
                The Celebration Has Begun!
              </h4>
              <p className="text-sm text-silver-200">
                Thank you for being a cherished part of our 25-year journey!
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
              {timeUnits.map((unit) => (
                <div
                  key={unit.label}
                  className="relative group p-4 sm:p-6 rounded-2xl bg-gradient-to-b from-[#181F2B] via-[#10141D] to-[#0A0D13] border border-silver-400/25 shadow-xl transition-all duration-300 hover:border-silver-400/50 hover:shadow-silver-glow"
                >
                  {/* Subtle Shimmer top bar */}
                  <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-silver-300 to-transparent opacity-50" />

                  {/* Digits */}
                  <div className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-silver-gradient tracking-tight drop-shadow-md">
                    {String(unit.value).padStart(2, '0')}
                  </div>

                  {/* Label */}
                  <span className="text-[10px] sm:text-xs uppercase font-serif tracking-[0.2em] text-champagne-300/90 font-medium block mt-2">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Timezone Note */}
          <p className="text-[11px] text-silver-400/70 font-mono tracking-widest mt-6 uppercase">
            Local Indian Standard Time (IST) • 28 November 2026
          </p>
        </div>
      </div>
    </section>
  );
};
