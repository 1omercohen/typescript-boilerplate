import { NextFunction, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { AppError } from '../utils/appError'
import { ErrorTypes } from '../types'
import { ExpressTypes } from '../types'
import { getUserById } from '../services/users'

export const authentication = async (
    req: ExpressTypes.AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    const token = req.headers.authorization as string
    if (!token) {
        const AuthorizationError = new AppError(
            ErrorTypes.AUTH_ERROR,
            'unauthorized',
            401,
        )
        return next(AuthorizationError)
    }
    try {
        const splitToken = token.split(' ')
        const decoded = jwt.verify(splitToken[1], 'SECRET_KEY') as {
            id: string
        }
        const user = await getUserById(decoded.id)
        if (!user) {
            const AuthorizationError = new AppError(
                ErrorTypes.AUTH_ERROR,
                'unauthorized',
                401,
            )
            return next(AuthorizationError)
        }
        req.user = {
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            created: user.created,
            id: user.id,
        }
        next()
    } catch (error: unknown) {
        if (error instanceof Error) {
            const AuthorizationError = new AppError(
                ErrorTypes.AUTH_ERROR,
                error.message,
                401,
            )
            return next(AuthorizationError)
        }
        return next(
            new AppError(
                ErrorTypes.INTERNAL_SERVER_ERROR,
                'something made wrong',
                500,
            ),
        )
    }
}
