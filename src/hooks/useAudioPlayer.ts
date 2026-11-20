import { useState, useEffect, useRef, useCallback } from 'react';
import { EVENT_CONFIG } from '../config/event';

const STORAGE_KEY = 'anniversary_music_playing';

export function useAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isSynthFallback, setIsSynthFallback] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthIntervalRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize Audio element
  useEffect(() => {
    const audioSources = [
      EVENT_CONFIG.audioTrackSrc,
      '/audio/anniversary-music.mp3',
      '/audio/anniversary-instrumental.mp3',
    ];
    let sourceIndex = 0;

    const audio = new Audio(audioSources[0]);
    audio.loop = true;
    audio.preload = 'metadata';
    audio.volume = volume;
    audioRef.current = audio;

    // Handle missing audio file gracefully with fallback source check
    audio.addEventListener('error', () => {
      sourceIndex++;
      if (sourceIndex < audioSources.length) {
        audio.src = audioSources[sourceIndex];
        audio.load();
      } else {
        console.warn('Physical audio files not found. Enabling ambient synth harmonic fallback.');
        setIsSynthFallback(true);
      }
    });

    return () => {
      audio.pause();
      audio.src = '';
      if (synthIntervalRef.current) {
        clearInterval(synthIntervalRef.current);
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Ambient synth generator for graceful fallback
  const startAmbientSynth = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Pentatonic warm chords: C4, E4, G4, A4, B4, D5
      const notes = [261.63, 329.63, 392.00, 440.00, 493.88, 587.33];
      let noteIndex = 0;

      const playChime = () => {
        if (!isPlaying || isMuted) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(notes[noteIndex % notes.length], ctx.currentTime);
        noteIndex++;

        // Smooth romantic attack and decay
        const currentVol = isMuted ? 0 : volume * 0.12;
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(Math.max(0.001, currentVol), ctx.currentTime + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 4.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 4.6);
      };

      playChime();
      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = window.setInterval(playChime, 2500);
    } catch (e) {
      console.error('Ambient audio fallback init error:', e);
    }
  }, [isPlaying, isMuted, volume]);

  const stopAmbientSynth = useCallback(() => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  }, []);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Synchronize playback state
  useEffect(() => {
    if (isPlaying) {
      if (isSynthFallback) {
        startAmbientSynth();
      } else if (audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.warn('Audio play failed, falling back to synth:', err);
          setIsSynthFallback(true);
          startAmbientSynth();
        });
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopAmbientSynth();
    }
  }, [isPlaying, isSynthFallback, startAmbientSynth, stopAmbientSynth]);

  const togglePlay = () => {
    setIsPlaying((prev) => {
      const next = !prev;
      try {
        sessionStorage.setItem(STORAGE_KEY, next ? 'true' : 'false');
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  const startPlaying = () => {
    setIsPlaying(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // ignore
    }
  };

  const setVolume = (val: number) => {
    setVolumeState(val);
    if (val > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return {
    isPlaying,
    volume,
    isMuted,
    isSynthFallback,
    togglePlay,
    startPlaying,
    setVolume,
    toggleMute,
  };
}
