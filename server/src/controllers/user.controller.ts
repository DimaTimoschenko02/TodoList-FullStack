import UserService from "../services/user.service";
import { Request , Response } from "express";
export default class UserController{
    constructor(private userService: UserService){ }

    async createUserHandler(req: Request , res: Response){
        try{
            const user = this.userService.createUser(req.body)
        }catch(err){
            throw err
        }
    }
}