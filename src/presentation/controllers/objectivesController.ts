import objectivesService from "@/application/services/objectivesService";
import e from "express";

const createObjective = async (
    req: e.Request,
    res: e.Response,
    next: e.NextFunction
) => {
    try {
        console.log(req.body);
        const result = await objectivesService.createObjective(
            { ...req.body, teamId: Number(req.params.teamId) },
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
    req: e.Request,
    res: e.Response,
    next: e.NextFunction
) => {
    try {
        const result = await objectivesService.getAllObjectives(
            Number(req.params.teamId),
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
    req: e.Request,
    res: e.Response,
    next: e.NextFunction
) => {
    try {
        const result = await objectivesService.getObjectiveById(
            Number(req.params.id),
            Number(req.params.teamId),
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
    req: e.Request,
    res: e.Response,
    next: e.NextFunction
) => {
    try {
        res.status(200).send({ message: "Updated!" });
    } catch (err) {
        next(err);
    }
};

const deleteObjective = async (
    req: e.Request,
    res: e.Response,
    next: e.NextFunction
) => {
    try {
        res.status(200).send({ message: "Deleted!" });
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
