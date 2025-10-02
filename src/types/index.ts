// Core application types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  emergencyContacts: Contact[];
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  relationship: string;
  isPrimary: boolean;
  isActive: boolean;
  avatar?: string;
}

export interface UserPreferences {
  language: 'en' | 'hi';
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  accessibility: AccessibilitySettings;
  theme: 'light' | 'dark' | 'auto';
}

export interface NotificationSettings {
  push: boolean;
  sms: boolean;
  email: boolean;
  emergencyAlerts: boolean;
  checkInReminders: boolean;
  locationTracking: boolean;
}

export interface PrivacySettings {
  shareLocation: boolean;
  allowTracking: boolean;
  dataRetention: number; // days
  anonymousUsage: boolean;
}

export interface AccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  highContrast: boolean;
  reduceMotion: boolean;
  screenReader: boolean;
  voiceCommands: boolean;
}

// Safety-related types
export interface SOSAlert {
  id: string;
  userId: string;
  type: 'manual' | 'automatic' | 'panic';
  status: 'pending' | 'active' | 'resolved' | 'cancelled';
  location: LocationData;
  timestamp: Date;
  contacts: Contact[];
  message?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude?: number;
  speed?: number;
  heading?: number;
  timestamp: Date;
  address?: string;
}

export interface CheckIn {
  id: string;
  userId: string;
  scheduledTime: Date;
  actualTime?: Date;
  status: 'pending' | 'completed' | 'missed' | 'cancelled';
  location?: LocationData;
  message?: string;
  contacts: Contact[];
  type: 'manual' | 'automatic';
  reminderSent: boolean;
}

export interface SafeWalk {
  id: string;
  userId: string;
  startLocation: LocationData;
  endLocation: LocationData;
  estimatedDuration: number; // minutes
  actualDuration?: number;
  status: 'planning' | 'active' | 'completed' | 'emergency';
  route: LocationData[];
  contacts: Contact[];
  checkpoints: SafeWalkCheckpoint[];
  emergencyTimeout: number; // minutes
}

export interface SafeWalkCheckpoint {
  id: string;
  location: LocationData;
  expectedTime: Date;
  actualTime?: Date;
  status: 'pending' | 'reached' | 'missed';
  automatic: boolean;
}

// UI Component types
export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing: string;
  stiffness?: number;
  damping?: number;
}

export interface GlassmorphismConfig {
  blur: number;
  opacity: number;
  borderOpacity: number;
  shadowIntensity: number;
  gradientStops: string[];
}

export interface NavigationItem {
  title: string;
  url: string;
  icon: React.ComponentType<any>;
  badge?: number;
  isActive?: boolean;
  disabled?: boolean;
}

export interface QuickAction {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  href: string;
  color: string;
  priority: number;
  enabled: boolean;
}

// API and Service types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
}

export interface GeolocationOptions {
  enableHighAccuracy: boolean;
  timeout: number;
  maximumAge: number;
}

export interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data?: any;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}

// Event types
export interface AppEvent {
  type: string;
  payload: any;
  timestamp: Date;
  source: string;
}

export interface EmergencyEvent extends AppEvent {
  type: 'emergency';
  payload: {
    alertId: string;
    location: LocationData;
    contacts: Contact[];
    priority: SOSAlert['priority'];
  };
}

export interface LocationEvent extends AppEvent {
  type: 'location_update';
  payload: {
    location: LocationData;
    accuracy: number;
    source: 'gps' | 'network' | 'passive';
  };
}

// Form and validation types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'phone' | 'password' | 'select' | 'checkbox' | 'radio';
  value: any;
  error?: string;
  required: boolean;
  disabled?: boolean;
  placeholder?: string;
  options?: SelectOption[];
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ValidationRule {
  type: 'required' | 'email' | 'phone' | 'minLength' | 'maxLength' | 'pattern';
  value?: any;
  message: string;
}

// Language and localization
export interface LanguageTexts {
  [key: string]: string | LanguageTexts;
}

export interface LocalizationConfig {
  defaultLanguage: string;
  supportedLanguages: string[];
  dateFormat: string;
  timeFormat: string;
  numberFormat: string;
  currency: string;
}

// Performance and analytics
export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
  memoryUsage: number;
  batteryLevel?: number;
  networkSpeed?: number;
}

export interface AnalyticsEvent {
  name: string;
  properties: Record<string, any>;
  timestamp: Date;
  sessionId: string;
  userId?: string;
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  testId?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export interface InteractiveComponentProps extends BaseComponentProps {
  onClick?: (event: React.MouseEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  tabIndex?: number;
}

export interface FormComponentProps extends InteractiveComponentProps {
  name: string;
  value: any;
  onChange: (value: any) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type EventHandler<T = void> = (data: T) => void | Promise<void>;

export type AsyncFunction<T = any, R = any> = (...args: T[]) => Promise<R>;