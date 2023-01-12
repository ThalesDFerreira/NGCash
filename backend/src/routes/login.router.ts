import { Router } from 'express';
import LoginController from '../controllers/login.controller';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post('/', loginController.createLogin);

export default loginRouter;
