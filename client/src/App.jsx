import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './routes/ProtectedRoute'
import { Dashboard } from './pages/Dashboard'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Navbar/>
      <Routes>
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