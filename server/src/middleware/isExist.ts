import { Request, Response , NextFunction } from "express";
import { Model } from "mongoose";
import ApiError from "../exeptions/apiErrors";

const isExist = <T>(model: Model<T>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const todo = await model.findById(id);
            if(!todo){
                throw Error
            }
        }
        catch {
            next(new ApiError(404, 'Post not found'));
        }
        next();
    };
};

export default isExist;