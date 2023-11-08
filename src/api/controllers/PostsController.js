import { mongoose } from "mongoose";
import PostModel from "../models/PostModel.js";


class PostsController {
    async getPost(req, res){
        try {
            const { id } = req.params;
            const idIsValid = mongoose.Types.ObjectId.isValid(id);

            if (!idIsValid) {
                return res.json({ message: "Provided post id is not valid" });
            }

            const post = await PostModel.findById(id);

            if (!post) {
                return res.status(404).json({ message: "Post does not exist" });
            }

            res.status(200).json({ post });
        } catch (err) {
            //console.log("Error when getting post");
            console.log(err)
            res.json({ message: "Error during getting a post" });
        }
    }
  
    async getPosts(req, res){
        //not implement
        res.json({ message: "Get posts" });
        try {
          const { userId } = req.body;
        } catch(err) {
          console.log("Error when getting posts");
        }
    }
  
    async getRecommendedPosts(req, res) {
        try {
            res.json({ message: "Get recommended posts" });
            //const userId = req.user._id;
            //const user = await PostModel.findOne({ _id: userId });
            //const { prefferedTags } = user;
        } catch (err) {
            console.log('Error during getting recommended posts');
        }
    }
  
    async searchPosts(req, res){
        try {
            const s = req.query.s || ""; //currently completed. Make paggination in the future
            const posts = await PostModel.find(
                { 
                    $or: 
                        [ 
                            { title: { $regex: s, $options: "i" } },
                            { text: { $regex: s, $options: "i" } },
                        ]
                }
            );
            res.status(200).json({ posts });
        } catch (err) {
            //console.log('Error during searching posts', err);
            res.json({ message: "Error during posts search" });
        }
    
  }
  
    async createPost(req, res){
        try {
            const { title, text, images } = req.body;
            console.log("POst create", req.user);
            const userId = req.user.userId;
            const newPost = await PostModel.create({ userId, title, text, images });
            res.json({ post: newPost });
        } catch (err) {
            console.log("Error during creating post", err);
            res.json({ message: "Error during post creation" });
        }
    }
  
    async editPost(req, res) {
        try {
//            const userId = req.user._id;
//            const { postId, photo, title, content, text } = req.body;
//            const post = await PostModel.find({ _id: postId });
//      
//            if (userId != post.creatorId) {
//              res.json({ message: "This post does not belong to this user" });
//            }
//      
//            if (!post) {
//              return res.status(403).json({ message: "Post does not exist"});
//            }
//      
//            //change the post
//            if (!title) {
//              res.json({ message: 'Title cannot be empty' });
//            }
//      
//            post.photo = photo;
//            post.title = title;
//            post.content = content;
//            post.save();
//      
//            res.json({ post });
        } catch (err) {
            console.log('Error during post editing');
        }
    }
  
    async deletePost(req, res){
        try {
            const postId = req.params.id;
            const userId = req.user.userId;
    
            const post = await PostModel.findOne({ _id: postId });

            if (!post) {
                return res.json({ message: "Post does not exist" });
            }


            if (post.userId.toString() !== userId) { //user is not a creator of given post
                return res.json({ message: "Current user is not a creator of this post" });
            }
//      
            const result = await PostModel.deleteOne({ _id: postId });
            res.json({ message: "Post has been deleted" });
        } catch (err) {
            res.json({ message: "Error during post delete" });
            console.log("Error during post delete", err);
        }
    }

    async likePost(req, res) {
        const postId = req.params.id;
        const userId = req.user?.userId;

        if (!userId) {
            return res.json({ message: "Wrong user ID" });
        }

        const post = await PostModel.findById(postId);
        const postAlreadyLiked = post.likes.indexOf(userId) !== -1;

        if (postAlreadyLiked) {
            post.likes.splice(post.likes.indexOf(userId), 1);
            post.likesCount -= 1;
            await post.save();
            return res.json({ message: "Post has been unliked", post });
        }

        post.likes.push(userId);
        post.likesCount += 1;
        await post.save();

        return res.json({ message: "Post has been liked", post });
    }


    async commentPost(req, res) {
        const postId = req.params.id;
        const userId = req.user?.userId;

        const post = await PostModel.findById(postId);

        if (!post) {
            return res.json({ message: "Post does not exist" });
        }

        //const comment = CommentModel.create({ text: "Comment" }); 
        const comment = { userId, text: "Comment text", creationDate: new Date() }; //Change it to CommentModel;
        post.comments.push(comment);
        await post.save();


        res.json({ message: "Comment added", post });

    }

    async deleteComment(req, res) {
        const user = req.user;
        const postId = req.params.id;
        const { commentId } = req.body; //redo this line

        const post = await PostModel.findById(postId);
        const comment = post.comments.find((element) => element._id.toString() === commentId);

        if (!post) {
            return res.json({ message: "Post does not exist, or wrong post id was provided" });
        }

        if (!comment) {
            return res.json({ message: "Comment does not exist, or wrong comment id was provided" });
        }

        if (!comment.userId !== user._id) { //If user is a creator of this comment
            return res.json({ message: "User is not a creator of this comment"});
        }

        await PostModel.updateOne({ _id: postId }, { $pull: { comments: { _id: commentId } } }); //implement return updated document

        res.send({ message: "Comment has been removed", post });
    }
}

export default new PostsController;