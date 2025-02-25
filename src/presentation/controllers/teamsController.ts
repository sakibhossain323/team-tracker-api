import e from "express";
import teamServices from "@/application/services/teamServices";

const createTeam = async (req: e.Request) => {
    await teamServices.createTeam(req.body, req.user!);
};

export default {
    createTeam,
};
