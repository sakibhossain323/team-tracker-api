import prisma from "@/infrastructure/prisma/client";
import passport from "passport";
import { Strategy } from "passport-local";

passport.use(
    new Strategy(async (username, password, done) => {
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
        });
        if (user && user.password === password) {
            return done(null, {
                id: user.id,
                username: user.username,
                email: user.email,
            });
        } else {
            return done(null, false);
        }
    })
);

declare global {
    namespace Express {
        interface User {
            id: number;
            username: string;
            email: string;
        }
    }
}

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
    done(null, user);
});

export default passport;
