import { Router } from "express";
import teamsController from "../controllers/teamsController";

const PREFIX = "/api/teams";
const router = Router();

router.get(PREFIX + "/", teamsController.getAllTeams);
router.get(PREFIX + "/:id", teamsController.getTeamById);

router.post(PREFIX + "/", async (req, res, next) => {
    try {
        await teamsController.createTeam(req);
        res.status(201).send({ message: "Created!" });
    } catch (err) {
        next(err);
    }
});

router.patch(PREFIX + "/:id", (req, res) => {
    console.log(req.params);
    console.log(req.body);
    res.status(200).send({ message: "Updated!" });
});

router.delete(PREFIX + "/:id", (req, res) => {
    console.log(req.params);
    res.status(204).send();
});

export default router;
