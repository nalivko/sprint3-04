import { Router } from "express";
// import { BlogController } from "./controllers/BlogController";
import { blogValidators } from "./middlewares/blogValidators";
import { queryValidator } from "../../global-middlewares/paginateValidator";
import { postValidators } from "../posts/middlewares/postValidators";
import { blogIdQueryMiddleware } from "./middlewares/blogIdQueryMiddleware";
import { authMiddleware } from "../../global-middlewares/authMiddleware";
import { blogController } from "./composition-root";

export const blogsRouter = Router({})

blogsRouter.get('/', ...queryValidator, blogController.getBlogs.bind(blogController))
blogsRouter.post('/', ...blogValidators, blogController.createBlog.bind(blogController))
blogsRouter.get('/:blogId/posts', blogIdQueryMiddleware, ...queryValidator, blogController.getPostsByBlogId.bind(blogController))
blogsRouter.post('/:blogId/posts', blogIdQueryMiddleware, ...postValidators, blogController.createPostByBlogId.bind(blogController))
blogsRouter.get('/:id', blogController.findBlog.bind(blogController))
blogsRouter.put('/:id', ...blogValidators, blogController.updateBlog.bind(blogController))
blogsRouter.delete('/:id', authMiddleware, blogController.deleteBlog.bind(blogController))
