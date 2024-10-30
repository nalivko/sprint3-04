import mongoose from "mongoose";
import { WithId } from "mongodb";
import { BlogDbType } from "../../../db/blog-db-type";

const PostSchema = new mongoose.Schema<WithId<BlogDbType>>({
    name: {type: String, required: true},
    description: {type: String, required: true},
    websiteUrl: {type: String, required: true},
    createdAt: {type: String, required: true},
    isMembership: {type: Boolean, required: true}
})

export const PostModel = mongoose.model('posts', PostSchema)