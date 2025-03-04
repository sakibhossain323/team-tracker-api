import objectivesService from "@/application/services/objectivesService";
import { Request, Response, NextFunction } from "express";

const getId = (req: Request) => Number(req.params.id);
const getTeamId = (req: Request) => Number(req.params.teamId);

const createObjective = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log(req.body);
        const result = await objectivesService.createObjective(
            { ...req.body, teamId: getTeamId(req) },
            req.user!
        );
        if (result.success) {
            res.status(201).send(result.data);
        } else if (result.error) {
            res.status(result.error.statusCode).send({
                message: result.error.message,
            });
        }
    } catch (err) {
        next(err);
    }
};

const getAllObjectives = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await objectivesService.getAllObjectives(
            getTeamId(req),
            req.user!
        );
        if (result.success) {
            res.status(200).send(result.data);
        } else if (result.error) {
            res.status(result.error.statusCode).send({
                message: result.error.message,
            });
        }
    } catch (err) {
        next(err);
    }
};

const getObjectiveById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await objectivesService.getObjectiveById(
            getId(req),
            getTeamId(req),
            req.user!
        );
        if (result.success) {
            res.status(200).send(result.data);
        } else if (result.error) {
            res.status(result.error.statusCode).send({
                message: result.error.message,
            });
        }
    } catch (err) {
        next(err);
    }
};

const updateObjective = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await objectivesService.updateObjective(
            { ...req.body, id: getId(req), teamId: getTeamId(req) },
            req.user!
        );
        if (result.success) {
            res.status(200).send(result.data);
        } else if (result.error) {
            res.status(result.error.statusCode).send({
                message: result.error.message,
            });
        }
    } catch (err) {
        next(err);
    }
};

const deleteObjective = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await objectivesService.deleteObjective(
            getId(req),
            getTeamId(req),
            req.user!
        );
        if (result.success) {
            res.status(204).send();
        } else if (result.error) {
            res.status(result.error.statusCode).send({
                message: result.error.message,
            });
        }
    } catch (err) {
        next(err);
    }
};

export default {
    createObjective,
    getAllObjectives,
    getObjectiveById,
    updateObjective,
    deleteObjective,
};
