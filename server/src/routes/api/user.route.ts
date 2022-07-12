import { Router, Request, Response } from "express";
import { userSchema } from "../../schemas/user.schema";
import userController from "../../controllers/user.controller";
import { tryCatchchMiddleware , isExistUserMiddleware , comparePassword, validateRequest} from "../../middleware";


const router: Router = Router();

router.post(
  "/sign-up",
  [ validateRequest(userSchema) , isExistUserMiddleware('signup')],
  tryCatchchMiddleware(userController.signup.bind(userController))
);

router.post(
  '/sign-in',
  [validateRequest(userSchema) ,isExistUserMiddleware('sign-in'), comparePassword()],
   tryCatchchMiddleware(userController.signin.bind(userController))
)

export default router;
