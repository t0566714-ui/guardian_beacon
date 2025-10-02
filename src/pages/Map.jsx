import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Layers, 
  MapPin, 
  AlertTriangle, 
  Shield, 
  Navigation2, 
  Wifi, 
  Info,
  Search,
  Filter,
  Target,
  Satellite,
  Users,
  Clock,
  Activity,
  ToggleLeft,
  ToggleRight,
  Compass,
  Zap,
  Eye,
  EyeOff,
  Settings,
  RefreshCw,
  Phone,
  MessageSquare,
  Share,
  Plus,
  Minus,
  LocateFixed,
  Navigation,
  Camera,
  Volume2,
  Home,
  Car,
  Briefcase,
  Coffee,
  School,
  Heart,
  ShoppingBag,
  Train,
  Plane
} from "lucide-react";

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons for different marker types
const createIcon = (color, iconType = 'circle') => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div class="marker-pin" style="background-color: ${color}; border: 3px solid white; border-radius: 50%; width: 24px; height: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.3); position: relative;">
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 8px; height: 8px; background: white; border-radius: 50%;"></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

const safeZoneIcon = createIcon('#10B981');
const guardianIcon = createIcon('#3B82F6');
const alertIcon = createIcon('#EF4444');
const userIcon = createIcon('#8B5CF6');

// Sample data for live map features
const safeZones = [
  {
    id: 1,
    name: "University Commons",
    position: [40.7589, -73.9851],
    radius: 200,
    status: "active",
    type: "campus",
    description: "Main campus area with 24/7 security",
    securityLevel: "high",
    lastUpdate: "2 min ago",
    activePeople: 45,
    facilities: ["Security Office", "Emergency Phones", "CCTV"]
  },
  {
    id: 2,
    name: "Student Housing",
    position: [40.7614, -73.9776],
    radius: 150,
    status: "active",
    type: "residential",
    description: "Secured residential area",
    securityLevel: "high",
    lastUpdate: "5 min ago",
    activePeople: 23,
    facilities: ["Card Access", "Night Patrol", "Emergency Stations"]
  },
  {
    id: 3,
    name: "Library District",
    position: [40.7505, -73.9934],
    radius: 100,
    status: "monitoring",
    type: "academic",
    description: "Academic zone with extended hours",
    securityLevel: "medium",
    lastUpdate: "8 min ago",
    activePeople: 67,
    facilities: ["Study Areas", "Security Desk", "Emergency Phones"]
  }
];

const guardians = [
  {
    id: 1,
    name: "Sarah Chen",
    position: [40.7580, -73.9845],
    status: "active",
    role: "Campus Security",
    lastSeen: "1 min ago",
    avatar: "👮‍♀️",
    contact: "+1-555-0123",
    zone: "University Commons"
  },
  {
    id: 2,
    name: "Mike Johnson",
    position: [40.7610, -73.9780],
    status: "active",
    role: "Safe Walk Escort",
    lastSeen: "3 min ago",
    avatar: "👨‍🚒",
    contact: "+1-555-0124",
    zone: "Student Housing"
  },
  {
    id: 3,
    name: "Alex Rivera",
    position: [40.7520, -73.9920],
    status: "break",
    role: "Emergency Response",
    lastSeen: "12 min ago",
    avatar: "👨‍⚕️",
    contact: "+1-555-0125",
    zone: "Library District"
  }
];

const alerts = [
  {
    id: 1,
    position: [40.7600, -73.9800],
    type: "incident",
    severity: "medium",
    title: "Suspicious Activity Reported",
    description: "Unidentified person near building entrance",
    time: "5 min ago",
    status: "investigating",
    reportedBy: "Student"
  },
  {
    id: 2,
    position: [40.7550, -73.9900],
    type: "maintenance",
    severity: "low",
    title: "Poor Lighting",
    description: "Street light out on main walkway",
    time: "2 hours ago",
    status: "scheduled",
    reportedBy: "Security Patrol"
  }
];

const userLocation = [40.7589, -73.9851];

const quickActions = [
  {
    id: 'emergency-call',
    title: 'Emergency Call',
    icon: Phone,
    color: 'from-red-500 to-red-600',
    description: 'Direct line to emergency services',
    action: () => console.log('Emergency call initiated')
  },
  {
    id: 'request-escort',
    title: 'Request Escort',
    icon: Users,
    color: 'from-blue-500 to-blue-600',
    description: 'Get a safe walk companion',
    action: () => console.log('Escort requested')
  },
  {
    id: 'share-location',
    title: 'Share Location',
    icon: Share,
    color: 'from-purple-500 to-purple-600',
    description: 'Send location to contacts',
    action: () => console.log('Location shared')
  },
  {
    id: 'report-incident',
    title: 'Report Incident',
    icon: AlertTriangle,
    color: 'from-orange-500 to-orange-600',
    description: 'Report safety concerns',
    action: () => console.log('Incident reported')
  }
];

const legendItems = [
  {
    label: "Safe Zones",
    description: "Secured areas with active monitoring",
    color: "from-emerald-500 to-green-600",
    textColor: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    icon: Shield,
    count: safeZones.length
  },
  {
    label: "Guardians",
    description: "Security personnel and escorts",
    color: "from-blue-500 to-cyan-600",
    textColor: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    icon: MapPin,
    count: guardians.filter(g => g.status === 'active').length
  },
  {
    label: "Active Alerts",
    description: "Current incidents and reports",
    color: "from-red-500 to-orange-600",
    textColor: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    icon: AlertTriangle,
    count: alerts.filter(a => a.status !== 'resolved').length
  },
  {
    label: "Your Location",
    description: "Current position tracking",
    color: "from-purple-500 to-violet-600",
    textColor: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    icon: Navigation2,
    count: 1
  }
];

const layers = [
  { 
    name: "Safe Zones", 
    status: "Active", 
    count: safeZones.length, 
    active: true,
    color: "text-emerald-400",
    description: "Protected areas with security"
  },
  { 
    name: "Guardian Network", 
    status: "Live", 
    count: guardians.length, 
    active: true,
    color: "text-blue-400",
    description: "Security personnel locations"
  },
  { 
    name: "Incident Reports", 
    status: "Monitoring", 
    count: alerts.length, 
    active: true,
    color: "text-orange-400",
    description: "Active incidents and alerts"
  },
  { 
    name: "Emergency Services", 
    status: "Ready", 
    count: 4, 
    active: false,
    color: "text-purple-400",
    description: "Emergency response units"
  },
  { 
    name: "Safe Routes", 
    status: "Updated", 
    count: 12, 
    active: false,
    color: "text-cyan-400",
    description: "Recommended pathways"
  },
  { 
    name: "Points of Interest", 
    status: "Available", 
    count: 28, 
    active: false,
    color: "text-yellow-400",
    description: "Important locations and services"
  }
];

// Map event handlers and components
const MapEventHandler = ({ onLocationFound, onMapClick }) => {
  const map = useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
    locationfound(e) {
      onLocationFound(e.latlng);
      map.flyTo(e.latlng, 16);
    },
  });

  return null;
};

const LocationTracker = ({ userPosition, trackingEnabled }) => {
  const map = useMap();
  
  useEffect(() => {
    if (trackingEnabled && userPosition) {
      map.flyTo(userPosition, 16);
    }
  }, [map, userPosition, trackingEnabled]);

  return null;
};

export default function Map() {
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedGuardian, setSelectedGuardian] = useState(null);
  const [activeView, setActiveView] = useState('satellite');
  const [searchQuery, setSearchQuery] = useState('');
  const [layerStates, setLayerStates] = useState(
    layers.reduce((acc, layer) => ({ ...acc, [layer.name]: layer.active }), {})
  );
  const [userPosition, setUserPosition] = useState(userLocation);
  const [trackingEnabled, setTrackingEnabled] = useState(false);
  const [mapCenter, setMapCenter] = useState(userLocation);
  const [mapZoom, setMapZoom] = useState(14);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [routeMode, setRouteMode] = useState(false);
  const [selectedPOI, setSelectedPOI] = useState(null);

  const mapRef = useRef();

  const toggleLayer = (layerName) => {
    setLayerStates(prev => ({ ...prev, [layerName]: !prev[layerName] }));
  };

  const handleLocationFound = (latlng) => {
    setUserPosition([latlng.lat, latlng.lng]);
  };

  const handleMapClick = (latlng) => {
    if (routeMode) {
      console.log('Route to:', latlng);
      setRouteMode(false);
    }
  };

  const requestLocation = () => {
    setTrackingEnabled(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
          setMapCenter([latitude, longitude]);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const getTileLayerUrl = () => {
    switch (activeView) {
      case 'satellite':
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      case 'terrain':
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
      default:
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-500/3 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500/3 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <motion.div 
        className="relative z-10 p-4 lg:p-8 max-w-7xl mx-auto main-content__canvas"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Enhanced Header */}
        <motion.header variants={itemVariants} className="mb-8">
          <div className="glass-card p-6 lg:p-8 relative overflow-hidden">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-emerald-500/10" />
            
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-6 lg:mb-0">
                <div className="flex items-center space-x-3 mb-4">
                  <motion.div 
                    className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Compass className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <motion.div 
                        className="flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                        <span className="text-blue-400 text-sm font-medium">Live Tracking</span>
                      </motion.div>
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-emerald-200 bg-clip-text text-transparent">
                      Safety Map
                    </h1>
                    <p className="text-slate-400 text-sm lg:text-base max-w-2xl mt-2">
                      Real-time safety monitoring with trusted escorts, live alerts, and secure pathways
                    </p>
                  </div>
                </div>
              </div>

              {/* Status indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <motion.div 
                  className="glass-card p-3 flex items-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                >
                  <Navigation2 className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="text-white text-sm font-medium">GPS Stable</div>
                    <div className="text-slate-400 text-xs">±2m accuracy</div>
                  </div>
                </motion.div>

                <motion.div 
                  className="glass-card p-3 flex items-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                >
                  <Wifi className="w-4 h-4 text-blue-400" />
                  <div>
                    <div className="text-white text-sm font-medium">Network</div>
                    <div className="text-slate-400 text-xs">42ms latency</div>
                  </div>
                </motion.div>

                <motion.div 
                  className="glass-card p-3 flex items-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                >
                  <Layers className="w-4 h-4 text-purple-400" />
                  <div>
                    <div className="text-white text-sm font-medium">Layers</div>
                    <div className="text-slate-400 text-xs">{Object.values(layerStates).filter(Boolean).length} active</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Enhanced Map Controls */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="glass-card p-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search and filters */}
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search locations, guardians, or alerts..."
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
                  Filters
                </motion.button>

                <motion.button
                  onClick={() => setRouteMode(!routeMode)}
                  className={`btn-ghost ${routeMode ? 'bg-blue-500/20 text-blue-400' : ''}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Route
                </motion.button>
              </div>

              {/* View toggle and quick actions */}
              <div className="flex items-center space-x-4">
                <motion.button
                  onClick={() => setShowQuickActions(!showQuickActions)}
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Quick Actions
                </motion.button>

                <div className="flex items-center space-x-2">
                  <span className="text-slate-400 text-sm">View:</span>
                  <div className="flex bg-slate-800/50 rounded-lg p-1">
                    {['satellite', 'terrain', 'street'].map((view) => (
                      <motion.button
                        key={view}
                        onClick={() => setActiveView(view)}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                          activeView === view 
                            ? 'bg-blue-500 text-white' 
                            : 'text-slate-400 hover:text-white'
                        }`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {view.charAt(0).toUpperCase() + view.slice(1)}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions Panel */}
        <AnimatePresence>
          {showQuickActions && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              <div className="glass-card p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={action.id}
                      onClick={action.action}
                      className="p-4 rounded-lg bg-gradient-to-br hover:from-slate-800/50 hover:to-slate-700/50 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${action.color}`}>
                          <action.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-center">
                          <div className="text-white font-medium text-sm">{action.title}</div>
                          <div className="text-slate-400 text-xs">{action.description}</div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Live Map Section */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          
          {/* Interactive Leaflet Map */}
          <motion.div 
            variants={itemVariants}
            className="xl:col-span-3"
          >
            <div className="glass-card p-4 h-[700px] relative overflow-hidden">
              <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                className="h-full w-full rounded-lg"
                ref={mapRef}
              >
                <TileLayer
                  url={getTileLayerUrl()}
                  attribution='&copy; OpenStreetMap contributors'
                />
                
                <MapEventHandler 
                  onLocationFound={handleLocationFound}
                  onMapClick={handleMapClick}
                />
                
                <LocationTracker 
                  userPosition={userPosition}
                  trackingEnabled={trackingEnabled}
                />

                {/* User Location Marker */}
                {layerStates["Safe Zones"] && userPosition && (
                  <Marker position={userPosition} icon={userIcon}>
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-semibold text-purple-600">Your Location</h3>
                        <p className="text-sm text-gray-600">Current position</p>
                        <div className="mt-2 text-xs text-gray-500">
                          📍 {userPosition[0].toFixed(4)}°, {userPosition[1].toFixed(4)}°
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                )}

                {/* Safe Zone Circles and Markers */}
                {layerStates["Safe Zones"] && safeZones.map((zone) => (
                  <React.Fragment key={`zone-${zone.id}`}>
                    <Circle
                      center={zone.position}
                      radius={zone.radius}
                      fillColor="#10B981"
                      fillOpacity={0.1}
                      color="#10B981"
                      weight={2}
                      opacity={0.6}
                    />
                    <Marker position={zone.position} icon={safeZoneIcon}>
                      <Popup>
                        <div className="p-3 min-w-[250px]">
                          <div className="flex items-center space-x-2 mb-2">
                            <Shield className="w-4 h-4 text-emerald-600" />
                            <h3 className="font-semibold text-emerald-600">{zone.name}</h3>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{zone.description}</p>
                          <div className="space-y-1 text-xs text-gray-500">
                            <div>🔒 Security Level: <span className="font-medium">{zone.securityLevel}</span></div>
                            <div>👥 Active People: <span className="font-medium">{zone.activePeople}</span></div>
                            <div>🕐 Last Update: <span className="font-medium">{zone.lastUpdate}</span></div>
                          </div>
                          <div className="mt-2 pt-2 border-t border-gray-200">
                            <div className="text-xs text-gray-500 font-medium">Facilities:</div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {zone.facilities.map((facility, idx) => (
                                <span key={idx} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                                  {facility}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  </React.Fragment>
                ))}

                {/* Guardian Markers */}
                {layerStates["Guardian Network"] && guardians.map((guardian) => (
                  <Marker key={`guardian-${guardian.id}`} position={guardian.position} icon={guardianIcon}>
                    <Popup>
                      <div className="p-3 min-w-[200px]">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="text-lg">{guardian.avatar}</div>
                          <div>
                            <h3 className="font-semibold text-blue-600">{guardian.name}</h3>
                            <p className="text-sm text-gray-600">{guardian.role}</p>
                          </div>
                        </div>
                        <div className="space-y-1 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <div className={`w-2 h-2 rounded-full ${
                              guardian.status === 'active' ? 'bg-green-500' : 
                              guardian.status === 'break' ? 'bg-yellow-500' : 'bg-gray-500'
                            }`} />
                            <span className="capitalize font-medium">{guardian.status}</span>
                          </div>
                          <div>📍 Zone: <span className="font-medium">{guardian.zone}</span></div>
                          <div>🕐 Last Seen: <span className="font-medium">{guardian.lastSeen}</span></div>
                          <div>📞 Contact: <span className="font-medium">{guardian.contact}</span></div>
                        </div>
                        <div className="mt-3 flex space-x-2">
                          <button className="flex-1 bg-blue-500 text-white text-xs py-1 px-2 rounded hover:bg-blue-600">
                            Contact
                          </button>
                          <button className="flex-1 bg-gray-500 text-white text-xs py-1 px-2 rounded hover:bg-gray-600">
                            Track
                          </button>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {/* Alert Markers */}
                {layerStates["Incident Reports"] && alerts.map((alert) => (
                  <Marker key={`alert-${alert.id}`} position={alert.position} icon={alertIcon}>
                    <Popup>
                      <div className="p-3 min-w-[200px]">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                          <h3 className="font-semibold text-red-600">{alert.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                        <div className="space-y-1 text-xs text-gray-500">
                          <div>⚠️ Severity: <span className={`font-medium ${
                            alert.severity === 'high' ? 'text-red-600' :
                            alert.severity === 'medium' ? 'text-yellow-600' : 'text-green-600'
                          }`}>{alert.severity}</span></div>
                          <div>📝 Status: <span className="font-medium capitalize">{alert.status}</span></div>
                          <div>👤 Reported by: <span className="font-medium">{alert.reportedBy}</span></div>
                          <div>🕐 Time: <span className="font-medium">{alert.time}</span></div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>

              {/* Map Controls Overlay */}
              <div className="absolute top-4 right-4 space-y-2 z-[1000]">
                <motion.button
                  onClick={requestLocation}
                  className="glass-card p-3 hover:bg-slate-700/50 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Find My Location"
                >
                  <LocateFixed className={`w-5 h-5 ${trackingEnabled ? 'text-blue-400' : 'text-slate-400'} group-hover:text-white`} />
                </motion.button>
                
                <motion.button
                  onClick={() => setMapZoom(prev => Math.min(prev + 1, 18))}
                  className="glass-card p-3 hover:bg-slate-700/50 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Plus className="w-5 h-5 text-slate-400 group-hover:text-white" />
                </motion.button>
                
                <motion.button
                  onClick={() => setMapZoom(prev => Math.max(prev - 1, 1))}
                  className="glass-card p-3 hover:bg-slate-700/50 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Minus className="w-5 h-5 text-slate-400 group-hover:text-white" />
                </motion.button>
                
                <motion.button
                  className="glass-card p-3 hover:bg-slate-700/50 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Settings className="w-5 h-5 text-slate-400 group-hover:text-white" />
                </motion.button>
              </div>

              {/* Live Status Indicator */}
              <div className="absolute bottom-4 left-4 glass-card p-3 z-[1000]">
                <div className="flex items-center space-x-2">
                  <motion.div
                    className="w-2 h-2 bg-green-400 rounded-full"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-xs text-white font-medium">Live Map Active</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            
            {/* Legend Panel */}
            <motion.div variants={itemVariants}>
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-blue-400" />
                  Map Legend
                </h3>
                
                <div className="space-y-3">
                  {legendItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 hover:bg-slate-700/30 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 2 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${item.bgColor} ${item.borderColor} border`}>
                          <item.icon className={`w-4 h-4 ${item.textColor}`} />
                        </div>
                        <div>
                          <div className="text-white font-medium text-sm">{item.label}</div>
                          <div className="text-slate-400 text-xs">{item.description}</div>
                        </div>
                      </div>
                      <div className={`text-sm font-bold ${item.textColor}`}>
                        {item.count}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Layer Controls */}
            <motion.div variants={itemVariants}>
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Layers className="w-5 h-5 mr-2 text-purple-400" />
                  Map Layers
                </h3>
                
                <div className="space-y-3">
                  {layers.map((layer, index) => (
                    <motion.div
                      key={layer.name}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 hover:bg-slate-700/30 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-white font-medium text-sm">{layer.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${layer.color} bg-current bg-opacity-10`}>
                            {layer.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400">{layer.description}</div>
                        <div className="text-xs text-slate-500 mt-1">{layer.count} items</div>
                      </div>
                      
                      <motion.button
                        onClick={() => toggleLayer(layer.name)}
                        className="ml-3"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {layerStates[layer.name] ? (
                          <ToggleRight className="w-5 h-5 text-blue-400" />
                        ) : (
                          <ToggleLeft className="w-5 h-5 text-slate-500" />
                        )}
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Live Activity Feed */}
            <motion.div variants={itemVariants}>
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-emerald-400" />
                  Live Activity
                </h3>
                
                <div className="space-y-4">
                  {[
                    {
                      type: 'guardian',
                      message: 'Sarah Chen checked in at University Commons',
                      time: '1 min ago',
                      icon: Users,
                      color: 'text-blue-400'
                    },
                    {
                      type: 'alert',
                      message: 'New incident reported near Library District',
                      time: '3 min ago',
                      icon: AlertTriangle,
                      color: 'text-orange-400'
                    },
                    {
                      type: 'zone',
                      message: 'Student Housing upgraded to high security',
                      time: '8 min ago',
                      icon: Shield,
                      color: 'text-emerald-400'
                    },
                    {
                      type: 'escort',
                      message: 'Safe walk escort requested to North Campus',
                      time: '12 min ago',
                      icon: Navigation2,
                      color: 'text-purple-400'
                    }
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-800/30 transition-colors cursor-pointer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 2 }}
                    >
                      <div className={`p-2 rounded-lg bg-slate-700/50 ${activity.color}`}>
                        <activity.icon className="w-3 h-3" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm">{activity.message}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span className="text-xs text-slate-500">{activity.time}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  className="w-full mt-4 text-sm text-blue-400 hover:text-blue-300 flex items-center justify-center space-x-1"
                  whileHover={{ scale: 1.02 }}
                >
                  <span>View All Activity</span>
                  <Eye className="w-3 h-3" />
                </motion.button>
              </div>
            </motion.div>

            {/* Quick Statistics */}
            <motion.div variants={itemVariants}>
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                  Live Stats
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <div className="text-2xl font-bold text-emerald-400">{safeZones.length}</div>
                    <div className="text-xs text-slate-400">Safe Zones</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="text-2xl font-bold text-blue-400">{guardians.filter(g => g.status === 'active').length}</div>
                    <div className="text-xs text-slate-400">Active Guards</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <div className="text-2xl font-bold text-purple-400">
                      {safeZones.reduce((sum, zone) => sum + zone.activePeople, 0)}
                    </div>
                    <div className="text-xs text-slate-400">People Online</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <div className="text-2xl font-bold text-orange-400">{alerts.filter(a => a.status !== 'resolved').length}</div>
                    <div className="text-xs text-slate-400">Active Alerts</div>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-lg bg-slate-800/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Network Status</span>
                    <div className="flex items-center space-x-1">
                      <motion.div
                        className="w-2 h-2 bg-green-400 rounded-full"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <span className="text-xs text-green-400 font-medium">Online</span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500">
                    Last sync: just now • 98% uptime
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Map Analytics & Insights - Below the map */}
        <motion.div 
          variants={itemVariants}
        >
          <div className="glass-card p-6 lg:p-8">
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <motion.div 
                  className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Activity className="w-7 h-7 text-white" />
                </motion.div>
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                    Location Analytics & Insights
                  </h2>
                  <p className="text-slate-400 text-sm lg:text-base">
                    Real-time safety metrics and location-based intelligence
                  </p>
                </div>
              </div>
            </div>

            {/* Analytics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              
              {/* Safety Score */}
              <motion.div
                className="glass-card p-6 hover:bg-slate-800/40 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                      <Shield className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Safety Score</h3>
                      <p className="text-slate-400 text-sm">Current area rating</p>
                    </div>
                  </div>
                  <motion.div 
                    className="text-3xl font-bold text-emerald-400"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    92
                  </motion.div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">Security Presence</span>
                    <span className="text-emerald-400 font-medium">Excellent</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">Lighting Quality</span>
                    <span className="text-blue-400 font-medium">Good</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">Foot Traffic</span>
                    <span className="text-yellow-400 font-medium">Moderate</span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-2 mt-4">
                    <motion.div 
                      className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "92%" }}
                      transition={{ duration: 2, delay: 0.5 }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Nearby Points of Interest */}
              <motion.div
                className="glass-card p-6 hover:bg-slate-800/40 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/30">
                    <MapPin className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Nearby POI</h3>
                    <p className="text-slate-400 text-sm">Within 500m radius</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {[
                    { name: "Emergency Station", distance: "120m", icon: AlertTriangle, color: "text-red-400" },
                    { name: "Security Office", distance: "250m", icon: Shield, color: "text-blue-400" },
                    { name: "Well-lit Pathway", distance: "80m", icon: Navigation2, color: "text-emerald-400" },
                    { name: "Campus Store", distance: "300m", icon: Home, color: "text-purple-400" }
                  ].map((poi, index) => (
                    <motion.div 
                      key={poi.name}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-700/30 transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center space-x-3">
                        <poi.icon className={`w-4 h-4 ${poi.color}`} />
                        <span className="text-white text-sm">{poi.name}</span>
                      </div>
                      <span className="text-slate-400 text-xs font-mono">{poi.distance}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Activity Heatmap */}
              <motion.div
                className="glass-card p-6 hover:bg-slate-800/40 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 rounded-lg bg-orange-500/20 border border-orange-500/30">
                    <Activity className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Activity Level</h3>
                    <p className="text-slate-400 text-sm">Current hour trends</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="text-center">
                    <motion.div 
                      className="text-2xl font-bold text-orange-400 mb-1"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Medium
                    </motion.div>
                    <p className="text-slate-400 text-xs">Peak hours: 12-2 PM, 6-8 PM</p>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                      <div key={day} className="text-center">
                        <div className="text-xs text-slate-400 mb-1">{day}</div>
                        <motion.div 
                          className={`h-8 rounded-sm ${
                            index < 5 ? 'bg-orange-500/60' : 'bg-orange-500/30'
                          }`}
                          initial={{ height: 0 }}
                          animate={{ height: index < 5 ? '2rem' : '1rem' }}
                          transition={{ delay: index * 0.1 }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Weather & Environmental Conditions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Current Conditions */}
              <motion.div
                className="glass-card p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                    <Wifi className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Environmental Conditions</h3>
                    <p className="text-slate-400 text-sm">Current safety-affecting factors</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-slate-800/50">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-blue-400 rounded-full" />
                      <span className="text-white font-medium text-sm">Weather</span>
                    </div>
                    <div className="text-blue-400 text-lg font-bold">Clear</div>
                    <div className="text-slate-400 text-xs">Visibility: Excellent</div>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-800/50">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                      <span className="text-white font-medium text-sm">Lighting</span>
                    </div>
                    <div className="text-yellow-400 text-lg font-bold">Good</div>
                    <div className="text-slate-400 text-xs">Street lights: 98% active</div>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-800/50">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-emerald-400 rounded-full" />
                      <span className="text-white font-medium text-sm">Traffic</span>
                    </div>
                    <div className="text-emerald-400 text-lg font-bold">Low</div>
                    <div className="text-slate-400 text-xs">Safe crossing available</div>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-800/50">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-purple-400 rounded-full" />
                      <span className="text-white font-medium text-sm">Crowd Level</span>
                    </div>
                    <div className="text-purple-400 text-lg font-bold">Moderate</div>
                    <div className="text-slate-400 text-xs">Safe density maintained</div>
                  </div>
                </div>
              </motion.div>

              {/* Route Recommendations */}
              <motion.div
                className="glass-card p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30">
                    <Navigation className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Smart Route Suggestions</h3>
                    <p className="text-slate-400 text-sm">AI-optimized pathways for safety</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      destination: "Library District",
                      time: "8 min",
                      safety: "High",
                      features: ["Well-lit", "Security cameras", "Emergency phones"],
                      color: "emerald"
                    },
                    {
                      destination: "Student Housing",
                      time: "12 min", 
                      safety: "High",
                      features: ["Escort available", "Safe zones", "24/7 monitoring"],
                      color: "blue"
                    },
                    {
                      destination: "North Campus",
                      time: "15 min",
                      safety: "Medium",
                      features: ["Busy pathway", "Good lighting", "Regular patrols"],
                      color: "yellow"
                    }
                  ].map((route, index) => (
                    <motion.div
                      key={route.destination}
                      className="p-4 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors border border-slate-700/50"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="text-white font-medium">{route.destination}</h4>
                          <div className="flex items-center space-x-3 text-sm">
                            <span className="text-slate-400">{route.time} walk</span>
                            <span className={`text-${route.color}-400 font-medium`}>
                              {route.safety} Safety
                            </span>
                          </div>
                        </div>
                        <motion.button 
                          className={`px-3 py-1 rounded-full bg-${route.color}-500/20 text-${route.color}-400 text-xs hover:bg-${route.color}-500/30 transition-colors`}
                          whileHover={{ scale: 1.05 }}
                        >
                          Navigate
                        </motion.button>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {route.features.map((feature, idx) => (
                          <span 
                            key={idx}
                            className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
