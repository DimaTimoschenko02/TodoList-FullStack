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
    try {
      return await Todo.findByIdAndDelete(todoId);
    } catch (err) {
      throw err;
    }
  }
  async findAll() {
    try {
      return await Todo.find();
    } catch (err) {
      throw err;
    }
  }

  async create(todo: DocumentDefinition<ITodo>): Promise<ITodo> {
    try {
      return await Todo.create(todo);
    } catch (err) {
      throw err;
    }
  }

  async update(
    query: FilterQuery<ITodo>,
    update: UpdateQuery<ITodo>,
    options: QueryOptions
  ): Promise<ITodo | null> {
    return await Todo.findOneAndUpdate(query, update, options);
  }

  async isExist(query: FilterQuery<ITodo>) {
    try {
      return await Todo.findOne(query);
    } catch (err) {
      throw err;
    }
  }
}
