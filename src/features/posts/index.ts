import { Router } from "express";
import { getAllPostsController } from "./controllers/getAllPostsController";
import { createPostController } from "./controllers/createPostController";
import { findPostController } from "./controllers/findPostController";
import { updatePostController } from "./controllers/updatePostController";
import { deletePostController } from "./controllers/deltePostController";
import { postValidators, blogIdValidator } from "./middlewares/postValidators";
import { queryValidator } from "../../global-middlewares/paginateValidator";
import { authMiddleware as basicMiddleweare} from "../../global-middlewares/authMiddleware";
import { authJWTMiddleware } from "../../global-middlewares/authJWTMiddleware";
import { createCommentController } from "../comments/controllers/createCommentController";
import { getPostCommentsController } from "../comments/controllers/getPostCommentsController";
import { postCommentValidators } from "../comments/middlewares/postCommentValidator";
import { postIdValidator } from "../comments/middlewares/postIdValidator";
import { userMiddleware } from "../../global-middlewares/userMiddleware";
import { likePostController } from "../likes/controllers/likePostController";
import { likeValidators } from "../likes/middleware/likeValidators";


export const postsRouter = Router({})

postsRouter.get('/', ...queryValidator, userMiddleware, getAllPostsController)
postsRouter.post('/', blogIdValidator, ...postValidators, createPostController)
postsRouter.get('/:id', userMiddleware, findPostController)
postsRouter.put('/:id', blogIdValidator, ...postValidators, updatePostController)
postsRouter.delete('/:id', basicMiddleweare, deletePostController)

postsRouter.get('/:postId/comments', postIdValidator, userMiddleware, getPostCommentsController)
postsRouter.post('/:postId/comments', authJWTMiddleware, postIdValidator, postCommentValidators, createCommentController)

postsRouter.put('/:postId/like-status', authJWTMiddleware, postIdValidator, likeValidators, likePostController)