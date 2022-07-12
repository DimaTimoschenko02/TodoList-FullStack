import UserService from "../services/user.service";
import { NextFunction, Request, Response } from "express";
import ApiError from "../exeptions/apiErrors";
import { sign } from "../utils/jwt.utils";
import { omit } from "lodash";
import config from "config";
export class UserController {
  constructor(private userService: UserService) {}
  
  async signup(req: Request, res: Response, next: NextFunction) {
    const user = await this.userService.createUser(req.body);
    const data = omit(user.toJSON(), "password")
    const token  = sign(data , {expiresIn: config.get('jwtExpiration')})
    return { status: 201, data: {data , token} };
  }

  async signin(req: Request, res: Response) {
    const user = await this.userService.login(req.body.email)
    const data = omit(user!.toJSON(), "password")
    const token  = sign(data , {expiresIn: config.get('jwtExpiration')})
    return { status: 201, data: {data , token} };
  }
}
const userController = new UserController(new UserService());
export default userController;
