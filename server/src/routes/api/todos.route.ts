import { Router } from "express";
import { isExistMiddleware, validateRequest  , tryCatchchMiddleware} from "../../middleware";
import todoController from "../../controllers/todo.controller";
import { createTodoSchema, deleteTodoSchema, updateTodoSchema } from "../../schemas/todo.schema";
import Todo from "../../models/Todo";


const todosRouter: Router = Router();

todosRouter.get("/", tryCatchchMiddleware(todoController.getAllTodoHandler.bind(todoController)));
todosRouter.get("/:id", tryCatchchMiddleware(todoController.getTodoHandler.bind(todoController)));
todosRouter.post(
  "/create",
  validateRequest(createTodoSchema),
  tryCatchchMiddleware(todoController.createTodoHandler.bind(todoController))
);
todosRouter.put(
  "/update/:id",
  [isExistMiddleware(Todo),  validateRequest(updateTodoSchema)],
  tryCatchchMiddleware(todoController.updateTodoHandler.bind(todoController))
);
todosRouter.delete(
  "/delete/:id",
  [isExistMiddleware(Todo),  validateRequest(deleteTodoSchema)],
  tryCatchchMiddleware(todoController.deleteTodoHandler.bind(todoController))
);

export default todosRouter;
