import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import { ITodoFilterQuery} from "../controllers/todo.controller";
import { ITodo } from "todos.type";
import Todo from "../models/Todo";



interface ITodoParams {
  search: string,
  status?: string
  page: string
}


export default class TodoService {
  async deleteTodo(todoId: string) {
    return await Todo.findByIdAndDelete(todoId);
  }

  async findAll(userId: string,  {search, status, page}: ITodoParams): Promise<ITodo[]> {

    const limit = 5
        const pageNumber = Number(page)
        const regExp = new RegExp(search)
        let query: ITodoFilterQuery = {
            $or: [
                { userId: userId },
                { isPublic: true }
            ],
            title: { $regex: regExp, $options: 'i' },
        }
        if (status === "true") {
            query = {...query, ...{completed: true}};
        } else if (status === "false") {
            query = {...query, ...{completed: false}};
        }

        const todos = await Todo.find(query).skip((pageNumber - 1) * limit).limit(limit);
        return todos
  }

  async create(todo: DocumentDefinition<ITodo>): Promise<ITodo> {
    return await Todo.create(todo);
  }

  async update(
    query: FilterQuery<ITodo>,
    update: UpdateQuery<ITodo>,
    options: QueryOptions
  ): Promise<ITodo | null> {
    return await Todo.findOneAndUpdate(query, update, options);
  }

  async findOne(query: FilterQuery<ITodo>) {
    return await Todo.findOne(query);
  }
}
