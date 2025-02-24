import e from "express";

export default function (
    err: Error,
    req: e.Request,
    res: e.Response,
    next: e.NextFunction
) {
    if (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
        return;
    }
    next();
}
