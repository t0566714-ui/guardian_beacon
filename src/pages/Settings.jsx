import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Bell, 
  Moon, 
  Sun, 
  Volume2, 
  VolumeX, 
  Eye, 
  EyeOff,
  Smartphone,
  MapPin,
  Clock,
  Wifi,
  Database,
  Download,
  Upload,
  Trash2,
  Save,
  RefreshCw,
  Info,
  AlertTriangle,
  CheckCircle,
  Zap,
  Globe,
  Lock,
  Key,
  Fingerprint,
  Camera,
  Mic,
  Navigation,
  Heart,
  Activity
} from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    theme: 'dark',
    language: 'en',
    notifications: true,
    sounds: true,
    vibration: true,
    
    // Privacy Settings
    locationSharing: true,
    profileVisibility: 'friends',
    dataCollection: false,
    analytics: true,
    
    // Security Settings
    twoFactorAuth: false,
    biometricAuth: true,
    autoLock: true,
    autoLockTime: 5,
    
    // Emergency Settings
    emergencyLocation: true,
    autoSOS: false,
    emergencyContacts: true,
    medicalInfo: true,
    
    // Performance Settings
    reducedMotion: false,
    highContrast: false,
    dataUsage: 'standard',
    cachingEnabled: true
  });

  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(new Date());

  const tabs = [
    { id: 'general', name: 'General', icon: SettingsIcon, color: 'blue' },
    { id: 'privacy', name: 'Privacy', icon: Eye, color: 'purple' },
    { id: 'security', name: 'Security', icon: Shield, color: 'emerald' },
    { id: 'emergency', name: 'Emergency', icon: AlertTriangle, color: 'red' },
    { id: 'accessibility', name: 'Accessibility', icon: Heart, color: 'pink' },
    { id: 'data', name: 'Data & Storage', icon: Database, color: 'cyan' }
  ];

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = async () => {
    setIsSaving(true);
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastSaved(new Date());
    setIsSaving(false);
  };

  const resetSettings = () => {
    if (confirm('Are you sure you want to reset all settings to default values?')) {
      setSettings({
        theme: 'dark',
        language: 'en',
        notifications: true,
        sounds: true,
        vibration: true,
        locationSharing: true,
        profileVisibility: 'friends',
        dataCollection: false,
        analytics: true,
        twoFactorAuth: false,
        biometricAuth: true,
        autoLock: true,
        autoLockTime: 5,
        emergencyLocation: true,
        autoSOS: false,
        emergencyContacts: true,
        medicalInfo: true,
        reducedMotion: false,
        highContrast: false,
        dataUsage: 'standard',
        cachingEnabled: true
      });
    }
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

  const ToggleSwitch = ({ enabled, onChange, label, description }) => (
    <div className="flex items-center justify-between p-4 rounded-lg hover:bg-slate-800/50 transition-colors">
      <div className="flex-1">
        <div className="text-white font-medium">{label}</div>
        <div className="text-slate-400 text-sm">{description}</div>
      </div>
      <motion.button
        onClick={onChange}
        className={`w-12 h-6 rounded-full p-1 transition-colors ${
          enabled ? 'bg-blue-500' : 'bg-slate-600'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="w-4 h-4 bg-white rounded-full shadow-md"
          animate={{ x: enabled ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </motion.button>
    </div>
  );

  const SelectOption = ({ value, onChange, options, label, description }) => (
    <div className="p-4 rounded-lg hover:bg-slate-800/50 transition-colors">
      <div className="mb-3">
        <div className="text-white font-medium">{label}</div>
        <div className="text-slate-400 text-sm">{description}</div>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <SettingsIcon className="w-5 h-5 mr-2 text-blue-400" />
                General Preferences
              </h3>
              
              <div className="space-y-4">
                <SelectOption
                  value={settings.theme}
                  onChange={(value) => updateSetting('theme', value)}
                  options={[
                    { value: 'dark', label: 'Dark Theme' },
                    { value: 'light', label: 'Light Theme' },
                    { value: 'auto', label: 'Auto (System)' }
                  ]}
                  label="Theme"
                  description="Choose your preferred color scheme"
                />
                
                <SelectOption
                  value={settings.language}
                  onChange={(value) => updateSetting('language', value)}
                  options={[
                    { value: 'en', label: 'English' },
                    { value: 'es', label: 'Español' },
                    { value: 'fr', label: 'Français' },
                    { value: 'de', label: 'Deutsch' }
                  ]}
                  label="Language"
                  description="Select your preferred language"
                />
                
                <ToggleSwitch
                  enabled={settings.notifications}
                  onChange={() => updateSetting('notifications', !settings.notifications)}
                  label="Push Notifications"
                  description="Receive important safety alerts and updates"
                />
                
                <ToggleSwitch
                  enabled={settings.sounds}
                  onChange={() => updateSetting('sounds', !settings.sounds)}
                  label="Sound Effects"
                  description="Play sounds for notifications and interactions"
                />
                
                <ToggleSwitch
                  enabled={settings.vibration}
                  onChange={() => updateSetting('vibration', !settings.vibration)}
                  label="Vibration"
                  description="Vibrate for alerts and notifications"
                />
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-purple-400" />
                Privacy Controls
              </h3>
              
              <div className="space-y-4">
                <ToggleSwitch
                  enabled={settings.locationSharing}
                  onChange={() => updateSetting('locationSharing', !settings.locationSharing)}
                  label="Location Sharing"
                  description="Share your location with trusted contacts"
                />
                
                <SelectOption
                  value={settings.profileVisibility}
                  onChange={(value) => updateSetting('profileVisibility', value)}
                  options={[
                    { value: 'public', label: 'Public' },
                    { value: 'friends', label: 'Friends Only' },
                    { value: 'private', label: 'Private' }
                  ]}
                  label="Profile Visibility"
                  description="Control who can see your profile information"
                />
                
                <ToggleSwitch
                  enabled={settings.dataCollection}
                  onChange={() => updateSetting('dataCollection', !settings.dataCollection)}
                  label="Data Collection"
                  description="Allow anonymous data collection for app improvement"
                />
                
                <ToggleSwitch
                  enabled={settings.analytics}
                  onChange={() => updateSetting('analytics', !settings.analytics)}
                  label="Usage Analytics"
                  description="Help improve the app with usage analytics"
                />
              </div>
            </div>

            <div className="glass-card p-6">
              <h4 className="text-md font-semibold text-white mb-4">Data Management</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.button
                  className="p-4 rounded-lg bg-blue-500/20 border border-blue-500/30 hover:bg-blue-500/30 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="w-5 h-5 text-blue-400 mb-2" />
                  <div className="text-white font-medium">Export Data</div>
                  <div className="text-blue-400 text-sm">Download your data</div>
                </motion.button>
                
                <motion.button
                  className="p-4 rounded-lg bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Trash2 className="w-5 h-5 text-red-400 mb-2" />
                  <div className="text-white font-medium">Delete Account</div>
                  <div className="text-red-400 text-sm">Permanently delete</div>
                </motion.button>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-emerald-400" />
                Security Settings
              </h3>
              
              <div className="space-y-4">
                <ToggleSwitch
                  enabled={settings.twoFactorAuth}
                  onChange={() => updateSetting('twoFactorAuth', !settings.twoFactorAuth)}
                  label="Two-Factor Authentication"
                  description="Add an extra layer of security to your account"
                />
                
                <ToggleSwitch
                  enabled={settings.biometricAuth}
                  onChange={() => updateSetting('biometricAuth', !settings.biometricAuth)}
                  label="Biometric Authentication"
                  description="Use fingerprint or face recognition"
                />
                
                <ToggleSwitch
                  enabled={settings.autoLock}
                  onChange={() => updateSetting('autoLock', !settings.autoLock)}
                  label="Auto Lock"
                  description="Automatically lock the app when inactive"
                />
                
                <SelectOption
                  value={settings.autoLockTime}
                  onChange={(value) => updateSetting('autoLockTime', parseInt(value))}
                  options={[
                    { value: 1, label: '1 minute' },
                    { value: 5, label: '5 minutes' },
                    { value: 15, label: '15 minutes' },
                    { value: 30, label: '30 minutes' }
                  ]}
                  label="Auto Lock Time"
                  description="Time before automatically locking the app"
                />
              </div>
            </div>

            <div className="glass-card p-6">
              <h4 className="text-md font-semibold text-white mb-4">Security Actions</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.button
                  className="p-4 rounded-lg bg-emerald-500/20 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Key className="w-5 h-5 text-emerald-400 mb-2" />
                  <div className="text-white font-medium">Change Password</div>
                </motion.button>
                
                <motion.button
                  className="p-4 rounded-lg bg-blue-500/20 border border-blue-500/30 hover:bg-blue-500/30 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Fingerprint className="w-5 h-5 text-blue-400 mb-2" />
                  <div className="text-white font-medium">Setup Biometrics</div>
                </motion.button>
                
                <motion.button
                  className="p-4 rounded-lg bg-purple-500/20 border border-purple-500/30 hover:bg-purple-500/30 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Activity className="w-5 h-5 text-purple-400 mb-2" />
                  <div className="text-white font-medium">Security Log</div>
                </motion.button>
              </div>
            </div>
          </div>
        );

      case 'emergency':
        return (
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
                Emergency Features
              </h3>
              
              <div className="space-y-4">
                <ToggleSwitch
                  enabled={settings.emergencyLocation}
                  onChange={() => updateSetting('emergencyLocation', !settings.emergencyLocation)}
                  label="Emergency Location Sharing"
                  description="Automatically share location during emergencies"
                />
                
                <ToggleSwitch
                  enabled={settings.autoSOS}
                  onChange={() => updateSetting('autoSOS', !settings.autoSOS)}
                  label="Auto SOS"
                  description="Automatically trigger SOS in extreme situations"
                />
                
                <ToggleSwitch
                  enabled={settings.emergencyContacts}
                  onChange={() => updateSetting('emergencyContacts', !settings.emergencyContacts)}
                  label="Emergency Contact Alerts"
                  description="Notify emergency contacts during incidents"
                />
                
                <ToggleSwitch
                  enabled={settings.medicalInfo}
                  onChange={() => updateSetting('medicalInfo', !settings.medicalInfo)}
                  label="Medical Information Sharing"
                  description="Share medical info with emergency responders"
                />
              </div>
            </div>

            <div className="glass-card p-6">
              <h4 className="text-md font-semibold text-white mb-4">Emergency Setup</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.button
                  className="p-4 rounded-lg bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Heart className="w-5 h-5 text-red-400 mb-2" />
                  <div className="text-white font-medium">Medical Information</div>
                  <div className="text-red-400 text-sm">Setup medical details</div>
                </motion.button>
                
                <motion.button
                  className="p-4 rounded-lg bg-orange-500/20 border border-orange-500/30 hover:bg-orange-500/30 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Zap className="w-5 h-5 text-orange-400 mb-2" />
                  <div className="text-white font-medium">Test Emergency</div>
                  <div className="text-orange-400 text-sm">Test emergency features</div>
                </motion.button>
              </div>
            </div>
          </div>
        );

      case 'accessibility':
        return (
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-pink-400" />
                Accessibility Options
              </h3>
              
              <div className="space-y-4">
                <ToggleSwitch
                  enabled={settings.reducedMotion}
                  onChange={() => updateSetting('reducedMotion', !settings.reducedMotion)}
                  label="Reduce Motion"
                  description="Minimize animations and transitions"
                />
                
                <ToggleSwitch
                  enabled={settings.highContrast}
                  onChange={() => updateSetting('highContrast', !settings.highContrast)}
                  label="High Contrast"
                  description="Increase color contrast for better visibility"
                />
                
                <SelectOption
                  value="medium"
                  onChange={() => {}}
                  options={[
                    { value: 'small', label: 'Small' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'large', label: 'Large' },
                    { value: 'extra-large', label: 'Extra Large' }
                  ]}
                  label="Text Size"
                  description="Adjust text size for better readability"
                />
              </div>
            </div>
          </div>
        );

      case 'data':
        return (
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Database className="w-5 h-5 mr-2 text-cyan-400" />
                Data & Storage
              </h3>
              
              <div className="space-y-4">
                <SelectOption
                  value={settings.dataUsage}
                  onChange={(value) => updateSetting('dataUsage', value)}
                  options={[
                    { value: 'minimal', label: 'Minimal Data Usage' },
                    { value: 'standard', label: 'Standard' },
                    { value: 'unlimited', label: 'Unlimited' }
                  ]}
                  label="Data Usage"
                  description="Control how much data the app uses"
                />
                
                <ToggleSwitch
                  enabled={settings.cachingEnabled}
                  onChange={() => updateSetting('cachingEnabled', !settings.cachingEnabled)}
                  label="Enable Caching"
                  description="Cache data to improve performance"
                />
              </div>
            </div>

            <div className="glass-card p-6">
              <h4 className="text-md font-semibold text-white mb-4">Storage Management</h4>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-slate-800/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white">App Data</span>
                    <span className="text-cyan-400">1.2 GB</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '60%' }} />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.button
                    className="p-4 rounded-lg bg-orange-500/20 border border-orange-500/30 hover:bg-orange-500/30 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <RefreshCw className="w-5 h-5 text-orange-400 mb-2" />
                    <div className="text-white font-medium">Clear Cache</div>
                    <div className="text-orange-400 text-sm">Free up space</div>
                  </motion.button>
                  
                  <motion.button
                    className="p-4 rounded-lg bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Trash2 className="w-5 h-5 text-red-400 mb-2" />
                    <div className="text-white font-medium">Clear All Data</div>
                    <div className="text-red-400 text-sm">Reset everything</div>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/3 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-emerald-500/3 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <motion.div 
        className="relative z-10 p-4 lg:p-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Enhanced Header */}
        <motion.header variants={itemVariants} className="mb-8">
          <div className="glass-card p-6 lg:p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10" />
            
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-6 lg:mb-0">
                <div className="flex items-center space-x-3 mb-4">
                  <motion.div 
                    className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <SettingsIcon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                      Settings
                    </h1>
                    <p className="text-slate-400 text-sm lg:text-base max-w-2xl mt-2">
                      Customize your Guardian Beacon experience and security preferences
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <motion.button
                  onClick={saveSettings}
                  disabled={isSaving}
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSaving ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </motion.button>
                
                <motion.button
                  onClick={resetSettings}
                  className="btn-ghost"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </motion.button>
              </div>
            </div>

            <div className="mt-4 text-xs text-slate-500">
              Last saved: {lastSaved.toLocaleString()}
            </div>
          </div>
        </motion.header>

        {/* Tab Navigation */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="glass-card p-2">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'hover:bg-slate-700/50 text-slate-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div variants={itemVariants}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}