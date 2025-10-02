import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Simple test component
function TestDashboard() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Guardian Beacon - Test Dashboard</h1>
      <p>If you can see this, the basic React setup is working!</p>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TestDashboard />} />
      </Routes>
    </Router>
  )
}

export default App