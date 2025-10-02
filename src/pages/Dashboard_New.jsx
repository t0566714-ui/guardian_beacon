import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  MapPin, 
  Users, 
  Battery, 
  Signal, 
  Clock, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Zap,
  Heart,
  Navigation,
  Star,
  TrendingUp,
  Calendar,
  Eye
} from 'lucide-react';

const Dashboard_New = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [safetyScore] = useState(94);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSOSActivate = () => {
    console.log('SOS Activated with enhanced UI!');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const floatingAnimation = {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const quickActions = [
    { 
      id: 'safe-walk', 
      title: 'Safe Walk', 
      icon: Navigation, 
      color: 'from-emerald-500 to-teal-600',
      description: 'Get safe route guidance',
      status: 'Available'
    },
    { 
      id: 'check-in', 
      title: 'Quick Check-in', 
      icon: CheckCircle, 
      color: 'from-blue-500 to-cyan-600',
      description: 'Send status update',
      status: 'Ready'
    },
    { 
      id: 'share-location', 
      title: 'Share Location', 
      icon: MapPin, 
      color: 'from-purple-500 to-violet-600',
      description: 'Share live location',
      status: 'Active'
    },
    { 
      id: 'contacts', 
      title: 'Emergency Contacts', 
      icon: Users, 
      color: 'from-orange-500 to-red-500',
      description: 'Manage contacts',
      status: '5 Active'
    }
  ];

  const statusCards = [
    {
      title: 'Safety Score',
      value: safetyScore,
      unit: '%',
      icon: Shield,
      color: 'text-emerald-400',
      bgColor: 'from-emerald-500/10 to-teal-500/5',
      borderColor: 'border-emerald-500/20',
      trend: '+2% today',
      description: 'Overall safety rating'
    },
    {
      title: 'Battery Level',
      value: 87,
      unit: '%',
      icon: Battery,
      color: 'text-green-400',
      bgColor: 'from-green-500/10 to-emerald-500/5',
      borderColor: 'border-green-500/20',
      trend: '6h remaining',
      description: 'Device power status'
    },
    {
      title: 'Network Signal',
      value: 4,
      unit: '/5',
      icon: Signal,
      color: 'text-blue-400',
      bgColor: 'from-blue-500/10 to-cyan-500/5',
      borderColor: 'border-blue-500/20',
      trend: '5G Connected',
      description: 'Connection strength'
    },
    {
      title: 'Active Contacts',
      value: 5,
      unit: '',
      icon: Heart,
      color: 'text-pink-400',
      bgColor: 'from-pink-500/10 to-rose-500/5',
      borderColor: 'border-pink-500/20',
      trend: 'All online',
      description: 'Emergency contacts'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'Safe arrival confirmed',
      location: 'Home',
      time: '2 min ago',
      type: 'success',
      icon: CheckCircle
    },
    {
      id: 2,
      action: 'Location shared',
      location: 'Downtown Office',
      time: '15 min ago',
      type: 'info',
      icon: MapPin
    },
    {
      id: 3,
      action: 'Check-in completed',
      location: 'Coffee Shop',
      time: '1 hour ago',
      type: 'success',
      icon: Clock
    },
    {
      id: 4,
      action: 'Safe walk activated',
      location: 'University Campus',
      time: '3 hours ago',
      type: 'warning',
      icon: Navigation
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <motion.div 
        className="relative z-10 p-4 lg:p-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Enhanced Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="glass-card p-6 lg:p-8 relative overflow-hidden">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-cyan-500/10" />
            
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <div className="flex items-center space-x-3 mb-3">
                  <motion.div 
                    className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500"
                    animate={floatingAnimation}
                  >
                    <Shield className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                      Welcome back, Sarah
                    </h1>
                    <p className="text-slate-400 text-sm lg:text-base">
                      Your safety is our priority • {currentTime.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <motion.div 
                    className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-emerald-400 font-medium">All Systems Active</span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20"
                    whileHover={{ scale: 1.05 }}
                  >
                    <MapPin className="w-3 h-3 text-blue-400" />
                    <span className="text-blue-400">Location Services On</span>
                  </motion.div>
                </div>
              </div>

              {/* Current time widget */}
              <div className="flex items-center space-x-4">
                <motion.div 
                  className="text-right"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="text-2xl font-bold text-white">
                    {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="text-sm text-slate-400">
                    {currentTime.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
          
          {/* Left Column - SOS & Quick Actions */}
          <div className="xl:col-span-1 space-y-6">
            
            {/* Enhanced SOS Button */}
            <motion.div variants={itemVariants}>
              <motion.div
                className="relative group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSOSActivate}
              >
                <div className="glass-card p-8 text-center relative overflow-hidden">
                  {/* Pulsating background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100"
                    initial={false}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.div
                    className="relative z-10"
                    animate={floatingAnimation}
                  >
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-2xl shadow-red-500/25">
                      <AlertTriangle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Emergency SOS</h3>
                    <p className="text-slate-400 text-sm">Tap to activate emergency protocol</p>
                  </motion.div>
                  
                  {/* Hover effect rings */}
                  <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-red-500/30 opacity-0 group-hover:opacity-100"
                    initial={false}
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants}>
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  {quickActions.map((action, index) => (
                    <motion.div
                      key={action.id}
                      className="p-3 rounded-lg bg-gradient-to-r hover:from-slate-800/50 hover:to-slate-700/50 border border-slate-700/50 hover:border-slate-600/50 cursor-pointer group transition-all duration-300"
                      whileHover={{ x: 4 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${action.color}`}>
                          <action.icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-medium text-sm">{action.title}</div>
                          <div className="text-slate-400 text-xs">{action.description}</div>
                        </div>
                        <div className="text-xs text-slate-500 group-hover:text-slate-400">
                          {action.status}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Center & Right Columns - Status Cards & Activity */}
          <div className="xl:col-span-3 space-y-6">
            
            {/* Status Cards Grid */}
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statusCards.map((card, index) => (
                  <motion.div
                    key={card.title}
                    className="glass-card p-6 relative overflow-hidden group cursor-pointer"
                    whileHover={{ y: -4 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Gradient background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.bgColor} opacity-50 group-hover:opacity-75 transition-opacity duration-300`} />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <card.icon className={`w-5 h-5 ${card.color}`} />
                        <motion.div
                          className="text-xs text-slate-400 opacity-0 group-hover:opacity-100"
                          initial={false}
                          transition={{ duration: 0.2 }}
                        >
                          <TrendingUp className="w-3 h-3" />
                        </motion.div>
                      </div>
                      
                      <div className="mb-2">
                        <div className="flex items-baseline space-x-1">
                          <span className="text-2xl font-bold text-white">{card.value}</span>
                          <span className="text-sm text-slate-400">{card.unit}</span>
                        </div>
                        <div className="text-xs text-slate-500 mt-1">{card.trend}</div>
                      </div>
                      
                      <div className="text-sm text-slate-400 mb-3">{card.title}</div>
                      <div className="text-xs text-slate-500">{card.description}</div>
                    </div>
                    
                    {/* Hover border effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-xl border ${card.borderColor} opacity-0 group-hover:opacity-100`}
                      initial={false}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div variants={itemVariants}>
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-purple-400" />
                    Recent Activity
                  </h3>
                  <motion.button
                    className="text-sm text-slate-400 hover:text-white flex items-center space-x-1"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span>View All</span>
                    <Eye className="w-3 h-3" />
                  </motion.button>
                </div>
                
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-slate-800/30 transition-colors cursor-pointer group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 4 }}
                    >
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' :
                        activity.type === 'warning' ? 'bg-orange-500/10 text-orange-400' :
                        'bg-blue-500/10 text-blue-400'
                      }`}>
                        <activity.icon className="w-4 h-4" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium">{activity.action}</div>
                        <div className="text-slate-400 text-xs flex items-center space-x-2">
                          <MapPin className="w-3 h-3" />
                          <span>{activity.location}</span>
                        </div>
                      </div>
                      
                      <div className="text-xs text-slate-500 group-hover:text-slate-400">
                        {activity.time}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Safety Insights */}
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Safety Score Breakdown */}
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-400" />
                    Safety Insights
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">Location Sharing</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-r from-emerald-500 to-green-400" />
                        </div>
                        <span className="text-emerald-400 text-sm font-medium">100%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">Contact Network</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="w-4/5 h-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                        </div>
                        <span className="text-blue-400 text-sm font-medium">95%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">Device Security</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="w-11/12 h-full bg-gradient-to-r from-purple-500 to-violet-400" />
                        </div>
                        <span className="text-purple-400 text-sm font-medium">98%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-cyan-400" />
                    This Week
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-400">12</div>
                      <div className="text-xs text-slate-400">Check-ins</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">8</div>
                      <div className="text-xs text-slate-400">Safe Walks</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">24</div>
                      <div className="text-xs text-slate-400">Locations Shared</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-pink-400">5</div>
                      <div className="text-xs text-slate-400">Contacts Active</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard_New;