import express from 'express';
import {verifyToken} from "../utils/verifyUser.js"
import {createComment, likeComment,getComments, deleteComment} from "../controllers/comment.controller.js"
import { getPostComments } from '../controllers/comment.controller.js';


const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);
router.put('/likeComment/:commentId', verifyToken, likeComment )
router.delete('/deleteComment/:commentId', verifyToken, deleteComment )
router.get('/getcomments',verifyToken, getComments);

export default router;