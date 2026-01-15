import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

const ProtectedRoute = ( {children} ) => {
    const {user, loading} = useAuth()

    if (loading){
        return <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    }
    
    if (!user){
        return <Navigate to={'/login'}/>
    }

    return children
}

export default ProtectedRoute