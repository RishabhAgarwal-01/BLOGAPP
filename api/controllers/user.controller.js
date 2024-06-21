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
    if(req.user.id !== req.params.userId){
        return next(errorHandler(403, "you're not allowed to delete the account"));
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        return res.status(200).json("User has been deleted");
    } catch (error) {
        next(error);
    }
}
