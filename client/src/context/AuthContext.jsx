import React, { useState, createContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ( {children} ) =>{
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(()=>{
    const checkAuth = async ()=>{
      const token = localStorage.getItem('token')
      if (!token){
        setLoading(false)
        return
      }

      try {
        const response = await axios.get('http://localhost:5000/api/auth/protected', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setUser(response.data.user || response.data)
      } catch (error) {
        console.error('Auth check failed:', error.message)
        localStorage.removeItem('token')
        setUser(null)
      }finally{
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  const login = async (email, password)=>{
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {email, password})
      const {token, user} = response.data
      localStorage.setItem('token', token)
      setUser(user)
      navigate('/dashboard')
      return{success: true}
    } catch (error) {
      console.error('Login error:', error.message)
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      }
    }
  }

  const register = async (firstname, lastname, email, password)=>{
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { firstname, lastname, email, password })
      const { token, user } = response.data
      localStorage.setItem('token', token)
      setUser(user)
      navigate('/dashboard')
      return { success: true, token: response.data.token }
    } catch (error) {
      console.error('Registration error:', error.message)
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed'
      }
    }

  }

  const logout = ()=>{
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = ()=>{
  const context = React.useContext(AuthContext)
  if (!context){
    throw new Error("UseAuth must be used within AuthProvider");
  }
  return context
}