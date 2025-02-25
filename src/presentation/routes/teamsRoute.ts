import { Router } from "express";
import teamServices from "@/application/services/teamServices";
import teamsController from "../controllers/teamsController";

const router = Router();
const PREFIX = "/api/teams";

router.get(PREFIX + "/", (req, res) => {
    console.log(req.headers);
    console.log(req.query);
    console.log(req.user);
    console.log(req.session);
    res.status(200).send([
        { id: 1, name: "team1" },
        { id: 2, name: "team2" },
    ]);
});

router.get(PREFIX + "/:id", (req, res) => {
    const id = parseInt(req.params.id);
    res.status(200).send({ id: id, name: "team1" });
});

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
