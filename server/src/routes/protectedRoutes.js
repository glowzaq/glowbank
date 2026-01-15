import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import accountModel from '../models/accountModel.js'

const router = express.Router()
router.get("/protected", protect, async (req, res)=>{
    // res.json({
    //     message: 'Access granted',
    //     user: req.user
    // })
    try {
        const userAccount = await accountModel.findOne({ userId: req.user._id });

        res.json({
            _id: req.user._id,
            firstname: req.user.firstname,
            lastname: req.user.lastname,
            email: req.user.email,
            accountNumber: userAccount ? userAccount.accountNumber : "N/A"
        });
    } catch (error) {
        res.status(500).json({ message: "Authcheck failed" });
    }
})

export default router