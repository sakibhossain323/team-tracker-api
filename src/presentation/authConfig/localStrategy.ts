import prisma from "@/infrastructure/prisma/client";
import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcryptjs";

passport.use(
    new Strategy(async (username, password, done) => {
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
        });
        if (!user) {
            return done(null, false);
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return done(null, false);
        }
        return done(null, {
            id: user.id,
            username: user.username,
            email: user.email,
        });
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

export async function register(
    username: string,
    email: string,
    password: string
) {
    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.user.create({
        data: {
            username,
            email,
            password: passwordHash,
        },
    });
}
