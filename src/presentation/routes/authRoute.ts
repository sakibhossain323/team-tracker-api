import { Router } from "express";
import passport from "@/presentation/authConfig/localStrategy";
import prisma from "@/infrastructure/prisma/client";

const router = Router();
const PREFIX = "/api/auth";

router.post(PREFIX + "/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        await prisma.user.create({
            data: {
                email: email,
                username: email,
                password: password,
            },
        });
        res.status(201).send({ message: "Registration Successful!" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.post(PREFIX + "/login", passport.authenticate("local"), (req, res) => {
    console.log(req.body);
    res.status(200).send({ message: "Login Successful!" });
});

router.post(PREFIX + "/logout", (req, res) => {
    req.logout((err) => {
        if (err) console.log(err);
    });
    res.status(200).send({ message: "Logout Successful!" });
});

export default router;
