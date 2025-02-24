import express from "express";
import session from "express-session";
import passport from "passport";
import sessionStore from "@/presentation/sessionStore";
import router from "@/presentation/router";
import errorHandler from "@/presentation/errorHandler";

const app = express();

app.use(express.json());

app.use(
    session({
        store: sessionStore,
        secret: process.env.SECRET || "secret",
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
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
