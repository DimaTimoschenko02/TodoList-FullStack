import axios, { Axios } from "axios";
import { ITodo , TodoQuery } from "../types/todoTypes";
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

  async getAllTodo(query?: TodoQuery):Promise<TodoModel[] | []>{
    const { data } = await this.getAll({url: this.todoUrl , query});
    if (!Array.isArray(data)) return [];
    const todos = data.map((data) => new TodoModel(data));
    return todos;
  }

  async getTodo(id: string) {
    const { data } = await this.getOne({url: this.todoUrl + id});
    return new TodoModel(data);
  }

  async addTodo(todo: ITodo){
    const { data } = await this.create({url: this.todoUrl + '/create' , data: {...todo}});
    return new TodoModel(data);
  }

  async updateTodo(todo: ITodo){
    const { data } = await this.update(
      {url: this.todoUrl+ '/update/' + todo._id , data: {...todo}}
    );
    return new TodoModel(data);
  }

  async deleteTodo(id: string) {
    const { data } = await this.delete({url: this.todoUrl + `/delete/${id}`});
    return data;
  }
}

const todoService = new TodoService();
export default todoService;
