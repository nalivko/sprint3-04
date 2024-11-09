import { Request, Response } from "express"
import { BlogInputModel, BlogViewModel, BlogsViewCollectionModel } from "../types/blogs-types"
import { PostInputModel, PostViewModel } from "../../posts/types/posts-types"
import { BlogsService } from "../services/blogs-service"
import { injectable, inject } from "inversify"

@injectable()
export class BlogController {
    constructor(@inject(BlogsService) protected blogsService: BlogsService) {}

    async getBlogs(req: Request, res: Response<BlogsViewCollectionModel>) {
        const allBlogs = await this.blogsService.findBlogs(req.query as { [key: string]: string | undefined })

        res.send(allBlogs)
    }

    async findBlog(req: Request<{ id: string }>, res: Response<BlogViewModel | null>) {
        const blog = await this.blogsService.getBlogById(req.params.id)

        if (blog) {
            res.send(blog)
        } else {
            res.sendStatus(404)
        }
    }

    async createBlog(req: Request<any, any, BlogInputModel>, res: Response<BlogViewModel>) {
        const newBlog = await this.blogsService.createBlog(req.body)

        res.status(201).send(newBlog)
    }

    async createPostByBlogId(req: Request<any, any, PostInputModel>, res: Response<PostViewModel>) {
        const newPost = await this.blogsService.createPostByBlogId(req.params.blogId, req.body)

        res.status(201).send(newPost)
    }

    async deleteBlog(req: Request<{ id: string }>, res: Response) {
        const isDeleted = await this.blogsService.deleteBlog(req.params.id)

        if (isDeleted) {
            res.send(204)
        } else {
            res.send(404)
        }
    }

    async getPostsByBlogId(req: Request, res: Response<{}>) {
        const posts = await this.blogsService.getPostByBlogId(req.query as { [key: string]: string | undefined }, req.params.blogId)

        res.send(posts)
    }

    async updateBlog(req: Request<{ id: string }, any, BlogInputModel>, res: Response) {
        const isUpdated = await this.blogsService.updateBlog(req.params.id, req.body)

        if (isUpdated) {
            res.send(204)
        } else {
            res.send(404)
        }
    }
}
