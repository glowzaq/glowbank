import Transaction from "../models/transactionModel.js"
import User from '../models/userModel.js'

export const getData = async (req, res)=>{
    try {
        const transaction = await Transaction.find({
            $or: [{accountID: req.user._id}, {recipientID: req.user._id}]
        }).sort({createdAt: -1})

        const user = await User.findById(req.user._id)

        res.status(200).json({
            balance: user.balance,
            transactions: transaction
        })
    } catch (error) {
        res.status(500).json({
            message: "Error fetching data"
        })
    }
}