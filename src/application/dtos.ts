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
    description: string | null;
};

export type CreateObjectiveDto = {
    title: string;
    description: string | null;
    teamId: number;
};

export type CreateTaskDto = {
    title: string;
    description: string | null;
    objectiveId: number;
    teamId: number;
    assigneeId: number | null;
    stautes: string;
};

export type UpdateTaskDetailsDto = {
    id: number;
    title: string;
    description: string | null;
    objectiveId: number;
    teamId: number;
    assigneeId: number | null;
    stautes: string;
};

export type UpdateTaskStatusDto = {
    id: number;
    teamId: number;
    objectiveId: number;
    status: string;
};

export type UserDto = {
    id: number;
    username: string;
    email: string;
};
