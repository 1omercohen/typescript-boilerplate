import { NextFunction, Request, Response } from 'express'
import { catchAsync } from '../../utils/catchAsync'
import { getUserByEmail, AddUser } from '../../services/users'
import { AppError } from '../../utils/appError'
import { ErrorTypes } from '../../types'
import { comparePassword, createHashPassword, setToken } from '../../utils'

export const loginUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await getUserByEmail(req.body.email)
        if (!user) {
            const userNotFoundError = new AppError(
                ErrorTypes.VALIDATION_ERROR,
                'user not found',
                404,
            )
            return next(userNotFoundError)
        }
        const passwordMatch = await comparePassword(
            req.body.password,
            user.password,
        )
        if (!passwordMatch) {
            const passwordError = new AppError(
                ErrorTypes.VALIDATION_ERROR,
                'password does not match',
                400,
            )
            return next(passwordError)
        }
        const token = setToken(user.id)
        // set cookie with httpOnly flag and the user id encrypted
        res.cookie('token', setToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        })
        res.setHeader('Authorization', `Bearer ${token}`)
        console.log('TOKEN', token)
        return res
            .status(200)
            .json({ status: true, message: 'login successful' })
    },
)

export const registerUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { body } = req
        const existingUser = await getUserByEmail(body.email)
        if (existingUser) {
            const ExistingUserError = new AppError(
                ErrorTypes.VALIDATION_ERROR,
                'user already exists',
                400,
            )
            return next(ExistingUserError)
        }
        const hashPassword = await createHashPassword(body.password)
        const newUser = await AddUser({
            email: body.email,
            password: hashPassword,
            first_name: body.first_name,
            last_name: body.last_name,
        })

        return res
            .status(200)
            .json({ status: !!newUser, message: 'user created successfully' })
    },
)
