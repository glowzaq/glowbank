import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    accountType: {
        type: String,
        enum: ['Current', 'Savings'],
        required: true
    },
    accountNumber: {
        type: Number,
        unique: true,
        required: true
    },
    balance: {
        type: Number,
        default: 0,
        min: 0
    }
}, {timestamps: true})

export default mongoose.model('Account', accountSchema)