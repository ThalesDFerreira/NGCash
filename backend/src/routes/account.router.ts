import { Router } from 'express';
import AccountController from '../controllers/account.controller';
import { validateToken } from '../utils/jwt-function';

const accountRouter = Router();
const accountController = new AccountController();

accountRouter.get('/', validateToken, accountController.getBalance);

export default accountRouter;
