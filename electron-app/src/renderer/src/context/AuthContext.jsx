import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve user from localStorage (if available) to persist login
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const login = (userData) => {
    setUser(userData) // userData should contain username
    localStorage.setItem('user', JSON.stringify(userData)) // Store user data
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user') // Clear user on logout
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
