import mongoose from "mongoose";
import { WithId } from "mongodb";
import { CommentDbType } from "../../../db/comment-db-type";

const CommentSchema = new mongoose.Schema<WithId<CommentDbType>>({
    postId: {type: String, required: true},
    content: {type: String, required: true},
    commentatorInfo: {
        userId: {type: String, required: true},
        userLogin: {type: String, required: true}
    },
    createdAt: {type: String, required: true},
    // likes: [{type: Schema.Types.ObjectId, ref: 'likes'}]
})

export const CommentModel = mongoose.model('comments', CommentSchema)