import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes  from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import cookieParser from "cookie-parser";
import commentRoutes from './routes/comment.route.js';

dotenv.config();

const app = express();

app.use(express.json()); //middleware to parse the json data
app.use(cookieParser()); //middleware for parsing the cookies

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("MongoDB connected");
}).catch((error)=>{
    console.log(error);
})


app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

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
