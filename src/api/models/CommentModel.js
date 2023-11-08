import { Schema, Model, Date } from "mongoose";

const CommentSchema = new Schema(
    {
        userId: Schema.ObjectId,
        text: String,
        creationDate: { type: Schema.Types.Date, default: new Date() }
    }
);

const CommentModel = Model(CommentSchema, "comment");

//export default CommentModel;