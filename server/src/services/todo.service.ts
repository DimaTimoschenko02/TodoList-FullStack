import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import { Query } from "../controllers/todo.controller";
import { ITodo } from "todos.type";
import Todo from "../models/Todo";



export default class TodoService {
  async deleteTodo(todoId: string) {
    return await Todo.findByIdAndDelete(todoId);
  }

  async findAll(userId: string, query: Query): Promise<ITodo[]> {
    // const max = 3
    let criteria:{title:any , $or:any , completed?: any} = {
      title: { $regex: query.search ? query.search : '' , $options: "i" },
      $or: [{ public: true }, { userId }],
    };
    if(query.completed === 'true') criteria.completed = true
    if(query.completed === 'false') criteria.completed = false

    const todos = await Todo.find(criteria);
    

    return todos;
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
