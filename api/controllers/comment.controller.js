import { errorHandler } from "../utils/error.js";
import Comment from "../models/comment.model.js"

export const createComment = async(req, res, next)=>{
    try {
        const {content, postId, userId} = req.body;
        if(userId !== req.user.id){
            return next(errorHandler(403, "You are not allowed to create the comment"))
        }
        
        const newComment = new Comment({
            content,
            postId,
            userId,
        })
        await newComment.save();

        res.status(200).json(newComment)

    } catch (error) {
        next(error);
    }
}
export const getPostComments= async(req, res, next)=>{
  try {
    const comments = await Comment.find({postId: req.params.postId})
    .sort({createdAt: -1});
    
    res.status(200).json(comments);
  } catch (error) {
    next(error)
  }
}

export const likeComment= async(req, res, next)=>{
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, 'Comment not found'));
    }
    const userIndex = comment.likes.indexOf(req.user.id); //to check if the person has already liked this post, 
    //the likes is array and will store the useId of the user liking the comment. if not present indexOf() will give -1 otherwise the index
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
}

export const deleteComment = async(req, res, next)=>{
  try {
   const comment = await Comment.findById(req.params.commentId);
   if(!comment){
    return next(errorHandler(404, "Comment not found"));
   }
   if(comment.userId != req.user.id && req.user.isAdmin === false){
    return next(errorHandler(403, "You are not allowed to delete this comment"))
   }
   await Comment.findByIdAndDelete(req.params.commentId)
   res.status(200).json("comment is deleted");
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const getComments = async(req,res,next)=>{
  if(req.user.isAdmin ===false)
    return next(errorHandler(403,"No allowed to get all comments"))
  try {
   const startIndex= parseInt(req.query.startIndex) || 0;
   const limit = parseInt(req.query.limit) || 9;
   const sortDirection = req.query.sort === 'desc' ? -1 : 1;
   
   const comments = await Comment.find()
   .sort({createdAt: sortDirection})
   .skip(startIndex)
   .limit(limit)

   const totalComments= await Comment.countDocuments();
   
      const now = new Date(); //today
      const oneMonthAgo = new Date(  //month before
        now.getFullYear(),
        now.getMonth()-1,
        now.getDate()
      );

      const lastMonthComments = await Comment.countDocuments({
        createdAt: {$gte: oneMonthAgo}, //last month posts but created at greater than oneMonthAgo
      })

     return res.status(200).json({comments, totalComments, lastMonthComments})

  } catch (error) {
    next(error);
  }
}