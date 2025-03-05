import { Request, Response, NextFunction } from "express";
import teamsService from "@/application/services/teamsService";
import { get } from "http";

const getId = (req: Request) => Number(req.params.id);

const createTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await teamsService.createTeam(req.body, req.user!);
        res.status(201).send(result);
    } catch (err) {
        next(err);
    }
};

const getAllTeams = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teams = await teamsService.getAllTeams(req.user!);
        res.status(200).send(teams);
    } catch (err) {
        next(err);
    }
};

const getTeamById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await teamsService.getTeamById(getId(req), req.user!);
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

const updateTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await teamsService.updateTeamDetails(
            {
                id: getId(req),
                ...req.body,
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
    } catch (err) {
        next(err);
    }
};

export default {
    createTeam,
    getAllTeams,
    getTeamById,
    updateTeam,
};
