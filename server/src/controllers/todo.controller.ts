import { Response, Request, NextFunction } from "express";
import TodoService from "../services/todo.service";

export interface ITodoFilterQuery {
  title: { $regex: RegExp; $options: string };
  $or: { [key: string]: string | boolean }[];
  isCompleted?: boolean;
}

export interface ITodoParams{
  page?: string
}

export interface ITodoQuery {
  search?: string; 
  status?: string 
  page?: string
}
type ReqQuery = Request<ITodoParams, {}, {}, ITodoQuery>;

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodoHandler(req: ReqQuery, res: Response) {
    const userId = req.app.get("user")._id;
    const {query, params } = req
        const queryParams = {
            search: query.search ? query.search : '', 
            status: query.status ? query.status : '', 
            page: query.page ? query.page : '1'
        }
        const todos = await this.todoService.findAll( userId , queryParams);
        
    return { status: 200, todos };
  }

  async getTodoHandler(req: Request, res: Response) {
    const data = await this.todoService.findOne({ _id: req.params.id });
    return { status: 200, data };
  }
  async updateTodoHandler(req: Request, res: Response) {
    const body = req.body;
    const data = await this.todoService.update({ _id: req.params.id }, body, {
      new: true,
    });
    return { status: 201, data };
  }

  async createTodoHandler(req: Request, res: Response) {
    const userId = req.app.get("user");
    const data = await this.todoService.create({ ...req.body, userId });
    return { status: 201, data };
  }
  async deleteTodoHandler(req: Request, res: Response) {
    const data = await this.todoService.deleteTodo(req.params.id);
    return { status: 200, data };
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
