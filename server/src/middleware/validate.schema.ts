import { AnySchema , AnyObjectSchema } from "yup";
import {Request, Response , NextFunction} from 'express'
import ApiError from "../exeptions/apiErrors";
const validate = (schema:AnySchema) =>
    async(req: Request , res: Response , next: NextFunction)=>{
        try{
            await schema.validate({
                body:req.body,
                params: req.params,
                query: req.query
            })

            return next()
        }catch(err:any){
            return next(new ApiError(400, 'invalid data'));
        }
    }

export default validate