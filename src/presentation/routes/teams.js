import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
    console.log(req.headers);
    console.log(req.body);
    res.status(201).send({ message: "Created!" });
});
router.get("/", (req, res) => {
    console.log(req.headers);
    res.send({ message: "Hello World!" });
});

export default router;
