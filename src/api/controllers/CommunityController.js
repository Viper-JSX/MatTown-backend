import CommunityModel from "../models/CommunityModel.js";
import PostModel from "../models/PostModel.js";

class CommunityController {
    constructor(){}
  
    async create(req, res) {
        try {
            const { userId } = req.user;
            const { image, name, description } = req.body;

            if (!name) {
                return res.status(422).json({ message: "Community name is required" });
            }

            const nameAlreadyUsed = await CommunityModel.countDocuments({ name }) > 0;

            if (nameAlreadyUsed) {
                return res.status(422).json({ message: "Community with this name already exists" });
            }

            const community = await CommunityModel.create({ name, description, owner: userId });

            res.status(200).json({ community, message: "Community has been created" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Error when creating community" });
        }
    }
  
    async edit(req, res) {
        try {
            const { userId } = req.user;
            const { id } = req.params;
            const { name, image, description } = req.body;
            const community = await CommunityModel.findById(id);
          
            if (!community) {
              return res.status(404).json({ message: "Community with given id does not exist" });
            }
          
            if (community.owner.toString() !== userId) { //user is not owner of this community
              return res.status(403).json({ message: "User is not owner of this community" }); // Forbidden
            }
          
            if (!name) {
                return res.status(422).json({ message: "Community name is required" });
            }

            const updatedCommunity = await CommunityModel.findOneAndUpdate({ _id: id }, { name, /*image,*/ description }, { returnOriginal: false });
            res.status(200).json({ updatedCommunity, message: "Community has been successfully updated" });
          
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: "Error occured during updating community" })
          }
    }

    async delete(req, res) {
        try {
            const { userId } = req.user;
            const { id } = req.params;
          
            const community = await CommunityModel.findById(id);
          
            if (!community) {
              return res.status(404).json({ message: "Community with given id does not exist" });
            }

            if (community.owner.toString() !== userId) { //user is not owner of this community
              return res.status(403).json({ message: "User isnot owner of this community" }); // 403 or 401 - forbidden
            }
          
            const result = await CommunityModel.deleteOne({ _id: id });

            res.status(200).json({ message: "Community successfully deleted" });
          } catch (err) {
            res.status(500).json({ message: "Error when deleting a community" });
          }
    }
    
    async getPosts(req, res) {
        const { id } = req.params;
        const { step, page } = req.body;
    }  
  
    async createPost(req, res) {
        try {
            const { userId } = req.user;
            const communityId = req.params.id;
            const { title, text, photo } = req.body;
            const communityOwnerId = await CommunityModel.findById( communityId, { owner: 1 });

            if (userId !== communityOwnerId.owner.toString()) {
                return res.status(403).json({ message: "User is not owner of this community. Please, contact the creator of this community to make changes you want" });
            }

            if (!title) {
                return res.status(422).json({ message: "Title is required" });
            }
            
            const newPost = await PostModel.create({  title, text, /*photo */ userId });
            const updatedCommunity = await CommunityModel.findOneAndUpdate({ _id: communityId }, { $push: { posts: newPost._id }});
            
            res.status(200).json({ community: updatedCommunity, post: newPost, message: "Post successfully created" })
        } catch(err) {
            console.log(err);
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
            res.status(500).json({ message: "Erкor when adding a member to community" });
        }
    }
}

export default new CommunityController();