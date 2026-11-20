import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full bg-midnight-card/95 border border-silver-400/30 text-silver-100 shadow-2xl shadow-black/80 backdrop-blur-xl"
          onClick={onClose}
        >
          {type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-champagne-300 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-silver-400 flex-shrink-0" />
          )}
          <span className="text-sm font-medium tracking-wide">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
