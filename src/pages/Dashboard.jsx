import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  MapPin, 
  Clock, 
  Users, 
  Activity, 
  AlertTriangle, 
  Heart, 
  CheckCircle,
  Calendar,
  Filter,
  Search,
  ChevronDown,
  ExternalLink,
  Play,
  Pause,
  MoreVertical,
  Download,
  Archive,
  Trash2,
  Eye,
  MessageCircle,
  Phone,
  Navigation,
  Timer,
  Zap,
  Star,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  Globe,
  Wifi,
  Battery,
  Signal,
  Sun,
  Moon,
  Settings,
  Bell,
  Home,
  Briefcase,
  Coffee
} from 'lucide-react';
import DashboardGreeting from '../components/dashboard/DashboardGreeting';
import { User } from '../entities/User';

const Dashboard = () => {
  // Sample user data
  const user = new User(1, "Alex Johnson", "alex@example.com", "+1-555-0123");

  // Enhanced state management
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState('7d');
  const [viewMode, setViewMode] = useState('timeline');
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute for live updates
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Enhanced activity data with richer metadata
  const [activityHistory] = useState([
    {
      id: 1,
      type: 'check-in',
      title: 'Safe Check-in',
      description: 'Completed scheduled safety check-in at work location',
      location: 'Downtown Office, 123 Main St',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'completed',
      contacts: ['Emergency Contact 1', 'Mom'],
      icon: CheckCircle,
      color: 'emerald',
      priority: 'normal',
      duration: '2 min',
      confidence: 98,
      tags: ['routine', 'workplace']
    },
    {
      id: 2,
      type: 'emergency',
      title: 'Emergency Alert Resolved',
      description: 'False alarm - pocket dial resolved quickly with emergency services',
      location: 'Home, 456 Oak Avenue',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      status: 'resolved',
      contacts: ['911', 'Emergency Contact 1'],
      icon: AlertTriangle,
      color: 'orange',
      priority: 'high',
      duration: '5 min',
      confidence: 95,
      tags: ['false-alarm', 'resolved']
    },
    {
      id: 3,
      type: 'location',
      title: 'Location Shared',
      description: 'Shared live location with trusted contacts during evening walk',
      location: 'City Park, Walking Trail #3',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'active',
      contacts: ['Partner', 'Best Friend'],
      icon: MapPin,
      color: 'blue',
      priority: 'normal',
      duration: '45 min',
      confidence: 92,
      tags: ['recreation', 'evening']
    },
    {
      id: 4,
      type: 'safe-walk',
      title: 'Safe Walk Completed',
      description: 'Successfully completed monitored walk home from university',
      location: 'University Campus to Home',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'completed',
      contacts: ['Safety Buddy', 'Mom'],
      icon: Navigation,
      color: 'purple',
      priority: 'normal',
      duration: '22 min',
      confidence: 97,
      tags: ['routine', 'education']
    },
    {
      id: 5,
      type: 'check-in',
      title: 'Missed Check-in',
      description: 'Scheduled check-in missed - automatic notifications sent to contacts',
      location: 'Unknown Location',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      status: 'missed',
      contacts: ['Emergency Contact 1', 'Emergency Contact 2'],
      icon: Clock,
      color: 'red',
      priority: 'high',
      duration: 'N/A',
      confidence: 85,
      tags: ['missed', 'follow-up']
    }
  ]);

  // Enhanced statistics with trends and insights
  const [statistics] = useState({
    totalCheckIns: { value: 127, trend: +12, change: 'up' },
    emergencyAlerts: { value: 3, trend: -33, change: 'down' },
    safeWalks: { value: 45, trend: +25, change: 'up' },
    locationsShared: { value: 89, trend: +18, change: 'up' },
    responseTime: { value: '2.3 min', trend: -15, change: 'down' },
    safetyScore: { value: 94, trend: +3, change: 'up' },
    weeklyActivity: { value: 28, trend: +8, change: 'up' },
    averageDistance: { value: '1.2 km', trend: +5, change: 'up' }
  });

  // Quick insights data
  const [insights] = useState([
    {
      id: 1,
      type: 'trend',
      title: 'Safety Score Improving',
      description: 'Your safety score has increased by 3% this week',
      icon: TrendingUp,
      color: 'emerald',
      action: 'View Details'
    },
    {
      id: 2,
      type: 'alert',
      title: 'New Safe Zone Available',
      description: 'University Library has been verified as a safe zone',
      icon: Shield,
      color: 'blue',
      action: 'Explore'
    },
    {
      id: 3,
      type: 'tip',
      title: 'Peak Activity Time',
      description: 'Most of your check-ins happen between 6-8 PM',
      icon: Clock,
      color: 'purple',
      action: 'Optimize'
    }
  ]);

  // Enhanced system status
  const [systemStatus] = useState({
    connection: { status: 'excellent', strength: 98 },
    location: { status: 'active', accuracy: 'high' },
    battery: { level: 87, status: 'good' },
    lastSync: new Date(Date.now() - 2 * 60 * 1000)
  });

  // Filter and search functionality
  const filteredHistory = activityHistory.filter(item => {
    const matchesFilter = activeFilter === 'all' || item.type === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Enhanced animation variants with more sophisticated easing
  const containerVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 30, 
      opacity: 0,
      scale: 0.95
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -4,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Enhanced utility functions
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return timestamp.toLocaleDateString();
  };

  // Fixed color mappings for Tailwind CSS
  const getColorClasses = (color, isActive = false) => {
    const colorMap = {
      blue: {
        active: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
        inactive: 'bg-slate-800/30 border-slate-700/30 text-slate-300 hover:bg-slate-700/40 hover:border-slate-600/40',
        icon: 'text-blue-400',
        bg: 'bg-blue-500/20',
        border: 'border-blue-500/20',
        gradient: 'from-blue-500/20 to-blue-600/20'
      },
      emerald: {
        active: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400',
        inactive: 'bg-slate-800/30 border-slate-700/30 text-slate-300 hover:bg-slate-700/40 hover:border-slate-600/40',
        icon: 'text-emerald-400',
        bg: 'bg-emerald-500/20',
        border: 'border-emerald-500/20',
        gradient: 'from-emerald-500/20 to-emerald-600/20'
      },
      red: {
        active: 'bg-red-500/20 border-red-500/30 text-red-400',
        inactive: 'bg-slate-800/30 border-slate-700/30 text-slate-300 hover:bg-slate-700/40 hover:border-slate-600/40',
        icon: 'text-red-400',
        bg: 'bg-red-500/20',
        border: 'border-red-500/20',
        gradient: 'from-red-500/20 to-red-600/20'
      },
      purple: {
        active: 'bg-purple-500/20 border-purple-500/30 text-purple-400',
        inactive: 'bg-slate-800/30 border-slate-700/30 text-slate-300 hover:bg-slate-700/40 hover:border-slate-600/40',
        icon: 'text-purple-400',
        bg: 'bg-purple-500/20',
        border: 'border-purple-500/20',
        gradient: 'from-purple-500/20 to-purple-600/20'
      },
      orange: {
        active: 'bg-orange-500/20 border-orange-500/30 text-orange-400',
        inactive: 'bg-slate-800/30 border-slate-700/30 text-slate-300 hover:bg-slate-700/40 hover:border-slate-600/40',
        icon: 'text-orange-400',
        bg: 'bg-orange-500/20',
        border: 'border-orange-500/20',
        gradient: 'from-orange-500/20 to-orange-600/20'
      },
      cyan: {
        active: 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400',
        inactive: 'bg-slate-800/30 border-slate-700/30 text-slate-300 hover:bg-slate-700/40 hover:border-slate-600/40',
        icon: 'text-cyan-400',
        bg: 'bg-cyan-500/20',
        border: 'border-cyan-500/20',
        gradient: 'from-cyan-500/20 to-cyan-600/20'
      },
      indigo: {
        active: 'bg-indigo-500/20 border-indigo-500/30 text-indigo-400',
        inactive: 'bg-slate-800/30 border-slate-700/30 text-slate-300 hover:bg-slate-700/40 hover:border-slate-600/40',
        icon: 'text-indigo-400',
        bg: 'bg-indigo-500/20',
        border: 'border-indigo-500/20',
        gradient: 'from-indigo-500/20 to-indigo-600/20'
      }
    };
    
    return colorMap[color] || colorMap.blue;
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'text-emerald-400',
      active: 'text-blue-400',
      resolved: 'text-orange-400',
      missed: 'text-red-400',
      pending: 'text-yellow-400'
    };
    return colors[status] || 'text-slate-400';
  };

  const getStatusBg = (status) => {
    const backgrounds = {
      completed: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
      active: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
      resolved: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
      missed: 'bg-red-500/10 border-red-500/20 text-red-400',
      pending: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
    };
    return backgrounds[status] || 'bg-slate-500/10 border-slate-500/20 text-slate-400';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-red-400 bg-red-500/10',
      normal: 'text-blue-400 bg-blue-500/10',
      low: 'text-slate-400 bg-slate-500/10'
    };
    return colors[priority] || colors.normal;
  };

  const getTrendIcon = (change) => {
    return change === 'up' ? TrendingUp : TrendingDown;
  };

  const getTrendColor = (change) => {
    return change === 'up' ? 'text-emerald-400' : 'text-red-400';
  };

  // Enhanced StatCard component with sophisticated design
  const StatCard = ({ icon: Icon, title, value, trend, color = 'blue', subtitle, isLoading = false }) => {
    const TrendIcon = getTrendIcon(trend?.change);
    const trendColor = getTrendColor(trend?.change);
    const colors = getColorClasses(color);
    
    return (
      <motion.div
        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-800/50 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 cursor-pointer"
        variants={itemVariants}
        whileHover="hover"
        whileTap="tap"
        {...cardHoverVariants}
        onClick={() => console.log(`StatCard clicked: ${title}`)}
      >
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 ease-out" />
        
        <div className="relative p-6">
          <div className="flex items-start justify-between mb-4">
            <motion.div 
              className={`p-3 rounded-xl bg-gradient-to-br ${colors.gradient} border ${colors.border} group-hover:scale-110 transition-transform duration-300`}
              whileHover={{ rotate: 5 }}
            >
              <Icon className={`w-6 h-6 ${colors.icon}`} />
            </motion.div>
            
            {trend && (
              <motion.div 
                className={`flex items-center space-x-1 px-2 py-1 rounded-lg bg-slate-800/50 border border-slate-700/50 ${trendColor}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <TrendIcon className="w-3 h-3" />
                <span className="text-xs font-semibold">{Math.abs(trend.trend)}%</span>
              </motion.div>
            )}
          </div>
          
          <div className="space-y-2">
            <motion.div 
              className="text-3xl font-bold text-white tracking-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {isLoading ? (
                <div className="h-8 w-16 bg-slate-700/50 rounded animate-pulse" />
              ) : (
                typeof value === 'object' ? value.value : value
              )}
            </motion.div>
            
            <div className="flex flex-col space-y-1">
              <h3 className="text-sm font-medium text-slate-300">{title}</h3>
              {subtitle && (
                <p className="text-xs text-slate-500">{subtitle}</p>
              )}
            </div>
          </div>
          
          {/* Progress indicator */}
          <motion.div 
            className={`mt-4 h-1 ${colors.bg} rounded-full overflow-hidden`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.div 
              className={`h-full bg-gradient-to-r ${colors.icon} rounded-full`}
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ delay: 0.7, duration: 0.6 }}
              style={{ backgroundColor: 'currentColor' }}
            />
          </motion.div>
        </div>
      </motion.div>
    );
  };

  // Enhanced ActivityItem component with premium design
  const ActivityItem = ({ activity, index }) => {
    const IconComponent = activity.icon;
    const colors = getColorClasses(activity.color);
    
    return (
      <motion.div
        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-800/50 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 cursor-pointer"
        variants={itemVariants}
        custom={index}
        whileHover="hover"
        whileTap="tap"
        {...cardHoverVariants}
        layout
        onClick={() => console.log(`Activity clicked: ${activity.title}`)}
      >
        {/* Ambient glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        {/* Left accent border */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${colors.icon} transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300`} />
        
        <div className="relative p-6">
          <div className="flex items-start space-x-4">
            {/* Enhanced icon container */}
            <motion.div 
              className={`flex-shrink-0 p-4 rounded-2xl bg-gradient-to-br ${colors.gradient} border ${colors.border} group-hover:scale-110 transition-transform duration-300`}
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <IconComponent className={`w-6 h-6 ${colors.icon}`} />
            </motion.div>
            
            <div className="flex-1 min-w-0">
              {/* Header section */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-white group-hover:text-slate-100 transition-colors">
                      {activity.title}
                    </h3>
                    <motion.div 
                      className={`px-2 py-1 rounded-lg text-xs font-medium border ${getStatusBg(activity.status)}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {activity.status}
                    </motion.div>
                    {activity.priority === 'high' && (
                      <motion.div 
                        className={`px-2 py-1 rounded-lg text-xs font-medium ${getPriorityColor(activity.priority)}`}
                        {...pulseVariants}
                        animate="pulse"
                      >
                        High Priority
                      </motion.div>
                    )}
                  </div>
                  
                  <p className="text-slate-300 text-sm leading-relaxed mb-3">
                    {activity.description}
                  </p>
                </div>
                
                <motion.button 
                  className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(`More options clicked for: ${activity.title}`);
                  }}
                >
                  <MoreVertical className="w-4 h-4 text-slate-400" />
                </motion.button>
              </div>
              
              {/* Metadata grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/30">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-300 truncate">{activity.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-300">{formatTimeAgo(activity.timestamp)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Timer className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-300">{activity.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-300">{activity.confidence}% confidence</span>
                </div>
              </div>
              
              {/* Tags and contacts */}
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {activity.tags && activity.tags.map((tag, index) => (
                    <motion.span 
                      key={index}
                      className="px-2 py-1 bg-slate-700/50 rounded-md text-xs text-slate-300 border border-slate-600/30"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      #{tag}
                    </motion.span>
                  ))}
                </div>
                
                {activity.contacts.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span className="text-xs text-slate-400">
                      {activity.contacts.length} contact{activity.contacts.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // Premium Insight Card component
  const InsightCard = ({ insight, index }) => {
    const IconComponent = insight.icon;
    const colors = getColorClasses(insight.color);
    
    return (
      <motion.div
        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-800/50 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 cursor-pointer"
        variants={itemVariants}
        custom={index}
        whileHover="hover"
        whileTap="tap"
        {...cardHoverVariants}
        onClick={() => console.log(`Insight clicked: ${insight.title}`)}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        <div className="relative p-6">
          <div className="flex items-start space-x-4">
            <motion.div 
              className={`p-3 rounded-xl bg-gradient-to-br ${colors.gradient} border ${colors.border}`}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <IconComponent className={`w-5 h-5 ${colors.icon}`} />
            </motion.div>
            
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-2">{insight.title}</h3>
              <p className="text-slate-300 text-sm mb-4">{insight.description}</p>
              
              <motion.button
                className={`px-4 py-2 rounded-lg ${colors.bg} border ${colors.border} ${colors.icon} text-sm font-medium ${colors.bgHover} transition-colors`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(`Action button clicked: ${insight.action} for ${insight.title}`);
                }}
              >
                {insight.action}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // System Status component
  const SystemStatus = () => (
    <motion.div
      className="glass-card p-6 relative overflow-hidden rounded-2xl"
      variants={itemVariants}
      whileHover="hover"
      {...cardHoverVariants}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">System Status</h3>
          <motion.div 
            className="w-3 h-3 bg-emerald-400 rounded-full"
            {...pulseVariants}
            animate="pulse"
          />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Signal className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300">Connection</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${systemStatus.connection.strength}%` }} />
              </div>
              <span className="text-emerald-400 text-sm font-medium">{systemStatus.connection.strength}%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span className="text-slate-300">Location</span>
            </div>
            <span className="text-blue-400 text-sm font-medium capitalize">{systemStatus.location.accuracy}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Battery className="w-4 h-4 text-yellow-400" />
              <span className="text-slate-300">Battery</span>
            </div>
            <span className="text-yellow-400 text-sm font-medium">{systemStatus.battery.level}%</span>
          </div>
          
          <div className="pt-2 border-t border-slate-700/50">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Last sync</span>
              <span>{formatTimeAgo(systemStatus.lastSync)}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main gradient orbs */}
        <motion.div 
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-600/10 via-cyan-600/5 to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-600/10 via-violet-600/5 to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-600/8 via-teal-600/4 to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <motion.div 
        className="relative z-10 p-4 lg:p-8 max-w-[1400px] mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Enhanced Header with live time */}
        <motion.header variants={itemVariants} className="mb-8">
          <div className="glass-card p-8 relative overflow-hidden rounded-3xl border border-slate-700/50">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-emerald-500/10" />
            
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-6 lg:mb-0">
                <DashboardGreeting user={user} />
                
                <div className="flex items-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2 text-slate-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{currentTime.toLocaleTimeString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{currentTime.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <SystemStatus />
              </div>
            </div>
          </div>
        </motion.header>

        {/* Enhanced Statistics Grid with new metrics */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <StatCard 
              icon={CheckCircle} 
              title="Total Check-ins" 
              value={statistics.totalCheckIns}
              trend={statistics.totalCheckIns}
              color="emerald"
              subtitle="This month"
            />
            <StatCard 
              icon={AlertTriangle} 
              title="Emergency Alerts" 
              value={statistics.emergencyAlerts}
              trend={statistics.emergencyAlerts}
              color="red"
              subtitle="Resolved quickly"
            />
            <StatCard 
              icon={Navigation} 
              title="Safe Walks" 
              value={statistics.safeWalks}
              trend={statistics.safeWalks}
              color="purple"
              subtitle="Completed"
            />
            <StatCard 
              icon={MapPin} 
              title="Locations Shared" 
              value={statistics.locationsShared}
              trend={statistics.locationsShared}
              color="blue"
              subtitle="With contacts"
            />
            <StatCard 
              icon={Timer} 
              title="Avg Response" 
              value={statistics.responseTime}
              trend={statistics.responseTime}
              color="orange"
              subtitle="Getting faster"
            />
            <StatCard 
              icon={Shield} 
              title="Safety Score" 
              value={`${statistics.safetyScore.value}%`}
              trend={statistics.safetyScore}
              color="emerald"
              subtitle="Excellent rating"
            />
            <StatCard 
              icon={Activity} 
              title="Weekly Activity" 
              value={statistics.weeklyActivity}
              trend={statistics.weeklyActivity}
              color="cyan"
              subtitle="Stay active"
            />
            <StatCard 
              icon={Navigation} 
              title="Avg Distance" 
              value={statistics.averageDistance}
              trend={statistics.averageDistance}
              color="indigo"
              subtitle="Per session"
            />
          </div>
        </motion.div>

        {/* Quick Insights Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="glass-card p-6 lg:p-8 rounded-3xl border border-slate-700/50">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
                <Zap className="w-6 h-6 mr-3 text-yellow-400" />
                Quick Insights
              </h2>
              <p className="text-slate-400">Personalized recommendations based on your activity</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {insights.map((insight, index) => (
                <InsightCard key={insight.id} insight={insight} index={index} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Activity History Section */}
        <motion.div variants={itemVariants}>
          <div className="glass-card p-6 lg:p-8 relative overflow-hidden rounded-3xl border border-slate-700/50">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5" />
            
            <div className="relative z-10">
              {/* Enhanced Section Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-3 flex items-center">
                    <Activity className="w-8 h-8 mr-4 text-blue-400" />
                    Activity Timeline
                  </h2>
                  <p className="text-slate-400 text-lg">Track your safety activities and emergency responses</p>
                </div>
                
                <div className="flex items-center space-x-4 mt-6 lg:mt-0">
                  <motion.select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <option value="24h">Last 24 hours</option>
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                  </motion.select>
                  
                  <motion.button
                    className="btn-ghost text-sm px-6 py-3 rounded-xl backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsLoading(!isLoading)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </motion.button>
                </div>
              </div>

              {/* Enhanced Filters and Search */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-6 lg:space-y-0">
                <div className="flex flex-wrap gap-3">
                  {[
                    { id: 'all', label: 'All Activities', icon: Activity, color: 'blue' },
                    { id: 'check-in', label: 'Check-ins', icon: CheckCircle, color: 'emerald' },
                    { id: 'emergency', label: 'Emergencies', icon: AlertTriangle, color: 'red' },
                    { id: 'location', label: 'Location', icon: MapPin, color: 'blue' },
                    { id: 'safe-walk', label: 'Safe Walks', icon: Navigation, color: 'purple' }
                  ].map((filter) => {
                    const colors = getColorClasses(filter.color);
                    const isActive = activeFilter === filter.id;
                    
                    return (
                      <motion.button
                        key={filter.id}
                        onClick={() => {
                          console.log(`Filter clicked: ${filter.id}`);
                          setActiveFilter(filter.id);
                        }}
                        className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-medium transition-all backdrop-blur-sm border cursor-pointer select-none ${
                          isActive ? colors.active : colors.inactive
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        whileTouch={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <filter.icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{filter.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
                
                <motion.div 
                  className="relative group"
                  whileFocus={{ scale: 1.02 }}
                >
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search activities, locations, contacts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-6 py-3 bg-slate-800/30 border border-slate-700/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 w-full lg:w-80 backdrop-blur-sm transition-all"
                  />
                </motion.div>
              </div>

              {/* Enhanced Activity Timeline */}
              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      className="text-center py-16"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full mx-auto mb-4"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <p className="text-slate-400">Loading activities...</p>
                    </motion.div>
                  ) : filteredHistory.length > 0 ? (
                    <motion.div 
                      className="space-y-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {filteredHistory.map((activity, index) => (
                        <ActivityItem key={activity.id} activity={activity} index={index} />
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      className="text-center py-16"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        className="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-6"
                        whileHover={{ scale: 1.05, rotate: 5 }}
                      >
                        <Activity className="w-8 h-8 text-slate-500" />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-white mb-2">No activities found</h3>
                      <p className="text-slate-400 mb-6">Try adjusting your filters or search terms</p>
                      <motion.button
                        className="btn-primary px-6 py-3"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setActiveFilter('all');
                          setSearchQuery('');
                        }}
                      >
                        Clear Filters
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Enhanced Load More with loading state */}
              {filteredHistory.length > 0 && (
                <motion.div 
                  className="text-center mt-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.button
                    className="btn-ghost px-8 py-4 text-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsLoading(true)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-slate-400/20 border-t-slate-400 rounded-full mr-3"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Loading...
                      </>
                    ) : (
                      <>
                        <ArrowUpRight className="w-5 h-5 mr-2" />
                        Load More Activities
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;