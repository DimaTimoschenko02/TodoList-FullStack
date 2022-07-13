export interface ILoginUser{
    email:string,
    password:string
}

export interface ISignUser extends ILoginUser{
    avatar?:string
    cofirmPassword: string
}