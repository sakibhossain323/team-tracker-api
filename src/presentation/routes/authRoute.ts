import { Router } from "express";
import passport, { register } from "@/presentation/authConfig/localStrategy";
import passportGoogle from "@/presentation/authConfig/googleStrategy";

const router = Router();
const PREFIX = "/api/auth";

router.post(PREFIX + "/register", async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        await register(username, email, password);
        res.status(201).send({ message: "Registration Successful!" });
    } catch (error) {
        next(error);
    }
});

router.post(PREFIX + "/login", passport.authenticate("local"), (req, res) => {
    res.status(200).send({ message: "Login Successful!" });
});

router.get(
    PREFIX + "/google",
    passportGoogle.authenticate("google", { scope: ["email", "profile"] }),
    (req, res) => {
        res.status(200).send();
    }
);

router.get(
    PREFIX + "/google/redirect",
    passportGoogle.authenticate("google"),
    (req, res) => {
        res.status(200).send({ message: "Login Successful!" });
    }
);

router.post(PREFIX + "/logout", (req, res) => {
    req.logout((err) => {
        if (err) console.error(err);
    });
    res.status(200).send({ message: "Logout Successful!" });
});

export default router;
