import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import { IFilterQuery } from "../controllers/todo.controller";
import { ITodo } from "todos.type";
import Todo from "../models/Todo";



interface ITodoParams {
  search: string,
  completed?: string
  page: string
}


export default class TodoService {
  async deleteTodo(todoId: string) {
    return await Todo.findByIdAndDelete(todoId);
  }

  async findAll(userId: string, search: string, status: string): Promise<ITodo[]> {

    // const max = 3
    // let completedStatus;
    // if (status === "completed") {
    //     completedStatus = true;
    // } else {
    //     completedStatus = false;
    // }
    // const query = {
    //     //title: { $regex: search, $options: "i" },
    //     //completed: completedStatus,
    //     $or: [{ public: true }, { userId }]
    // };

    const todos = await Todo.find();
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
