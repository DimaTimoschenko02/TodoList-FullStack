
import ApiError from "../exeptions/apiErrors";
import { NextFunction , Request , Response} from "express";
import { decode } from "../utils/jwt.utils";


export default function(req: Request, res: Response, next: NextFunction){
    try{
        const headerToken = req?.headers?.authorization
        if(!headerToken){
            throw new ApiError(403 , 'user is not authorized')
        }
        const accessToken = headerToken.split(' ')[1]
        if(!accessToken){
            throw new ApiError(403 , 'user is not authorized')
        }
        const {decoded} = decode(accessToken)
        if(!decoded){
            throw new ApiError(403 , 'user is not authorized')
        }
        req.app.set('user' , decoded)
        
        return next()
    }catch(e:any){
        res.status(e.status).json({message:e.message})
    }

}