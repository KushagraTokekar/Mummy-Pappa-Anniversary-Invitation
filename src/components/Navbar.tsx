import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar, MapPin } from 'lucide-react';
import { anniversaryConfig } from '../data/anniversaryConfig';

interface NavbarProps {
  onOpenInvitationModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Our Story', href: '#story' },
    { label: 'Memories', href: '#gallery' },
    { label: 'Invitation', href: '#invitation' },
    { label: 'Venue', href: '#venue' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-midnight-dark/90 backdrop-blur-xl border-b border-silver-400/15 py-3 shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Monogram */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 group select-none text-left"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('#hero');
          }}
        >
          <div className="w-8 h-8 rounded-full border border-silver-400/40 bg-gradient-to-tr from-silver-600 via-white to-champagne p-[1px] flex items-center justify-center shadow-md">
            <div className="w-full h-full rounded-full bg-midnight-dark flex items-center justify-center">
              <span className="font-display font-bold text-xs text-silver-gradient">25</span>
            </div>
          </div>
          <div>
            <span className="font-serif font-semibold text-sm tracking-wide text-silver-100 block group-hover:text-champagne transition-colors">
              {anniversaryConfig.couple.fatherName} &amp; {anniversaryConfig.couple.motherName}
            </span>
            <span className="text-[9px] tracking-widest uppercase font-mono text-champagne/80 block">
              Silver Jubilee
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              className="text-xs tracking-wider uppercase font-medium text-silver-300 hover:text-champagne transition-colors relative group py-1"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-silver-gradient transition-all duration-300 group-hover:w-full" />
            </button>
          ))}

          <button
            onClick={() => handleLinkClick('#invitation')}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-silver-gradient text-charcoal font-semibold text-xs tracking-wide shadow-md shadow-silver-500/10 hover:opacity-95 active:scale-95 transition-all"
          >
            <Calendar className="w-3.5 h-3.5" />
            Invitation
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => handleLinkClick('#invitation')}
            className="px-3 py-1.5 rounded-full bg-silver-gradient text-charcoal font-semibold text-xs shadow-md"
          >
            Invitation
          </button>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-lg bg-midnight-card/80 border border-silver-400/20 text-silver-200"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-midnight-dark/95 backdrop-blur-2xl border-b border-silver-400/20 px-6 py-6 overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link.href)}
                  className="text-left text-sm tracking-wider uppercase font-medium text-silver-200 hover:text-champagne transition-colors py-2 border-b border-silver-500/10 flex items-center justify-between"
                >
                  {link.label}
                  <span className="text-silver-500 text-xs">→</span>
                </button>
              ))}

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => handleLinkClick('#venue')}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-silver-500/15 border border-silver-400/30 text-silver-100 text-xs font-medium"
                >
                  <MapPin className="w-4 h-4 text-champagne" />
                  Venue Map
                </button>
                <button
                  onClick={() => handleLinkClick('#invitation')}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-silver-gradient text-charcoal text-xs font-semibold"
                >
                  <Calendar className="w-4 h-4" />
                  View Invitation
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
