import { NextFunction, Request, Response } from "express";
import { commentsQueryRepository } from "../../comments/repositories/commentsQueryRepository";

export const commentIdValidator = async (req: Request, res: Response, next: NextFunction) => {
    const comment = await commentsQueryRepository.getCommentById(req.params.commentId)

    if (!comment) {
        res.sendStatus(404)
        return
    }
    
    next()
}