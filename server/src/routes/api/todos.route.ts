import { Router } from "express";
import { validateRequest } from "../../middleware";
import todoController from "../../controllers/todo.controller";
import { createTodoSchema, deleteTodoSchema, updateTodoSchema } from "../../schemas/todo.schema";

const todosRouter: Router = Router();

todosRouter.get("/", todoController.getAllTodoHandler.bind(todoController));
todosRouter.get("/:id", todoController.getTodoHandler.bind(todoController));
todosRouter.post(
  "/create",
  validateRequest(createTodoSchema),
  todoController.createTodoHandler.bind(todoController)
);
todosRouter.put(
  "/update/:id",
  validateRequest(updateTodoSchema),
  todoController.updateTodoHandler.bind(todoController)
);
todosRouter.delete(
  "/delete/:id",
  validateRequest(deleteTodoSchema),
  todoController.deleteTodoHandler.bind(todoController)
);

export default todosRouter;
