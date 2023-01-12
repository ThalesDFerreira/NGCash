import { Router } from 'express';
import RegisterMiddleware from '../middlewares/registerMiddleware';
import RegisterController from '../controllers/registerUser.controller';

const registerUserRouter = Router();
const registerController = new RegisterController();
const registerMiddleware = new RegisterMiddleware();

registerUserRouter.post('/', registerMiddleware.validateFields, registerController.createUser);

export default registerUserRouter;
