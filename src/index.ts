import express from "express";
import session from "express-session";
import passport from "passport";
import router from "@/presentation/router";

const app = express();

app.use(express.json());
app.use(
    session({
        secret: process.env.SECRET!,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60,
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
