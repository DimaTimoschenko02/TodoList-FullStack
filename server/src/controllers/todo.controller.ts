import { Response, Request, NextFunction } from "express";
import TodoService from "../services/todo.service";


export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodoHandler(req: Request, res: Response, next: NextFunction) {
    const userId = req.app.get('user')._id
    const data = await this.todoService.findAll(userId);
    return { status: 200, data };
  }

  async getTodoHandler(req: Request, res: Response, next: NextFunction) {
    const data = await this.todoService.findOne({ _id: req.params.id });
    return { status: 200, data };
  }
  async updateTodoHandler(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const data = await this.todoService.update({ _id: req.params.id }, body, {
      new: true,
    });
    return { status: 201, data};
  }

  async createTodoHandler(req: Request, res: Response, next: NextFunction) {
    const userId = req.app.get('user')
    const data = await this.todoService.create({...req.body , userId});
    return { status: 201, data };
  }
  async deleteTodoHandler(req: Request, res: Response, next: NextFunction) {
    const data = await this.todoService.deleteTodo(req.params.id);
    return { status: 200, data };
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
