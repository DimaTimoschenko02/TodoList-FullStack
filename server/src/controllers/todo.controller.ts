import { Response, Request, NextFunction } from "express";
import TodoService from "../services/todo.service";
import { get } from "lodash";
import ApiError from "../exeptions/apiErrors";

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodoHandler(req: Request, res: Response , next: NextFunction) {
    // TODO: Write your implementation here
    const todos = await this.todoService.findAll();
    res.json({ todos });
  }

  async getTodoHandler(req: Request, res: Response , next:NextFunction) {
    try {
      const id = get(req, "params.id");
      const todo = await this.todoService.isExist({_id:id});
      if (!todo) {
        return next(new ApiError(404, 'Post not found'));
      }
      res.json({ todo });
    } catch (err) {
      next(err);
    }
  }
  async updateTodoHandler(req: Request, res: Response , next: NextFunction) {
    try {
      const body = req.body;
      const id = get(req, "params.id");
      const isExist = this.todoService.isExist({_id:id})
      if(!isExist){
        return next(new ApiError(404, 'Post not found'));
      }
      const todo = await this.todoService.update({ _id: id }, body, {
        new: true,
      });
      res.json({ todo });
    } catch (err) {
      next(err);
    }
  }

  async createTodoHandler(req: Request, res: Response , next: NextFunction) {
    try {
      const todo = await this.todoService.create(req.body);
      res.json({ todo });
    } catch (err) {
      next(err);
    }
  }
  async deleteTodoHandler(req: Request, res: Response , next: NextFunction) {
    try {
      const id = get(req, "params.id");

      const todo = await this.todoService.isExist({_id:id});
      if (todo === null) {
        return next(new ApiError(404, 'Post not found'));
        
      }
      const deleted = await this.todoService.deleteTodo(id);
      res.json({ message: "delete successfully" , deleted });
    } catch (err) {
      next(err)
    }
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
