import { useState, useEffect } from 'react';
import { CinematicIntro } from './sections/CinematicIntro';
import { Navbar } from './components/Navbar';
import { HeroSection } from './sections/HeroSection';
import { JourneyTimeline } from './sections/JourneyTimeline';
import { LiveCountdown } from './sections/LiveCountdown';
import { PhotoGallery } from './sections/PhotoGallery';
import { FamilyMessage } from './sections/FamilyMessage';
import { EventDetails } from './sections/EventDetails';
import { FinalCelebration } from './sections/FinalCelebration';
import { FloatingMusicPlayer } from './components/FloatingMusicPlayer';
import { CustomCursor } from './components/CustomCursor';
import { ScreenshotCardModal } from './components/ScreenshotCardModal';
import { Toast } from './components/Toast';
import { useAudioPlayer } from './hooks/useAudioPlayer';

const INTRO_SEEN_KEY = 'anniversary_intro_viewed';

export function App() {
  const [introOpen, setIntroOpen] = useState(true);
  const [screenshotModalOpen, setScreenshotModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const {
    isPlaying,
    volume,
    isMuted,
    isSynthFallback,
    togglePlay,
    startPlaying,
    setVolume,
    toggleMute,
  } = useAudioPlayer();

  // Remember if user already went through intro this session
  useEffect(() => {
    try {
      const seen = sessionStorage.getItem(INTRO_SEEN_KEY);
      if (seen === 'true') {
        setIntroOpen(false);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleOpenInvitation = () => {
    setIntroOpen(false);
    startPlaying();
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, 'true');
    } catch {
      // ignore
    }
  };

  const handleSkipIntro = () => {
    setIntroOpen(false);
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, 'true');
    } catch {
      // ignore
    }
  };

  const handleShowToast = (msg: string) => {
    setToastMessage(msg);
  };

  return (
    <div className="relative min-h-screen bg-midnight-dark text-silver-100 font-sans selection:bg-silver-400 selection:text-midnight-dark overflow-x-hidden">
      {/* Desktop Luxury Follower Cursor */}
      <CustomCursor />

      {/* Cinematic Introduction Screen */}
      <CinematicIntro
        isOpen={introOpen}
        onOpenInvitation={handleOpenInvitation}
        onSkipIntro={handleSkipIntro}
      />

      {/* Floating Navbar */}
      <Navbar />

      {/* Main Sections */}
      <main className="relative z-10 flex flex-col">
        <HeroSection />
        <JourneyTimeline />
        <LiveCountdown />
        <PhotoGallery />
        <FamilyMessage />
        <EventDetails
          onShowToast={handleShowToast}
          onOpenScreenshotCard={() => setScreenshotModalOpen(true)}
        />
      </main>

      {/* Final Celebration Footer */}
      <FinalCelebration onShowToast={handleShowToast} />

      {/* Floating Audio Controls */}
      <FloatingMusicPlayer
        isPlaying={isPlaying}
        volume={volume}
        isMuted={isMuted}
        isSynthFallback={isSynthFallback}
        onTogglePlay={togglePlay}
        onVolumeChange={setVolume}
        onToggleMute={toggleMute}
      />

      {/* Screenshot / Invitation Snapshot Modal */}
      <ScreenshotCardModal
        isOpen={screenshotModalOpen}
        onClose={() => setScreenshotModalOpen(false)}
        onShowToast={handleShowToast}
      />

      {/* Global Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}

export default App;
