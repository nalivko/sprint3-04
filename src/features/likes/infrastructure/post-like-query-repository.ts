import { NewestLike } from "../../posts/types/posts-types";
import { userQueryRepository } from "../../users/usersQueryRepository";
import { PostLikeModel, PostLikeDocument } from "../domain/post.like.entity";

export const postLikeQueryRepository = {

    async getPostLikes() {
        return await PostLikeModel.find({})
    },

    async findUserPostLike(authorId: string, postId: string): Promise<PostLikeDocument | null> {
        return await PostLikeModel.findOne({ authorId, postId })
    },

    async getCommentLikesCount(postId: string): Promise<number> {
        return PostLikeModel.countDocuments({ postId, status: 'Like' })
    },

    async getCommentDislikesCount(postId: string): Promise<number> {
        return PostLikeModel.countDocuments({ postId, status: 'Dislike' })
    },

    async getMyCommentStatus(postId: string, userId: string): Promise<string> {
        const like = await this.findUserPostLike(userId, postId)

        return like ? like.status : "None"
    },

    async getLastThreeLikes(postId: string): Promise<NewestLike[] | []> {
        const likes = await PostLikeModel.find({ postId, status: 'Like' })
            .sort({ createdAt: -1 })
            .limit(3)

        // const res = likes.map(async like => {
        //     const user = await userQueryRepository.getUserById(like.authorId)
        //     return {
        //         addedAt: like.createdAt,
        //         userId: like.authorId,
        //         // login: 'login'
        //         login: user!.login
        //     }
        // })

        const res = await Promise.all(likes.map(async like => {
            const user = await userQueryRepository.getUserById(like.authorId);
            return {
                addedAt: like.createdAt,
                userId: like.authorId,
                login: user!.login// Handle the case where user might be null
            };
        }));

        return res
    }
}