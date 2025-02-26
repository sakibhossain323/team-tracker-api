import { ResultError } from "./resultErrors";

export class Result {
    success: boolean;
    data: any;
    error: ResultError | null;
    constructor(success: boolean, data: any, error: ResultError | null) {
        this.success = success;
        this.data = data;
        this.error = error;
    }

    static success(data: any) {
        return new Result(true, data, null);
    }

    static fail(error: ResultError) {
        return new Result(false, null, error);
    }
}

export type CreateTeamDto = {
    name: string;
    description: string;
};

export type UserDto = {
    id: number;
    username: string;
    email: string;
};
