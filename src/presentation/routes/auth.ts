import { Router } from "express";
import passport from "@/presentation/authConfig/localStrategy";

const router = Router();

router.post("/register", (req, res) => {
    console.log(req.body);
    res.status(201).send({ message: "User Created!" });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
    console.log(req.body);
    res.status(200).send({ message: "Login Successful!" });
});

router.post("/logout", (req, res) => {
    req.logout((err) => {
        console.log(err);
    });
    res.status(200).send({ message: "Logout Successful!" });
});

export default router;
