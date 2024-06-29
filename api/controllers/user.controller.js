import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res)=>{
    res.json({message :"API is working"});
};

export const updateUser= async (req, res, next)=>{
//   console.log(req.user)
if(req.user.id  !== req.params.userId){
    return next(errorHandler(403, 'You are not allowed to update'));
}
if(req.body.password){
 if(req.body.password.length <6){
    return next(errorHandler(400, 'Password must be greater than 6 characters'));
 }
 req.body.password = bcryptjs.hashSync(req.body.password, 10);
}
 if(req.body.username){
    if(req.body.username.length < 7 || req.body.username.length >20){
        return next(errorHandler(400, 'username must be greater than 7 and less than 20'));
    }
    if(req.body.username.includes(' ')){
        return next(errorHandler(400, 'username must not contain lowercase'));
    }
    if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
        return next(errorHandler(400, 'username must contain only letter'));
    }

    try {
       const updatedUser = await User.findByIdAndUpdate(req.params.userId,{
        $set:{
            username: req.body.username,
            email: req.body.email,
            profilePicture:req.body.profilePicture,
            password:req.body.password,
        },
       }, {new: true});
       const {password, ...rest}= updatedUser._doc;
       res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
 }
}

export const deleteUser = async(req, res, next)=>{
    if(req.user.isAdmin ==false  && req.user.id !== req.params.userId){
        return next(errorHandler(403, "you're not allowed to delete the account"));
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        return res.status(200).json("User has been deleted");
    } catch (error) {
        next(error);
    }
}

export const signout = (req, res, next)=>{
    try {
        res.clearCookie('access_token').status(200).json("user signout");
    } catch (error) {
        next(error);
    }
}

export const getUsers =async(req, res, next)=>{
    if(req.user.isAdmin === false){
        return next(errorHandler(403, "You are not allowed to see all the users"));
    }
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'asc' ? 1:-1;

        const users = await User.find()
        .sort({createdAt : sortDirection})
        .skip(startIndex)
        .limit(limit);

        const usersWithoutPassword = users.map((user)=>{
            const {password, ...rest} = user._doc;
            return rest;
        })

        const totalUsers = await User.countDocuments();

        const now = new Date(); //today
      const oneMonthAgo = new Date(  //month before
        now.getFullYear(),
        now.getMonth()-1,
        now.getDate()
      );

      const lastMonthUsers = await User.countDocuments({
        createdAt: {$gte: oneMonthAgo}, //last month posts but created at greater than oneMonthAgo
      })

      res.status(200).json({
        users: usersWithoutPassword,
        totalUsers,
        lastMonthUsers,
      });

    } catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next)=>{
   try {
     const user = await User.findById(req.params.userId)
      if(!user){
        return next(errorHandler(404, "user not found"));
      }
     const {password, ...rest} = user._doc;
     res.status(200).json(rest);
   } catch (error) {
    next(error);
   }
}