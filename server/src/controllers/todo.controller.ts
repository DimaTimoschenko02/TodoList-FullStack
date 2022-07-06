import { Response, Request, NextFunction } from "express";
import TodoService from "../services/todo.service";


export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodoHandler(req: Request, res: Response, next: NextFunction) {
    const todo = await this.todoService.findAll();
    return { status: 200, todo };
  }

  async getTodoHandler(req: Request, res: Response, next: NextFunction) {
    const todo = await this.todoService.findOne({ _id: req.params.id });
    return { status: 200, todo };
  }
  async updateTodoHandler(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const todo = await this.todoService.update({ _id: req.params.id }, body, {
      new: true,
    });
    return { status: 201, todo };
  }

  async createTodoHandler(req: Request, res: Response, next: NextFunction) {
    const todo = await this.todoService.create(req.body);
    return { status: 201, todo };
  }
  async deleteTodoHandler(req: Request, res: Response, next: NextFunction) {
    const todo = await this.todoService.deleteTodo(req.params.id);
    return { status: 200, todo };
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
