
import {object , string} from 'yup'

export const validationTodoSchema = object({
  title: string().max(25 , 'not more then 25 symbols'),
  body:string().max(250 , 'not more then 250 symbols'),
  year:string()
})
