import e, { Router } from "express";
import authRouter from "./routes/auth";
import teamsRouter from "./routes/teams";
import objectivesRouter from "./routes/objectives";
import protectRoute from "./authConfig/protectRoute";
import errorHandler from "./errorHandler";

const router = Router();

router.use("/auth", authRouter);
router.use("/teams", protectRoute, teamsRouter);
router.use("/objectives", objectivesRouter);

router.use("/api", router);

export default router;
