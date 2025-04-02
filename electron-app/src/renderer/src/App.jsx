import './assets/main.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Welcome from './pages/Welcome'
import Register from './pages/Register'
import Scan from './pages/Scan'
import Settings from './pages/Settings'
import { DateProvider } from './context/DateContext'
import { AuthProvider } from './context/AuthContext'
import React from 'react'
import Learn from './pages/Learn'

function App() {
  return (
    <DateProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route index element={<Welcome />} />
            <Route path="/Welcome" element={<Welcome />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Scan" element={<Scan />} />
            <Route path="/Learn" element={<Learn />} />
            <Route path="/Settings" element={<Settings />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        </Router>
      </AuthProvider>
    </DateProvider>
  )
}

export default App
