import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout_Modern from './Layout_Modern.jsx'
import Dashboard_New from './pages/Dashboard_New.jsx'
import Map from './pages/Map.jsx'
import Contacts from './pages/Contacts.jsx'
import SafetyTools from './pages/SafetyTools.jsx'
import Settings from './pages/Settings.jsx'
import Login from './pages/Login.jsx'
import { useAccessibility } from './hooks/useAccessibility.js'
import { usePerformance } from './hooks/usePerformance.js'
import { ThemeProvider } from './components/providers/ThemeProvider.jsx'
import { LanguageProvider } from './components/providers/LanguageProvider.jsx'

// Error Boundary Component
class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error Boundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-4">We apologize for the inconvenience. Please refresh the page to continue.</p>
            {import.meta.env.DEV && this.state.error && (
              <div className="mb-4 text-left max-h-48 overflow-y-auto text-xs font-mono bg-red-50 border border-red-200 rounded-md p-3 text-red-700">
                <p className="font-semibold mb-2">Error:</p>
                <p className="mb-2 whitespace-pre-wrap">{this.state.error.message}</p>
                {this.state.error.stack && (
                  <details>
                    <summary className="cursor-pointer select-none">Stack trace</summary>
                    <pre className="mt-2 whitespace-pre-wrap">{this.state.error.stack}</pre>
                  </details>
                )}
              </div>
            )}
            <button 
              onClick={() => window.location.reload()} 
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
      <p className="text-muted-foreground">Loading Guardian Beacon...</p>
    </div>
  </div>
)

// Main App Component
function AppContent() {
  const accessibility = useAccessibility()
  const performance = usePerformance()
  
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public routes without layout */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected routes with layout */}
          <Route path="/*" element={
            <Layout_Modern>
              <Routes>
                <Route path="/" element={<Dashboard_New />} />
                <Route path="/map" element={<Map />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/safety-tools" element={<SafetyTools />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Layout_Modern>
          } />
        </Routes>
      </AnimatePresence>
    </Router>
  )
}

function App() {
  return (
    <AppErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <Suspense fallback={<LoadingSpinner />}>
            <AppContent />
          </Suspense>
        </LanguageProvider>
      </ThemeProvider>
    </AppErrorBoundary>
  )
}

export default App