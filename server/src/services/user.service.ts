import { ICreateUser, IUser } from "user.types";
import User from '../models/User'
export default class UserService{

    constructor(){}
    async createUser(data:ICreateUser){
        return await User.create(data)
    }

    async findUser(email: string){
        return await User.findOne({email})
    }

    async login(email:string){
        return await User.findOne({email})
    }
}