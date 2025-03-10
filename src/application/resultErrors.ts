export class ResultError {
    statusCode: number;
    message: string;
    constructor(statusCode: number, message: string) {
        this.statusCode = statusCode;
        this.message = message;
    }
}

export class NotFoundError extends ResultError {
    constructor(resource: string, id: number | string) {
        super(404, `${resource} with id ${id} not found`);
    }
}

export class ForbiddenError extends ResultError {
    constructor() {
        super(403, "Access denied");
    }
}

export class ValidationError extends ResultError {
    constructor(message: string) {
        super(400, message);
    }
}
