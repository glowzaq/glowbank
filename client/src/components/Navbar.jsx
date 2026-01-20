import React from 'react'
import { useAuth } from '../hooks/useAuth.js'
import { Link } from 'react-router-dom'

const Navbar = () => {
    // const { user, logout } = useAuth()
    // return (
    //     <nav className='navbar navbar-expand-lg navbar-dark bg-dark px-4'>
    //         <Link className="navbar-brand fw-bold" to="/">GlowBank</Link>

    //         <div className="ms-auto d-flex align-items-center">
    //             {!user ? (
    //                 <>
    //                     <Link className="nav-link text-primary me-3" to="/login">Login</Link>
    //                     <Link className="btn btn-primary" to="/register">Open Account</Link>
    //                 </>
    //             ) : (
    //                 <>
    //                     <Link className="nav-link text-white me-3" to="/dashboard">Dashboard</Link>
    //                     {user.role === 'admin' && (
    //                         <Link className="nav-link text-warning me-3" to="/admin/users">Manage Users</Link>
    //                     )}

    //                     {user.role === 'support' && (
    //                         <Link className="nav-link text-info me-3" to="/support/tickets">Support Inbox</Link>
    //                     )}

    //                     <div className="dropdown">
    //                         <span className="text-white me-3 small">Hello, {user.firstname}</span>
    //                         <button
    //                             className="btn btn-outline-danger btn-sm"
    //                             onClick={logout}
    //                         >
    //                             Logout
    //                         </button>
    //                     </div>
    //                 </>
    //             )}
    //         </div>
    //     </nav>
    // )
}

export default Navbar