import React, { useEffect, useState } from 'react'
import API from '../api.js'
import { useAuth } from '../hooks/useAuth.js'
import Swal from 'sweetalert2'
import { motion } from 'framer-motion'
import CreditCard from '../components/CreditCard.jsx'

export const Dashboard = () => {
    const { user, logout, loading: authLoading } = useAuth()
    const [data, setData] = useState({ balance: 0, transaction: [] })
    const [fetching, setFetching] = useState(true)
    const [isDepositOpen, setIsDepositOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [depositAmount, setDepositAmount] = useState("")

    const fetchDashboard = async () => {
        const token = localStorage.getItem('token')
        if (!token) return;
        try {
            const res = await API.get('/api/transaction/dashboard-info', {
            })
            setData(res.data)
        } catch (error) {
            console.error("Error fetching Dashboard")
        } finally {
            setFetching(false)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) fetchDashboard()
    }, [user])

    if (fetching || authLoading || !user) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
                <div className="text-center">
                    <div className="spinner-border text-primary mb-3" role="status"></div>
                    <p className="text-muted fw-bold">Securing your connection...</p>
                </div>
            </div>
        )
    }

    const handleDeposit = async (e) => {
        e.preventDefault()
        if (Number(depositAmount) <= 0) {
            return Swal.fire({ toast: true, title: 'Invalid Amount', icon: 'warning' });
        }
        setLoading(true)
        try {
            const token = localStorage.getItem("token")
            await API.post('/api/transaction/deposit',
                { amount: depositAmount, description: "Manual deposit" }
            )
            fetchDashboard()
            setDepositAmount('')
            setIsDepositOpen(false)
            Swal.fire({ icon: 'success', title: 'Funds Deposited' })
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Deposit Failed' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="dashboard-wrapper">
            {/* Sidebar */}
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
                <div className="mt-auto">
                    <button onClick={logout} className="btn btn-outline-danger w-100 border-0 text-start">
                        <i className="bi bi-box-arrow-left me-2"></i> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <header className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                        <h2 className="fw-bold mb-0">Welcome back, {user?.firstname}</h2>
                        <p className="text-muted small">Here's what's happening with your account today.</p>
                    </div>
                </header>

                <div className="row g-4">
                    {/* Left Column: Balance & History */}
                    <div className="col-lg-8">
                        {/* Balance Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            className="card balance-card p-4 mb-4 border-0 shadow"
                        >
                            <div className="d-flex justify-content-between align-items-start mb-4">
                                <div>
                                    <span className="text-uppercase small opacity-75">Available Balance</span>
                                    <h1 className="display-5 fw-bold mb-0">${data.balance?.toLocaleString()}</h1>
                                </div>
                                <i className="bi bi-cpu fs-1 opacity-25"></i>
                            </div>
                            <div className="pt-3 border-top border-secondary">
                                <span className="small opacity-75 d-block">Account Number</span>
                                <div className="d-flex align-items-center gap-3">
                                    <span className="h5 mb-0 font-monospace">{user?.accountNumber}</span>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(user.accountNumber);
                                            Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Copied!', showConfirmButton: false, timer: 1500 });
                                        }}
                                        className="btn btn-sm btn-light py-0 px-2 opacity-75"
                                    >Copy</button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Recent Activity */}
                        <div className="card stat-card p-4">
                            <h5 className="fw-bold mb-4">Recent Activity</h5>
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th className="border-0">Date</th>
                                            <th className="border-0">Description</th>
                                            <th className="border-0 text-end">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.transaction?.length > 0 ? (
                                            data.transaction.map((tx) => {
                                                const isRecipient = user && String(tx.recipientId) === String(user._id);
                                                return (
                                                    <tr key={tx._id}>
                                                        <td className="text-muted small">{new Date(tx.createdAt).toLocaleDateString()}</td>
                                                        <td className="fw-medium">{tx.description}</td>
                                                        <td className={`text-end fw-bold ${isRecipient ? "text-success" : "text-danger"}`}>
                                                            {isRecipient ? "+" : "-"}${tx.amount.toLocaleString()}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr><td colSpan={3} className="text-center py-4 text-muted small">No transactions found.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Quick Actions */}
                    <div className="col-lg-4">
                        <CreditCard
                            name={`${user?.firstname} ${user?.lastname}`}
                            expiry="12/28"
                        />
                        <div className="card stat-card p-4 mb-4">
                            <h5 className="fw-bold mb-3">Quick Deposit</h5>
                            <button
                                onClick={() => setIsDepositOpen(!isDepositOpen)}
                                className={`btn w-100 mb-3 ${isDepositOpen ? 'btn-light' : 'btn-success'}`}
                            >
                                {isDepositOpen ? "Cancel" : "Add Funds"}
                            </button>

                            {isDepositOpen && (
                                <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleDeposit}>
                                    <div className="mb-3">
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="0.00"
                                            value={depositAmount}
                                            onChange={(e) => setDepositAmount(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button type="submit" disabled={loading} className="btn btn-primary w-100">
                                        {loading ? "Processing..." : "Confirm Deposit"}
                                    </button>
                                </motion.form>
                            )}
                        </div>

                        <TransferForm balance={data?.balance} onTransferSuccess={fetchDashboard} />
                    </div>
                </div>
            </main>
        </div>
    )
}

export const TransferForm = ({ balance, onTransferSuccess }) => {
    const [loading, setLoading] = useState(false)
    const [amount, setAmount] = useState('')
    const [recipientEmail, setRecipientEmail] = useState('')
    const { user } = useAuth()

    const handleTransfer = async (e) => {
        e.preventDefault()
        if (Number(amount) <= 0 || Number(amount) > Number(balance) || recipientEmail === user.email) {
            Swal.fire({icon: 'error', title: 'Invalid transaction, check and try again'})
            return;
        }

        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            await API.post('/api/transaction/transfer', { recipientEmail, amount })
            Swal.fire({ icon: 'success', title: 'Transfer Successful' })
            setRecipientEmail(''); setAmount(''); onTransferSuccess()
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Transfer Failed' })
        } finally { setLoading(false) }
    }

    return (
        <div className="card stat-card p-4">
            <h5 className="fw-bold mb-3">Send Money</h5>
            <form onSubmit={handleTransfer}>
                <div className="mb-3">
                    <label className="small text-muted mb-1">Recipient Email</label>
                    <input type="email" className="form-control" value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="small text-muted mb-1">Amount ($)</label>
                    <input type="number" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? "Processing..." : "Send Now"}
                </button>
            </form>
        </div>
    )
}