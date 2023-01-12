import { Router } from 'express';
import TransactionController from '../controllers/transaction.controller';
import { validateToken } from '../utils/jwt-function';

const transactionRouter = Router();
const transactionController = new TransactionController();

transactionRouter.post(
  '/',
  validateToken,
  transactionController.createTransaction,
);

transactionRouter.get(
  '/cash-out',
  validateToken,
  transactionController.getTransactionCashOut,
);

transactionRouter.get(
  '/cash-in',
  validateToken,
  transactionController.getTransactionCashIn,
);

transactionRouter.get(
  '/any-transactions',
  validateToken,
  transactionController.getTransactionCashOutAndCashIn,
);

export default transactionRouter;
