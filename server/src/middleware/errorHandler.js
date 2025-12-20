const errorHandler = (error, req, res, next)=>{
    console.log(error.stack)
    res.status(res.statusCode === 200 ? 500 : res.statusCode).json({message: error.message || 'Server error'})
}