import { ICreateUser } from "user.types";
import User from '../models/User'
export default class UserService{

    constructor(){}
    async createUser(data:ICreateUser){
        const user = await User.create()
    }
}