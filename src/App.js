import React, { useEffect } from 'react'
import Home from './Components/Home'
import Login from './Components/Login'
import Register from './Components/Register'
import Navbar from './Components/sub_component/Navbar'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { AuthProvider } from './AuthContext.js'
import '../src/style/main.css'
import Donor from './Components/Donor'
import SideBar from './Components/sub_component/sidebar'
import Logout from './Components/sub_component/logout'
import { useAuth } from './AuthContext.js'

function App() {
  const { user } = useAuth()
  const navigate = useNavigate() // Get the navigate function from React Router

  useEffect(() => {
    if (!user && !['/login', '/register'].includes(window.location.pathname)) {
      navigate('/login') // Redirect to the login page for restricted routes
    }
  }, [user, navigate])

  return (
    <AuthProvider>
      <div className="App">
        {user && <SideBar />}
        <div className="main-section">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {user && <Route path="/donor" element={<Donor />} />}
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  )
}

export default App
