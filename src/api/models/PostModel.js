import { Schema, model } from "mongoose"

const PostSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' }, 
    communityId: { type: Schema.Types.ObjectId, ref: "Community", default: null }, //null if post was created by a user but not by a community
    title: { type: String, default: "" },
    text: { type: String, default: "" },
    likes: { type: [Schema.ObjectId], default: [] },
    likesCount: { type: Number, default: 0 },
    comments: [ { userId: Schema.ObjectId, text: String, creationDate: Schema.Types.Date  } ],
    images: { type: [String], defautl: [] }, 
    created: { type:  Schema.Types.Date, default: new Date() },
    lastModified: { type:  Schema.Types.Date, default: new Date() },
  });
  
  
  const PostModel = model('Post', PostSchema);
  export default PostModel;