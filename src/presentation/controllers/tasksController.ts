import { Request, Response, NextFunction } from "express";
import tasksService from "@/application/services/tasksService";

const getId = (req: Request) => Number(req.params.id);
const getTeamId = (req: Request) => Number(req.params.teamId);
const getObjId = (req: Request) => Number(req.params.objId);

const createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await tasksService.createTask(
            {
                ...req.body,
                teamId: getId(req),
                objectiveId: getObjId(req),
            },
            req.user!
        );
        if (result.success) {
            res.status(201).send(result.data);
        } else if (result.error) {
            res.status(result.error.statusCode).send({
                message: result.error.message,
            });
        }
    } catch (error) {
        next(error);
    }
};

const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await tasksService.getAllTasks(
            getTeamId(req),
            getObjId(req),
            req.user!
        );
        if (result.success) {
            res.status(200).send(result.data);
        } else if (result.error) {
            res.status(result.error.statusCode).send({
                message: result.error.message,
            });
        }
    } catch (error) {
        next(error);
    }
};

const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await tasksService.getTaskById(
            getId(req),
            getTeamId(req),
            getObjId(req),
            req.user!
        );
        if (result.success) {
            res.status(200).send(result.data);
        } else if (result.error) {
            res.status(result.error.statusCode).send({
                message: result.error.message,
            });
        }
    } catch (error) {
        next(error);
    }
};

const updateTaskDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await tasksService.updateTaskDetails(
            {
                ...req.body,
                id: getId(req),
                teamId: getTeamId(req),
                objectiveId: getObjId(req),
            },
            req.user!
        );
        if (result.success) {
            res.status(200).send(result.data);
        } else if (result.error) {
            res.status(result.error.statusCode).send({
                message: result.error.message,
            });
        }
    } catch (error) {
        next(error);
    }
};

const updateTaskStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await tasksService.updateTaskStatus(
            {
                ...req.body,
                id: getId(req),
                teamId: getTeamId(req),
                objectiveId: getObjId(req),
            },
            req.user!
        );
        if (result.success) {
            res.status(200).send(result.data);
        } else if (result.error) {
            res.status(result.error.statusCode).send({
                message: result.error.message,
            });
        }
    } catch (error) {
        next(error);
    }
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await tasksService.deleteTask(
            getId(req),
            getTeamId(req),
            getObjId(req),
            req.user!
        );

        if (result.success) {
            res.status(204).send();
        } else if (result.error) {
            res.status(result.error.statusCode).send({
                message: result.error.message,
            });
        }
    } catch (error) {
        next(error);
    }
};

export default {
    createTask,
    getAllTasks,
    getTaskById,
    updateTaskDetails,
    updateTaskStatus,
    deleteTask,
};
