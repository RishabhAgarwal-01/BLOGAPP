import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js"

export const create = async(req, res, next) =>{
  if(req.user.isAdmin === true){ //user is the redux state
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

export const getPosts = async (req, res, next)=>{
   try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection =req.query.order === 'asc' ? 1: -1;

      //dynamic query for the search filter operation for posts
      const posts = await Post.find({
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.category && { category: req.query.category }),
        ...(req.query.slug && { slug: req.query.slug }),
        ...(req.query.postId && { _id: req.query.postId }),
        ...(req.query.searchTerm && {
          $or: [
            { title: { $regex: req.query.searchTerm, $options: 'i' } },
            { content: { $regex: req.query.searchTerm, $options: 'i' } },
          ],
        }),
      }) 
      .sort({updatedAt : sortDirection})
      .skip(startIndex)
      .limit(limit);

      //total post
      const totalPosts = await Post.countDocuments();

      //total posts in last month logic
      const now = new Date(); //today
      const oneMonthAgo = new Date(  //month before
        now.getFullYear(),
        now.getMonth()-1,
        now.getDate()
      );

      const lastMonthPosts = await Post.countDocuments({
        createdAt: {$gte: oneMonthAgo}, //last month posts but created at greater than oneMonthAgo
      })
       
      res.status(200).json({
        posts,
        totalPosts,
        lastMonthPosts,
      });

   } catch (error) {
     next(error);
   }
}