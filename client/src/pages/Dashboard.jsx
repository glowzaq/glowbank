import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export const Dashboard = () => {
    const { user, loading: authLoading } = useAuth()
    const [data, setData] = useState({ balance: 0, transaction: [] })
    const [fetching, setFetching] = useState(true)
    const [isDepositOpen, setIsDepositOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [depositAmount, setDepositAmount] = useState("")

    const fetchDashboard = async () => {
        const token = localStorage.getItem('token')
        if(!token) return;
        try {
            const res = await axios.get('http://localhost:5000/api/transaction/dashboard-info', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            setData(res.data)
        } catch (error) {
            console.error("Error fetching Dashboard")
        } finally {
            setFetching(false)
        }
    }

    useEffect(() => {
        fetchDashboard()
    }, [])
    
    if(authLoading || fetching) {
        return <div className='p-5 text-center text-success'>Loading your account...</div>
    }

    const handleDeposit = async (e)=>{
        e.preventDefault()
        setLoading(true)

        try {
            const token = localStorage.getItem("token")
            
            await axios.post('http://localhost:5000/api/transaction/deposit',
                {amount: depositAmount, description: "Manual deposit"},
                {headers: {Authorization: `Bearer ${token}`}}
            )
            
            fetchDashboard()
            setDepositAmount('')
            setIsDepositOpen(false)
            alert('Deposit successful!')
        } catch (error) {
            alert('Deposit failed!')
        }
    }

    return (
        <div>
            <div className="card bg-primary text-white p-4 mb-4">
                <h2>Welcome, {user?.firstname}</h2>
                <h5>Total Balance</h5>
                <h2>${data.balance !== undefined ? data.balance.toLocaleString() : 0}</h2>
            </div>

            <div>
                <button
                onClick={()=> setIsDepositOpen(!isDepositOpen)}
                style={{padding: "10px 20px", backgroundColor: isDepositOpen ? "#ccc" : "#4caf50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer"}}
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

        <TransferForm onTransferSuccess={fetchDashboard}/>
        
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
                        data.transaction.map((tx) => (
                            <tr key={tx._id}>
                                <td>{new Date(tx.createdAt).toLocaleString()}</td>
                                <td>{tx.description}</td>
                                <td className={tx.recipientId === user._id ? "text-success" : "text:danger"}>
                                    {tx.recipientId === user._id ? "+" : "-"}${tx.amount}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="text-center text-muted">No transaction yet</td>
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

            alert("Transfer successful!")
            setRecipientEmail('')
            setAmount('')
            onTransferSuccess()
        } catch (error) {
            alert(error.response?.data?.message || "Transfer failed")
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