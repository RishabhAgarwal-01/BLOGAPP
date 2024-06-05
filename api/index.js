import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes  from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();

app.use(express.json()); //middleware to parse the json data

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("MongoDB connected");
}).catch((error)=>{
    console.log(error);
})


app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);


//middleware to handle the errors
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message= err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

app.listen(8000, ()=>{
    console.log("Server is running on port 8000");
});
