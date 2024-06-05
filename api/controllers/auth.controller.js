import User from '../models/user.model.js';
import bcryptjs from "bcryptjs";
import { errorHandler } from '../utils/error.js';


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