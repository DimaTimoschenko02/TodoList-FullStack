
import {object , string} from 'yup'

export const validationTodoSchema = object({
  title: string().max(25 , 'not more then 25 symbols'),
  body:string().max(250 , 'not more then 250 symbols'),
  year:string()
})
// export const TodoValidationSchema = Yup.object().shape({
//   title: Yup.string().min(5, 'Too Short!').max(100, 'Too Long!'),
//   description: Yup.string().min(10, 'Too Short!').max(200, 'Too Long!'),
//   year: Yup.number().min(2022, 'Wrong year').max(2100, 'Wrong year'),
// });