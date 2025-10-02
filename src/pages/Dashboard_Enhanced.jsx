import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { 
  Shield, 
  Phone, 
  Clock, 
  Wifi, 
  WifiOff,
  AlertCircle,
  CheckCircle,
  Timer,
  Activity,
  Users,
  Navigation2
} from "lucide-react";
import { useAccessibility } from "../hooks/useAccessibility.js";
import { usePerformance } from "../hooks/usePerformance.js";
import { animationPresets, createA11yAnimation } from "../lib/animation/index.js";
import QuickActions from "../components/dashboard/QuickActions.jsx";
import DashboardGreeting from "../components/dashboard/DashboardGreeting.jsx";

// Memoized LiveClock component to isolate high-frequency updates
const LiveClock = React.memo(() => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  
  return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
});

// Memoized StatusCard component to prevent unnecessary re-renders
const StatusCard = React.memo(({ item, index, statsInView, cardAnimation, accessibility }) => {
  const Icon = item.icon;
  const TrendIcon = item.trendIcon;
  const reduceMotion = accessibility?.reduceMotion || false;
  
  // Safety checks
  if (!item || !Icon) {
    return null;
  }

  return (
    <motion.article
      className="dashboard-status-card"
      variants={cardAnimation || {}}
      initial="initial"
      animate={statsInView ? "animate" : "initial"}
      transition={{ delay: index * 0.35, duration: 2.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? {} : { y: -4 }}
      role="article"
      aria-labelledby={`status-heading-${index}`}
      aria-describedby={`status-desc-${index}`}
      tabIndex={0}
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-2xl)',
        padding: '1.5rem',
        background: 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(15,23,42,0.7))',
        border: '1px solid rgba(148,163,184,0.18)',
        boxShadow: 'var(--shadow-lg)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      <div style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              className="status-card-icon"
              style={{
                padding: '0.75rem',
                borderRadius: 'var(--radius-xl)',
                background: `${item.color}20`,
                transition: 'transform 0.45s ease',
              }}
            >
              <Icon
                className="w-6 h-6"
                style={{
                  color: item.color,
                  filter: `drop-shadow(0 0 8px ${item.color})`,
                }}
                aria-hidden="true"
              />
            </div>
            <div>
              <h3
                id={`status-heading-${index}`}
                className="text-xs uppercase tracking-[0.28em]"
                style={{ color: 'rgba(226,232,240,0.85)' }}
              >
                {item.label}
              </h3>
              <p
                className="text-3xl font-semibold"
                style={{ color: 'rgba(248,250,252,0.96)' }}
              >
                {item.value}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(226,232,240,0.92)' }}>
            {TrendIcon && (
              <TrendIcon className="w-4 h-4" aria-hidden="true" style={{ color: item.color }} />
            )}
            <span className="text-xs font-medium tracking-[0.12em] uppercase" style={{ color: 'rgba(226,232,240,0.92)' }}>
              {item.trendLabel}
            </span>
          </div>
        </div>

        <p
          className="text-xs"
          style={{ color: 'rgba(203,213,225,0.88)', lineHeight: 1.6 }}
          id={`status-desc-${index}`}
        >
          {item.description}
        </p>
      </div>
    </motion.article>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.item.id === nextProps.item.id &&
    prevProps.item.value === nextProps.item.value &&
    prevProps.statsInView === nextProps.statsInView
  );
});

const MetricChip = ({ label, value, subValue, intent = 'info' }) => {
  const palette = {
    info: {
      background: 'linear-gradient(130deg, rgba(59,130,246,0.22), rgba(59,130,246,0.08))',
      border: 'rgba(59,130,246,0.42)',
      valueColor: 'rgba(226,232,240,0.95)'
    },
    success: {
      background: 'linear-gradient(130deg, rgba(16,185,129,0.24), rgba(16,185,129,0.12))',
      border: 'rgba(16,185,129,0.45)',
      valueColor: 'rgba(226,232,240,0.95)'
    },
    warning: {
      background: 'linear-gradient(130deg, rgba(251,191,36,0.24), rgba(251,191,36,0.1))',
      border: 'rgba(251,191,36,0.45)',
      valueColor: 'rgba(255,237,213,0.95)'
    }
  }[intent] || {
    background: 'linear-gradient(130deg, rgba(59,130,246,0.22), rgba(59,130,246,0.08))',
    border: 'rgba(59,130,246,0.42)',
    valueColor: 'rgba(226,232,240,0.95)'
  };

  return (
    <div
      className="rounded-2xl px-4 py-3"
      style={{
        background: palette.background,
        border: `1px solid ${palette.border}`,
        boxShadow: '0 20px 45px rgba(15,23,42,0.25)'
      }}
    >
      <div className="text-[0.68rem] uppercase tracking-[0.28em]" style={{ color: 'rgba(148,163,184,0.65)' }}>
        {label}
      </div>
      <div className="text-2xl font-semibold" style={{ color: palette.valueColor }}>
        {value}
      </div>
      {subValue && (
        <div className="text-xs mt-1" style={{ color: 'rgba(148,163,184,0.75)' }}>
          {subValue}
        </div>
      )}
    </div>
  );
};

function DashboardEnhanced() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [connectionStatus, setConnectionStatus] = useState('online');
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [lastCheckIn, setLastCheckIn] = useState(null);
  const [safetyScore, setSafetyScore] = useState(85);
  const [emergencyContacts, setEmergencyContacts] = useState(3);
  const [gpsAccuracy, setGpsAccuracy] = useState({ value: null, status: 'idle' });
  const [debouncedGpsAccuracy, setDebouncedGpsAccuracy] = useState({ value: null, status: 'idle' });

  // Advanced hooks
  const {
    accessibility,
    device,
    announce,
    animationConfig
  } = useAccessibility();

  const {
    metrics,
    useIntersectionObserver
  } = usePerformance();

  // Update current time every 5 minutes for greeting (instead of every second)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 300000); // 5 minutes
    return () => clearInterval(interval);
  }, []);

  // Monitor connection status
  useEffect(() => {
    const updateOnlineStatus = () => {
      const status = navigator.onLine ? 'online' : 'offline';
      setConnectionStatus(status);
      if (status === 'offline') {
        announce('Connection lost. Operating in offline mode.', 'assertive');
      } else {
        announce('Connection restored.', 'polite');
      }
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, [announce]);

  // Monitor battery level
  useEffect(() => {
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        setBatteryLevel(Math.round(battery.level * 100));
        
        const updateBattery = () => {
          const level = Math.round(battery.level * 100);
          setBatteryLevel(level);
          
          if (level < 20) {
            announce(`Battery low: ${level}%`, 'assertive');
          }
        };
        
        battery.addEventListener('levelchange', updateBattery);
      });
    }
  }, [announce]);

  // Monitor GPS accuracy with debouncing
  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setGpsAccuracy({ value: null, status: 'unsupported' });
      setDebouncedGpsAccuracy({ value: null, status: 'unsupported' });
      return;
    }

    const successHandler = (position) => {
      const accuracy = position.coords?.accuracy ?? null;
      setGpsAccuracy({ value: accuracy, status: 'active' });
    };

    const errorHandler = () => {
      setGpsAccuracy((prev) => ({ ...prev, status: 'error' }));
    };

    const watchId = navigator.geolocation.watchPosition(successHandler, errorHandler, {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 8000
    });

    return () => {
      if (navigator.geolocation && typeof navigator.geolocation.clearWatch === 'function') {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  // Debounce GPS updates for UI (update every 2 seconds max)
  useEffect(() => {
    // Force update immediately on status change
    if (gpsAccuracy.status === 'error' || gpsAccuracy.status === 'unsupported') {
      setDebouncedGpsAccuracy(gpsAccuracy);
      return;
    }

    const timer = setTimeout(() => {
      setDebouncedGpsAccuracy(gpsAccuracy);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [gpsAccuracy]);

  const gpsAccuracyLabel = useMemo(() => {
    if (debouncedGpsAccuracy.status === 'unsupported') return 'Device not providing GPS';
    if (debouncedGpsAccuracy.status === 'error') return 'Signal unavailable';
    if (debouncedGpsAccuracy.value != null) {
      const rounded = Math.round(debouncedGpsAccuracy.value);
      return `±${rounded} m accuracy`;
    }
    return 'Calibrating';
  }, [debouncedGpsAccuracy]);

  const networkLabel = useMemo(() => {
    if (connectionStatus === 'offline') return 'Offline';
    switch (metrics?.networkSpeed) {
      case 'slow-2g':
      case '2g':
        return 'Low bandwidth';
      case '3g':
        return 'Moderate';
      case '4g':
        return 'Fast';
      default:
        return 'Stable';
    }
  }, [connectionStatus, metrics?.networkSpeed]);

  // Performance monitoring for dashboard cards
  const statsObserverOptions = useMemo(() => ({ threshold: 0.1 }), []);
  const quickActionsObserverOptions = useMemo(() => ({ threshold: 0.1 }), []);

  const statsObserver = useIntersectionObserver(statsObserverOptions);

  const quickActionsObserver = useIntersectionObserver(quickActionsObserverOptions);

  const statsRef = statsObserver?.elementRef;
  const statsInView = statsObserver?.hasBeenVisible ?? statsObserver?.inView ?? false;

  const quickActionsRef = quickActionsObserver?.elementRef;
  const quickActionsInView = quickActionsObserver?.hasBeenVisible ?? quickActionsObserver?.inView ?? false;

  // Advanced animations with accessibility support
  const heroAnimation = useMemo(() => (
    createA11yAnimation(
      {
        initial: { opacity: 0, y: 30, scale: 0.95 },
        animate: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: accessibility.reduceMotion ? 260 : 120,
            damping: accessibility.reduceMotion ? 34 : 26,
            mass: 1.2,
          },
        },
      },
      { respectReducedMotion: true }
    )
  ), [accessibility.reduceMotion]);

  const cardAnimation = useMemo(() => (
    createA11yAnimation(
      {
        initial: { opacity: 0, y: 28, rotateX: -12, scale: 0.96 },
        animate: {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          transition: {
            duration: accessibility.reduceMotion ? 0.35 : 2.3,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      },
      { respectReducedMotion: true }
    )
  ), [accessibility.reduceMotion]);

  const bannerAnimation = useMemo(() => (
    createA11yAnimation(
      {
        initial: { opacity: 0, y: -24 },
        animate: {
          opacity: 1,
          y: 0,
          transition: {
            duration: accessibility.reduceMotion ? 0.2 : 0.6,
            ease: [0.23, 1, 0.32, 1],
          },
        },
      },
      { respectReducedMotion: true }
    )
  ), [accessibility.reduceMotion]);

  const isOperational = connectionStatus === 'online';
  const statusLabel = isOperational ? 'Operational' : 'Fail-safe';
  const statusNarrative = isOperational
    ? 'Mission systems are stable. Maintain situational awareness and keep your trusted grid linked.'
    : 'Fail-safe workflows engaged. Review redundancy paths and verify emergency protocols are accessible.';
  const bannerHighlights = useMemo(
    () => [
      {
        label: 'Signal',
        value: isOperational ? 'Secure link' : 'Offline channel',
      },
      {
        label: 'Network',
        value: networkLabel,
      },
      {
        label: 'GPS',
        value: gpsAccuracyLabel,
      },
      {
        label: 'Power',
        value: `${batteryLevel}%`,
      },
    ],
    [isOperational, networkLabel, gpsAccuracyLabel, batteryLevel]
  );
  const statusItems = useMemo(() => [
    {
      id: 'safety-score',
      label: "Safety Score",
      value: `${safetyScore}%`,
      icon: Shield,
      color: safetyScore > 80 ? 'var(--success-green)' : safetyScore > 60 ? 'var(--warning-yellow)' : 'var(--danger-red)',
      trend: safetyScore > 80 ? 'excellent' : safetyScore > 60 ? 'stable' : 'watch',
      description: 'Your current safety score based on location, time, and activity patterns',
      trendLabel: safetyScore > 80 ? 'Excellent status' : safetyScore > 60 ? 'Monitoring status' : 'Increase vigilance',
      trendIcon: safetyScore > 80 ? CheckCircle : Activity,
    },
    {
      id: 'emergency-contacts',
      label: "Emergency Contacts",
      value: emergencyContacts,
      icon: Phone,
      color: 'var(--primary-blue)',
      trend: 'active',
      description: `${emergencyContacts} emergency contacts configured and available`,
      trendLabel: 'Contacts ready',
      trendIcon: Users,
    },
    {
      id: 'last-checkin',
      label: "Last Check-in",
      value: lastCheckIn ? lastCheckIn.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Not today",
      icon: Clock,
      color: 'var(--accent-purple)',
      trend: lastCheckIn ? 'recent' : 'pending',
      description: lastCheckIn ? 'Latest safety check-in completed' : 'No check-ins today',
      trendLabel: lastCheckIn ? 'Recent check-in logged' : 'Check-in needed',
      trendIcon: lastCheckIn ? CheckCircle : Timer,
    },
    {
      id: 'connection-status',
      label: "Connection",
      value: connectionStatus,
      icon: connectionStatus === 'online' ? Wifi : WifiOff,
      color: connectionStatus === 'online' ? 'var(--success-green)' : 'var(--warning-yellow)',
      trend: connectionStatus,
      description: `Device is currently ${connectionStatus}`,
      trendLabel: connectionStatus === 'online' ? 'Network stable' : 'Network offline',
      trendIcon: connectionStatus === 'online' ? Activity : AlertCircle,
    }
  ], [safetyScore, emergencyContacts, lastCheckIn, connectionStatus]);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const greetingMessage = useMemo(() => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, [currentTime]);

  const greetingHeadline = `${greetingMessage}, Guardian!`;
  const statusTagline = isOperational
    ? 'System Status: Operational and Standing By'
    : 'System Status: Fail-safe Protocols Engaged';

  const bannerTaglines = useMemo(() => ([
    'System telemetry stable. Awaiting your command.',
    'Grid synchronized. All guardians standing by.',
    'Maintaining optimal ranges. Confidence at mission standard.'
  ]), []);

  const rotatingTagline = useMemo(() => {
    if (!bannerTaglines.length) return '';
    const index = Math.floor(Math.random() * bannerTaglines.length);
    return bannerTaglines[index];
  }, [bannerTaglines]);

  return (
    <div className="dashboard-page">
      <DashboardGreeting
        animation={bannerAnimation}
        headline={greetingHeadline}
        statusLabel={statusLabel}
        statusTagline={statusTagline}
        statusNarrative={statusNarrative}
        syncedLabel={`Synced ${formatTime(currentTime)}`}
        safetyConfidence={safetyScore}
        highlights={bannerHighlights}
        lastCheckInLabel={lastCheckIn ? formatTime(lastCheckIn) : 'Awaiting'}
        tagline={rotatingTagline}
      />

      {/* Hero Section */}
      <motion.section
        {...heroAnimation}
        className="dashboard-grid dashboard-grid--two"
        role="region"
        aria-label="Mission readiness overview"
      >
        <motion.article
          className="dashboard-card signal-card"
          whileHover={{ translateY: accessibility.reduceMotion ? 0 : -4 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="badge-inline mb-2">Safety Network</span>
              <div className="flex flex-col gap-2" aria-live="polite">
                <h2 className="pane-subtitle">
                  {greetingMessage}, Guardian
                </h2>
                <p
                  className="text-sm font-medium"
                  style={{ color: 'rgba(203,213,225,0.85)', letterSpacing: '0.04em' }}
                >
                  Welcome back to Beacon Ops — operational &amp; standing by.
                </p>
                <p
                  className="text-xs uppercase tracking-[0.32em]"
                  style={{ color: 'rgba(148,163,184,0.65)' }}
                >
                  {formatDate(currentTime)} • {formatTime(currentTime)}
                </p>
              </div>
            </div>
            <div className="status-chip" style={{ background: 'rgba(52,211,153,0.18)', borderColor: 'rgba(52,211,153,0.45)' }}>
              <span className="micro-dot" />
              {connectionStatus}
            </div>
          </div>

          <p className="text-sm leading-relaxed" style={{ color: 'rgba(226,232,240,0.72)' }}>
            Guardian Beacon synthesizes your location, trusted contacts, and smart alerts to deliver instant clarity under pressure.
            Monitor real-time health, launch emergency workflows, or check-in with one tap.
          </p>

          <div className="mt-6 flex flex-wrap gap-3" role="list" aria-label="Reliability and signal status">
            <div className="reliability-chip" role="listitem" tabIndex={0} aria-live="polite" aria-label={`GPS accuracy status: ${gpsAccuracyLabel}`}>
              <Navigation2 className="reliability-chip__icon" aria-hidden="true" />
              <div className="reliability-chip__text">
                <span className="reliability-chip__label">GPS Accuracy</span>
                <span className="reliability-chip__value">{gpsAccuracyLabel}</span>
              </div>
            </div>
            <div className="reliability-chip" role="listitem" tabIndex={0} aria-live="polite" aria-label={`Network status: ${networkLabel}`}>
              <Wifi className="reliability-chip__icon" aria-hidden="true" />
              <div className="reliability-chip__text">
                <span className="reliability-chip__label">Network</span>
                <span className="reliability-chip__value">{networkLabel}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <MetricChip label="Current Time" value={formatTime(currentTime)} subValue={formatDate(currentTime)} />
            <MetricChip label="Battery" value={`${batteryLevel}%`} subValue={batteryLevel < 25 ? 'Charging recommended' : 'Optimal level'} intent={batteryLevel < 25 ? 'warning' : 'success'} />
            <MetricChip label="Safety Score" value={`${safetyScore}%`} subValue={safetyScore > 80 ? 'Excellent readiness' : 'Monitor surroundings'} intent={safetyScore > 80 ? 'success' : 'warning'} />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="emergency-cta"
              aria-label="Activate SOS mode"
            >
              <AlertCircle className="h-4 w-4" />
              Trigger SOS
            </motion.button>
            <div className="flex items-center gap-3 bg-[rgba(15,23,42,0.75)] px-4 py-3 rounded-2xl border border-[rgba(148,163,184,0.16)]">
              <Timer className="h-4 w-4" style={{ color: 'var(--primary-blue)' }} />
              <div className="text-xs uppercase tracking-[0.28em]" style={{ color: 'rgba(148,163,184,0.68)' }}>
                Last check-in
              </div>
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                {lastCheckIn ? lastCheckIn.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Not today'}
              </span>
            </div>
          </div>
        </motion.article>

        <motion.article
          className="dashboard-card radar-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="radar-grid" />
          <div className="absolute top-6 left-6 flex flex-col gap-3">
            <span className="badge-inline" style={{ background: 'rgba(14,165,233,0.16)', borderColor: 'rgba(14,165,233,0.4)' }}>Live Map</span>
            <h2 className="text-xl font-semibold" style={{ color: 'rgba(226,232,240,0.92)' }}>
              Proximity Scan
            </h2>
            <p className="text-xs leading-relaxed max-w-xs" style={{ color: 'rgba(148,163,184,0.75)' }}>
              Monitoring nearby safe zones, registered guardians, and hazard alerts. Tap map for immersive view.
            </p>
          </div>
          <div className="radar-ping" style={{ top: '45%', left: '58%' }} />
          <div className="radar-ping" style={{ top: '30%', left: '32%', animationDelay: '0.6s' }} />
          <div className="radar-ping" style={{ top: '68%', left: '40%', animationDelay: '1.2s' }} />
          <div className="absolute bottom-6 left-6 flex items-center gap-3">
            <div className="icon-pill" style={{ background: 'rgba(16,185,129,0.22)', borderColor: 'rgba(16,185,129,0.4)' }}>
              <Activity className="h-4 w-4" style={{ color: 'var(--success-green)' }} />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.24em]" style={{ color: 'rgba(148,163,184,0.6)' }}>Active Guardians</div>
              <div className="text-lg font-semibold" style={{ color: 'rgba(226,232,240,0.95)' }}>{emergencyContacts} connected</div>
            </div>
          </div>
        </motion.article>
      </motion.section>

      {/* Status Grid */}
      <motion.section
        ref={statsRef}
        className="dashboard-card dashboard-status"
        role="region"
        aria-label="Safety status overview"
      >
        <div className="dashboard-status__header">
          <div>
            <div className="pane-title">Safety Telemetry</div>
            <h2 className="text-3xl font-semibold headline-gradient">Operational Snapshots</h2>
          </div>
          <span className="badge-inline" style={{ background: 'rgba(59,130,246,0.18)', borderColor: 'rgba(59,130,246,0.42)' }}>
            Auto-synced • <LiveClock />
          </span>
        </div>

        <div className="dashboard-status__grid">
          {statusItems.map((item, index) => (
            <StatusCard 
              key={item.id} 
              item={item} 
              index={index} 
              statsInView={statsInView}
              cardAnimation={cardAnimation}
              accessibility={accessibility}
            />
          ))}
        </div>
      </motion.section>

      {/* Quick Actions */}
      <motion.section
        ref={quickActionsRef}
        initial={{ opacity: 0, y: 30 }}
        animate={quickActionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        role="region"
        aria-label="Quick safety actions"
      >
        <QuickActions />
      </motion.section>

      {/* Emergency Alert */}
      {batteryLevel < 20 && (
        <motion.div
          className="fixed bottom-6 right-6 p-4 glass-card border-l-4 max-w-sm z-50"
          style={{
            borderLeftColor: 'var(--warning-yellow)',
            background: 'rgba(255, 193, 7, 0.1)',
            backdropFilter: 'blur(20px)'
          }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          role="alert"
          aria-live="assertive"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--warning-yellow)' }} />
            <div>
              <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                Low Battery Warning
              </h3>
              <p className="text-xs opacity-80" style={{ color: 'var(--text-secondary)' }}>
                Battery at {batteryLevel}%. Consider charging your device for optimal safety monitoring.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default DashboardEnhanced;