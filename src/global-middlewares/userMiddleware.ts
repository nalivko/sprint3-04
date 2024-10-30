import { NextFunction, Request, Response } from "express"
import { jwtService } from "../application/jwtService"
import { usersRepository } from "../features/users/usersRepository"

export const userMiddleware = async (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {
    if (req.headers.authorization && req.headers.authorization !== undefined) {
        const token = req.headers.authorization.split(' ')[1]
        const verifiedAccessToken = jwtService.verifyAccessToken(token)

        if (verifiedAccessToken) {
            const userId = verifiedAccessToken.user.userId
            const user = await usersRepository.getUserById(userId!)

            if (user) {
                req.user = {
                    userId: userId,
                    login: user.login
                }
            }
        }

    }

    next()
}