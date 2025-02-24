import { Router } from "express";
import authRoute from "./routes/authRoute";
import teamsRoute from "./routes/teamsRoute";
import protectRoute from "./authConfig/protectRoute";

const router = Router();

router.use(authRoute);
router.use(protectRoute, teamsRoute);

export default router;
