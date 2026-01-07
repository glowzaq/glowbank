import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
    const {user, loading} = useAuth()

    if (loading || !user){
        return <div>Loading your account...</div>
    }
    const [data, setData] = useState({ balance: 0, transaction: [] })
    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const token = localStorage.getItem('token')
                const res = await axios.get('http://localhost:5000/api/transaction/dashboard-info', {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                })
                setData(res.data)
            } catch (error) {
                console.error("Error fetching Dashboard")
            }
        }
        fetchDashboard()
    }, [])

    return (
        <div>
            <div className="card bg-primary text-white p-4 mb-4">
                <h2>Welcome, {user?.firstname}</h2>
                <h5>Total Balance</h5>
                <h2>${user?.balance?.toLocaleString()}</h2>
            </div>

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
                    data.transaction.map((tx)=>(
                        <tr key={tx._id}>
                            <td>{new Date(tx.createdAt).toLocaleString()}</td>
                            <td>{tx.description}</td>
                            <td className={tx.recipientID === user._id ? "text-success" : "text:danger"}>
                                {tx.recipientID === user._id ? "+" : "-"}${tx.amount}
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

export default Dashboard