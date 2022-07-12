import {object , string} from 'yup'

export const userSchema = object({
    body:object({
        email: string().email('invalid email adress').required(),
        password:string().min(6).max(20).required()
    })
})

