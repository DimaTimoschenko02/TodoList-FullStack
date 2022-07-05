import {object , string , ref, AnyObjectSchema, date, boolean} from 'yup'

const payload = {
    body:object({
        title: string().max(25),
        body:string().required().max(250),
        year:date(),
        public:boolean(),
        completed:boolean()
    })
}

export const updateTodoSchema = object({
    params:object({
        id:string().required()
    }),
    ...payload
})

export const createTodoSchema = object({
    ...payload
})

export const deleteTodoSchema = object({
    params:object({
        id:string().required()
    })
})