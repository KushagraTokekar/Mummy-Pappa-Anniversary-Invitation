import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music, Play, Pause, Disc } from 'lucide-react';
import { EVENT_CONFIG } from '../config/event';

interface FloatingMusicPlayerProps {
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  isSynthFallback: boolean;
  onTogglePlay: () => void;
  onVolumeChange: (vol: number) => void;
  onToggleMute: () => void;
}

export const FloatingMusicPlayer: React.FC<FloatingMusicPlayerProps> = ({
  isPlaying,
  volume,
  isMuted,
  isSynthFallback,
  onTogglePlay,
  onVolumeChange,
  onToggleMute,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Expandable volume popover */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="flex items-center gap-3 bg-midnight-card/95 backdrop-blur-xl px-4 py-2.5 rounded-full border border-silver-400/25 shadow-2xl shadow-black/60 text-silver-200"
          >
            <button
              onClick={onTogglePlay}
              className="p-1.5 rounded-full bg-silver-500/15 hover:bg-silver-500/30 text-silver-100 transition-colors"
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            <button
              onClick={onToggleMute}
              className="p-1.5 rounded-full hover:text-champagne-300 transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-silver-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-silver-200" />
              )}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-20 sm:w-24 h-1.5 bg-silver-700/50 rounded-lg appearance-none cursor-pointer accent-champagne-300"
              aria-label="Volume slider"
            />

            <div className="text-[11px] font-mono tracking-tight text-silver-300 hidden sm:block whitespace-nowrap pl-1">
              {isSynthFallback ? 'Ambient Chimes' : EVENT_CONFIG.audioTrackTitle}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <motion.button
        onClick={() => {
          if (!isPlaying && !isExpanded) {
            onTogglePlay();
          }
          setIsExpanded((prev) => !prev);
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative group p-3.5 rounded-full bg-gradient-to-tr from-midnight-dark via-charcoal to-midnight-dark border border-silver-400/35 shadow-xl shadow-black/70 text-silver-100 flex items-center justify-center overflow-hidden"
        aria-label="Toggle Background Music Controls"
      >
        {/* Glow halo */}
        <div
          className={`absolute inset-0 rounded-full bg-silver-400/20 blur-md transition-opacity duration-500 ${
            isPlaying ? 'opacity-100 animate-pulseGlow' : 'opacity-0'
          }`}
        />

        {/* Rotating Disc */}
        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
          className="relative flex items-center justify-center"
        >
          <Disc className={`w-6 h-6 ${isPlaying ? 'text-champagne-300' : 'text-silver-400'}`} />
        </motion.div>

        {/* Mini music note badge */}
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-silver-gradient text-midnight-dark flex items-center justify-center shadow-md">
          <Music className="w-2.5 h-2.5" />
        </span>
      </motion.button>
    </div>
  );
};
