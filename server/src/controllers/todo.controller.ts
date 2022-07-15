import { Response, Request, NextFunction } from "express";
import TodoService from "../services/todo.service";

// export interface IFilterQuery {
//   title: { $regex: RegExp; $options: string };
//   $or: { [key: string]: string | boolean }[];
//   completed?: boolean;
// }

// interface ReqParams {
//   page?: string;
// }

// interface Query {
//   search?: string;
//   completed?: string;
//   page?: string;
// }
// type ReqQuery = Request<
//   ReqParams,
//   {},
//   {},
//   { search?: string; status?: string }
// >;

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodoHandler(req: ReqQuery, res: Response) {
    // const search = req.query.search || "";
    // const status = req.query.status || "";
    // const userId = req.app.get("user")._id;
    // console.log({search , status})
    
    //const todos = await this.todoService.findAll(userId, search, status);
    const todos = await this.todoService.findAll()

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
