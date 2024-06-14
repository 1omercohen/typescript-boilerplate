import { Request } from 'express'

export type User = {
    email: string
    first_name: string
    last_name: string
    created: Date
    id: string
}

export declare namespace ExpressTypes {
    export interface AuthRequest extends Request {
        user?: User
    }
}

export enum PrefixRoutes {
    AUTH = '/auth',
    TODO = '/todo',
    HEALTH = '/health',
}

export enum ErrorTypes {
    VALIDATION_ERROR = 'Validation Error',
    AUTH_ERROR = 'Auth Error',
    INTERNAL_SERVER_ERROR = 'Internal Server Error',
}
