import React, { useState } from 'react';

interface FallbackImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  caption?: string;
  aspect?: 'portrait' | 'landscape' | 'square';
}

export const FallbackImage: React.FC<FallbackImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = '',
  caption,
  aspect = 'portrait',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectClass =
    aspect === 'landscape'
      ? 'aspect-[16/10]'
      : aspect === 'square'
      ? 'aspect-square'
      : 'aspect-[3/4]';

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-b from-[#161c28] to-[#0b0e14] ${aspectClass} ${containerClassName}`}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`${className} transition-opacity duration-700 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      ) : null}

      {/* Fallback Luxury Frame Placeholder when user image is not yet placed */}
      {(hasError || !isLoaded) && (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none bg-gradient-to-br from-[#1b2230] via-[#10151f] to-[#080b0f] transition-opacity duration-500 ${
            isLoaded && !hasError ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {/* Subtle ornate border inside */}
          <div className="absolute inset-3 border border-silver-400/20 rounded-sm pointer-events-none" />
          <div className="absolute inset-4 border border-champagne-300/15 border-dashed rounded-sm pointer-events-none" />

          {/* Luxury Monogram Emblem */}
          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border border-silver-400/40 bg-midnight-dark/80 flex items-center justify-center mb-3 shadow-lg shadow-black/50">
            <div className="absolute inset-1 rounded-full border border-silver-300/20" />
            <svg
              className="w-8 h-8 text-silver-300 opacity-80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 21a9 9 0 0 0 9-9c0-4.97-4.03-9-9-9s-9 4.03-9 9a9 9 0 0 0 9 9Z" />
              <path d="M19 12h-2" />
              <path d="M7 12H5" />
              <path d="M12 19v-2" />
              <path d="M12 7V5" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>

          {/* Placeholder Title */}
          <p className="font-serif text-silver-200 text-sm md:text-base tracking-wide font-medium">
            {alt || 'Cherished Memory'}
          </p>

          {caption && (
            <p className="text-silver-400 text-xs italic mt-1 max-w-[85%] line-clamp-2">
              "{caption}"
            </p>
          )}

          <div className="mt-3 flex items-center gap-1.5 opacity-60">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne-300" />
            <span className="text-[10px] tracking-widest uppercase font-mono text-silver-400">
              Silver Jubilee Photo
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-champagne-300" />
          </div>
        </div>
      )}
    </div>
  );
};
