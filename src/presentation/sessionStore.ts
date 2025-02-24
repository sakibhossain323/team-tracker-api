import session from "express-session";
import pgSession from "connect-pg-simple";

const pgStore = pgSession(session);

const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
});

export default sessionStore;
