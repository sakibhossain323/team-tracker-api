import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    console.log(req.headers);
    console.log(req.query);
    console.log(req.user);
    console.log(req.session);
    res.status(200).send([
        { id: 1, name: "team1" },
        { id: 2, name: "team2" },
    ]);
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    res.status(200).send({ id: id, name: "team1" });
});

router.post("/", (req, res) => {
    console.log(req.body);
    res.status(201).send({ message: "Created!" });
});

router.patch("/:id", (req, res) => {
    console.log(req.params);
    console.log(req.body);
    res.status(200).send({ message: "Updated!" });
});

router.delete("/:id", (req, res) => {
    console.log(req.params);
    res.status(204).send();
});

export default router;
