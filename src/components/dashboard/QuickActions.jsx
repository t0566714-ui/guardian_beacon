import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, Navigation2, Users, MapPin, ArrowUpRight } from "lucide-react";
import { useAccessibility } from "../../hooks/useAccessibility.js";

export default function QuickActions({ language = 'en' }) {
  const { accessibility } = useAccessibility();
  const reduceMotion = accessibility?.reduceMotion ?? false;

  const texts = {
    en: {
      title: 'Quick Actions',
      checkIn: 'Check-In',
      checkInDesc: 'Schedule check',
      safeWalk: 'Safe Walk',
      safeWalkDesc: 'Track journey',
      addContact: 'Contacts',
      addContactDesc: 'Manage network',
      viewMap: 'Safety Map',
      viewMapDesc: 'View zones'
    },
    hi: {
      title: 'त्वरित क्रियाएं',
      checkIn: 'चेक-इन',
      checkInDesc: 'जांच निर्धारित करें',
      safeWalk: 'सुरक्षित पैदल',
      safeWalkDesc: 'यात्रा ट्रैक करें',
      addContact: 'संपर्क',
      addContactDesc: 'नेटवर्क प्रबंधित करें',
      viewMap: 'सुरक्षा मानचित्र',
      viewMapDesc: 'क्षेत्र देखें'
    }
  };

  const t = texts[language] ?? texts.en;

  const actions = [
    {
      key: 'check-in',
      title: t.checkIn,
      description: t.checkInDesc,
      icon: Clock,
      href: '/safety-tools',
      accentVar: '--accent-purple',
      accentRgbVar: '--accent-purple-rgb'
    },
    {
      key: 'safe-walk',
      title: t.safeWalk,
      description: t.safeWalkDesc,
      icon: Navigation2,
      href: '/safety-tools',
      accentVar: '--success',
      accentRgbVar: '--success-rgb'
    },
    {
      key: 'contacts',
      title: t.addContact,
      description: t.addContactDesc,
      icon: Users,
      href: '/contacts',
      accentVar: '--primary-500',
      accentRgbVar: '--primary-500-rgb'
    },
    {
      key: 'safety-map',
      title: t.viewMap,
      description: t.viewMapDesc,
      icon: MapPin,
      href: '/map',
      accentVar: '--warning',
      accentRgbVar: '--warning-rgb'
    }
  ];

  const subtitle = language === 'hi'
    ? 'महत्वपूर्ण कार्यों को तुरंत शुरू करें — हर टाइल स्पष्ट और विश्वसनीय है।'
    : 'Launch time-critical actions instantly—each module stays crisp when seconds matter.';

  return (
    <section
      className="rounded-2xl shadow-lg p-6 bg-gradient-to-br from-slate-900/60 to-slate-800/40 border border-slate-700/40"
      aria-label={t.title}
    >
      <header className="quick-actions__overview">
        <div>
          <span className="quick-actions__badge">Rapid Controls</span>
          <h2 className="text-2xl font-semibold headline-gradient mt-2">
            {t.title}
          </h2>
        </div>
        <p className="quick-actions__tagline">
          {subtitle}
        </p>
      </header>

      <div className="quick-actions__grid">
        {actions.map((action, index) => {
          const Icon = action.icon;
          const animationDelay = reduceMotion ? 0 : index * 0.08 + 0.25;
          const descriptionId = `${action.key}-description`;

          return (
            <motion.div
              key={action.key}
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: animationDelay, duration: reduceMotion ? 0 : 0.45 }}
              whileHover={reduceMotion ? {} : { y: -6 }}
            >
              <Link
                to={action.href}
                className="quick-action-card focusable-card"
                style={{
                  '--qa-accent': `var(${action.accentVar})`,
                  '--qa-accent-rgb': `var(${action.accentRgbVar})`
                }}
                aria-describedby={descriptionId}
              >
                <div className="quick-actions__top-row">
                  <span className="quick-actions__icon-pill" aria-hidden="true">
                    <Icon className="w-5 h-5" />
                  </span>
                  <ArrowUpRight className="quick-actions__arrow w-5 h-5" aria-hidden="true" />
                </div>

                <div className="quick-actions__text">
                  <h3>{action.title}</h3>
                  <p id={descriptionId}>{action.description}</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}