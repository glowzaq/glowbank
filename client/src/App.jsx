import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './routes/ProtectedRoute'
import { Dashboard } from './pages/Dashboard'
import Navbar from './components/Navbar'
import Home from './pages/Home'

const App = () => {
  const location = useLocation
  const hideNavbarOn = ['/dashboard'];
  const shouldHide = hideNavbarOn.includes(location.pathname);
  return (
    <BrowserRouter>
    <AuthProvider>
      {!shouldHide && <Navbar />}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>} />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App