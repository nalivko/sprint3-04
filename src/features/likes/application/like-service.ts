import { likeRepository } from "../infrastructure/like-repository"
import { postLikeRepository } from "../infrastructure/post-like-repository"
import { LikeDataType, PostLikeDataType } from "../types/likeTypes"
import { LikeModel } from "../domain/like.entity"
import { PostLikeModel } from "../domain/post.like.entity"
import { likeQueryRepository } from "../infrastructure/like-query-repository"
import { postLikeQueryRepository } from "../infrastructure/post-like-query-repository"

export const likeService = {
    async setCommentLike(data: LikeDataType) {
        const likeData = {
            status: data.status,
            authorId: data.authorId,
            commentId: data.commentId,
            createdAt: new Date().toISOString()
        }

        let like = await likeQueryRepository.findUserLike(data.authorId, data.commentId)

        if (!like) {
            like = new LikeModel(likeData)
        } else {
            like.status = data.status
        }

        await likeRepository.save(like)
    },

    async setPostLike(data: PostLikeDataType) {
        const likeData = {
            status: data.status,
            authorId: data.authorId,
            postId: data.postId,
            createdAt: new Date().toISOString()
        }

        let like = await postLikeQueryRepository.findUserPostLike(data.authorId, data.postId)

        if (!like) {
            like = new PostLikeModel(likeData)
        } else {
            like.status = data.status
        }

        await postLikeRepository.save(like)
    }
}