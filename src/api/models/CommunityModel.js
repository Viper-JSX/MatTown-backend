import { mongoose, Schema } from "mongoose";


const CommunitySchema = new Schema(
  {
    //image: array(64),
    name: { type: Schema.Types.String },
    owner: { type:mongoose.Schema.Types.ObjectId, ref: "User" },
    members: { type:mongoose.Schema.Types.ObjectId, ref: "User" },
    posts:{ type:mongoose.Schema.Types.ObjectId, ref: "Post" }
  }  
)


const CommunityModel = mongoose.model(CommunitySchema, "Community");


export default CommunityModel;