import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg sticky-top bg-white border-bottom py-3 px-4">
            <div className="container">
                <Link className="navbar-brand fw-bold text-primary fs-3" to="/" style={{ letterSpacing: '-1.5px' }}>
                    GlowBank
                </Link>

                <div className="ms-auto d-flex align-items-center">
                    {!user ? (
                        <>
                            <Link className="nav-link text-muted fw-medium me-4" to="/login">Login</Link>
                            <Link className="btn btn-primary px-4 fw-bold shadow-sm" to="/register">Open Account</Link>
                        </>
                    ) : (
                        <>
                            {user.role === 'admin' && (
                                <Link className="nav-link text-warning me-3" to="/admin/users">Admin</Link>
                            )}

                            <Link className="btn btn-outline-primary me-3 fw-bold" to="/dashboard">
                                <i className="bi bi-speedometer2 me-2"></i>Dashboard
                            </Link>

                            <button className="btn btn-link text-danger text-decoration-none small" onClick={logout}>
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar