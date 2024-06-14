import { Response, NextFunction } from 'express'
import { catchAsync } from '../../utils/catchAsync'
import { ErrorTypes, ExpressTypes } from '../../types'
import { AppError } from '../../utils/appError'
import { addTask, addMission } from '../../services/tasks'

export const createTask = catchAsync(
    async (
        req: ExpressTypes.AuthRequest,
        res: Response,
        next: NextFunction,
    ) => {
        if (!req.user) {
            return next(
                new AppError(ErrorTypes.AUTH_ERROR, 'unauthorized', 401),
            )
        }
        const newTask = await addTask(req.body)
        if (!newTask) {
            return next(
                new AppError(ErrorTypes.VALIDATION_ERROR, 'something', 400),
            )
        }
        const newMission = await addMission({
            user_id: req.user.id,
            task_id: newTask.id,
        })
        const taskResponse = {
            ...newTask,
            reporter: req.user.id,
            state: newMission.state,
        }
        return res
            .status(200)
            .json({ message: 'task created successfuly', task: taskResponse })
    },
)
