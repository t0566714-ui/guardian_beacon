import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { useLanguage } from "../providers/LanguageProvider.jsx";

export default function SOSButton({ 
  onActivate,
  onCancel,
  size = 'large'
}) {
  const [isActivated, setIsActivated] = React.useState(false);
  const [countdown, setCountdown] = React.useState(null);
  const { t } = useLanguage();

  const handleSOSPress = () => {
    if (isActivated) return;

    let timer = 3;
    setCountdown(timer);

    const interval = setInterval(() => {
      timer--;
      setCountdown(timer);

      if (timer <= 0) {
        clearInterval(interval);
        setIsActivated(true);
        setCountdown(null);
        onActivate?.();
        
        // Auto-reset after 5 seconds for demo
        setTimeout(() => {
          setIsActivated(false);
        }, 5000);
      }
    }, 1000);
  };

  const handleCancel = () => {
    setCountdown(null);
    setIsActivated(false);
    onCancel?.();
  };

  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24', 
    large: 'w-32 h-32',
    xlarge: 'w-40 h-40'
  };

  return (
    <div className="relative flex flex-col items-center space-y-4">
      <motion.button
        onClick={handleSOSPress}
        whileHover={!isActivated ? { scale: 1.05 } : {}}
        whileTap={!isActivated ? { scale: 0.95 } : {}}
        className={`
          ${sizeClasses[size]} rounded-full font-bold shadow-2xl
          relative overflow-hidden
          ${isActivated 
            ? 'bg-red-600 text-white animate-pulse' 
            : countdown !== null
              ? 'bg-orange-500 text-white'
              : 'bg-red-600 hover:bg-red-700 text-white hover:shadow-red-500/25'
          }
          transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-500/50
        `}
      >
        {/* Background pulse effect when active */}
        {isActivated && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute inset-0 bg-red-500 rounded-full opacity-30"
          />
        )}

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          {countdown !== null ? (
            <>
              <AlertTriangle className="w-8 h-8 mb-2 animate-pulse" />
              <span className="text-2xl font-bold">{countdown}</span>
              <span className="text-xs">{t('sos.activating')}</span>
            </>
          ) : isActivated ? (
            <>
              <AlertTriangle className="w-8 h-8 mb-2" />
              <span className="text-sm font-bold">{t('sos.active')}</span>
            </>
          ) : (
            <>
              <AlertTriangle className="w-8 h-8 mb-2" />
              <span className="text-sm font-bold">SOS</span>
            </>
          )}
        </div>
      </motion.button>

      {/* Cancel button during countdown */}
      {countdown !== null && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
        >
          {t('sos.cancel')}
        </motion.button>
      )}

      {/* Status text */}
      {!isActivated && countdown === null && (
        <p className="text-center text-gray-400 text-sm max-w-48">
          Press and hold for 3 seconds to activate emergency SOS
        </p>
      )}
    </div>
  );
}