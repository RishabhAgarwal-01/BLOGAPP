import User from '../models/user.model.js';
import bcryptjs from "bcryptjs";
import { errorHandler } from '../utils/error.js';
import jwt from "jsonwebtoken";

export const signup = async(req, res, next)=>{
    const {username, email, password} =req.body;

    if(!username || !email || !password || username ==='' || email==='' || password===''){
       next(errorHandler(400, 'All fields are required')); //custom error using the errorHandler in ./util.js/error.js
                                                           //and passing it to the middleware in index.js to return a
                                                           //json res.
    }

    const hashpassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashpassword,
    });
     try {
        await newUser.save();
        res.json('signup successful');
     } catch (error) {
       next(error); //error from system, not the custom one also getting passed to the middleware in index.js
     }
}

export const signin = async (req, res, next)=>{
  const {email, password} = req.body;
  
  if(!email || !password || email==="" || password ===''){
       next(errorHandler(400, "All fields are requires"));
  }

  try {
     const validUser = await User.findOne({email});
     if(!validUser){
      return next(errorHandler(404, "User not found"));
     }
     
     const validPassword = bcryptjs.compareSync(password, validUser.password);
     if(!validPassword){
      return next(errorHandler(400, "Invalid Password"));
     }
     
     const token = jwt.sign({id: validUser._id, isAdmin: validUser.isAdmin,}, process.env.JWT_SECRET);
      
     //this is done so that when sending response back to the user, we don't send the password along with it.
     //password: pass will remove the password from the object, ...rest will copy the rest of the data from the validUser._doc which is the document instance in the mongodb
     const {password: pass, ...rest}= validUser._doc;
    
     res.status(200).cookie('access_token', token,{ 
        httpOnly: true}).json(rest);

    } catch (error) {
      next(error)
  }
}

export const google = async (req, res, next)=>{
    const {email, name, googlePhotoUrl} = req.body;
    try {
      const user = await User.findOne({email});
      if(user){
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        const {password, ...rest} = user._doc;
        res.status(200).cookie('access_token', token, {httpOnly: true}).json(rest);
      }
      else{
        const generatedPassword= Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8); //generating the temp password for the users signing in with the google auth
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({
          username: name.toLowerCase().split(' ').join('')+ Math.random().toString(9).slice(-4),
          //FirstName LastName => firstnamelastname1234 lowercase, merging the name and making it unique with numbers
          email,
          password: hashedPassword,
          profilePicture: googlePhotoUrl,
        });
        await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    }
    } catch (error) {
      next(error);
    }
}