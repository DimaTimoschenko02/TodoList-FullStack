import { Request , Response , NextFunction } from 'express'
import ApiError from '../exeptions/apiErrors';

export default function errorMiddleware(error: ApiError, request: Request, response: Response, next: NextFunction) {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    response.status(status).send({status,message,})
  }
   
