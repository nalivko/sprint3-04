import { setCommentsQueryParams } from "../../../helpers/helper"
import { ResultStatus } from "../../../types/resultCodes"
import { Result } from "../../../types/resultType"
import { likeQueryRepository } from "../../likes/infrastructure/like-query-repository"
import { LikeDbType } from "../../likes/types/likeTypes"
import { commentsQueryRepository } from "../repositories/commentsQueryRepository"
import { commentsRepository } from "../repositories/commentsRepository"
import { CommentInputModel, CommentViewModel, LikesInfo } from "../types/commentsTypes"

type UserType = {
    login: string,
    userId: string
}

export const commentService = {
    async findComments(query: { [key: string]: string | undefined }, postId: string, userId: string | undefined) {
        const queryParams = setCommentsQueryParams(query)
        const comments = await commentsQueryRepository.findComments(queryParams, postId)

        await this.mapComments(comments.items, userId)

        return comments
    },

    async mapComments(comments: CommentViewModel[], userId: string | undefined) {
        const commentsLikes = await likeQueryRepository.getLikes()

        return comments.map(async comment => {
            const commentLikes = commentsLikes.filter(like => like.commentId === comment.id)

            comment.likesInfo = {
                likesCount: commentLikes.filter(like => like.status === "Like").length,
                dislikesCount: commentLikes.filter(like => like.status === "Dislike").length,
                myStatus: this.getMyLikeStatus(userId, commentsLikes, comment.id)
            }

            return comment
        })
    },

    getMyLikeStatus(userId: string | undefined, commentsLikes: LikeDbType[], commentId: string) {
        if (userId) {
            const myCommentLike = commentsLikes.find(like => like.commentId === commentId && like.authorId === userId)
            if (myCommentLike) {
                return myCommentLike.status
            }
        }

        return "None"
    },

    async cretePostComment(postId: string, comment: string, user: UserType): Promise<CommentViewModel> {
        const newComment = {
            postId,
            content: comment,
            commentatorInfo: {
                userId: user.userId,
                userLogin: user.login
            },
            createdAt: new Date().toISOString(),
        }

        return await commentsRepository.createComment(newComment)
    },

    async updateComment(id: string, data: CommentInputModel, userId: string): Promise<Result<CommentViewModel | null>> {
        const comment = await commentsRepository.getCommentById(id)

        if (!comment) {
            return {
                status: ResultStatus.NotFound,
                data: null
            }
        }

        if (comment.commentatorInfo.userId !== userId) {
            return {
                status: ResultStatus.Forbidden,
                data: null
            }
        }

        const result = await commentsRepository.updateComment(id, data)

        if (result) {
            return {
                status: ResultStatus.NoContent,
                data: null
            }
        } else {
            return {
                status: ResultStatus.NotFound,
                data: null
            }
        }
    },

    async deleteComment(id: string, userId: string): Promise<Result<CommentViewModel | null>> {
        const comment = await commentsRepository.getCommentById(id)

        if (!comment) {
            return {
                status: ResultStatus.NotFound,
                data: null
            }
        }

        if (comment.commentatorInfo.userId !== userId) {
            return {
                status: ResultStatus.Forbidden,
                data: null
            }
        }
        const result = await commentsRepository.deleteComment(id)

        if (result) {
            return {
                status: ResultStatus.NoContent,
                data: null
            }
        } else {
            return {
                status: ResultStatus.NotFound,
                data: null
            }
        }
    },

    async getLikesInfo(commentId: string, userId: string | undefined): Promise<LikesInfo> {
        const likesCount = await likeQueryRepository.getCommentLikesCount(commentId)
        const dislikesCount = await likeQueryRepository.getCommentDislikesCount(commentId)
        const myStatus = userId ? await likeQueryRepository.getMyCommentStatus(commentId, userId) : 'None'

        return {
            likesCount,
            dislikesCount,
            myStatus
        }
    }
}