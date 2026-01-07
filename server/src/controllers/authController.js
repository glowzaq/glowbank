import User from '../models/userModel.js'
import Account from '../models/accountModel.js'
import bcrypt from 'bcryptjs'
import generateToken from '../utils/generateToken.js'


export const register = async (req, res)=>{
    try {
        const { firstname, lastname, email, password, role } = req.body

        if (!firstname || !lastname || !email || !password){
            return res.status(400).json({message: 'All fields are required'})
        }
        
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
        if(!passwordRegex.test(password)){
            return res.status(400).json({message: 'Password must contain uppercase, lowercase, number and special character'})
        }
        if(password.length < 8){
            return res.status(400).json({message: 'Password must be at least 8 characters'})
        }

        const existingUser = await User.findOne({email})
        if (existingUser){
            return res.status(400).json({message: 'User already exists'})
        }else{
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(password, salt)

            const newUser = await User.create({
                firstname,
                lastname,
                email,
                password: hashed,
            })

            const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString()

            await Account.create({
                userId: newUser._id,
                accountType: 'Current',
                accountNumber: accountNumber,
                balance: 0
            })

            res.status(200).json({
                message: 'User registered and Account Created Successfully',
                user: { id: newUser._id, email: newUser.email }
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error.message})
    }
}

export const login = async (req, res)=>{
    try {
        const {email, password} = req.body
        const existing = await User.findOne({email})
        if (!existing){
            return res.status(400).json({message: 'Login Failed! Invalid credentials'})
        }
        const matched = await bcrypt.compare(password, existing.password)
        if (!matched){
            return res.status(400).json({message: 'Login Failed! Invalid credentials'})
        }

        const token = generateToken(existing._id)
        res.status(201).json({
            message: 'Login successful',
            user: {
                id: existing._id,
                firstname: existing.firstname,
                email: existing.email
            },
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error, try again later", error: error.message})
        
    }
}