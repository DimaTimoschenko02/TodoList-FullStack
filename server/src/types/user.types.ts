import mongoose from 'mongoose'
export interface ICreateUser{
    email:string,
    password: string,
    avatar:string
}

export interface IUser extends mongoose.Document {
    email: string;
    password: string;
    avatar: string;
    createdAt: Date
    updatedAt: Date
}