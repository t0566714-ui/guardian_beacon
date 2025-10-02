import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  EyeOff, 
  Shield, 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  AlertCircle,
  CheckCircle,
  Smartphone,
  Fingerprint,
  Globe,
  Zap,
  Star,
  ChevronRight
} from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    rememberMe: false,
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [currentFeature, setCurrentFeature] = useState(0);

  // Background animation orbs
  const backgroundOrbs = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    delay: i * 0.5,
    duration: 3 + i * 0.5,
    size: 100 + i * 50,
    color: ['blue', 'purple', 'emerald', 'cyan', 'indigo', 'pink'][i]
  }));

  // Features showcase
  const features = [
    {
      icon: Shield,
      title: "Advanced Security",
      description: "Military-grade encryption and biometric authentication protect your safety data.",
      color: "blue"
    },
    {
      icon: Zap,
      title: "Instant Alerts",
      description: "Real-time emergency notifications reach your contacts in under 2 seconds.",
      color: "emerald"
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "24/7 monitoring and support available worldwide with offline capabilities.",
      color: "purple"
    },
    {
      icon: Smartphone,
      title: "Smart Integration",
      description: "Seamlessly connects with all your devices and wearables for comprehensive safety.",
      color: "cyan"
    }
  ];

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: isLogin ? -50 : 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: isLogin ? 50 : -50,
      transition: { duration: 0.3 }
    }
  };

  // Form handling
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Signup specific validations
    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = 'Please accept the terms and conditions';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(isLogin ? 'Login successful' : 'Registration successful', formData);
      // Handle successful login/registration here
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      rememberMe: false,
      acceptTerms: false
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {backgroundOrbs.map((orb) => (
          <motion.div
            key={orb.id}
            className={`absolute rounded-full bg-gradient-to-r from-${orb.color}-500/20 to-${orb.color}-600/20 blur-3xl`}
            style={{
              width: orb.size,
              height: orb.size,
            }}
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -100, 50, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              delay: orb.delay,
              ease: "easeInOut"
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 min-h-screen flex"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left side - Branding and features */}
        <motion.div 
          className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12 xl:p-16"
          variants={itemVariants}
        >
          {/* Logo and brand */}
          <motion.div 
            className="mb-12"
            variants={itemVariants}
          >
            <motion.div 
              className="flex items-center space-x-4 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative">
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Shield className="w-8 h-8 text-white" />
                </motion.div>
                <motion.div 
                  className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Guardian Beacon
                </h1>
                <p className="text-slate-400 text-lg">Your Digital Safety Net</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Feature showcase */}
          <motion.div 
            className="space-y-8"
            variants={itemVariants}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-start space-x-6">
                  <motion.div 
                    className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/20"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {React.createElement(features[currentFeature].icon, { 
                      className: "w-8 h-8 text-blue-400" 
                    })}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {features[currentFeature].title}
                    </h3>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      {features[currentFeature].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Feature indicators */}
            <div className="flex justify-center space-x-3">
              {features.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentFeature 
                      ? 'bg-blue-500 w-8' 
                      : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                  onClick={() => setCurrentFeature(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="mt-12 grid grid-cols-3 gap-6"
            variants={itemVariants}
          >
            {[
              { number: "1M+", label: "Users Protected" },
              { number: "99.9%", label: "Uptime" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right side - Login/Register form */}
        <motion.div 
          className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12"
          variants={itemVariants}
        >
          <motion.div 
            className="w-full max-w-md"
            layout
          >
            {/* Form container */}
            <motion.div 
              className="bg-gradient-to-br from-slate-900/90 via-slate-800/50 to-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 lg:p-10 shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Header */}
              <motion.div 
                className="text-center mb-8"
                variants={itemVariants}
              >
                <h2 className="text-3xl font-bold text-white mb-2">
                  {isLogin ? 'Welcome Back' : 'Join Guardian Beacon'}
                </h2>
                <p className="text-slate-400">
                  {isLogin 
                    ? 'Sign in to access your safety dashboard' 
                    : 'Create your account to get started'
                  }
                </p>
              </motion.div>

              {/* Form */}
              <AnimatePresence mode="wait">
                <motion.form
                  key={isLogin ? 'login' : 'register'}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {/* Name field for registration */}
                  {!isLogin && (
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-3 bg-slate-800/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                            errors.name 
                              ? 'border-red-500 focus:ring-red-500/50' 
                              : 'border-slate-600 focus:border-blue-500 focus:ring-blue-500/50'
                          }`}
                          placeholder="Enter your full name"
                        />
                      </div>
                      {errors.name && (
                        <motion.p 
                          className="mt-1 text-sm text-red-400 flex items-center"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.name}
                        </motion.p>
                      )}
                    </motion.div>
                  )}

                  {/* Email field */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-3 bg-slate-800/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                          errors.email 
                            ? 'border-red-500 focus:ring-red-500/50' 
                            : 'border-slate-600 focus:border-blue-500 focus:ring-blue-500/50'
                        }`}
                        placeholder="Enter your email"
                      />
                    </div>
                    {errors.email && (
                      <motion.p 
                        className="mt-1 text-sm text-red-400 flex items-center"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.email}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Password field */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-12 py-3 bg-slate-800/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                          errors.password 
                            ? 'border-red-500 focus:ring-red-500/50' 
                            : 'border-slate-600 focus:border-blue-500 focus:ring-blue-500/50'
                        }`}
                        placeholder="Enter your password"
                      />
                      <motion.button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </motion.button>
                    </div>
                    {errors.password && (
                      <motion.p 
                        className="mt-1 text-sm text-red-400 flex items-center"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.password}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Confirm password for registration */}
                  {!isLogin && (
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-12 py-3 bg-slate-800/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                            errors.confirmPassword 
                              ? 'border-red-500 focus:ring-red-500/50' 
                              : 'border-slate-600 focus:border-blue-500 focus:ring-blue-500/50'
                          }`}
                          placeholder="Confirm your password"
                        />
                        <motion.button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </motion.button>
                      </div>
                      {errors.confirmPassword && (
                        <motion.p 
                          className="mt-1 text-sm text-red-400 flex items-center"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.confirmPassword}
                        </motion.p>
                      )}
                    </motion.div>
                  )}

                  {/* Remember me / Accept terms */}
                  <motion.div variants={itemVariants}>
                    {isLogin ? (
                      <div className="flex items-center justify-between">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-500 bg-slate-800 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
                          />
                          <span className="ml-2 text-sm text-slate-300">Remember me</span>
                        </label>
                        <motion.button
                          type="button"
                          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                          whileHover={{ scale: 1.05 }}
                        >
                          Forgot password?
                        </motion.button>
                      </div>
                    ) : (
                      <div>
                        <label className="flex items-start">
                          <input
                            type="checkbox"
                            name="acceptTerms"
                            checked={formData.acceptTerms}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-500 bg-slate-800 border-slate-600 rounded focus:ring-blue-500 focus:ring-2 mt-0.5"
                          />
                          <span className="ml-2 text-sm text-slate-300">
                            I accept the{' '}
                            <motion.a 
                              href="#" 
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                              whileHover={{ scale: 1.05 }}
                            >
                              Terms of Service
                            </motion.a>
                            {' '}and{' '}
                            <motion.a 
                              href="#" 
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                              whileHover={{ scale: 1.05 }}
                            >
                              Privacy Policy
                            </motion.a>
                          </span>
                        </label>
                        {errors.acceptTerms && (
                          <motion.p 
                            className="mt-1 text-sm text-red-400 flex items-center"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.acceptTerms}
                          </motion.p>
                        )}
                      </div>
                    )}
                  </motion.div>

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    variants={itemVariants}
                  >
                    {isLoading ? (
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <>
                        <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              </AnimatePresence>

              {/* Divider */}
              <motion.div 
                className="my-8 flex items-center"
                variants={itemVariants}
              >
                <div className="flex-1 border-t border-slate-700"></div>
                <span className="px-4 text-slate-400 text-sm">or</span>
                <div className="flex-1 border-t border-slate-700"></div>
              </motion.div>

              {/* Social login buttons */}
              <motion.div 
                className="space-y-3"
                variants={itemVariants}
              >
                {[
                  { icon: Fingerprint, label: 'Continue with Biometrics', color: 'emerald' },
                  { icon: Smartphone, label: 'Continue with Phone', color: 'blue' }
                ].map((method, index) => (
                  <motion.button
                    key={index}
                    className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-slate-600 rounded-xl text-slate-300 hover:bg-slate-800/50 hover:border-blue-500/50 hover:text-blue-400 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {React.createElement(method.icon, { className: "w-5 h-5" })}
                    <span className="font-medium">{method.label}</span>
                  </motion.button>
                ))}
              </motion.div>

              {/* Toggle mode */}
              <motion.div 
                className="mt-8 text-center"
                variants={itemVariants}
              >
                <span className="text-slate-400">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                </span>
                <motion.button
                  onClick={toggleMode}
                  className="ml-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;