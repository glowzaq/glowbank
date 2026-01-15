import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth.js'
import Swal from 'sweetalert2'

export const Dashboard = () => {
    const { user, loading: authLoading } = useAuth()
    const [data, setData] = useState({ balance: 0, transaction: [] })
    const [fetching, setFetching] = useState(true)
    const [isDepositOpen, setIsDepositOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [depositAmount, setDepositAmount] = useState("")


    const fetchDashboard = async () => {
        const token = localStorage.getItem('token')
        if (!token) return;
        try {
            const res = await axios.get('http://localhost:5000/api/transaction/dashboard-info', {
                headers: { Authorization: `Bearer ${token}` }
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
        if (token) {
            fetchDashboard()
        }
    }, [user])

    if (fetching || authLoading || !user) {
        return <div className='p-5 text-center text-success'>Loading your account...</div>
    }

    if (!data.transaction && !fetching) {
        return <div className='p-5 text-center text-success'>Unable to load data, please refresh...</div>
    }

    const handleDeposit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const token = localStorage.getItem("token")

            await axios.post('http://localhost:5000/api/transaction/deposit',
                { amount: depositAmount, description: "Manual deposit" },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            fetchDashboard()
            setDepositAmount('')
            setIsDepositOpen(false)
            Swal.fire({
                toast: true,
                title: 'Success!',
                text: 'Deposit successful',
                icon: 'success',
                confirmButtonColor: 'green'
            })
        } catch (error) {
            Swal.fire({
                toast: true,
                title: 'Error!',
                text: 'Deposit failed',
                icon: 'error',
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <div className="card bg-primary text-white p-4 mb-4">
                <h2>Welcome, {user?.firstname}</h2>
                <p className="mb-2 opacity-75">Account Number: <strong>{user?.accountNumber}</strong>
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(user.accountNumber);
                            Swal.fire({
                                toast: true,
                                position: 'top-end',
                                icon: 'success',
                                title: 'Account number copied',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }}
                        className="btn btn-sm btn-light ms-2"
                        style={{ fontSize: '10px', padding: '2px 5px' }}
                    >
                        Copy
                    </button>
                </p>
                <h5>Total Balance</h5>
                <h2>
                    {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }).format(data.balance || 0)}
                </h2>
            </div>

            <div>
                <button
                    onClick={() => setIsDepositOpen(!isDepositOpen)}
                    style={{ padding: "10px 20px", backgroundColor: isDepositOpen ? "#ccc" : "#4caf50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
                >
                    {isDepositOpen ? "Close deposit" : "Deposit money"}
                </button>

                {isDepositOpen && (
                    <div style={{ marginTop: "15px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", maxWidth: "300px" }}>
                        <h3 style={{ marginTop: 0 }}>Make a Deposit</h3>
                        <form onSubmit={handleDeposit}>
                            <div style={{ marginBottom: "10px" }}>
                                <label style={{ display: "block", marginBottom: "5px" }}>Amount ($)</label>
                                <input
                                    type="number"
                                    placeholder="Enter amount"
                                    value={depositAmount}
                                    onChange={(e) => setDepositAmount(e.target.value)}
                                    required
                                    style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: loading ? "not-allowed" : "pointer" }}
                            >
                                {loading ? "Processing..." : "Confirm Deposit"}
                            </button>
                        </form>
                    </div>
                )}
            </div>

            <TransferForm onTransferSuccess={fetchDashboard} />

            <h3>Recent Activity</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                    <tbody>
                        {data.transaction && data.transaction.length > 0 ? (
                            data.transaction.map((tx) => {
                                const isRecipient = user && String(tx.recipientId) === String(user._id);
                                
                                return (
                                    <tr key={tx._id}>
                                        <td>{new Date(tx.createdAt).toLocaleString()}</td>
                                        <td>{tx.description}</td>
                                        <td
                                            className={isRecipient ? "text-success" : "text-danger"}
                                            style={{ color: isRecipient ? "#198754" : "#dc3545" }}
                                        >
                                            {isRecipient ? "+" : "-"}${tx.amount}
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={3} className="text-center text-muted">No transactions yet</td>
                            </tr>
                        )}
                    </tbody>
                </table>
        </div>
    )
}

export const TransferForm = ({ onTransferSuccess }) => {
    const [loading, setLoading] = useState(false)
    const [amount, setAmount] = useState('')
    const [recipientEmail, setRecipientEmail] = useState('')

    const handleTransfer = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const token = localStorage.getItem('token')
            await axios.post('http://localhost:5000/api/transaction/transfer',
                { recipientEmail, amount },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            Swal.fire({
                toast: true,
                title: 'Success!',
                text: `Successfully sent $${amount} to ${recipientEmail}`,
                icon: 'success',
                confirmButtonColor: 'green'
            })
            setRecipientEmail('')
            setAmount('')
            onTransferSuccess()
        } catch (error) {
            Swal.fire({
                toast: true,
                title: 'Error!',
                text: 'Transfer failed, try again later',
                icon: 'error'
            })
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="card p-4 mt-4">
            <h3>Transfer Money</h3>
            <form onSubmit={handleTransfer}>
                <div className="mb-3">
                    <label className="form-label">Recipient Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Amount ($)</label>
                    <input
                        type="number"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Processing..." : "Send Money"}
                </button>
            </form>
        </div>
    )
}