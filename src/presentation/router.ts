import { Router } from "express";
import authRoute from "./routes/authRoute";
import teamsRoute from "./routes/teamsRoute";
import objectivesRoute from "./routes/objectivesRoute";
import protectRoute from "./authConfig/protectRoute";

const router = Router();

router.use(authRoute);
router.use(protectRoute, teamsRoute);
router.use(protectRoute, objectivesRoute);

export default router;
