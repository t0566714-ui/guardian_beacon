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
  Moon,
  Sun,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useAccessibility } from "./hooks/useAccessibility.js";
import { usePerformance } from "./hooks/usePerformance.js";

const THEME_STORAGE_KEY = 'guardian-theme-mode';

const getStoredSidebarState = () => {
  if (typeof window === 'undefined') return false;
  try {
    const stored = window.localStorage.getItem('guardian-sidebar-collapsed');
    return stored === 'true';
  } catch (error) {
    console.warn('Unable to read sidebar preference', error);
    return false;
  }
};

const storeSidebarState = (value) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem('guardian-sidebar-collapsed', value ? 'true' : 'false');
  } catch (error) {
    console.warn('Unable to persist sidebar preference', error);
  }
};

const getStoredTheme = () => {
  if (typeof window === 'undefined') return 'dark';
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    return prefersLight ? 'light' : 'dark';
  } catch (error) {
    console.warn('Unable to read theme preference', error);
    return 'dark';
  }
};

const applyTheme = (theme) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  root.classList.toggle('dark', theme === 'dark');
};

// Navigation configuration
const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home, description: "Command center overview" },
  { title: "Safety Map", url: "/map", icon: Map, description: "Geospatial awareness" },
  { title: "Emergency Contacts", url: "/contacts", icon: Users, description: "Trusted network" },
  { title: "Safety Tools", url: "/safety-tools", icon: Settings, description: "Preparedness toolkit" },
  { title: "Settings", url: "/settings", icon: Settings, description: "System preferences" },
];

const ArrowIndicator = ({ isActive }) => (
  <motion.span
    initial={{ opacity: 0.4, x: 0 }}
    animate={{ opacity: isActive ? 1 : 0.5, x: isActive ? 4 : 0 }}
    transition={{ duration: 0.3 }}
    className="rounded-full p-2"
    style={{
      background: isActive ? 'rgba(59,130,246,0.2)' : 'rgba(15,23,42,0.45)',
      border: '1px solid rgba(148,163,184,0.18)'
    }}
  >
    <ArrowUpRight className="h-4 w-4" style={{ color: isActive ? 'var(--primary-blue)' : 'rgba(226,232,240,0.68)' }} />
  </motion.span>
);

const ControlToggle = ({ icon: Icon, label, description, onClick, isActive = false }) => (
  <motion.button
    type="button"
    whileHover={{ scale: 1.01, y: -2 }}
    whileTap={{ scale: 0.98 }}
    transition={{ duration: 0.2 }}
    onClick={onClick}
  className="w-full flex items-center justify-between rounded-2xl px-4 py-4 control-toggle"
    style={{
      background: 'linear-gradient(120deg, rgba(15,23,42,0.78), rgba(15,23,42,0.62))',
      border: '1px solid rgba(148,163,184,0.16)'
    }}
    data-active={isActive ? 'true' : 'false'}
    aria-pressed={isActive}
  >
    <div className="flex items-center gap-3">
      <div className="icon-pill" style={{ background: 'rgba(74,163,255,0.18)', borderColor: 'rgba(74,163,255,0.35)' }}>
        <Icon className="h-4 w-4" style={{ color: 'var(--primary-blue)' }} />
      </div>
      <div className="text-left">
        <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{label}</div>
        <div className="text-[0.65rem] uppercase tracking-[0.24em]" style={{ color: 'rgba(148,163,184,0.58)' }}>{description}</div>
      </div>
    </div>
    <ArrowUpRight className="h-4 w-4" style={{ color: 'rgba(226,232,240,0.68)' }} />
  </motion.button>
);

const NavItem = ({ item, isActive, enableReducedMotion, focusVisible, announceMessage, isCollapsed }) => {
  const Icon = item.icon;
  const tooltipId = `nav-tooltip-${item.title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <motion.li
      className="nav-item"
      whileHover={enableReducedMotion ? {} : { scale: 1.01, x: 6 }}
      whileTap={enableReducedMotion ? {} : { scale: 0.98 }}
      transition={{ duration: 0.18 }}
      role="listitem"
      data-collapsed={isCollapsed ? 'true' : 'false'}
    >
      <Link
        to={item.url}
        className={`nav-link ${isActive ? 'nav-link--active' : ''} ${focusVisible ? 'nav-link--focusable' : ''} ${isCollapsed ? 'nav-link--icon-only' : ''}`.trim()}
        aria-current={isActive ? 'page' : undefined}
        aria-label={isCollapsed ? item.title : undefined}
        aria-describedby={isCollapsed ? tooltipId : undefined}
        onFocus={() => announceMessage(`${item.title} navigation link focused`)}
      >
        <span className="nav-link__body">
          <span className="nav-link__icon" data-active={isActive ? 'true' : 'false'}>
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          {!isCollapsed && (
            <span className="nav-link__text">
              <span className="nav-link__title">{item.title}</span>
              <span className="nav-link__subtitle">{isActive ? 'Currently viewing' : item.description}</span>
            </span>
          )}
        </span>
        {!isCollapsed && <ArrowIndicator isActive={isActive} />}
      </Link>
      {isCollapsed && (
        <span
          id={tooltipId}
          role="tooltip"
          className="nav-tooltip"
          data-visible={isActive ? 'true' : undefined}
        >
          <span className="nav-tooltip__title">{item.title}</span>
          <span className="nav-tooltip__description">{item.description}</span>
        </span>
      )}
    </motion.li>
  );
};

const NavItemMobile = ({ item, isActive, onNavigate }) => {
  const Icon = item.icon;

  return (
    <li>
      <Link
        to={item.url}
        className={`nav-sheet__link ${isActive ? 'nav-sheet__link--active' : ''}`.trim()}
        aria-current={isActive ? 'page' : undefined}
        onClick={onNavigate}
      >
        <span className="nav-sheet__icon" data-active={isActive ? 'true' : 'false'}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="nav-sheet__text">
          <span className="nav-sheet__title">{item.title}</span>
          <span className="nav-sheet__subtitle">{isActive ? 'Current route' : item.description}</span>
        </span>
      </Link>
    </li>
  );
};

const MissionMetrics = ({ performanceMetrics, isCollapsed }) => {
  const metrics = [
    {
      label: 'Render Time',
      value: performanceMetrics.renderTime ? `${Math.round(performanceMetrics.renderTime)}ms` : '–',
    },
    {
      label: 'Network',
      value: performanceMetrics.networkSpeed || 'stable',
    },
    {
      label: 'FPS',
      value: performanceMetrics.fps || 60,
    },
  ];

  if (isCollapsed) {
    return (
      <section className="sidebar-metrics sidebar-metrics--compact" aria-labelledby="mission-status-heading">
        <h2 className="sr-only" id="mission-status-heading">Mission Status</h2>
        <ul className="compact-metric-list" role="list" aria-label="Performance telemetry">
          {metrics.map((metric) => (
            <li key={metric.label}>
              <div
                className="compact-metric"
                tabIndex={0}
                role="group"
                aria-label={`${metric.label}: ${metric.value}`}
              >
                <span className="compact-metric__label">{metric.label}</span>
                <span className="compact-metric__value">{metric.value}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className="sidebar-metrics" aria-labelledby="mission-status-heading">
      <div className="pane-title mb-2" id="mission-status-heading">Mission Status</div>
      <dl className="metric-stack" aria-label="Performance telemetry">
        {metrics.map((metric) => (
          <div className="metric" key={metric.label}>
            <dt className="label">{metric.label}</dt>
            <dd className="value">{metric.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default function Layout({ children }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => getStoredSidebarState());
  const [theme, setTheme] = useState(() => getStoredTheme());
  const isDarkMode = theme === 'dark';
  
  // Initialize accessibility and performance hooks
  const {
    accessibility,
    announce,
    toggleHighContrast,
    toggleReduceMotion
  } = useAccessibility();

  const { metrics } = usePerformance();

  const enableReducedMotion = accessibility?.reduceMotion ?? false;
  const focusVisible = accessibility?.keyboardNavigation ?? false;
  const isScreenReaderActive = accessibility?.screenReaderActive ?? false;
  const performanceMetrics = metrics ?? {};

  const announceMessage = (message) => {
    if (typeof announce === 'function') {
      announce(message);
    }
  };

  useEffect(() => {
    applyTheme(theme);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, theme);
      } catch (error) {
        console.warn('Unable to persist theme preference', error);
      }
    }
  }, [theme]);

  // Handle dark mode toggle
  const handleThemeToggle = () => {
    const nextTheme = isDarkMode ? 'light' : 'dark';
    setTheme(nextTheme);
    announceMessage(`${nextTheme === 'dark' ? 'Dark' : 'Light'} mode activated`);
  };

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    announceMessage(`Navigation menu ${isMobileMenuOpen ? 'closed' : 'opened'}`);
  };

  const toggleSidebarCollapsed = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      storeSidebarState(next);
      announceMessage(`Sidebar ${next ? 'collapsed to icon rail' : 'expanded with labels'}`);
      return next;
    });
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
    <div
      className="layout-root"
      data-sidebar-collapsed={isSidebarCollapsed ? 'true' : 'false'}
      data-mobile-menu-open={isMobileMenuOpen ? 'true' : 'false'}
    >
      <div className="app-aurora" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />
      
      {/* Mobile Header */}
      <header className="mobile-header lg:hidden">
        <div className="mobile-header__content">
          <div className="mobile-header__brand">
            <Shield className="h-6 w-6" style={{ color: 'var(--primary-blue)' }} />
            <span className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
              Beacon Ops
            </span>
          </div>
          
          <button
            onClick={toggleMobileMenu}
            className="mobile-menu-trigger"
            data-active={isMobileMenuOpen ? 'true' : 'false'}
            aria-label={`${isMobileMenuOpen ? 'Close' : 'Open'} navigation menu`}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <motion.aside
        className={`desktop-sidebar ${isSidebarCollapsed ? 'desktop-sidebar--collapsed' : 'desktop-sidebar--expanded'}`.trim()}
        data-collapsed={isSidebarCollapsed ? 'true' : 'false'}
        initial={enableReducedMotion ? "visible" : "hidden"}
        animate="visible"
        variants={sidebarVariants}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="sidebar__header">
          <div className="sidebar__brand">
            <div className="icon-pill" aria-hidden="true" style={{ background: 'rgba(74,163,255,0.2)', borderColor: 'rgba(74,163,255,0.35)' }}>
              <Shield className="h-6 w-6" style={{ color: 'var(--primary-blue)' }} />
            </div>
            {!isSidebarCollapsed && (
              <div>
                <span className="text-xs tracking-[0.28em] uppercase" style={{ color: 'rgba(203,213,225,0.8)' }}>
                  Guardian
                </span>
                <h1 className="text-xl font-semibold headline-gradient">Beacon Ops</h1>
              </div>
            )}
          </div>
          
          <div className="sidebar__header-controls">
            {!isSidebarCollapsed && (
              <span className="status-chip" role="status" aria-live="polite">
                <span className="micro-dot" aria-hidden="true" />
                Live
              </span>
            )}
            <button
              type="button"
              onClick={toggleSidebarCollapsed}
              className="sidebar-toggle"
              aria-label={isSidebarCollapsed ? 'Expand sidebar to show labels' : 'Collapse sidebar to icon rail'}
              aria-pressed={isSidebarCollapsed}
            >
              {isSidebarCollapsed ? (
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              ) : (
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <div className="sidebar__content">
          <div className="sidebar__primary">
            <MissionMetrics performanceMetrics={performanceMetrics} isCollapsed={isSidebarCollapsed} />
            <div className="neural-divider" />
            <div className="sidebar__nav-container">
              <nav className="sidebar-nav" aria-label="Primary routes">
                <ul className="nav-list" role="list">
                  {navigationItems.map((item) => (
                    <NavItem
                      key={item.url}
                      item={item}
                      isActive={location.pathname === item.url}
                      enableReducedMotion={enableReducedMotion}
                      focusVisible={focusVisible}
                      announceMessage={announceMessage}
                      isCollapsed={isSidebarCollapsed}
                    />
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Accessibility Controls */}
          <div className="sidebar__controls">
            <h3 className="pane-title">Accessibility Matrix</h3>
            <div className="sidebar__control-grid">
              <ControlToggle
                icon={Eye}
                label="High Contrast"
                description="Boost interface clarity"
                onClick={() => toggleHighContrast?.()}
                isActive={accessibility?.highContrast}
              />
              <ControlToggle
                icon={Accessibility}
                label="Reduce Motion"
                description="Minimize animation motion"
                onClick={() => toggleReduceMotion?.()}
                isActive={accessibility?.reduceMotion}
              />
              <ControlToggle
                icon={isDarkMode ? Sun : Moon}
                label="Mode"
                description={isDarkMode ? 'Light Atmosphere' : 'Night Ops'}
                onClick={handleThemeToggle}
                isActive={isDarkMode}
              />
              <div className="sidebar__status-chip" aria-live="polite">
                <span>Screen Reader</span>
                <span data-active={isScreenReaderActive ? 'true' : 'false'}>
                  {isScreenReaderActive ? 'Active' : 'Standby'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: enableReducedMotion ? 0.1 : 0.2 }}
              onClick={toggleMobileMenu}
            />
            
            <motion.nav
              id="mobile-menu"
              className="mobile-menu"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <ul className="nav-sheet" role="list">
                {navigationItems.map((item) => (
                  <NavItemMobile
                    key={item.url}
                    item={item}
                    isActive={location.pathname === item.url}
                    onNavigate={() => {
                      toggleMobileMenu();
                      announceMessage(`${item.title} selected`);
                    }}
                  />
                ))}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="main-content" id="main-content" role="main" aria-label="Main content">
        <motion.div
          className="main-content__inner"
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