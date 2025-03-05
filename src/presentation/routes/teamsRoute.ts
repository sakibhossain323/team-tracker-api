import { Router } from "express";
import teamsController from "../controllers/teamsController";

const PREFIX = "/api/teams";
const router = Router();

router.post(PREFIX + "/", teamsController.createTeam);
router.get(PREFIX + "/", teamsController.getAllTeams);
router.get(PREFIX + "/:id", teamsController.getTeamById);
router.patch(PREFIX + "/:id", teamsController.updateTeam);

export default router;
