import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export const protect = async (req, res, next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1]
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decode.id).select('-password')
            return next()
        } catch (error) {
            console.log("Authentication error", error)
            res.status(400).json({message: 'Token failed'})
        }
    }
    if(!token){
        res.status(401).json({message: 'Not authorized, no token'})
    }
}