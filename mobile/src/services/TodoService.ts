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
    const { data } = await this.getAllTodoHandler(`${this.todoUrl}`);
    const res = data.map((data) => new TodoModel(data));
    return res;
  }

  async getTodo(id: string) {
    const { data } = await this.getOneTodoHandler(`${this.todoUrl}`, id);
    return new TodoModel(data);
  }

  async addTodo(todo: ITodo): Promise<TodoModel> {
    const { data } = await this.addTodoHandler(`${this.todoUrl}/create`, todo);
    return new TodoModel(data);
  }

  async updateTodo(todo: ITodo): Promise<TodoModel> {
    const { data } = await this.updateTodoHandler(
      `${this.todoUrl}/update`,
      todo
    );
    const mod = new TodoModel(data);
    return mod;
  }

  async deleteTodo(id: string) {
    const { data } = await this.delTodoHandler(`${this.todoUrl}/delete`, id);
    return data;
  }
}

const todoService = new TodoService();
export default todoService;
