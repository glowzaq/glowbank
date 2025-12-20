import jwt from 'jsonwebtoken'

const generateToken = (user)=>{

    const payload = {
        id: user._id,
        role: user.role
    }
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })
}

export default generateToken