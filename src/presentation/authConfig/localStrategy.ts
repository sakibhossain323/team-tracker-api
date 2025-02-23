import passport from "passport";
import { Strategy } from "passport-local";

passport.use(
    new Strategy((username, password, done) => {
        if (username === "admin" && password === "admin") {
            return done(null, { username: "admin" });
        } else {
            return done(null, false);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
    done(null, user);
});

export default passport;
