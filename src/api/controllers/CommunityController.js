import PostModel from "../models/PostModel.js";

class CommunityController {
    constructor(){}
  
    async create(req, res) {
        try {
            const { userId } = req.user;
            console.log("Creating community");

            res.status(200).json({ message: "Community has been created" });
        } catch (err) {

        }
    }
  
    async delete(req, res) {
        const { userId } = req.user;
    }
    
    async getPosts(req, res) {
        const { step, page } = req.body ;
    }  
  
    async createPost(req, res) {
        try {
            const { userId } = req.user;
            const communityId = req.params.id;
    
            const { title, text, photo } = req.body;
      
            if(!title) {
                res.status(400).json({ message: "Title is required" });
            }
            
            const newPost = await PostModel.create({  title, text, photo, userId });
            const community = findOneAndUpdate({ _id: communityId }, { $push: { posts: newPost._id }});
            
            res.status(200).json({ post: newPost, message: "Post successfully created" })
        } catch(err) {
            res.status(500).json({ message: "Error when creating post" });      
        }
    }
  
    async deletePost(req, res) {
        const { userId } = req.user;
    
    }
  
    async addMember(req, res) {
        try {
            const { userId } = req.user?.userId;
      
            const { communityId } = req.params;
            const community = await findOneAndUpdate({ _id: communityId }, { $addToSet: { members: userId }});
      
            res.status(400).json({ community, message: "Meber successfully added" });
      
        } catch (err) {
            res.status(500).json({ message: "Ertor when adding a member to community" });
        } 
    }
  
    async removeMember(req, res) {
        try {
            const userId = req.user?.userId;
            const { communityId } = req.params;
      // add as to a set
            const community = await findAndUpdate({ _id: userId }, { $pull: { members: {_id: userId }}});
      
            res.status(200).json({ community, message: "Member successfully removed" })
        } catch (err) {
            res.status(500).json({ message: "Ertor when adding a member to community" });
        }
    }
}

export default new CommunityController();