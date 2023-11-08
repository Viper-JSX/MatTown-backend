import { Timestamp, ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    id: ObjectId,
    firstname: {
        type: String,
        required: [ true, "Provide the firstname" ]
    },

    lastname: {
        type: String,
        required: [ true, "Provide the lastname" ]
    },

    email: {
        type: String,
        required: true
    },

    passwordHash: {
        type: String,
        required: true
    },

    posts: [ObjectId],
    subscribtions: {ObjectId},
    followers: [ObjectId],
    chats: [ObjectId],
    prefferedTags: [String],

    profileIcon: {
        data: Buffer,
        contentType: String
    },

    profileImage: {
        data: Buffer,
        contentType: String
    },

    lastSeen: Date,
    registerDate: Date,

});


const UserModel = model("User", UserSchema);

export default UserModel;