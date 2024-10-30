import { ObjectId } from "mongodb";
import { CommentDbType } from "../../../db/comment-db-type";
import { commentsCollection } from "../../../db/mongodb";
import { CommentInputModel, CommentViewModel } from "../types/commentsTypes";

export const commentsRepository = {
    async createComment(newComment: CommentDbType): Promise<CommentViewModel> {
        await commentsCollection.insertOne(newComment)

        const comment = this.mapComment(newComment)
        
        comment.likesInfo = {
            likesCount: 0,
            dislikesCount: 0,
            myStatus: "None"
        }

        return comment
    },

    async updateComment(id: string, newData: CommentInputModel): Promise<boolean> {
        let result = await commentsCollection.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    content: newData.content
                }
            }
        )

        return result.matchedCount === 1
    },

    async deleteComment(id: string): Promise<boolean> {
        let result = await commentsCollection.deleteOne({ _id: new ObjectId(id) })

        return result.deletedCount === 1
    },

    async getCommentById(id: string) {
        let comment = await commentsCollection.findOne({_id: new ObjectId(id)})
        
        return comment ? this.mapComment(comment) : null
    },

    mapComment(comment: CommentDbType): CommentViewModel {
        return {
            id: comment._id!.toString(),
            content: comment.content,
            commentatorInfo: comment.commentatorInfo,
            createdAt: comment.createdAt,
        }
    }
}