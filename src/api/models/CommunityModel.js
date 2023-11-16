import { mongoose, Schema } from "mongoose";


const CommunitySchema = new Schema(
    {
        //image: array(64),
        name: { type: Schema.Types.String },
        description: { type: Schema.Types.String, default: "" }, 
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        members: { type: [ mongoose.Schema.Types.ObjectId ], ref: "User", default: [] },
        posts:{ type: [ mongoose.Schema.Types.ObjectId ], ref: "Post", default: [] }
    }  
)


const CommunityModel = mongoose.model("Community", CommunitySchema);


export default CommunityModel;