import { Router } from "express";
import teamsRouter from "./routes/teams.js";
import objectivesRouter from "./routes/objectives.js";

const router = Router();

router.use("/teams", teamsRouter);
router.use("/objectives", objectivesRouter);

export default router;
