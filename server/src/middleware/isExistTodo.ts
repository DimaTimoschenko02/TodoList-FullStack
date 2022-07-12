import { Request, Response , NextFunction } from "express";
import { Model } from "mongoose";
import Todo from "../models/Todo";
import { stringify } from "uuid";
import ApiError from "../exeptions/apiErrors";
import User from '../models/User'
const isExist = (model: typeof Todo) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const todo = await model.findById(id);
            if(!todo){
                throw new ApiError(404, 'Post not found')
            }
            const userId = req.app.get('user')._id
            
            if(userId.toString() !== todo.userId.toString()){
                throw new ApiError(403 , 'access deinied')
            }
            
        }
        catch(err) {
            next(err);
        }
        next();
    };
};

export default isExist;