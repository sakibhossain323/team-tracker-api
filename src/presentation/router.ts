import { Router } from "express";
import teamsRouter from "./routes/teams";
import objectivesRouter from "./routes/objectives";

const router = Router();

router.use("/teams", teamsRouter);
router.use("/objectives", objectivesRouter);

export default router;
