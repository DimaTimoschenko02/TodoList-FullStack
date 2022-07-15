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

  async findAll(userId: string, query?: Query): Promise<ITodo[]> {
    if (query) {
      let { search, year, completed } = query;
      const title = new RegExp(search);
      return await Todo.find({
        $or: [{ public: true }, { userId }, { year }],
        title :{$regex: title , $options: 'i'},
        completed:!!completed
        
      });
    }
    return await Todo.find({
      $or: [{ public: true }, { userId }]})
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
