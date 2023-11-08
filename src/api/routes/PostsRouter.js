import { Router } from "express";
import PostsController from "../controllers/PostsController.js";
import verifyToken from "../middleware/verifyToken.js";


const PostsRouter = new Router();

PostsRouter
.get('/', PostsController.getPosts)
.get('/recommended', PostsController.getRecommendedPosts)
.get('/search', PostsController.searchPosts)
.post('/create', verifyToken, PostsController.createPost)

.get('/:id', PostsController.getPost)
.post('/:id/edit', PostsController.editPost)
.post('/:id/delete', verifyToken, PostsController.deletePost)
.post('/:id/like', verifyToken, PostsController.likePost)
.post('/:id/comment', verifyToken, PostsController.commentPost)
.post('/:id/delete-comment', verifyToken, PostsController.deleteComment)

export default PostsRouter;