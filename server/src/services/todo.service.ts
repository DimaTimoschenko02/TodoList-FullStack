import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import { ITodo } from "todos.type";
import Todo from "../models/Todo";
export default class TodoService {
  async deleteTodo(todoId: string) {
    return await Todo.findByIdAndDelete(todoId);
  }
  async findAll(id: string) {
    return await Todo.find({userId:id});
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
