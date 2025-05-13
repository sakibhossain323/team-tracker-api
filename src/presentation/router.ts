import { Router } from "express";
import authRoute from "./routes/authRoute";
import teamsRoute from "./routes/teamsRoute";
import objectivesRoute from "./routes/objectivesRoute";
import protectRoute from "./authConfig/protectRoute";
import tasksRoute from "./routes/tasksRoute";

const router = Router();
router.get("/health", (req, res) => {
    res.status(200).json({ status: "OK" });
});
router.use(authRoute);
router.use(protectRoute, teamsRoute);
router.use(protectRoute, objectivesRoute);
router.use(protectRoute, tasksRoute);

export default router;
