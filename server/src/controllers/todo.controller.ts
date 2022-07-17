import { Response, Request, NextFunction } from "express";
import TodoService from "../services/todo.service";

// export interface IFilterQuery {
//   title: { $regex: RegExp; $options: string };
//   $or: { [key: string]: string | boolean }[];
//   completed?: boolean;
// }

interface ReqParams {
  page?: string;
}

export interface Query {
  search?: string;
  completed?: string;
  page?: string;
}
type ReqQuery = Request<ReqParams, {}, {}, Query>;

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodoHandler(
    req: Request<ReqParams, {}, {}, Query>,
    res: Response
  ) {
    const search = req.query.search || "";
    const status = req.query.completed || "";
    const userId = req.app.get("user")._id;
    console.log({ data: req.query });

    const data = await this.todoService.findAll(userId , req.query);
    //const data = await this.todoService.findAll(userId)

    return { status: 200, data };
  }

  async getTodoHandler(req: Request, res: Response) {
    const data = await this.todoService.findOne({ _id: req.params.id });
    return { status: 201, data };
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
