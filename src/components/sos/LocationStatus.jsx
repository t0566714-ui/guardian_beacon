import React from "react";
import { MapPin, Wifi, WifiOff, RefreshCw, Target } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge.jsx";

export default function LocationStatus({ language = 'en' }) {
  const [location, setLocation] = React.useState(null);
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Get user location
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
          setIsLoading(false);
        },
        (error) => {
          console.log('Location error:', error);
          setIsLoading(false);
        }
      );
    }

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  const refreshLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
          setIsLoading(false);
        },
        (error) => {
          console.log('Location error:', error);
          setIsLoading(false);
        }
      );
    }
  };

  const texts = {
    en: {
      locationFound: 'Location Found',
      locationNotFound: 'Location Not Available',
      online: 'Online',
      offline: 'Offline',
      accuracy: 'Accuracy',
      refresh: 'Refresh Location'
    },
    hi: {
      locationFound: 'स्थान मिल गया',
      locationNotFound: 'स्थान उपलब्ध नहीं',
      online: 'ऑनलाइन',
      offline: 'ऑफलाइन',
      accuracy: 'सटीकता',
      refresh: 'स्थान रीफ्रेश करें'
    }
  };

  const t = texts[language];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 rounded-xl"
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Location Status Section */}
      <motion.div 
        className="flex items-center justify-between mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ 
              rotate: location ? [0, 360] : 0,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: location ? Infinity : 0, ease: "linear" },
              scale: { duration: 1.5, repeat: Infinity }
            }}
          >
            <MapPin 
              className="w-6 h-6" 
              style={{ 
                color: location ? 'var(--success-green)' : 'var(--danger-red)',
                filter: location ? 'drop-shadow(0 0 10px var(--success-glow))' : 'none'
              }} 
            />
          </motion.div>
          <span className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
            {location ? t.locationFound : t.locationNotFound}
          </span>
        </div>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <Badge 
            className={`glass-badge px-3 py-1 ${location ? 'text-green-300' : 'text-red-300'}`}
            style={{
              background: location 
                ? 'rgba(34, 197, 94, 0.2)' 
                : 'rgba(239, 68, 68, 0.2)',
              border: '1px solid ' + (location 
                ? 'rgba(34, 197, 94, 0.3)' 
                : 'rgba(239, 68, 68, 0.3)'),
              boxShadow: '0 0 15px ' + (location 
                ? 'var(--success-glow)' 
                : 'var(--danger-glow)'),
            }}
          >
            {location ? '✓' : '✗'}
          </Badge>
        </motion.div>
      </motion.div>

      {/* Location Details */}
      {location && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6 p-4 rounded-lg relative overflow-hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Animated background gradient */}
          <motion.div
            animate={{
              background: [
                'radial-gradient(circle at 20% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0"
          />
          
          <div className="relative z-10 grid grid-cols-2 gap-4 text-sm">
            <div>
              <span style={{ color: 'var(--text-secondary)' }}>Latitude:</span>
              <div className="font-mono text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                {location.lat.toFixed(6)}
              </div>
            </div>
            <div>
              <span style={{ color: 'var(--text-secondary)' }}>Longitude:</span>
              <div className="font-mono text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                {location.lng.toFixed(6)}
              </div>
            </div>
          </div>
          
          <motion.div 
            className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Target className="w-4 h-4" style={{ color: 'var(--primary-blue)' }} />
            <span style={{ color: 'var(--text-secondary)' }}>{t.accuracy}:</span>
            <motion.span 
              className="font-bold"
              style={{ color: 'var(--primary-blue)' }}
              animate={{ 
                textShadow: [
                  '0 0 10px rgba(59, 130, 246, 0.5)',
                  '0 0 20px rgba(59, 130, 246, 0.3)',
                  '0 0 10px rgba(59, 130, 246, 0.5)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ±{Math.round(location.accuracy)}m
            </motion.span>
          </motion.div>
        </motion.div>
      )}

      {/* Connection Status */}
      <motion.div 
        className="flex items-center justify-between mb-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ 
              scale: isOnline ? [1, 1.2, 1] : 1,
              rotate: isOnline ? [0, 10, 0, -10, 0] : 0
            }}
            transition={{ 
              duration: 2, 
              repeat: isOnline ? Infinity : 0,
              ease: "easeInOut"
            }}
          >
            {isOnline ? (
              <Wifi 
                className="w-6 h-6" 
                style={{ 
                  color: 'var(--success-green)',
                  filter: 'drop-shadow(0 0 10px var(--success-glow))'
                }} 
              />
            ) : (
              <WifiOff 
                className="w-6 h-6" 
                style={{ 
                  color: 'var(--danger-red)',
                  filter: 'drop-shadow(0 0 10px var(--danger-glow))'
                }} 
              />
            )}
          </motion.div>
          <span className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
            {isOnline ? t.online : t.offline}
          </span>
        </div>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
        >
          <Badge 
            className={`glass-badge px-3 py-1 ${isOnline ? 'text-green-300' : 'text-red-300'}`}
            style={{
              background: isOnline 
                ? 'rgba(34, 197, 94, 0.2)' 
                : 'rgba(239, 68, 68, 0.2)',
              border: '1px solid ' + (isOnline 
                ? 'rgba(34, 197, 94, 0.3)' 
                : 'rgba(239, 68, 68, 0.3)'),
              boxShadow: '0 0 15px ' + (isOnline 
                ? 'var(--success-glow)' 
                : 'var(--danger-glow)'),
            }}
          >
            {isOnline ? '✓' : '✗'}
          </Badge>
        </motion.div>
      </motion.div>

      {/* Refresh Button */}
      <motion.button
        onClick={refreshLocation}
        disabled={isLoading}
        className="w-full p-3 glass-button rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
        style={{
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          color: 'var(--primary-blue)',
        }}
        whileHover={{
          background: 'rgba(59, 130, 246, 0.2)',
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
          scale: 1.02,
        }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <motion.div
          animate={{ rotate: isLoading ? 360 : 0 }}
          transition={{ duration: 1, repeat: isLoading ? Infinity : 0 }}
        >
          <RefreshCw className="w-4 h-4" />
        </motion.div>
        {isLoading ? 'Updating...' : t.refresh}
      </motion.button>
    </motion.div>
  );
}