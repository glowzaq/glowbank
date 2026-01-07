import rateLimit from 'express-rate-limit'

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        message: "Too many attempts, try again later"
    }
})

export const generalLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100
})