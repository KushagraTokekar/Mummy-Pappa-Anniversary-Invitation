import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Copy } from 'lucide-react';
import { EVENT_CONFIG } from '../config/event';
import { SilverEmblem3D } from './SilverEmblem3D';
import { copyToClipboard, getFormattedEventDetails } from '../lib/utils';

interface ScreenshotCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const ScreenshotCardModal: React.FC<ScreenshotCardModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const handleCopy = async () => {
    const success = await copyToClipboard(getFormattedEventDetails());
    if (success) {
      onShowToast('Invitation details copied to clipboard!');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative max-w-md w-full bg-gradient-to-b from-[#141923] via-[#0E121B] to-[#0A0D14] rounded-2xl p-6 sm:p-8 border-2 border-silver-400/40 shadow-2xl shadow-black my-8"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-midnight-card hover:bg-silver-800 text-silver-300 transition-colors"
              aria-label="Close card modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Invitation Card Body (Optimized for screenshot) */}
            <div id="screenshot-invitation-card" className="relative p-6 sm:p-7 rounded-xl border border-silver-400/30 bg-gradient-to-b from-[#171e2c] via-[#0F141F] to-[#0a0d13] text-center shadow-inner overflow-hidden">
              
              {/* Ornate corner brackets */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-champagne-300/60" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-champagne-300/60" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-champagne-300/60" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-champagne-300/60" />

              {/* Emblem */}
              <div className="flex justify-center mb-3">
                <SilverEmblem3D size="sm" />
              </div>

              {/* Subheading */}
              <p className="text-[11px] uppercase tracking-[0.25em] text-champagne-300 font-semibold mb-1">
                Celebrating 25 Years of Togetherness
              </p>

              {/* Parents' Names */}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-silver-gradient my-2 leading-tight">
                {EVENT_CONFIG.fatherName}
                <span className="block text-champagne-300 font-script text-2xl my-0.5">&amp;</span>
                {EVENT_CONFIG.motherName}
              </h2>

              <p className="text-xs text-silver-400 font-light italic max-w-xs mx-auto mb-4">
                "A journey that began with two hearts and became a lifetime of beautiful memories."
              </p>

              {/* Silver Divider */}
              <div className="flex items-center justify-center gap-2 my-4">
                <span className="w-12 h-px bg-silver-500/30" />
                <span className="text-gold-400 text-xs">✦</span>
                <span className="w-12 h-px bg-silver-500/30" />
              </div>

              {/* Event Details */}
              <div className="space-y-2.5 text-xs text-silver-200">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-silver-400 block">Date &amp; Time</span>
                  <p className="font-medium text-silver-100 text-sm">
                    {EVENT_CONFIG.eventDay}, {EVENT_CONFIG.eventDate}
                  </p>
                  <p className="text-champagne-200 text-xs">{EVENT_CONFIG.eventTime}</p>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-silver-400 block">Venue</span>
                  <p className="font-semibold text-silver-100">{EVENT_CONFIG.venueName}</p>
                  <p className="text-silver-400 text-[11px] leading-relaxed max-w-xs mx-auto">
                    {EVENT_CONFIG.venueAddress}
                  </p>
                </div>

                {EVENT_CONFIG.dressCode && (
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-silver-400 block">Dress Code</span>
                    <p className="text-champagne-300 text-xs font-medium">{EVENT_CONFIG.dressCode}</p>
                  </div>
                )}
              </div>

              {/* Footer Note */}
              <div className="mt-5 pt-3 border-t border-silver-500/20 text-[10px] text-silver-400 tracking-wider uppercase font-mono">
                {EVENT_CONFIG.hostNames}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-silver-500/15 hover:bg-silver-500/25 border border-silver-400/30 text-silver-100 text-xs font-medium transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy Text
              </button>
              <button
                onClick={() => {
                  onShowToast('Tip: Press Power + Volume Down on mobile to capture this invitation card!');
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-silver-400 via-silver-200 to-silver-400 text-midnight-dark text-xs font-semibold shadow-md transition-opacity hover:opacity-90"
              >
                <Download className="w-3.5 h-3.5" />
                Ready to Screenshot
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
