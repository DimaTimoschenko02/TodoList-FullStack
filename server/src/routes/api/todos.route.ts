import { Router } from "express";
import {
  isExistTodoMiddleware,
  validateRequest,
  tryCatchchMiddleware,
  authMiddleware,
} from "../../middleware";
import todoController from "../../controllers/todo.controller";
import {
  createTodoSchema,
  deleteTodoSchema,
  updateTodoSchema,
} from "../../schemas/todo.schema";
import Todo from "../../models/Todo";

const todosRouter: Router = Router();

todosRouter.get(
  "/",
  authMiddleware,
  tryCatchchMiddleware(todoController.getAllTodoHandler.bind(todoController))
);
todosRouter.get(
  "/:id",
  isExistTodoMiddleware(Todo),
  tryCatchchMiddleware(todoController.getTodoHandler.bind(todoController))
);
todosRouter.post(
  "/create",
  [authMiddleware, validateRequest(createTodoSchema)],
  tryCatchchMiddleware(todoController.createTodoHandler.bind(todoController))
);
todosRouter.put(
  "/update/:id",
  [
    authMiddleware,
    isExistTodoMiddleware(Todo),
    validateRequest(updateTodoSchema),
  ],
  tryCatchchMiddleware(todoController.updateTodoHandler.bind(todoController))
);
todosRouter.delete(
  "/delete/:id",
  [
    authMiddleware,
    isExistTodoMiddleware(Todo),
    validateRequest(deleteTodoSchema),
  ],
  tryCatchchMiddleware(todoController.deleteTodoHandler.bind(todoController))
);

export default todosRouter;
