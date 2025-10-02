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
  Eye, 
  Volume2,
  Moon,
  Sun,
  Gauge
} from "lucide-react";
import { useAccessibility } from "./hooks/useAccessibility.js";
import { usePerformance } from "./hooks/usePerformance.js";

// Navigation configuration
const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Safety Map", url: "/map", icon: Map },
  { title: "Emergency Contacts", url: "/contacts", icon: Users },
  { title: "Safety Tools", url: "/safety-tools", icon: Settings },
  { title: "Settings", url: "/settings", icon: Settings },
];

export default function Layout({ children }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Initialize accessibility and performance hooks
  const { 
    enableReducedMotion, 
    enableHighContrast, 
    focusVisible,
    announceToScreenReader,
    skipToContent,
    isScreenReaderActive 
  } = useAccessibility();
  
  const { 
    performanceMetrics, 
    loadingStates,
    optimizeComponent 
  } = usePerformance();

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    announceToScreenReader(`${isDarkMode ? 'Light' : 'Dark'} mode activated`);
  };

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    announceToScreenReader(`Navigation menu ${isMobileMenuOpen ? 'closed' : 'opened'}`);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Animation variants
  const sidebarVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: enableReducedMotion ? "tween" : "spring",
        stiffness: enableReducedMotion ? undefined : 300,
        damping: enableReducedMotion ? undefined : 30,
        duration: enableReducedMotion ? 0.2 : undefined
      }
    },
    exit: { 
      x: "-100%", 
      opacity: 0,
      transition: { duration: enableReducedMotion ? 0.1 : 0.2 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: enableReducedMotion ? 0.2 : 0.3,
        ease: "easeOut"
      }
    }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: enableReducedMotion ? 0.1 : 0.2,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: -10,
      transition: { duration: enableReducedMotion ? 0.05 : 0.1 }
    }
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Skip to content link for accessibility */}
      <button
        onClick={skipToContent}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg"
        onFocus={() => announceToScreenReader('Skip to main content button focused')}
      >
        Skip to main content
      </button>

      {/* Desktop Sidebar */}
      <motion.aside
        className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:z-50"
        style={{ 
          backgroundColor: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-color)'
        }}
        initial={enableReducedMotion ? "visible" : "hidden"}
        animate="visible"
        variants={sidebarVariants}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-center h-16 px-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Guardian Beacon
            </span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2" role="list">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.url;
            const Icon = item.icon;
            
            return (
              <motion.div
                key={item.url}
                whileHover={enableReducedMotion ? {} : { scale: 1.02, x: 4 }}
                whileTap={enableReducedMotion ? {} : { scale: 0.98 }}
                transition={{ duration: 0.1 }}
                role="listitem"
              >
                <Link
                  to={item.url}
                  className={`
                    flex items-center px-4 py-3 rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-glass-primary shadow-glass border border-blue-200/20 text-blue-600' 
                      : 'hover:bg-glass-secondary text-gray-600 hover:text-gray-900'
                    }
                    ${focusVisible ? 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2' : ''}
                  `}
                  style={{
                    color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)',
                    backgroundColor: isActive ? 'var(--bg-accent)' : undefined
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  onFocus={() => announceToScreenReader(`${item.title} navigation link focused`)}
                >
                  <Icon className="mr-3 h-5 w-5" aria-hidden="true" />
                  <span className="font-medium">{item.title}</span>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Accessibility Controls */}
        <div className="p-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Accessibility
            </h3>
            
            <div className="flex items-center justify-between">
              <label htmlFor="high-contrast" className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                High Contrast
              </label>
              <button
                id="high-contrast"
                onClick={() => {
                  document.documentElement.classList.toggle('high-contrast');
                  announceToScreenReader('High contrast mode toggled');
                }}
                className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Toggle high contrast mode"
              >
                <Eye className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="dark-mode" className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Dark Mode
              </label>
              <button
                id="dark-mode"
                onClick={toggleDarkMode}
                className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>

            {/* Performance Indicator */}
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Performance
              </span>
              <div className="flex items-center space-x-1">
                <Gauge className="h-3 w-3 text-green-500" />
                <span className="text-xs text-green-600">
                  {performanceMetrics.fps || 60}fps
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4" 
           style={{ 
             backgroundColor: 'var(--bg-secondary)', 
             borderBottom: '1px solid var(--border-color)',
             backdropFilter: 'blur(10px)'
           }}>
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-blue-600" />
          <span className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
            Guardian Beacon
          </span>
        </div>
        
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label={`${isMobileMenuOpen ? 'Close' : 'Open'} navigation menu`}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: enableReducedMotion ? 0.1 : 0.2 }}
              onClick={toggleMobileMenu}
            />
            
            <motion.nav
              id="mobile-menu"
              className="lg:hidden fixed top-16 left-0 right-0 z-50 mx-4 rounded-lg shadow-xl overflow-hidden"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <div className="py-2">
                {navigationItems.map((item) => {
                  const isActive = location.pathname === item.url;
                  const Icon = item.icon;
                  
                  return (
                    <Link
                      key={item.url}
                      to={item.url}
                      className={`
                        flex items-center px-4 py-3 border-b transition-colors
                        ${isActive 
                          ? 'bg-blue-50 text-blue-600 border-blue-100' 
                          : 'text-gray-600 hover:bg-gray-50 border-gray-100'
                        }
                      `}
                      style={{
                        color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)',
                        backgroundColor: isActive ? 'var(--bg-accent)' : undefined,
                        borderBottomColor: 'var(--border-color)'
                      }}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={toggleMobileMenu}
                    >
                      <Icon className="mr-3 h-5 w-5" aria-hidden="true" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main 
        className="flex-1 lg:ml-64 min-h-screen"
        style={{ paddingTop: '4rem' }}
        id="main-content"
        role="main"
        aria-label="Main content"
      >
        <motion.div
          className="h-full"
          variants={contentVariants}
          initial={enableReducedMotion ? "visible" : "hidden"}
          animate="visible"
          exit="hidden"
        >
          {children}
        </motion.div>
      </main>

      {/* Screen Reader Live Region */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        id="announcements"
      />
    </div>
  );
}