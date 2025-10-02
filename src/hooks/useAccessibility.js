import { useState, useEffect, useCallback } from 'react';

/**
 * Advanced accessibility hook for managing focus, keyboard navigation,
 * screen reader support, and responsive design features
 */
export function useAccessibility() {
  // Accessibility state
  const [reduceMotion, setReduceMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [screenReaderActive, setScreenReaderActive] = useState(false);
  const [keyboardNavigation, setKeyboardNavigation] = useState(false);

  // Device and environment detection
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [orientation, setOrientation] = useState('portrait');
  const [connectionSpeed, setConnectionSpeed] = useState('unknown');

  // Focus management
  const [focusedElement, setFocusedElement] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  // Media query listeners
  useEffect(() => {
    // Reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(motionQuery.matches);
    
    const handleMotionChange = (e) => setReduceMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    // High contrast preference
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');
    setHighContrast(contrastQuery.matches);
    
    const handleContrastChange = (e) => setHighContrast(e.matches);
    contrastQuery.addEventListener('change', handleContrastChange);

    // Mobile/tablet detection
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    const tabletQuery = window.matchMedia('(min-width: 769px) and (max-width: 1024px)');
    
    setIsMobile(mobileQuery.matches);
    setIsTablet(tabletQuery.matches);

    const handleMobileChange = (e) => setIsMobile(e.matches);
    const handleTabletChange = (e) => setIsTablet(e.matches);
    
    mobileQuery.addEventListener('change', handleMobileChange);
    tabletQuery.addEventListener('change', handleTabletChange);

    // Orientation detection
    const handleOrientationChange = () => {
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
    };
    
    handleOrientationChange();
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    // Connection speed detection
    if ('connection' in navigator) {
      const connection = navigator.connection;
      setConnectionSpeed(connection.effectiveType || 'unknown');
      
      const handleConnectionChange = () => {
        setConnectionSpeed(connection.effectiveType || 'unknown');
      };
      
      connection.addEventListener('change', handleConnectionChange);
      
      return () => {
        connection.removeEventListener('change', handleConnectionChange);
      };
    }

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      contrastQuery.removeEventListener('change', handleContrastChange);
      mobileQuery.removeEventListener('change', handleMobileChange);
      tabletQuery.removeEventListener('change', handleTabletChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  // Screen reader detection
  useEffect(() => {
    // Check for screen reader by testing if elements are being announced
    const testElement = document.createElement('div');
    testElement.setAttribute('aria-live', 'polite');
    testElement.setAttribute('aria-label', 'Screen reader test');
    testElement.style.position = 'absolute';
    testElement.style.left = '-10000px';
    testElement.textContent = 'test';
    
    document.body.appendChild(testElement);
    
    // If the element gains focus or is accessed, likely a screen reader is active
    const checkScreenReader = () => {
      setScreenReaderActive(document.activeElement === testElement);
    };
    
    testElement.addEventListener('focus', checkScreenReader);
    
    setTimeout(() => {
      document.body.removeChild(testElement);
    }, 100);

    return () => {
      if (testElement.parentNode) {
        testElement.removeEventListener('focus', checkScreenReader);
        document.body.removeChild(testElement);
      }
    };
  }, []);

  // Keyboard navigation detection
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        setKeyboardNavigation(true);
      }
    };

    const handleMouseDown = () => {
      setKeyboardNavigation(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  // Focus management
  const manageFocus = useCallback((element) => {
    if (element && element.focus) {
      setFocusedElement(element);
      setFocusHistory(prev => [...prev.slice(-9), element]); // Keep last 10
      element.focus();
    }
  }, []);

  const returnFocus = useCallback(() => {
    if (focusHistory.length > 1) {
      const previousElement = focusHistory[focusHistory.length - 2];
      if (previousElement && previousElement.focus) {
        previousElement.focus();
        setFocusHistory(prev => prev.slice(0, -1));
      }
    }
  }, [focusHistory]);

  // Announce to screen readers
  const announce = useCallback((message, priority = 'polite') => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.position = 'absolute';
    announcer.style.left = '-10000px';
    announcer.style.width = '1px';
    announcer.style.height = '1px';
    announcer.style.overflow = 'hidden';
    
    document.body.appendChild(announcer);
    
    // Delay to ensure screen reader picks it up
    setTimeout(() => {
      announcer.textContent = message;
    }, 100);
    
    // Clean up after announcement
    setTimeout(() => {
      if (announcer.parentNode) {
        document.body.removeChild(announcer);
      }
    }, 1000);
  }, []);

  // Skip link functionality
  const createSkipLink = useCallback((targetId, text = 'Skip to main content') => {
    return {
      href: `#${targetId}`,
      onClick: (e) => {
        e.preventDefault();
        const target = document.getElementById(targetId);
        if (target) {
          target.setAttribute('tabindex', '-1');
          target.focus();
          target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
        }
      },
      children: text,
      className: 'skip-link',
      style: {
        position: 'absolute',
        left: '-10000px',
        top: 'auto',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
      },
      onFocus: (e) => {
        e.target.style.left = '6px';
        e.target.style.top = '7px';
        e.target.style.width = 'auto';
        e.target.style.height = 'auto';
        e.target.style.overflow = 'visible';
        e.target.style.zIndex = '999999';
        e.target.style.padding = '8px 16px';
        e.target.style.background = 'var(--bg-primary)';
        e.target.style.border = '2px solid var(--border-focus)';
        e.target.style.borderRadius = 'var(--radius-md)';
        e.target.style.color = 'var(--text-primary)';
        e.target.style.textDecoration = 'none';
      },
      onBlur: (e) => {
        e.target.style.left = '-10000px';
        e.target.style.top = 'auto';
        e.target.style.width = '1px';
        e.target.style.height = '1px';
        e.target.style.overflow = 'hidden';
      }
    };
  }, [reduceMotion]);

  // Font size management
  const adjustFontSize = useCallback((size) => {
    setFontSize(size);
    document.documentElement.style.fontSize = {
      'small': '14px',
      'medium': '16px',
      'large': '18px',
      'extra-large': '22px'
    }[size] || '16px';
    
    announce(`Font size changed to ${size}`);
  }, [announce]);

  // High contrast toggle
  const toggleHighContrast = useCallback(() => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    announce(`High contrast ${newValue ? 'enabled' : 'disabled'}`);
  }, [highContrast, announce]);

  // Reduced motion toggle
  const toggleReduceMotion = useCallback(() => {
    const newValue = !reduceMotion;
    setReduceMotion(newValue);
    announce(`Animation ${newValue ? 'reduced' : 'enabled'}`);
  }, [reduceMotion, announce]);

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    const root = document.documentElement;
    if (highContrast) {
      root.setAttribute('data-high-contrast', 'true');
    } else {
      root.removeAttribute('data-high-contrast');
    }
    return undefined;
  }, [highContrast]);

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    const root = document.documentElement;
    if (reduceMotion) {
      root.setAttribute('data-reduce-motion', 'true');
    } else {
      root.removeAttribute('data-reduce-motion');
    }
    return undefined;
  }, [reduceMotion]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyboardShortcuts = (e) => {
      // Alt + 1: Skip to main content
      if (e.altKey && e.key === '1') {
        e.preventDefault();
        const main = document.querySelector('main') || document.querySelector('[role="main"]');
        if (main) {
          main.focus();
          main.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
        }
      }
      
      // Alt + 2: Skip to navigation
      if (e.altKey && e.key === '2') {
        e.preventDefault();
        const nav = document.querySelector('nav') || document.querySelector('[role="navigation"]');
        if (nav) {
          const firstLink = nav.querySelector('a, button');
          if (firstLink) firstLink.focus();
        }
      }
      
      // Alt + H: Toggle high contrast
      if (e.altKey && e.key === 'h') {
        e.preventDefault();
        toggleHighContrast();
      }
      
      // Alt + M: Toggle reduced motion
      if (e.altKey && e.key === 'm') {
        e.preventDefault();
        toggleReduceMotion();
      }
      
      // Escape: Close modals/overlays
      if (e.key === 'Escape') {
        const modal = document.querySelector('[role="dialog"], [role="alertdialog"]');
        if (modal) {
          const closeButton = modal.querySelector('[aria-label*="close"], [aria-label*="Close"], .close-button');
          if (closeButton) closeButton.click();
        }
      }
    };

    document.addEventListener('keydown', handleKeyboardShortcuts);
    return () => document.removeEventListener('keydown', handleKeyboardShortcuts);
  }, [reduceMotion, toggleHighContrast, toggleReduceMotion]);

  // Responsive breakpoint helpers
  const breakpoints = {
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet,
    isPortrait: orientation === 'portrait',
    isLandscape: orientation === 'landscape',
    isSlowConnection: ['slow-2g', '2g'].includes(connectionSpeed),
    isFastConnection: ['4g'].includes(connectionSpeed)
  };

  // Animation configuration based on user preferences
  const animationConfig = {
    duration: reduceMotion ? 0 : 300,
    easing: reduceMotion ? 'linear' : 'cubic-bezier(0.4, 0, 0.2, 1)',
    shouldAnimate: !reduceMotion,
    reducedMotion: reduceMotion
  };

  return {
    // Accessibility state
    accessibility: {
      reduceMotion,
      highContrast,
      fontSize,
      screenReaderActive,
      keyboardNavigation
    },
    
    // Device information
    device: breakpoints,
    
    // Focus management
    focus: {
      manageFocus,
      returnFocus,
      focusedElement,
      focusHistory
    },
    
    // Utilities
    announce,
    createSkipLink,
    adjustFontSize,
    toggleHighContrast,
    toggleReduceMotion,
    animationConfig,
    
    // Responsive helpers
    responsive: {
      ...breakpoints,
      connectionSpeed,
      orientation
    }
  };
}