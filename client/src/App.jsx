import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './routes/ProtectedRoute'
import { Dashboard } from './pages/Dashboard'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Profile from './pages/Profile'

const App = () => {
  return (
    <BrowserRouter>
    <AuthProvider>
      <AppContent/>
    </AuthProvider>
    </BrowserRouter>
  )
}

const AppContent = ()=>{
  const location = useLocation()
  const hideNavbarOn = ['/dashboard'];
  const shouldHide = hideNavbarOn.includes(location.pathname);

  return (
    <>
      {!shouldHide && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path='/profile' element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
        }/>
      </Routes>
    </>
  )
}
export default App