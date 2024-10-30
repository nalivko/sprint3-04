import { LikeModel, LikeDocument } from "../domain/like.entity";

export const likeQueryRepository = {

    async getLikes() {
        return await LikeModel.find({})
    },

    async findUserLike(authorId: string, commentId: string): Promise<LikeDocument | null> {
        return await LikeModel.findOne({authorId, commentId})
    },

    async getCommentLikesCount(commentId: string): Promise<number> {
        return LikeModel.countDocuments({commentId, status: 'Like'})
    },

    async getCommentDislikesCount(commentId: string): Promise<number> {
        return LikeModel.countDocuments({commentId, status: 'Dislike'})
    },

    async getMyCommentStatus(commentId: string, userId: string): Promise<string> {
        const like = await this.findUserLike(userId, commentId)        
        
        return like ? like.status : "None"
    },
}