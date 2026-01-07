import Transaction from "../models/transactionModel.js"
import User from '../models/userModel.js'
import Account from '../models/accountModel.js'

export const getData = async (req, res)=>{
    try {
        const account = await Account.findOne({userId: req.user._id})

        const transaction = await Transaction.find({
            $or: [{accountId: req.user._id}, {recipientId: req.user._id}]
        }).sort({createdAt: -1})

        res.status(200).json({
            balance: account ? account.balance : 0,
            transaction: transaction
        })
    } catch (error) {
        res.status(500).json({
            message: "Error fetching data"
        })
    }
}

export const transferMoney = async (req, res)=>{
    const {recipientEmail, amount} = req.body
    const senderUserId = req.user._id
    try {
        const senderAccount = await Account.findOne({userId: senderUserId})
        const receiver = await User.findOne({email: recipientEmail})

        if (!receiver){
            return res.status(404).json({
                message: "User with this email not found"
            })
        }

        const receiverAccount = await Account.findOne({userId: receiver._id})


        if (senderAccount.balance < amount){
            return res.status(404).json({
                message: "Insufficient funds"
            })
        }

        senderAccount.balance -= Number(amount)
        receiverAccount.balance += Number(amount)

        const newTransaction = new Transaction({
            accountId: senderUserId,
            recipientId: receiver._id,
            amount: amount,
            status: "Completed",
            type: "Transfer",
            description: `Transfer to ${receiver.firstname}`
        })

        await senderAccount.save()
        await receiverAccount.save()
        await newTransaction.save()

        res.status(200).json({
            message: "Transfer successful", newTransaction
        })
    } catch (error) {
        res.status(500).json({
            message: "Transfer failed",
            error: error.message
        })
    }
}