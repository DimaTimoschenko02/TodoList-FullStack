import { Request, Response ,NextFunction } from "express";
import ApiError from "../exeptions/apiErrors";
import User from "../models/User";

export default function(reqUrl: string) {
    return async ( req: Request, res: Response, next: NextFunction ) => {
        try{
            const email = req.body.email;
            const user = await User.findOne({ email })
            if(reqUrl === 'signup' && user) throw new ApiError(400 , `user with email ${email} alreay exist`);
            if(reqUrl === 'sign-in' && !user) throw new ApiError(400 , `user with email ${email} does not exist`);
            next()
        } catch (e: any) {
            res.status(e.status).json({ message: e.message })
        }
    }
}