import React from 'react';
import { motion } from 'framer-motion';
import { Share2, ArrowUp, Heart, MessageCircle } from 'lucide-react';
import { anniversaryConfig } from '../data/anniversaryConfig';
import { SilverParticles } from '../components/SilverParticles';
import { SilverEmblem3D } from '../components/SilverEmblem3D';
import { copyToClipboard, getWhatsAppShareUrl } from '../lib/utils';

interface FinalCelebrationProps {
  onShowToast: (msg: string) => void;
}

export const FinalCelebration: React.FC<FinalCelebrationProps> = ({ onShowToast }) => {
  const handleShare = async () => {
    const shareData = {
      title: `${anniversaryConfig.couple.fatherName} & ${anniversaryConfig.couple.motherName} - 25th Wedding Anniversary`,
      text: `You are cordially invited to celebrate the 25th Wedding Anniversary (Silver Jubilee) of ${anniversaryConfig.couple.fatherName} & ${anniversaryConfig.couple.motherName} on Saturday, 28 November 2026!`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.warn('Share failed, opening WhatsApp share:', err);
          window.open(getWhatsAppShareUrl(), '_blank');
        }
      }
    } else {
      const copied = await copyToClipboard(window.location.href);
      if (copied) onShowToast('Invitation link copied to clipboard!');
    }
  };

  const handleWhatsAppShare = () => {
    window.open(getWhatsAppShareUrl(), '_blank', 'noopener,noreferrer');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-24 pb-16 px-4 sm:px-6 bg-gradient-to-b from-midnight-dark via-[#090b0e] to-[#050608] text-silver-100 overflow-hidden border-t border-silver-400/15">
      {/* Background Stardust Particles */}
      <SilverParticles density={30} className="absolute inset-0 pointer-events-none" />

      {/* Ambient Spotlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-silver-400/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Emblem */}
        <div className="mb-6">
          <SilverEmblem3D size="sm" />
        </div>

        {/* Closing Title: 25 Years Down, Forever To Go */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif italic text-xl sm:text-2xl md:text-3xl text-champagne font-light mb-3"
        >
          "{anniversaryConfig.messages.closingBlessing}"
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-silver-300 text-sm sm:text-base font-light max-w-md mx-auto mb-6"
        >
          Join us as we celebrate a beautiful journey of love and togetherness.
        </motion.p>

        {/* Parents' Names & Date */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="my-3"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-silver-gradient">
            {anniversaryConfig.couple.fatherName}
            <span className="font-script text-champagne text-3xl sm:text-4xl mx-3 font-normal">
              &amp;
            </span>
            {anniversaryConfig.couple.motherName}
          </h2>
          <p className="font-mono text-xs sm:text-sm tracking-widest text-silver-400 uppercase mt-2">
            {anniversaryConfig.event.formattedDate} • {anniversaryConfig.event.venue}
          </p>
        </motion.div>

        {/* Share Buttons Toolbar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
        >
          {/* WhatsApp Share Button */}
          <button
            onClick={handleWhatsAppShare}
            className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-[#55E685] font-serif font-bold text-xs sm:text-sm tracking-widest uppercase shadow-lg transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Share on WhatsApp</span>
          </button>

          {/* Web Share / Copy Link */}
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-silver-gradient text-charcoal font-serif font-bold text-xs sm:text-sm tracking-widest uppercase shadow-xl hover:opacity-95 active:scale-95 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Invitation</span>
          </button>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="p-3.5 rounded-full bg-midnight-card hover:bg-silver-800 text-silver-300 border border-silver-400/25 transition-all active:scale-95 shadow-md"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Bottom Credits & Love Signature */}
        <div className="mt-16 pt-8 border-t border-silver-500/15 w-full flex flex-col sm:flex-row items-center justify-between text-xs text-silver-400 font-light gap-4">
          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-champagne fill-champagne" />
            <span>for our parents' Silver Jubilee</span>
          </div>

          <div className="text-[11px] font-mono tracking-wider text-silver-500 uppercase">
            {anniversaryConfig.hosts.familyName}
          </div>
        </div>
      </div>
    </footer>
  );
};
