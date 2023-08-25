import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  })
  const [donorData, setDonorData] = useState(null)

  const login = (userData) => {
    //console.log("data is coming", userData)
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  }

  const getDonorData = (userData) => {
    console.log('data is coming', userData)
    setDonorData(userData)
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove from localStorage
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, getDonorData, donorData }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
