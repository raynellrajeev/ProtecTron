import './assets/main.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Welcome from './pages/Welcome'
import Register from './pages/Register'
import Scan from './pages/Scan'
import Settings from './pages/Settings'
import Quiz from './pages/Quiz'
import { DateProvider } from './context/DateContext'
import React from 'react'

function App() {
  return (
    <DateProvider>
      <Router>
        <Routes>
          <Route index element={<Welcome />} />
          <Route path="/Welcome" element={<Welcome />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Scan" element={<Scan />} />
          <Route path="/Quiz" element={<Quiz />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </Router>
    </DateProvider>
  )
}

export default App
