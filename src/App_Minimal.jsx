import React from 'react'

console.log('App.jsx is loading')

function App() {
  console.log('App component is rendering')
  
  return React.createElement('div', 
    { 
      style: { 
        padding: '50px', 
        textAlign: 'center', 
        backgroundColor: '#f0f0f0', 
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif'
      } 
    },
    React.createElement('h1', 
      { style: { color: '#333', fontSize: '3em', marginBottom: '20px' } }, 
      '🛡️ Guardian Beacon'
    ),
    React.createElement('p', 
      { style: { color: '#666', fontSize: '1.2em', marginBottom: '30px' } }, 
      'Safety Application Loading...'
    ),
    React.createElement('div', 
      { 
        style: { 
          backgroundColor: '#4CAF50', 
          color: 'white', 
          padding: '15px', 
          borderRadius: '8px', 
          display: 'inline-block' 
        } 
      },
      React.createElement('strong', null, '✅ React Application is Working!')
    ),
    React.createElement('p', 
      { style: { marginTop: '30px', color: '#888' } }, 
      'If you can see this, the basic React setup is functional.'
    )
  )
}

console.log('App component defined')

export default App