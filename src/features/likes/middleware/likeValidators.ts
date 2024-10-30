import { body, param } from "express-validator";
import { checkErrorsMiddleware } from "../../../global-middlewares/checkErrorsMiddleware";
import { commentsQueryRepository } from "../../comments/repositories/commentsQueryRepository";

export const likeValidator =
    body('likeStatus')
        .isString()
        .withMessage('content must be a string')
        .isIn(["None", "Like", "Dislike"])
        .withMessage('The likeStatus must be like, dislike or none')

const commentIdValidator =
    param('commentId')
        .isString()
        .withMessage('not string')
        .trim()
        .custom(async commentId => {
            const comment = await commentsQueryRepository.getCommentById(commentId)

            if (!comment) {
                throw new Error('must be a comment from comments table')
            }

            return true
        })

export const likeValidators = [
    likeValidator,
    commentIdValidator,
    checkErrorsMiddleware
]