import Transaction from "../models/transactionModel.js"
import User from '../models/userModel.js'
import Account from '../models/accountModel.js'
import mongoose from 'mongoose'

export const getData = async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.user._id })

        const transaction = await Transaction.find({
            $or: [{ accountId: req.user._id }, { recipientId: req.user._id }]
        }).sort({ createdAt: -1 })

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

export const transferMoney = async (req, res) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        const { recipientEmail, amount } = req.body
        const senderUserId = req.user._id

        if (amount <= 0) throw new Error("Amount must be greater than zero")

        const senderAccount = await Account.findOne({ userId: senderUserId }).session(session)
        const receiver = await User.findOne({ email: recipientEmail }).session(session)

        if (!receiver) throw new Error("Recipient not found");


        const receiverAccount = await Account.findOne({ userId: receiver._id }).session(session)


        if (senderAccount.balance < amount) throw new Error("Insufficient funds");


        senderAccount.balance -= Number(amount)
        receiverAccount.balance += Number(amount)

        await senderAccount.save({ session })
        await receiverAccount.save({ session })

        await Transaction.create([{
            accountId: senderUserId,
            recipientId: receiver._id,
            amount: amount,
            status: "Completed",
            type: "Transfer",
            description: `Transfer to ${receiver.firstname}`
        }], { session })

        await session.commitTransaction()
        session.endSession()

        res.status(200).json({
            message: "Transfer successful"
        })
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        res.status(500).json({
            message: "Transfer failed",
            error: error.message
        })
    }
}

export const depositMoney = async (req, res) => {
    const { amount, description } = req.body;
    const userId = req.user._id;

    try {
        if (!amount || amount <= 0) {
            return res.status(400).json({
                message: "Kindly enter a valid amount"
            })
        }

        const account = await Account.findOne({ userId })

        if (!account) {
            return res.status(404).json({
                message: "Account not found"
            })
        }

        account.balance += Number(amount)

        const newTransaction = new Transaction({
            accountId: userId,
            recipientId: userId,
            status: "Completed",
            description: description || "Account deposit",
            type: "Deposit",
            amount: amount
        })

        await newTransaction.save()
        await account.save()

        res.status(200).json({
            message: "Deposit successful",
            newBalance: account.balance
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Deposit failed",
            error: error.message
        })
    }
}