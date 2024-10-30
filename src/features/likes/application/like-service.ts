import { likeRepository } from "../infrastructure/like-repository"
import { LikeDataType } from "../types/likeTypes"
import { LikeModel } from "../domain/like.entity"
import { likeQueryRepository } from "../infrastructure/like-query-repository"

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
    }
}