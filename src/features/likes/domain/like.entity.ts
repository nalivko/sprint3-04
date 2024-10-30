import mongoose, { model, HydratedDocument } from 'mongoose';
import { LikeDbType } from '../types/likeTypes';

export const LikeSchema = new mongoose.Schema<LikeDbType>({
    createdAt: {type: String, required: true},
    status: {type: String, required: true},
    authorId: {type: String, required: true},
    commentId: {type: String, required: true},
})

export type LikeDocument = HydratedDocument<LikeDbType>
export const LikeModel = mongoose.model<LikeDbType>('likes', LikeSchema)