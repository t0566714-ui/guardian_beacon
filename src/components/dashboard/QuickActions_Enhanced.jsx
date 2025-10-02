import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  Navigation, 
  Shield, 
  EyeOff, 
  MapPin, 
  Users,
  ArrowRight 
} from 'lucide-react';
import { useLanguage } from '../providers/LanguageProvider.jsx';

const QuickActions = () => {
  const { t } = useLanguage();

  const actions = [
    {
      id: 'checkin',
      title: t('tools.checkin'),
      icon: Clock,
      href: '/safety-tools?tool=checkin',
      color: 'from-blue-500 to-blue-600',
      description: 'Set up periodic safety check-ins'
    },
    {
      id: 'safewalk',
      title: t('tools.safewalk'),
      icon: Navigation,
      href: '/safety-tools?tool=safewalk',
      color: 'from-green-500 to-green-600',
      description: 'Track your journey with live updates'
    },
    {
      id: 'deadman',
      title: t('tools.deadman'),
      icon: Shield,
      href: '/safety-tools?tool=deadman',
      color: 'from-orange-500 to-orange-600',
      description: 'Automatic alert if you don\'t respond'
    },
    {
      id: 'discreet',
      title: t('tools.discreet'),
      icon: EyeOff,
      href: '/safety-tools?tool=discreet',
      color: 'from-purple-500 to-purple-600',
      description: 'Silent mode for sensitive situations'
    },
    {
      id: 'map',
      title: 'Safety Map',
      icon: MapPin,
      href: '/map',
      color: 'from-cyan-500 to-cyan-600',
      description: 'View safety zones and nearby help'
    },
    {
      id: 'contacts',
      title: 'Emergency Contacts',
      icon: Users,
      href: '/contacts',
      color: 'from-pink-500 to-pink-600',
      description: 'Manage your emergency contacts'
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          
          return (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link
                to={action.href}
                className="group block"
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative overflow-hidden rounded-xl bg-gradient-to-r ${action.color}
                    p-4 shadow-lg hover:shadow-xl transition-all duration-300
                    border border-white/10
                  `}
                >
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,white_1px,transparent_1px)] bg-[length:16px_16px]" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                    
                    <h3 className="font-semibold text-white mb-1">
                      {action.title}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {action.description}
                    </p>
                  </div>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;