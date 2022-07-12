import { Request, Response ,NextFunction } from "express";
import bcrypt from 'bcryptjs'

import User from "../models/User";
import ApiError from "../exeptions/apiErrors";

export default function() {
    return async ( req: Request, res: Response, next: NextFunction ) => {
        try{
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            const isValid = await bcrypt.compare(password, user!.password);
            if(!isValid) throw new ApiError(400 , 'Invalid password') 
            next();
        } catch (e: any) {
            res.status(e.status).json({ message: e.message })
        }
    }
}