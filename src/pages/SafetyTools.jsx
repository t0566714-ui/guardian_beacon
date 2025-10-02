import React from "react";
import { motion } from "framer-motion";
import { CheckIn, SafeWalk } from "../entities/all.js";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";
import { Clock, Navigation2, Timer, Eye, EyeOff, Shield, MapPin, AlertTriangle, Volume2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/form.jsx";

import CheckInManager from "../components/tools/CheckInManager.jsx";

export default function SafetyToolsPage() {
  const [preferences, setPreferences] = React.useState({ language: 'en' });
  const [checkIns, setCheckIns] = React.useState([]);
  const [safeWalks, setSafeWalks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    try {
      const prefs = localStorage.getItem('safetyCompanionPrefs');
      if (prefs) {
        setPreferences(JSON.parse(prefs));
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    }

    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [checkInData, walkData] = await Promise.all([
        CheckIn.filter({ status: 'active' }),
        SafeWalk.filter({ status: 'active' })
      ]);
      setCheckIns(checkInData);
      setSafeWalks(walkData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const lang = preferences.language;

  const texts = {
    en: {
      title: 'Safety Tools',
      subtitle: 'Proactive safety features',
      checkIn: 'Check-In Timer',
      safeWalk: 'Safe Walk',
      discreet: 'Discreet Mode'
    },
    hi: {
      title: 'सुरक्षा उपकरण',
      subtitle: 'सक्रिय सुरक्षा सुविधाएं',
      checkIn: 'चेक-इन टाइमर',
      safeWalk: 'सुरक्षित पैदल',
      discreet: 'विवेकपूर्ण मोड'
    }
  };

  const t = texts[lang];

  if (loading) {
    return (
      <motion.div 
        className="min-h-screen flex items-center justify-center" 
        style={{ backgroundColor: 'var(--bg-primary)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div 
          className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 360]
          }}
          transition={{ 
            scale: { duration: 2, repeat: Infinity },
            rotate: { duration: 3, repeat: Infinity, ease: "linear" }
          }}
        >
          <Shield className="w-8 h-8" style={{ color: 'var(--accent-purple)' }} />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen p-4 md:p-8 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, var(--accent-purple), transparent)' }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-48 h-48 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, var(--primary-blue), transparent)' }}
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.h1 
            className="text-4xl font-bold mb-4"
            style={{ 
              background: 'linear-gradient(135deg, var(--primary-blue), var(--accent-purple))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            animate={{
              textShadow: [
                '0 0 20px rgba(147, 51, 234, 0.5)',
                '0 0 30px rgba(59, 130, 246, 0.5)',
                '0 0 20px rgba(147, 51, 234, 0.5)',
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {t.title}
          </motion.h1>
          <motion.p 
            className="text-lg"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {t.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs defaultValue="checkin" className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <TabsList 
                className="grid w-full grid-cols-3 glass-card p-2 rounded-2xl mb-8"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                }}
              >
                <TabsTrigger 
                  value="checkin" 
                  className="data-[state=active]:glass-button rounded-xl transition-all duration-300 flex items-center gap-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Clock className="w-4 h-4" />
                  </motion.div>
                  {t.checkIn}
                </TabsTrigger>
                <TabsTrigger 
                  value="safewalk" 
                  className="data-[state=active]:glass-button rounded-xl transition-all duration-300 flex items-center gap-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <motion.div
                    animate={{ 
                      y: [0, -3, 0],
                      rotate: [0, 5, 0, -5, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Navigation2 className="w-4 h-4" />
                  </motion.div>
                  {t.safeWalk}
                </TabsTrigger>
                <TabsTrigger 
                  value="discreet" 
                  className="data-[state=active]:glass-button rounded-xl transition-all duration-300 flex items-center gap-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.5, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <EyeOff className="w-4 h-4" />
                  </motion.div>
                  {t.discreet}
                </TabsTrigger>
              </TabsList>
            </motion.div>

            <TabsContent value="checkin">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <CheckInManager 
                  checkIns={checkIns}
                  onUpdate={loadData}
                  language={lang}
                />
              </motion.div>
            </TabsContent>

            <TabsContent value="safewalk">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-6"
              >
                {/* Safe Walk Main Panel */}
                <div className="glass-card p-8 rounded-2xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.1))',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        boxShadow: '0 0 20px rgba(34, 197, 94, 0.4)',
                      }}
                      animate={{ 
                        boxShadow: [
                          '0 0 20px rgba(34, 197, 94, 0.4)',
                          '0 0 30px rgba(34, 197, 94, 0.6)',
                          '0 0 20px rgba(34, 197, 94, 0.4)',
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Navigation2 className="w-8 h-8" style={{ color: 'var(--success-green)' }} />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                        Safe Walk Escort
                      </h3>
                      <p style={{ color: 'var(--text-secondary)' }}>
                        Request trusted escorts and track your journey safely
                      </p>
                    </div>
                  </div>

                  {/* Escort Request */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                        Request Escort
                      </h4>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                            Pickup Location
                          </label>
                          <input 
                            type="text" 
                            placeholder="Enter your current location"
                            className="w-full p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/50"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                            Destination
                          </label>
                          <input 
                            type="text" 
                            placeholder="Where do you want to go?"
                            className="w-full p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/50"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                            When do you need escort?
                          </label>
                          <select className="w-full p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white focus:outline-none focus:border-emerald-500/50">
                            <option>Now (ASAP)</option>
                            <option>In 15 minutes</option>
                            <option>In 30 minutes</option>
                            <option>In 1 hour</option>
                            <option>Schedule for later</option>
                          </select>
                        </div>
                      </div>
                      
                      <motion.button
                        className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white py-3 px-6 rounded-lg font-medium hover:from-emerald-600 hover:to-green-600 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Request Safe Walk Escort
                      </motion.button>
                    </div>

                    {/* Available Escorts */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                        Available Escorts
                      </h4>
                      
                      <div className="space-y-3">
                        {[
                          { name: 'Sarah Chen', role: 'Campus Security', distance: '2 min away', rating: 4.9, avatar: '👮‍♀️' },
                          { name: 'Mike Johnson', role: 'Student Escort', distance: '5 min away', rating: 4.8, avatar: '👨‍🚒' },
                          { name: 'Alex Rivera', role: 'Safety Volunteer', distance: '8 min away', rating: 4.7, avatar: '👨‍⚕️' }
                        ].map((escort, index) => (
                          <motion.div
                            key={escort.name}
                            className="p-4 rounded-lg bg-slate-800/30 hover:bg-slate-700/30 transition-colors border border-slate-700/30"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="text-2xl">{escort.avatar}</div>
                                <div>
                                  <div className="text-white font-medium">{escort.name}</div>
                                  <div className="text-emerald-400 text-sm">{escort.role}</div>
                                  <div className="text-slate-400 text-xs">{escort.distance}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-yellow-400 text-sm">⭐ {escort.rating}</div>
                                <motion.button 
                                  className="text-xs bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full hover:bg-emerald-500/30 mt-1"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  Select
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Safety Features */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="w-5 h-5 text-emerald-400" />
                        <span className="text-white font-medium">Live Tracking</span>
                      </div>
                      <p className="text-slate-400 text-sm">
                        Real-time location sharing with trusted contacts during escort
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="w-5 h-5 text-blue-400" />
                        <span className="text-white font-medium">Verified Escorts</span>
                      </div>
                      <p className="text-slate-400 text-sm">
                        All escorts are background-checked and trained professionals
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-purple-400" />
                        <span className="text-white font-medium">Emergency Ready</span>
                      </div>
                      <p className="text-slate-400 text-sm">
                        Instant emergency alerts available throughout the journey
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recent Safe Walks */}
                <div className="glass-card p-6 rounded-2xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                    Recent Safe Walks
                  </h4>
                  
                  <div className="space-y-3">
                    {[
                      { from: 'Library', to: 'Student Housing', date: 'Oct 1, 2025', escort: 'Sarah Chen', rating: 5 },
                      { from: 'North Campus', to: 'Main Building', date: 'Sep 30, 2025', escort: 'Mike Johnson', rating: 5 },
                      { from: 'Parking Lot C', to: 'Dormitory', date: 'Sep 29, 2025', escort: 'Alex Rivera', rating: 4 }
                    ].map((walk, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                        <div>
                          <div className="text-white font-medium">{walk.from} → {walk.to}</div>
                          <div className="text-slate-400 text-sm">{walk.date} • Escort: {walk.escort}</div>
                        </div>
                        <div className="text-yellow-400">
                          {'⭐'.repeat(walk.rating)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="discreet">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-6"
              >
                {/* Discreet Mode Main Panel */}
                <div className="glass-card p-8 rounded-2xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.1))',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                        boxShadow: '0 0 20px rgba(245, 158, 11, 0.4)',
                      }}
                      animate={{ 
                        scale: [1, 1.1, 1],
                        boxShadow: [
                          '0 0 20px rgba(245, 158, 11, 0.4)',
                          '0 0 30px rgba(245, 158, 11, 0.6)',
                          '0 0 20px rgba(245, 158, 11, 0.4)',
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <motion.div
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <EyeOff className="w-8 h-8" style={{ color: 'var(--warning-yellow)' }} />
                      </motion.div>
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                        Discreet Mode
                      </h3>
                      <p style={{ color: 'var(--text-secondary)' }}>
                        Enhanced privacy protection when you need to stay low-profile
                      </p>
                    </div>
                  </div>

                  {/* Privacy Controls */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                        Privacy Settings
                      </h4>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors">
                          <div className="flex items-center space-x-3">
                            <EyeOff className="w-5 h-5 text-amber-400" />
                            <div>
                              <div className="text-white font-medium">Hide Location</div>
                              <div className="text-slate-400 text-xs">Conceal your position from others</div>
                            </div>
                          </div>
                          <motion.button
                            className="w-12 h-6 bg-amber-500 rounded-full p-1 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                          >
                            <div className="w-4 h-4 bg-white rounded-full shadow-md transform translate-x-6 transition-transform" />
                          </motion.button>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors">
                          <div className="flex items-center space-x-3">
                            <Volume2 className="w-5 h-5 text-amber-400" />
                            <div>
                              <div className="text-white font-medium">Silent Alerts</div>
                              <div className="text-slate-400 text-xs">Send notifications without sound</div>
                            </div>
                          </div>
                          <motion.button
                            className="w-12 h-6 bg-amber-500 rounded-full p-1 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                          >
                            <div className="w-4 h-4 bg-white rounded-full shadow-md transform translate-x-6 transition-transform" />
                          </motion.button>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors">
                          <div className="flex items-center space-x-3">
                            <Eye className="w-5 h-5 text-amber-400" />
                            <div>
                              <div className="text-white font-medium">Stealth Sharing</div>
                              <div className="text-slate-400 text-xs">Share location privately with trusted contacts only</div>
                            </div>
                          </div>
                          <motion.button
                            className="w-12 h-6 bg-slate-600 rounded-full p-1 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                          >
                            <div className="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform" />
                          </motion.button>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors">
                          <div className="flex items-center space-x-3">
                            <Shield className="w-5 h-5 text-amber-400" />
                            <div>
                              <div className="text-white font-medium">Anonymous Mode</div>
                              <div className="text-slate-400 text-xs">Hide your identity in group features</div>
                            </div>
                          </div>
                          <motion.button
                            className="w-12 h-6 bg-slate-600 rounded-full p-1 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                          >
                            <div className="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform" />
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Emergency Features in Discreet Mode */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                        Discreet Emergency Features
                      </h4>
                      
                      <div className="space-y-3">
                        <div className="p-4 rounded-lg bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20">
                          <div className="flex items-center space-x-3 mb-2">
                            <AlertTriangle className="w-5 h-5 text-red-400" />
                            <span className="text-white font-medium">Silent SOS</span>
                          </div>
                          <p className="text-slate-400 text-sm mb-3">
                            Send emergency alerts without drawing attention
                          </p>
                          <motion.button 
                            className="bg-red-500/20 text-red-300 px-4 py-2 rounded-lg text-sm hover:bg-red-500/30 transition-colors"
                            whileHover={{ scale: 1.05 }}
                          >
                            Configure Silent SOS
                          </motion.button>
                        </div>

                        <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/20">
                          <div className="flex items-center space-x-3 mb-2">
                            <Timer className="w-5 h-5 text-purple-400" />
                            <span className="text-white font-medium">Stealth Check-in</span>
                          </div>
                          <p className="text-slate-400 text-sm mb-3">
                            Automatic check-ins without notifications to others
                          </p>
                          <motion.button 
                            className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-lg text-sm hover:bg-purple-500/30 transition-colors"
                            whileHover={{ scale: 1.05 }}
                          >
                            Setup Stealth Timer
                          </motion.button>
                        </div>

                        <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                          <div className="flex items-center space-x-3 mb-2">
                            <Navigation2 className="w-5 h-5 text-blue-400" />
                            <span className="text-white font-medium">Hidden Route Sharing</span>
                          </div>
                          <p className="text-slate-400 text-sm mb-3">
                            Share your route with emergency contacts only
                          </p>
                          <motion.button 
                            className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-lg text-sm hover:bg-blue-500/30 transition-colors"
                            whileHover={{ scale: 1.05 }}
                          >
                            Manage Hidden Sharing
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions for Discreet Mode */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: 'Enable All Privacy', icon: EyeOff, color: 'from-amber-500 to-yellow-500' },
                      { name: 'Silent Emergency', icon: AlertTriangle, color: 'from-red-500 to-orange-500' },
                      { name: 'Hide from Map', icon: MapPin, color: 'from-purple-500 to-violet-500' },
                      { name: 'Anonymous Mode', icon: Shield, color: 'from-blue-500 to-cyan-500' }
                    ].map((action, index) => (
                      <motion.button
                        key={action.name}
                        className={`p-4 rounded-lg bg-gradient-to-br ${action.color} hover:shadow-lg transition-all duration-300 group`}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex flex-col items-center text-center space-y-2">
                          <action.icon className="w-6 h-6 text-white" />
                          <span className="text-white font-medium text-sm">{action.name}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  );
}