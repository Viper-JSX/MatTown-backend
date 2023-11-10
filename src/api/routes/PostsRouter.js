import { Router } from "express";
import PostsController from "../controllers/PostsController.js";
import verifyToken from "../middleware/verifyToken.js";
import optionallyVerifyToken from "../middleware/optionallyVerifyToken.js";
//import upload from "../middleware/upload.js";


const PostsRouter = new Router();

PostsRouter
.get('/', PostsController.getPosts)
.get('/recommended', PostsController.getRecommendedPosts)
.get('/search', PostsController.searchPosts)
.post('/create', verifyToken, /* upload, */ PostsController.createPost)

.get('/:id', optionallyVerifyToken, PostsController.getPost) // If user logged-in then post tags will get recorded to user views statistic
.post('/:id/edit', verifyToken, PostsController.editPost)
.post('/:id/delete', verifyToken, PostsController.deletePost)
.post('/:id/like', verifyToken, PostsController.likePost)
.post('/:id/comment', verifyToken, PostsController.commentPost)
.post('/:id/delete-comment', verifyToken, PostsController.deleteComment)

export default PostsRouter;