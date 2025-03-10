import prisma from "@/infrastructure/prisma/client";
import passport from "passport";
import { OAuth2Strategy } from "passport-google-oauth";

passport.use(
    new OAuth2Strategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: process.env.GOOGLE_CALLBACK_URL!,
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile);
            const email = profile.emails![0].value;
            const username = email.split("@")[0];
            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
            });
            if (user) {
                return done(null, {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                });
            }
            const newUser = await prisma.user.create({
                data: {
                    email,
                    username,
                    password: process.env.PASS!,
                },
            });
            return done(null, {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
            });
        }
    )
);

export default passport;
