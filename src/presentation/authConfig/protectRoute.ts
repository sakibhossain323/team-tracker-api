import e from "express";

export default function protectRoute(
    req: e.Request,
    res: e.Response,
    next: e.NextFunction
) {
    if (req.isAuthenticated()) {
        next();
        return;
    }
    res.status(401).send({ message: "Unauthorized" });
}
