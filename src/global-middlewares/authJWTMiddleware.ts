import { NextFunction, Request, Response } from "express"
import { jwtService } from "../application/jwtService"
import { usersRepository } from "../features/users/usersRepository"

export const authJWTMiddleware = async (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.sendStatus(401)
        return
    }

    const token = req.headers.authorization.split(' ')[1]
    const verifiedAccessToken = jwtService.verifyAccessToken(token)
    if(!verifiedAccessToken) {
        res.sendStatus(401)
        return
    }
    const userId = verifiedAccessToken.user.userId
    const user = await usersRepository.getUserById(userId!)

    if (!user) {
        res.sendStatus(401)
        return
    }

    req.user = {
        userId: userId,
        login: user.login
    }

    next()
}