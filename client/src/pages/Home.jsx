import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <header className="py-5 mt-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="badge rounded-pill bg-soft-primary text-primary mb-3 px-3 py-2" style={{ backgroundColor: '#e0ebff' }}>
                                    Now available in Europe 🇪🇺
                                </span>
                                <h1 className="display-3 fw-bold mb-4" style={{ color: '#0f172a', letterSpacing: '-2px' }}>
                                    The future of <span className="text-primary">digital banking</span> is here.
                                </h1>
                                <p className="lead text-muted mb-5">
                                    Secure, fast, and transparent. Manage your finances with the most trusted
                                    platform for international transfers and daily savings.
                                </p>
                                <div className="d-flex gap-3">
                                    <Link to="/register" className="btn btn-primary btn-lg px-4 py-3">
                                        Open Account
                                    </Link>
                                    <Link to="/login" className="btn btn-outline-secondary btn-lg px-4 py-3">
                                        Sign In
                                    </Link>
                                </div>
                            </motion.div>
                        </div>

                        <div className="col-lg-6 d-none d-lg-block">
                            <div className="bg-light rounded-5 p-5 text-center shadow-sm">
                                <i className="bi bi-shield-check text-primary" style={{ fontSize: '120px' }}></i>
                                <h3 className="mt-3 fw-bold">Bank-Grade Security</h3>
                                <p className="text-muted">Your funds are protected by multi-layer encryption.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Trust Bar */}
            <div className="bg-light py-4 border-top border-bottom mt-5">
                <div className="container text-center">
                    <p className="small text-uppercase fw-bold text-muted mb-0">Trusted by 2 million+ users worldwide</p>
                </div>
            </div>

            {/* Features Section */}
            <section className="py-5 my-5">
                <div className="container">
                    <div className="row g-4 text-center">
                        <div className="col-md-4">
                            <div className="p-4">
                                <div className="feature-icon bg-primary bg-gradient text-white mb-3 d-inline-flex align-items-center justify-content-center rounded-3" style={{ width: '60px', height: '60px' }}>
                                    <i className="bi bi-lightning-charge-fill fs-3"></i>
                                </div>
                                <h4 className="fw-bold">Instant Transfers</h4>
                                <p className="text-muted">Send money to any GlowBank account holder globally in under 2 seconds.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-4">
                                <div className="feature-icon bg-primary bg-gradient text-white mb-3 d-inline-flex align-items-center justify-content-center rounded-3" style={{ width: '60px', height: '60px' }}>
                                    <i className="bi bi-shield-lock-fill fs-3"></i>
                                </div>
                                <h4 className="fw-bold">Secure by Design</h4>
                                <p className="text-muted">We use bank-grade JWT encryption and atomic transactions for your safety.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-4">
                                <div className="feature-icon bg-primary bg-gradient text-white mb-3 d-inline-flex align-items-center justify-content-center rounded-3" style={{ width: '60px', height: '60px' }}>
                                    <i className="bi bi-graph-up-arrow fs-3"></i>
                                </div>
                                <h4 className="fw-bold">Real-time Activity</h4>
                                <p className="text-muted">Stay on top of your finances with a live feed of all your transactions.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;