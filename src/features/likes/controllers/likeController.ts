import { Request, Response } from "express"
import { LikeInputModel } from "../types/likeTypes"
import { likeService } from "../application/like-service"

export const likeController = async (req: Request<{commentId: string}, {}, LikeInputModel>, res: Response) => {
    const commentId = req.params.commentId
    const status = req.body.likeStatus
    const authorId = req.user.userId
    
    await likeService.setCommentLike({commentId, status, authorId})

    res.sendStatus(204)
}