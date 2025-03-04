import { Router } from "express";
import tasksController from "../controllers/tasksController";

const PREFIX = "/api/teams/:teamId/objectives/:objId/tasks";
const router = Router();

router.post(PREFIX + "/", tasksController.createTask);
router.get(PREFIX + "/", tasksController.getAllTasks);
router.get(PREFIX + "/:id", tasksController.getTaskById);
router.patch(PREFIX + "/:id", tasksController.updateTaskDetails);
router.patch(PREFIX + "/:id/status", tasksController.updateTaskStatus);
router.delete(PREFIX + "/:id", tasksController.deleteTask);

export default router;
