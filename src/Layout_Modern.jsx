import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Shield, 
  Home, 
  Map, 
  Users, 
  Settings, 
  Menu, 
  X,
  History,
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useTheme } from './components/providers/ThemeProvider.jsx';
import { useLanguage } from './components/providers/LanguageProvider.jsx';

const Layout = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('guardian-sidebar-collapsed');
    return saved === 'true';
  });
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();

  // Save sidebar state
  useEffect(() => {
    localStorage.setItem('guardian-sidebar-collapsed', sidebarCollapsed);
  }, [sidebarCollapsed]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const navigationItems = [
    {
      name: t('nav.dashboard'),
      href: '/',
      icon: Home,
      current: location.pathname === '/'
    },
    {
      name: t('nav.map'),
      href: '/map',
      icon: Map,
      current: location.pathname === '/map'
    },
    {
      name: t('nav.tools'),
      href: '/safety-tools',
      icon: Shield,
      current: location.pathname === '/safety-tools'
    },
    {
      name: t('nav.contacts'),
      href: '/contacts',
      icon: Users,
      current: location.pathname === '/contacts'
    },
    {
      name: t('nav.history'),
      href: '/history',
      icon: History,
      current: location.pathname === '/history'
    },
    {
      name: t('nav.settings'),
      href: '/settings',
      icon: Settings,
      current: location.pathname === '/settings'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: sidebarCollapsed ? 64 : 280 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block bg-gradient-to-b from-slate-900/95 to-slate-950/95 backdrop-blur-xl border-r border-slate-800/50"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-slate-800/50">
            <AnimatePresence mode="wait">
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-white text-sm">Guardian</h2>
                    <p className="text-xs text-slate-400">Safety Companion</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                    ${item.current 
                      ? 'bg-gradient-to-r from-violet-500 to-cyan-500 text-white shadow-lg shadow-violet-500/25' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }
                    ${sidebarCollapsed ? 'justify-center' : 'justify-start'}
                  `}
                >
                  <Icon className={`w-5 h-5 ${sidebarCollapsed ? '' : 'mr-3'}`} />
                  <AnimatePresence>
                    {!sidebarCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden whitespace-nowrap"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-4 py-4 border-t border-slate-800/50"
              >
                <div className="text-xs text-slate-500 space-y-1">
                  <p className="font-medium">Emergency: 112</p>
                  <p>Guardian Beacon v1.0</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-slate-900/95 to-slate-950/95 backdrop-blur-xl border-r border-slate-800/50 lg:hidden"
          >
            <div className="flex h-full flex-col">
              {/* Mobile Header */}
              <div className="flex h-16 items-center justify-between px-4 border-b border-slate-800/50">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-white text-sm">Guardian</h2>
                    <p className="text-xs text-slate-400">Safety Companion</p>
                  </div>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 px-3 py-4 space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`
                        group flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                        ${item.current 
                          ? 'bg-gradient-to-r from-violet-500 to-cyan-500 text-white shadow-lg shadow-violet-500/25' 
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Footer */}
              <div className="px-4 py-4 border-t border-slate-800/50">
                <div className="text-xs text-slate-500 space-y-1">
                  <p className="font-medium">Emergency: 112</p>
                  <p>Guardian Beacon v1.0</p>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-72'}`}>
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-30 flex h-16 items-center gap-x-4 border-b border-slate-800/50 bg-slate-900/95 backdrop-blur-xl px-4 shadow-sm">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-md flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-sm">Guardian Beacon</span>
          </div>
        </div>

        {/* Page Content */}
        <main className="min-h-screen">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Layout;