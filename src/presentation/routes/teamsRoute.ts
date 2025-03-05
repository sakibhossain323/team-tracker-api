import { Router } from "express";
import teamsController from "../controllers/teamsController";

const PREFIX = "/api/teams";
const router = Router();

router.post(PREFIX + "/", teamsController.createTeam);
router.get(PREFIX + "/", teamsController.getAllTeams);
router.get(PREFIX + "/:id", teamsController.getTeamById);
router.patch(PREFIX + "/:id", teamsController.updateTeam);
router.get(PREFIX + "/:id/members", teamsController.getAllMembers);
router.post(PREFIX + "/:id/members", teamsController.addMember);
router.delete(PREFIX + "/:id/members/:userId", teamsController.removeMember);

export default router;
