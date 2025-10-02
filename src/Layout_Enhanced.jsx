import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { 
  Shield, 
  Home, 
  Map, 
  Users, 
  Settings, 
  Menu, 
  X,
  Accessibility,
  Palette,
  Volume2,
  VolumeX,
  Sun,
  Moon
} from "lucide-react";
import { useAccessibility } from "./hooks/useAccessibility";
import { usePerformance } from "./hooks/usePerformance";
import { animationPresets, createA11yAnimation } from "./lib/animation";

export default function Layout({ children }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Advanced hooks
  const {
    accessibility,
    device,
    focus,
    announce,
    createSkipLink,
    adjustFontSize,
    toggleHighContrast,
    toggleReduceMotion,
    animationConfig
  } = useAccessibility();

  const {
    metrics,
    useLazyImage,
    useIntersectionObserver
  } = usePerformance();

  // Responsive navigation behavior
  useEffect(() => {
    if (device.isDesktop && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [device.isDesktop, isMenuOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle menu with Escape or M key
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        focus.returnFocus();
      }
      if (e.key === 'm' && e.altKey) {
        e.preventDefault();
        setIsMenuOpen(!isMenuOpen);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, focus]);

  // Theme management
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    announce(`Switched to ${newTheme} theme`);
    
    if (soundEnabled) {
      // Play theme switch sound
      playSound('theme-switch');
    }
  };

  // Sound management
  const playSound = (soundType) => {
    if (!soundEnabled) return;
    
    // Create audio context for UI sounds
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Different sounds for different interactions
    const frequencies = {
      'click': 800,
      'hover': 600,
      'theme-switch': 400,
      'navigation': 500
    };
    
    oscillator.frequency.setValueAtTime(frequencies[soundType] || 600, audioContext.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const navigationItems = [
    { 
      title: "Dashboard", 
      url: "/", 
      icon: Home,
      description: "Main dashboard with safety overview"
    },
    { 
      title: "Safety Tools", 
      url: "/safety-tools", 
      icon: Shield,
      description: "Check-in, Safe Walk, and emergency tools"
    },
    { 
      title: "Safety Map", 
      url: "/map", 
      icon: Map,
      description: "View safety zones and locations"
    },
    { 
      title: "Emergency Contacts", 
      url: "/contacts", 
      icon: Users,
      description: "Manage emergency contact network"
    },
    { 
      title: "Settings", 
      url: "/settings", 
      icon: Settings,
      description: "App preferences and configuration"
    }
  ];

  // Performance-optimized animations
  const sidebarAnimation = createA11yAnimation(
    {
      initial: { x: -280, opacity: 0 },
      animate: { 
        x: 0, 
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: accessibility.reduceMotion ? 400 : 300,
          damping: accessibility.reduceMotion ? 30 : 25,
          mass: 0.8
        }
      },
      exit: { 
        x: -280, 
        opacity: 0,
        transition: { 
          duration: accessibility.reduceMotion ? 0.1 : 0.2 
        }
      }
    },
    { respectReducedMotion: true }
  );

  const contentAnimation = createA11yAnimation(
    {
      initial: { opacity: 0, y: 20 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: accessibility.reduceMotion ? 0.1 : 0.3,
          ease: "easeOut"
        }
      }
    },
    { respectReducedMotion: true }
  );

  return (
    <div className="flex min-h-screen relative" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Skip Links for Accessibility */}
      <Link {...createSkipLink('main-content', 'Skip to main content')} />
      <Link {...createSkipLink('navigation', 'Skip to navigation')} />

      {/* Performance Indicator (Development) */}
      {process.env.NODE_ENV === 'development' && (
        <motion.div
          className="fixed top-4 right-4 z-50 p-2 glass-badge text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            background: metrics.fps < 30 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
            border: `1px solid ${metrics.fps < 30 ? 'var(--danger)' : 'var(--success)'}`,
          }}
        >
          FPS: {metrics.fps} | Memory: {Math.round(metrics.memoryUsage)}MB
        </motion.div>
      )}

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && device.isMobile && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <AnimatePresence>
        {(isMenuOpen || device.isDesktop) && (
          <motion.nav
            {...sidebarAnimation}
            className="fixed lg:relative inset-y-0 left-0 z-50 w-72 glass-nav flex flex-col"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(30px)',
              borderRight: '1px solid rgba(255, 255, 255, 0.2)',
            }}
            role="navigation"
            aria-label="Main navigation"
          >
            {/* Animated Background Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full opacity-20"
                  style={{ 
                    background: `var(--${['primary', 'secondary', 'success'][i % 3]}-500)`,
                    left: `${20 + (i * 15)}%`,
                    top: `${10 + (i * 12)}%`
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.2, 0.6, 0.2],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 3 + (i * 0.5),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>

            {/* Header */}
            <div className="p-6 border-b border-white/10 relative z-10">
              <div className="flex items-center justify-between">
                <motion.div
                  className="flex items-center gap-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity }
                    }}
                  >
                    <Shield 
                      className="w-8 h-8" 
                      style={{ 
                        color: 'var(--primary-blue)',
                        filter: 'drop-shadow(0 0 10px var(--glow-primary))'
                      }} 
                    />
                  </motion.div>
                  <div>
                    <h1 
                      className="text-xl font-bold"
                      style={{ 
                        background: 'linear-gradient(135deg, var(--primary-blue), var(--accent-purple))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      Guardian Beacon
                    </h1>
                    <p className="text-xs opacity-70" style={{ color: 'var(--text-secondary)' }}>
                      Stay Safe, Stay Connected
                    </p>
                  </div>
                </motion.div>

                {/* Mobile Close Button */}
                {device.isMobile && (
                  <motion.button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 glass-button rounded-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close navigation menu"
                  >
                    <X className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
                  </motion.button>
                )}
              </div>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 p-4 space-y-2 relative z-10">
              {navigationItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.url;
                
                return (
                  <motion.div
                    key={item.url}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.url}
                      className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                        isActive ? 'glass-button' : 'hover:glass-button'
                      }`}
                      style={{
                        background: isActive 
                          ? 'rgba(59, 130, 246, 0.2)' 
                          : 'transparent',
                        border: isActive 
                          ? '1px solid rgba(59, 130, 246, 0.3)' 
                          : '1px solid transparent',
                        boxShadow: isActive 
                          ? '0 0 20px rgba(59, 130, 246, 0.3)' 
                          : 'none'
                      }}
                      onClick={() => {
                        setIsMenuOpen(false);
                        if (soundEnabled) playSound('navigation');
                        announce(`Navigated to ${item.title}`);
                      }}
                      onMouseEnter={() => {
                        if (soundEnabled) playSound('hover');
                      }}
                      aria-current={isActive ? 'page' : undefined}
                      aria-describedby={`nav-desc-${index}`}
                    >
                      <motion.div
                        animate={isActive ? {
                          rotate: [0, 10, 0, -10, 0],
                          scale: [1, 1.1, 1]
                        } : {}}
                        transition={{
                          duration: 2,
                          repeat: isActive ? Infinity : 0,
                          ease: "easeInOut"
                        }}
                      >
                        <Icon 
                          className="w-5 h-5 flex-shrink-0" 
                          style={{ 
                            color: isActive ? 'var(--primary-blue)' : 'var(--text-secondary)',
                            filter: isActive ? 'drop-shadow(0 0 8px var(--glow-primary))' : 'none'
                          }} 
                        />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <span 
                          className="font-medium block truncate"
                          style={{ 
                            color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' 
                          }}
                        >
                          {item.title}
                        </span>
                        <span 
                          id={`nav-desc-${index}`}
                          className="text-xs opacity-70 block truncate"
                          style={{ color: 'var(--text-tertiary)' }}
                        >
                          {item.description}
                        </span>
                      </div>
                      
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          className="w-1 h-8 rounded-full"
                          style={{ background: 'var(--primary-blue)' }}
                          layoutId="activeIndicator"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Accessibility Controls */}
            <div className="p-4 border-t border-white/10 space-y-3 relative z-10">
              <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                Accessibility
              </h3>
              
              <div className="grid grid-cols-2 gap-2">
                {/* Theme Toggle */}
                <motion.button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 p-2 glass-button rounded-lg text-xs"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
                >
                  {theme === 'light' ? (
                    <Moon className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                  ) : (
                    <Sun className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                  )}
                  <span style={{ color: 'var(--text-secondary)' }}>Theme</span>
                </motion.button>

                {/* Sound Toggle */}
                <motion.button
                  onClick={() => {
                    setSoundEnabled(!soundEnabled);
                    announce(`Sound effects ${!soundEnabled ? 'enabled' : 'disabled'}`);
                  }}
                  className="flex items-center gap-2 p-2 glass-button rounded-lg text-xs"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={`${soundEnabled ? 'Disable' : 'Enable'} sound effects`}
                >
                  {soundEnabled ? (
                    <Volume2 className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                  ) : (
                    <VolumeX className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                  )}
                  <span style={{ color: 'var(--text-secondary)' }}>Sound</span>
                </motion.button>

                {/* High Contrast Toggle */}
                <motion.button
                  onClick={toggleHighContrast}
                  className="flex items-center gap-2 p-2 glass-button rounded-lg text-xs"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={`${accessibility.highContrast ? 'Disable' : 'Enable'} high contrast`}
                >
                  <Palette className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>Contrast</span>
                </motion.button>

                {/* Reduce Motion Toggle */}
                <motion.button
                  onClick={toggleReduceMotion}
                  className="flex items-center gap-2 p-2 glass-button rounded-lg text-xs"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={`${accessibility.reduceMotion ? 'Enable' : 'Disable'} animations`}
                >
                  <Accessibility className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>Motion</span>
                </motion.button>
              </div>

              {/* Font Size Controls */}
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Font:</span>
                {['small', 'medium', 'large'].map((size) => (
                  <motion.button
                    key={size}
                    onClick={() => adjustFontSize(size)}
                    className={`px-2 py-1 text-xs rounded ${
                      accessibility.fontSize === size ? 'glass-button' : ''
                    }`}
                    style={{
                      color: accessibility.fontSize === size ? 'var(--primary-blue)' : 'var(--text-tertiary)',
                      background: accessibility.fontSize === size ? 'rgba(59, 130, 246, 0.1)' : 'transparent'
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Set font size to ${size}`}
                  >
                    {size.charAt(0).toUpperCase()}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        {device.isMobile && (
          <motion.header 
            className="flex items-center justify-between p-4 glass-nav border-b border-white/10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 glass-button rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" style={{ color: 'var(--text-primary)' }} />
            </motion.button>
            
            <h1 
              className="text-lg font-bold"
              style={{ 
                background: 'linear-gradient(135deg, var(--primary-blue), var(--accent-purple))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Guardian Beacon
            </h1>
            
            <div className="w-10" /> {/* Spacer for centering */}
          </motion.header>
        )}

        {/* Page Content */}
        <motion.main
          id="main-content"
          className="flex-1 overflow-auto"
          {...contentAnimation}
          role="main"
          tabIndex="-1"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: accessibility.reduceMotion ? 0.1 : 0.3,
                ease: "easeInOut"
              }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </motion.main>
      </div>
    </div>
  );
}