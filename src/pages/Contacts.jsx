import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Phone, 
  Mail, 
  MapPin, 
  Plus, 
  Search, 
  Filter, 
  Star, 
  Shield, 
  Clock, 
  Edit3, 
  Trash2, 
  AlertTriangle,
  Heart,
  User,
  Building,
  Zap,
  Eye,
  Settings,
  MessageSquare,
  Video,
  UserPlus
} from 'lucide-react';

export default function Contacts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedContact, setSelectedContact] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Emergency Contact',
      phone: '+1 (555) 0123',
      email: 'sarah.chen@email.com',
      location: 'New York, NY',
      category: 'emergency',
      priority: 1,
      verified: true,
      lastContact: '2 hours ago',
      avatar: '👩‍⚕️',
      relationship: 'Family Doctor',
      notes: 'Primary emergency contact, available 24/7'
    },
    {
      id: 2,
      name: 'Campus Security',
      role: 'Security Team',
      phone: '+1 (555) 0100',
      email: 'security@university.edu',
      location: 'Campus Security Office',
      category: 'security',
      priority: 1,
      verified: true,
      lastContact: '1 day ago',
      avatar: '👮‍♂️',
      relationship: 'Security Service',
      notes: 'Main campus security line, emergency response team'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'Trusted Friend',
      phone: '+1 (555) 0124',
      email: 'mike.j@email.com',
      location: 'Chicago, IL',
      category: 'friend',
      priority: 2,
      verified: true,
      lastContact: '3 days ago',
      avatar: '👨‍💼',
      relationship: 'Close Friend',
      notes: 'Available for non-emergency support, lives nearby'
    },
    {
      id: 4,
      name: 'Dr. Alex Rivera',
      role: 'Medical Professional',
      phone: '+1 (555) 0125',
      email: 'rivera@healthcenter.com',
      location: 'University Health Center',
      category: 'medical',
      priority: 1,
      verified: true,
      lastContact: '1 week ago',
      avatar: '👨‍⚕️',
      relationship: 'University Doctor',
      notes: 'On-campus medical support, handles health emergencies'
    },
    {
      id: 5,
      name: 'Emma Wilson',
      role: 'Family Member',
      phone: '+1 (555) 0126',
      email: 'emma.wilson@email.com',
      location: 'Boston, MA',
      category: 'family',
      priority: 1,
      verified: true,
      lastContact: '12 hours ago',
      avatar: '👩‍🦰',
      relationship: 'Sister',
      notes: 'Primary family contact, emergency decision maker'
    }
  ]);

  const categories = [
    { id: 'all', name: 'All Contacts', count: contacts.length, color: 'blue' },
    { id: 'emergency', name: 'Emergency', count: contacts.filter(c => c.category === 'emergency').length, color: 'red' },
    { id: 'family', name: 'Family', count: contacts.filter(c => c.category === 'family').length, color: 'purple' },
    { id: 'security', name: 'Security', count: contacts.filter(c => c.category === 'security').length, color: 'emerald' },
    { id: 'medical', name: 'Medical', count: contacts.filter(c => c.category === 'medical').length, color: 'cyan' },
    { id: 'friend', name: 'Friends', count: contacts.filter(c => c.category === 'friend').length, color: 'yellow' }
  ];

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || contact.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const priorityContacts = contacts.filter(c => c.priority === 1);

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
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10" />
            
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-6 lg:mb-0">
                <div className="flex items-center space-x-3 mb-4">
                  <motion.div 
                    className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Users className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <motion.div 
                        className="flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                        <span className="text-blue-400 text-sm font-medium">Network Active</span>
                      </motion.div>
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                      Emergency Contacts
                    </h1>
                    <p className="text-slate-400 text-sm lg:text-base max-w-2xl mt-2">
                      Manage your trusted network for safety and emergency situations
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <motion.div 
                  className="glass-card p-4 text-center"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-2xl font-bold text-blue-400">{contacts.length}</div>
                  <div className="text-slate-400 text-sm">Total Contacts</div>
                </motion.div>
                
                <motion.div 
                  className="glass-card p-4 text-center"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-2xl font-bold text-emerald-400">{priorityContacts.length}</div>
                  <div className="text-slate-400 text-sm">Priority</div>
                </motion.div>
                
                <motion.div 
                  className="glass-card p-4 text-center lg:block hidden"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-2xl font-bold text-purple-400">{contacts.filter(c => c.verified).length}</div>
                  <div className="text-slate-400 text-sm">Verified</div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Search and Controls */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="glass-card p-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search contacts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                  />
                </div>
                
                <motion.button
                  className="btn-ghost"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </motion.button>
              </div>

              <motion.button
                onClick={() => setShowAddModal(true)}
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Contact
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'glass-card hover:bg-slate-700/50 text-slate-300'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{category.name}</span>
                <span className="ml-2 text-xs opacity-75">({category.count})</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Priority Contacts Section */}
        {selectedCategory === 'all' && (
          <motion.div variants={itemVariants} className="mb-8">
            <div className="glass-card p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 rounded-lg bg-red-500/20 border border-red-500/30">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Priority Emergency Contacts</h2>
                  <p className="text-slate-400 text-sm">Quick access to your most important contacts</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {priorityContacts.slice(0, 3).map((contact, index) => (
                  <motion.div
                    key={contact.id}
                    className="p-4 rounded-lg bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 hover:border-red-500/40 transition-all duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="text-2xl">{contact.avatar}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{contact.name}</h3>
                        <p className="text-red-400 text-sm">{contact.role}</p>
                      </div>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                    </div>
                    
                    <div className="flex space-x-2">
                      <motion.button 
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Phone className="w-3 h-3 mr-1 inline" />
                        Call
                      </motion.button>
                      <motion.button 
                        className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <MessageSquare className="w-3 h-3 mr-1 inline" />
                        Text
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Contacts Grid */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredContacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                className="glass-card p-6 hover:bg-slate-800/40 transition-all duration-300 cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => setSelectedContact(contact)}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <div className="text-3xl">{contact.avatar}</div>
                    {contact.verified && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                        <Shield className="w-2 h-2 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                      {contact.name}
                    </h3>
                    <p className="text-slate-400 text-sm">{contact.role}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span className="text-xs text-slate-500">{contact.lastContact}</span>
                    </div>
                  </div>
                  {contact.priority === 1 && (
                    <div className="p-1 rounded-full bg-red-500/20">
                      <Star className="w-3 h-3 text-red-400 fill-current" />
                    </div>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="w-4 h-4 text-blue-400" />
                    <span className="text-slate-300">{contact.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="w-4 h-4 text-emerald-400" />
                    <span className="text-slate-300 truncate">{contact.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-purple-400" />
                    <span className="text-slate-300 truncate">{contact.location}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <motion.button 
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Phone className="w-3 h-3 mr-1 inline" />
                    Call
                  </motion.button>
                  <motion.button 
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MessageSquare className="w-3 h-3 mr-1 inline" />
                    Message
                  </motion.button>
                  <motion.button 
                    className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Edit3 className="w-3 h-3" />
                  </motion.button>
                </div>

                {/* Category Badge */}
                <div className="mt-3 flex justify-between items-center">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    contact.category === 'emergency' ? 'bg-red-500/20 text-red-400' :
                    contact.category === 'family' ? 'bg-purple-500/20 text-purple-400' :
                    contact.category === 'security' ? 'bg-emerald-500/20 text-emerald-400' :
                    contact.category === 'medical' ? 'bg-cyan-500/20 text-cyan-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {contact.relationship}
                  </span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-xs text-emerald-400">Online</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredContacts.length === 0 && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-white mb-2">No contacts found</h3>
              <p className="text-slate-400 mb-6">Try adjusting your search or add a new contact</p>
              <motion.button
                onClick={() => setShowAddModal(true)}
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Contact
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}