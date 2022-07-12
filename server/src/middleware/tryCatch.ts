import { Response, Request, NextFunction } from "express";
import { DocumentDefinition } from "mongoose";
import { ITodo } from "todos.type";
import { IUser } from "user.types";

const tryCatchMiddleware = (controller: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {status , data} = await controller(req, res, next);
            res.status(status).json(data);
        } catch (err) {
            next(err);
        }
    };
};
export default tryCatchMiddleware;