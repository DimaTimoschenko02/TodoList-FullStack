import { Response, Request, NextFunction } from "express";
import { DocumentDefinition } from "mongoose";
import { ITodo } from "todos.type";

const tryCatchMiddleware = (controller: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {status , todo}:{status:number, todo:DocumentDefinition<ITodo>} = await controller(req, res, next);
            res.status(status).json(todo);
        } catch (err) {
            next(err);
        }
    };
};
export default tryCatchMiddleware;