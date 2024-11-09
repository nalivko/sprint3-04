import { Request, Response } from "express"
import { LikePostInputModel } from "../types/likeTypes"
import { likeService } from "../application/like-service"

export const likePostController = async (req: Request<{postId: string}, {}, LikePostInputModel>, res: Response) => {
    const postId = req.params.postId
    const status = req.body.likeStatus
    const authorId = req.user.userId
    
    await likeService.setPostLike({postId, status, authorId})

    res.sendStatus(204)
}