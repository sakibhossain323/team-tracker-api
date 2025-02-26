import e from "express";
import teamServices from "@/application/services/teamServices";

const createTeam = async (req: e.Request) => {
    await teamServices.createTeam(req.body, req.user!);
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
        const result = await teamServices.getTeamById(Number(req.params.id));
        if (result.success) {
            res.status(200).send(result.data);
        } else if (result.error) {
            res.status(result.error.statusCode).send({ message: result.error });
        }
    } catch (err) {
        next(err);
    }
};

export default {
    createTeam,
    getAllTeams,
    getTeamById,
};
