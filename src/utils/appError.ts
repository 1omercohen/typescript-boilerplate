import { ErrorTypes } from "../types"

export class AppError extends Error {
    public type: ErrorTypes;
    public messages: string[] | string;
    public status: number;
    public details?: { [key: string]: any };

    constructor(type: ErrorTypes, messages: string[] | string, status: number, details?: { [key: string]: any }) {
        super(messages instanceof Array ? messages.join(', ') : messages);
        this.type = type;
        this.messages = messages;
        this.status = status;
        this.details = details;
    }
}