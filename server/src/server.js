import  app from "./app.js"
import dotenv from 'dotenv'
import connectDB from "./config/db.js"
dotenv.config()
connectDB()

const PORT = process.env.PORT || 5000
app.listen(PORT, (error)=>{
    if (error){
        console.log('Unable to start server');
    }else{
        console.log(`Server started successfully on port ${PORT}`);        
    }
})