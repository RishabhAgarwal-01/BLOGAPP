import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js"

export const create = async(req, res, next) =>{
  if(!req.user.isAdmin){ //user is the cookie
    return next(errorHandler(403, "Not authorized to create the post"));
  }

  if(!req.body.title || !req.body.content){
    return next(errorHandler(403, "Please provide all required fields"));
  }

  const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');

  const newPost = new Post({
    ...req.body, //make sure the fields passed from the front end has the right key: value pairs
    slug, 
    userId: req.user.id
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
     next(error);
  }
}