import React from "react";
import { motion } from "framer-motion";
import { Shield, AlertTriangle } from "lucide-react";
import { Button } from "../ui/button.jsx";
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

  const handleCancel = () => {
    setCountdown(null);
    setIsActivated(false);
  };

  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        {/* Ripple effect background */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: isActivated 
              ? 'conic-gradient(from 0deg, var(--success-green), #10b981, var(--success-green))' 
              : countdown 
                ? 'conic-gradient(from 0deg, var(--warning-yellow), #f59e0b, var(--warning-yellow))'
                : 'conic-gradient(from 0deg, var(--danger-red), #dc2626, var(--danger-red))',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Glass button */}
        <motion.button
          onClick={handleSOSPress}
          disabled={isActivated}
          className="relative z-10 w-32 h-32 rounded-full text-white font-bold text-lg glass-card m-2"
          style={{
            background: isActivated 
              ? 'radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, rgba(16, 185, 129, 0.2) 100%)'
              : countdown 
                ? 'radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, rgba(217, 119, 6, 0.2) 100%)'
                : 'radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, rgba(220, 38, 38, 0.2) 100%)',
            boxShadow: isActivated 
              ? '0 0 40px var(--success-glow), inset 0 0 20px rgba(255, 255, 255, 0.1)'
              : countdown
                ? '0 0 40px var(--warning-glow), inset 0 0 20px rgba(255, 255, 255, 0.1)'
                : '0 0 40px var(--danger-glow), inset 0 0 20px rgba(255, 255, 255, 0.1)',
          }}
          whileHover={{
            boxShadow: isActivated 
              ? '0 0 60px var(--success-glow), inset 0 0 30px rgba(255, 255, 255, 0.2)'
              : countdown
                ? '0 0 60px var(--warning-glow), inset 0 0 30px rgba(255, 255, 255, 0.2)'
                : '0 0 60px var(--danger-glow), inset 0 0 30px rgba(255, 255, 255, 0.2)',
          }}
        >
          {countdown ? (
            <motion.div 
              className="text-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <div className="text-4xl font-bold">{countdown}</div>
              <div className="text-sm opacity-80">SOS</div>
            </motion.div>
          ) : isActivated ? (
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 1, repeat: Infinity }
              }}
            >
              <Shield className="w-12 h-12" />
            </motion.div>
          ) : (
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <AlertTriangle className="w-12 h-12" />
            </motion.div>
          )}
        </motion.button>

        {/* Pulse rings when activated */}
        {isActivated && (
          <>
            <motion.div
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute inset-0 border-4 border-green-400 rounded-full"
            />
            <motion.div
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
              className="absolute inset-0 border-4 border-green-400 rounded-full"
            />
          </>
        )}
      </motion.div>

      <div className="mt-6">
        <motion.h3 
          className="text-xl font-bold mb-2"
          style={{ 
            color: isActivated ? 'var(--success-green)' : 'var(--text-primary)',
            textShadow: isActivated ? '0 0 10px var(--success-glow)' : 'none'
          }}
          animate={isActivated ? { 
            textShadow: [
              '0 0 10px var(--success-glow)',
              '0 0 20px var(--success-glow)',
              '0 0 10px var(--success-glow)'
            ]
          } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {isActivated ? t.activated : t.title}
        </motion.h3>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {isActivated ? t.sending : t.subtitle}
        </p>

        {(countdown || isActivated) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={handleCancel}
              className="mt-4 px-6 py-2 glass-button rounded-lg font-medium transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              {t.cancel}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}