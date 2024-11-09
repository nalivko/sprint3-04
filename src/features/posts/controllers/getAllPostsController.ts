import { Request, Response } from "express"
import { postsService } from "../services/posts-service"

export const getAllPostsController = async (req: Request, res: Response<{}>) => {
    const userId = req.user?.userId
    const blogs = await postsService.findPosts(req.query as { [key: string]: string | undefined }, userId)

    res.send(blogs)
}