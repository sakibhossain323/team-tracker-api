import { Router } from "express";
import objectivesController from "../controllers/objectivesController";

const PREFIX = "/api/teams/:teamId/objectives";
const router = Router();

router.post(PREFIX + "/", objectivesController.createObjective);
router.get(PREFIX + "/", objectivesController.getAllObjectives);
router.get(PREFIX + "/:id", objectivesController.getObjectiveById);
router.patch(PREFIX + "/:id", objectivesController.updateObjective);
router.delete(PREFIX + "/:id", objectivesController.deleteObjective);

export default router;
