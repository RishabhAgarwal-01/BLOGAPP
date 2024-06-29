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