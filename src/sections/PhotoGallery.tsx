import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Maximize2, Camera } from 'lucide-react';
import {
  GALLERY_DATA,
  GALLERY_CATEGORIES,
  type GalleryPhoto,
  type GalleryCategory,
} from '../data/gallery';
import { FallbackImage } from '../components/FallbackImage';
import { LightboxModal } from '../components/LightboxModal';

export const PhotoGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Filter photos by category
  const filteredPhotos =
    selectedCategory === 'all'
      ? GALLERY_DATA
      : GALLERY_DATA.filter((p) => p.category === selectedCategory);

  return (
    <section id="gallery" className="relative py-24 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-glass-card border border-silver-400/20 text-champagne text-xs tracking-[0.2em] uppercase font-mono mb-4"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>A Journey Through Memories</span>
          <Sparkles className="w-3.5 h-3.5" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-silver-gradient leading-tight mb-4"
        >
          25 Years, Countless Memories.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-silver-300 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto"
        >
          A curated collection of unforgettable milestones, sacred promises, joyous celebrations, and everyday warmth.
        </motion.p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
        {GALLERY_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 ${
                isActive
                  ? 'text-charcoal shadow-md font-semibold'
                  : 'text-silver-300 hover:text-champagne bg-midnight-card/60 border border-silver-500/20'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 rounded-full bg-silver-gradient"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Editorial Responsive Gallery Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <AnimatePresence>
          {filteredPhotos.map((photo: GalleryPhoto, index: number) => (
            <motion.div
              layout
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="group relative cursor-pointer select-none rounded-2xl overflow-hidden border border-silver-400/25 bg-midnight-card/60 backdrop-blur-sm shadow-xl transition-all duration-500 hover:border-silver-400/60 hover:shadow-silver-glow"
              onClick={() => {
                const fullIndex = GALLERY_DATA.findIndex((p) => p.id === photo.id);
                setSelectedPhotoIndex(fullIndex >= 0 ? fullIndex : 0);
              }}
            >
              {/* Image Frame */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <FallbackImage
                  src={photo.src}
                  alt={photo.title}
                  caption={photo.caption}
                  aspect={photo.aspect || 'landscape'}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  containerClassName="w-full h-full"
                />

                {/* Hover Reveal with Expand Icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-dark via-midnight-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
                  <div className="w-12 h-12 rounded-full bg-silver-100 text-charcoal flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Bottom Caption Banner */}
              <div className="p-4 sm:p-5 flex items-center justify-between border-t border-silver-500/15 bg-midnight-dark/95">
                <div>
                  <h3 className="font-serif text-sm sm:text-base font-semibold text-silver-100 group-hover:text-champagne transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-silver-400 font-light truncate max-w-[220px] sm:max-w-[260px]">
                    {photo.caption}
                  </p>
                </div>

                {photo.year && (
                  <span className="text-[11px] font-mono font-medium text-champagne/90 px-2 py-0.5 rounded bg-silver-500/10 border border-silver-400/20">
                    {photo.year}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <LightboxModal
        photos={GALLERY_DATA}
        currentIndex={selectedPhotoIndex}
        onClose={() => setSelectedPhotoIndex(null)}
        onNavigate={(newIdx) => setSelectedPhotoIndex(newIdx)}
      />
    </section>
  );
};
