import { Request, Response, NextFunction } from "express";
import {catchAsync} from "../../utils/catchAsync";

export const getStatus = catchAsync((req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({status: true})
})