import express from 'express';
import {verifyToken} from "../utils/verifyUser.js"
import {createComment, likeComment, deleteComment} from "../controllers/comment.controller.js"
import { getPostComments } from '../controllers/comment.controller.js';


const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);
router.put('/likeComment/:commentId', verifyToken, likeComment )
router.delete('/deleteComment/:commentId', verifyToken, deleteComment )
export default router;