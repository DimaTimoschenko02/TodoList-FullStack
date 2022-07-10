import axios, { Axios } from "axios";
import { ITodo } from "../types/todoTypes";
import ApiService from "./ApiService";
import TodoModel from "../models/TodoModel";
class TodoService extends ApiService {
  todoUrl: string;
  fetchingService: Axios;
  constructor() {
    super();
    this.todoUrl = "todo";
    this.fetchingService = axios;
  }

  async getAllTodo(): Promise<TodoModel[]> {
    try {
      const { data } = await this.getAllTodoHandler(`${this.todoUrl}`);
      const res = data.map((data) => new TodoModel(data));
      return res;
    } catch (err: any) {
      return err;
    }
  }

  async getTodo(id: string) {
    try {
      const { data } = await this.getOneTodoHandler(`${this.todoUrl}`, id);
      return new TodoModel(data);
    } catch (err) {
      return err;
    }
  }

  async addTodo(todo: ITodo): Promise<TodoModel> {
    try {
      const { data } = await this.addTodoHandler(
        `${this.todoUrl}/create`,
        todo
      );
      return new TodoModel(data);
    } catch (err: any) {
      return err;
    }
  }

  async updateTodo(todo: ITodo):Promise<TodoModel> {
    try {
      const { data } = await this.updateTodoHandler(
        `${this.todoUrl}/update`,
        todo
      );
      const mod = new TodoModel(data);
      return mod;
    } catch (err:any) {
      return err;
    }
  }

  async deleteTodo(id: string) {
    try {
      const { data } = await this.delTodoHandler(`${this.todoUrl}/delete`, id);
      return data;
    } catch (err) {
      return err;
    }
  }
}

const todoService = new TodoService();
export default todoService;
