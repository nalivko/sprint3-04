import mongoose, { model, HydratedDocument } from 'mongoose';
import { PostLikeDbType } from '../types/likeTypes';

export const PostLikeSchema = new mongoose.Schema<PostLikeDbType>({
    createdAt: {type: String, required: true},
    status: {type: String, required: true},
    authorId: {type: String, required: true},
    postId: {type: String, required: true},
})

export type PostLikeDocument = HydratedDocument<PostLikeDbType>
export const PostLikeModel = mongoose.model<PostLikeDbType>('postLikes', PostLikeSchema)