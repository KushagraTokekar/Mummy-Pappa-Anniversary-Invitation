import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Navigation, Sparkles, Copy, Camera, Shirt, ExternalLink } from 'lucide-react';
import { anniversaryConfig } from '../data/anniversaryConfig';
import { generateGoogleCalendarUrl, copyToClipboard, getFormattedEventDetails } from '../lib/utils';
import { SilverEmblem3D } from '../components/SilverEmblem3D';

interface EventDetailsProps {
  onShowToast: (msg: string) => void;
  onOpenScreenshotCard: () => void;
}

export const EventDetails: React.FC<EventDetailsProps> = ({
  onShowToast,
  onOpenScreenshotCard,
}) => {
  const handleCopyDetails = async () => {
    const success = await copyToClipboard(getFormattedEventDetails());
    if (success) {
      onShowToast('Event details copied to clipboard!');
    }
  };

  const handleOpenMaps = () => {
    const url = anniversaryConfig.event.mapsUrl;
    if (url && !url.includes('[GOOGLE MAPS URL]')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      const query = encodeURIComponent(
        `${anniversaryConfig.event.venue}, ${anniversaryConfig.event.address}`
      );
      window.open(`https://maps.google.com/?q=${query}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="relative">
      {/* 1. MAIN INVITATION CARD SECTION */}
      <section id="invitation" className="relative py-24 sm:py-32 px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-glass-card border border-silver-400/20 text-champagne text-xs tracking-[0.2em] uppercase font-mono mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Invitation</span>
            <Sparkles className="w-3.5 h-3.5" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-silver-gradient leading-tight mb-4"
          >
            An Evening of Elegance
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-silver-300 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto"
          >
            {anniversaryConfig.messages.invitationGreeting}
          </motion.p>
        </div>

        {/* Main Physical-Style Royal Invitation Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative bg-gradient-to-b from-[#181F2D] via-[#10141E] to-[#0A0D14] rounded-3xl p-6 sm:p-10 md:p-14 border-2 border-silver-400/35 shadow-2xl shadow-black overflow-hidden"
        >
          {/* Metallic Corner Ornaments */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-champagne/80 pointer-events-none" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-champagne/80 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-champagne/80 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-champagne/80 pointer-events-none" />

          {/* Card Crest & Title */}
          <div className="flex flex-col items-center text-center pb-8 border-b border-silver-500/20">
            <SilverEmblem3D size="sm" className="mb-2" />

            <span className="font-serif text-[11px] uppercase tracking-[0.3em] text-champagne font-semibold mb-2">
              CELEBRATING THE SILVER JUBILEE OF
            </span>

            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-silver-gradient my-1">
              {anniversaryConfig.couple.fatherName}
              <span className="font-script text-champagne text-3xl sm:text-4xl mx-3 font-normal">
                &amp;
              </span>
              {anniversaryConfig.couple.motherName}
            </h3>

            <p className="text-xs sm:text-sm text-silver-300 font-light italic mt-3 max-w-lg leading-relaxed">
              "With immense joy and gratitude, we invite you to celebrate a beautiful milestone of love,
              commitment and togetherness. Join us as we celebrate 25 wonderful years of marriage."
            </p>
          </div>

          {/* 4 Details Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 my-8">
            {/* 1. Date Card */}
            <div className="bg-midnight-card/80 p-5 rounded-2xl border border-silver-500/15 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-silver-500/15 border border-silver-400/25 text-champagne flex-shrink-0">
                <motion.div
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                >
                  <Calendar className="w-6 h-6" />
                </motion.div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-silver-400 block mb-0.5">
                  DATE &amp; DAY
                </span>
                <p className="font-serif text-lg font-bold text-silver-100">
                  {anniversaryConfig.event.formattedDate}
                </p>
                <p className="text-sm text-champagne font-medium">
                  {anniversaryConfig.event.day}
                </p>
              </div>
            </div>

            {/* 2. Time Card */}
            <div className="bg-midnight-card/80 p-5 rounded-2xl border border-silver-500/15 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-silver-500/15 border border-silver-400/25 text-champagne flex-shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-silver-400 block mb-0.5">
                  TIME
                </span>
                <p className="font-serif text-lg font-bold text-silver-100">
                  {anniversaryConfig.event.time}
                </p>
                <p className="text-xs text-silver-400 font-light">
                  Indian Standard Time ({anniversaryConfig.event.timezone})
                </p>
              </div>
            </div>

            {/* 3. Venue & Address */}
            <div className="bg-midnight-card/80 p-5 rounded-2xl border border-silver-500/15 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-silver-500/15 border border-silver-400/25 text-champagne flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-silver-400 block mb-0.5">
                  VENUE
                </span>
                <p className="font-serif text-lg font-bold text-silver-100">
                  {anniversaryConfig.event.venue}
                </p>
                <p className="text-xs text-silver-300 font-light mt-0.5 leading-relaxed">
                  {anniversaryConfig.event.address}
                </p>
              </div>
            </div>

            {/* 4. Hosted With Love */}
            <div className="bg-midnight-card/80 p-5 rounded-2xl border border-silver-500/15 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-silver-500/15 border border-silver-400/25 text-champagne flex-shrink-0">
                <Shirt className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-silver-400 block mb-0.5">
                  HOSTED WITH LOVE BY
                </span>
                <p className="font-serif text-lg font-bold text-silver-100">
                  {anniversaryConfig.hosts.familyName}
                </p>
                <p className="text-xs text-silver-400 font-light mt-0.5">
                  Dress Code: {anniversaryConfig.event.dressCode}
                </p>
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="mt-8 pt-8 border-t border-silver-500/20 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href={generateGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-silver-gradient text-charcoal text-xs sm:text-sm font-semibold tracking-wide shadow-lg shadow-silver-500/15 hover:opacity-95 active:scale-95 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Add to Google Calendar</span>
            </a>

            <button
              onClick={handleOpenMaps}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-midnight-card/90 hover:bg-silver-800/80 border border-silver-400/35 text-silver-100 text-xs sm:text-sm font-medium tracking-wide transition-all active:scale-95 shadow-md"
            >
              <Navigation className="w-4 h-4 text-champagne" />
              <span>Get Directions</span>
            </button>

            <button
              onClick={handleCopyDetails}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-midnight-card/90 hover:bg-silver-800/80 border border-silver-400/35 text-silver-100 text-xs sm:text-sm font-medium tracking-wide transition-all active:scale-95 shadow-md"
            >
              <Copy className="w-4 h-4 text-silver-300" />
              <span>Copy Details</span>
            </button>

            <button
              onClick={onOpenScreenshotCard}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-champagne/15 hover:bg-champagne/25 border border-champagne/40 text-champagne text-xs sm:text-sm font-medium tracking-wide transition-all active:scale-95 shadow-md"
            >
              <Camera className="w-4 h-4 text-champagne" />
              <span>Save Invitation Card</span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* 2. DEDICATED VENUE & GOOGLE MAPS SECTION */}
      <section id="venue" className="relative py-20 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-glass-card border border-silver-400/20 text-champagne text-xs tracking-[0.2em] uppercase font-mono mb-3">
            <MapPin className="w-3.5 h-3.5 text-champagne" />
            <span>The Venue</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-silver-gradient mb-2">
            Getting To The Celebration
          </h3>

          <p className="text-xs sm:text-sm text-silver-300 font-light">
            Conveniently located with valet assistance for all our esteemed guests.
          </p>
        </div>

        {/* Map Card */}
        <div className="bg-midnight-card rounded-3xl p-6 sm:p-8 border border-silver-400/25 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Venue Info */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <span className="text-[11px] uppercase font-mono tracking-widest text-silver-400 block mb-1">
                Celebration Location
              </span>
              <h4 className="font-serif text-2xl font-bold text-silver-100">
                {anniversaryConfig.event.venue}
              </h4>
            </div>

            <p className="text-silver-300 text-sm font-light leading-relaxed">
              {anniversaryConfig.event.address}
            </p>

            <div className="pt-2">
              <button
                onClick={handleOpenMaps}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-silver-gradient text-charcoal font-serif font-bold text-xs uppercase tracking-widest shadow-md hover:opacity-95 active:scale-95 transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>
          </div>

          {/* Interactive Map Frame / Preview */}
          <div className="lg:col-span-7 h-64 sm:h-72 rounded-2xl overflow-hidden border border-silver-400/25 relative group bg-[#11141c]">
            <iframe
              title="Venue Google Map"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(105%)' }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                `${anniversaryConfig.event.venue}, ${anniversaryConfig.event.address}`
              )}&output=embed`}
            />

            {/* Click-through overlay to open maps app */}
            <div
              onClick={handleOpenMaps}
              className="absolute inset-0 bg-transparent cursor-pointer z-10"
              title="Click to open in Google Maps"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
