import React, { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryPhoto } from '../data/gallery';
import { FallbackImage } from './FallbackImage';

interface LightboxModalProps {
  photos: GalleryPhoto[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photos,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < photos.length;
  const currentPhoto = isOpen ? photos[currentIndex] : null;

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handlePrev = useCallback(() => {
    if (currentIndex !== null) {
      const prev = (currentIndex - 1 + photos.length) % photos.length;
      onNavigate(prev);
    }
  }, [currentIndex, photos.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex !== null) {
      const next = (currentIndex + 1) % photos.length;
      onNavigate(next);
    }
  }, [currentIndex, photos.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, handlePrev, handleNext, onClose]);

  // Touch swipe handling for mobile
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <AnimatePresence>
      {isOpen && currentPhoto && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Top Header controls */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-silver-300 z-10">
            <span className="font-mono text-xs tracking-widest uppercase bg-midnight-card px-3 py-1.5 rounded-full border border-silver-500/20">
              {currentIndex + 1} / {photos.length}
            </span>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-midnight-card hover:bg-silver-800 border border-silver-400/20 text-silver-200 transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Left Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-2 sm:left-6 p-3 rounded-full bg-midnight-card hover:bg-silver-800 text-silver-200 border border-silver-400/20 transition-all z-10 hover:scale-110 active:scale-95"
            aria-label="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-2 sm:right-6 p-3 rounded-full bg-midnight-card hover:bg-silver-800 text-silver-200 border border-silver-400/20 transition-all z-10 hover:scale-110 active:scale-95"
            aria-label="Next Photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Modal Image Box */}
          <motion.div
            className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="rounded-xl overflow-hidden shadow-2xl border border-silver-400/30 bg-midnight-dark max-h-[70vh] flex items-center justify-center">
              <FallbackImage
                src={currentPhoto.src}
                alt={currentPhoto.title}
                caption={currentPhoto.caption}
                aspect={currentPhoto.aspect}
                className="max-h-[70vh] w-auto max-w-full object-contain"
                containerClassName="max-h-[70vh] flex items-center justify-center"
              />
            </div>

            {/* Photo Info Banner */}
            <div className="mt-4 text-center max-w-xl px-4">
              <div className="flex items-center justify-center gap-2 mb-1">
                <h3 className="font-serif text-lg md:text-xl font-semibold text-silver-100">
                  {currentPhoto.title}
                </h3>
                {currentPhoto.year && (
                  <span className="text-xs px-2 py-0.5 rounded bg-silver-500/10 text-champagne-300 border border-silver-400/20 font-mono">
                    {currentPhoto.year}
                  </span>
                )}
              </div>
              <p className="text-sm text-silver-300 font-light italic">
                {currentPhoto.caption}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
