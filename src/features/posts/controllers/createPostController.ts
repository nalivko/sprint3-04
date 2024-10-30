import { Request, Response } from "express"
import { postsService } from "../services/posts-service"
import { PostViewModel } from "../types/posts-types"

export const createPostController = async (req: Request, res: Response<PostViewModel>) => {
    const newPost = await postsService.createPost(req.body)

    res.status(201).send(newPost)
}