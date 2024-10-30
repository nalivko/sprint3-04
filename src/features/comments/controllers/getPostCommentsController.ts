import { Request, Response } from "express";
import { commentService } from "../services/commentsService";
import { PostCommentsType } from "../types/commentsTypes";

export const getPostCommentsController = async (req: Request<{ postId: string }>, res: Response<PostCommentsType>) => {
    const userId = req.user?.userId
    const comments = await commentService.findComments(req.query as { [key: string]: string | undefined }, req.params.postId, userId)

    res.send(comments)
}