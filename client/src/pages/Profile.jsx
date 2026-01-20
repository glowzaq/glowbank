import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="dashboard-wrapper">
            {/* Sidebar stays consistent */}
            <aside className="sidebar d-none d-md-flex">
                <h3 className="fw-bold mb-5 text-primary">GlowBank</h3>
                <nav className="nav flex-column gap-3">
                    <button className="btn btn-link text-white text-decoration-none text-start p-0 opacity-100">
                        <i className="bi bi-house-door me-2"></i> Overview
                    </button>
                    <button className="btn btn-link text-white text-decoration-none text-start p-0 opacity-50">
                        <i className="bi bi-credit-card me-2"></i> My Cards
                    </button>
                    <button className="btn btn-link text-white text-decoration-none text-start p-0 opacity-50">
                        <i className="bi bi-gear me-2"></i> Settings
                    </button>
                </nav>
            </aside>

            <main className="main-content">
                <header className="mb-5">
                    <h2 className="fw-bold mb-0">Account Settings</h2>
                    <p className="text-muted">Manage your personal information and security.</p>
                </header>

                <div className="row g-4">
                    <div className="col-lg-8">
                        <div className="card stat-card p-4 mb-4">
                            <h5 className="fw-bold mb-4">Personal Information</h5>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="small text-muted mb-1">First Name</label>
                                    <input type="text" className="form-control bg-light" value={user?.firstname} readOnly />
                                </div>
                                <div className="col-md-6">
                                    <label className="small text-muted mb-1">Last Name</label>
                                    <input type="text" className="form-control bg-light" value={user?.lastname} readOnly />
                                </div>
                                <div className="col-md-12">
                                    <label className="small text-muted mb-1">Email Address</label>
                                    <input type="email" className="form-control bg-light" value={user?.email} readOnly />
                                </div>
                            </div>
                        </div>

                        <div className="card stat-card p-4">
                            <h5 className="fw-bold mb-4">Security</h5>
                            <button className="btn btn-outline-primary btn-sm">Change Password</button>
                            <hr className="my-4 text-muted opacity-25" />
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="mb-0 fw-bold">Two-Factor Authentication</p>
                                    <p className="small text-muted mb-0">Add an extra layer of security to your account.</p>
                                </div>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card stat-card p-4 text-center">
                            <div className="avatar-placeholder bg-soft-primary text-primary mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle" style={{ width: '80px', height: '80px', backgroundColor: '#e0ebff', fontSize: '2rem' }}>
                                {user?.firstname?.charAt(0)}{user?.lastname?.charAt(0)}
                            </div>
                            <h5 className="fw-bold mb-0">{user?.firstname} {user?.lastname}</h5>
                            <p className="text-muted small">Standard Account</p>
                            <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2">Active</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;