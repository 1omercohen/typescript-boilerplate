import { AnyZodObject, ZodError, ZodIssue } from 'zod'
import { Request, Response, NextFunction } from 'express'
import { ErrorTypes } from '../types'
import { AppError } from '../utils/appError'

export const validation =
    (schema: AnyZodObject) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            })
            return next()
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                const messages = error.issues.map(
                    (issue: ZodIssue) => issue.message,
                )
                return next(
                    new AppError(ErrorTypes.VALIDATION_ERROR, messages, 400),
                )
            }
            next(error)
        }
    }
