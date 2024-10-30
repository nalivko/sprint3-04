import { Request, Response } from "express";
import { commentsQueryRepository } from "../repositories/commentsQueryRepository";
import { CommentViewModel } from "../types/commentsTypes";
import { commentService } from "../services/commentsService";

export const getCommentController = async (req: Request<{id: string}>, res: Response<CommentViewModel | null>) => {
    const userId = req.user?.userId
    console.log('userId', userId);
    // return
    
    const comment = await commentsQueryRepository.getCommentById(req.params.id)

    if (comment) {
        const likesInfo = await commentService.getLikesInfo(comment.id, userId)
        comment.likesInfo = likesInfo
        res.send(comment)
    } else {
        res.sendStatus(404)
    }
}