import { Router } from "express";
import { authJWTMiddleware } from "../../global-middlewares/authJWTMiddleware";
import { deleteCommentController } from "./controllers/deleteCommentController";
import { getCommentController } from "./controllers/getCommentController";
import { updateCommentController } from "./controllers/updateCommentController";
import { commentValidators } from "./middlewares/commentValidators";
import { likeController } from "../likes/controllers/likeController";
import { likeValidators } from "../likes/middleware/likeValidators";
import { userMiddleware } from "../../global-middlewares/userMiddleware";
import { commentIdValidator } from "../likes/middleware/commentIdValidator";

export const commentsRouter = Router({})

commentsRouter.get('/:id', userMiddleware, getCommentController)
commentsRouter.put('/:commentId', authJWTMiddleware, commentValidators, updateCommentController)
commentsRouter.delete('/:commentId', authJWTMiddleware, deleteCommentController)
commentsRouter.put('/:commentId/like-status', authJWTMiddleware, commentIdValidator, likeValidators, likeController)