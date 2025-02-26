import e from "express";
import teamServices from "@/application/services/teamServices";

const createTeam = async (
    req: e.Request,
    res: e.Response,
    next: e.NextFunction
) => {
    try {
        const result = await teamServices.createTeam(req.body, req.user!);
        res.status(201).send(result);
    } catch (err) {
        next(err);
    }
};

const getAllTeams = async (
    req: e.Request,
    res: e.Response,
    next: e.NextFunction
) => {
    try {
        const teams = await teamServices.getAllTeams(req.user!);
        res.status(200).send(teams);
    } catch (err) {
        next(err);
    }
};

const getTeamById = async (
    req: e.Request,
    res: e.Response,
    next: e.NextFunction
) => {
    try {
        const result = await teamServices.getTeamById(
            Number(req.params.id),
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

const updateTeam = async (
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

const deleteTeam = async (
    req: e.Request,
    res: e.Response,
    next: e.NextFunction
) => {
    try {
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

export default {
    createTeam,
    getAllTeams,
    getTeamById,
    updateTeam,
    deleteTeam,
};
