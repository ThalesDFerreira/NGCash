import { Request, Response } from 'express';
import TransactionService from '../services/transaction.service';
import { ITransactionService } from '../interfaces/interfaces';

export default class TransactionController {
  constructor(
    private transactionService: ITransactionService = new TransactionService(),
  ) {}

  public createTransaction = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const { body } = req;
    const result = await this.transactionService.createTransaction(
      token as string,
      body,
    );
    return res.status(201).json(result);
  };

  public getTransactionCashOutAndCashIn = async (
    req: Request,
    res: Response,
  ) => {
    const token = req.headers.authorization;
    const result = await this.transactionService.getTransactionCashOutAndCashIn(
      token as string,
    );
    return res.status(201).json(result);
  };

  public getTransactionCashOut = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const { date } = req.query;
    const result = await this.transactionService.getTransactionCashOut(
      token as string,
      date as string,
    );
    return res.status(201).json(result);
  };

  public getTransactionCashIn = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const { date } = req.query;
    const result = await this.transactionService.getTransactionCashIn(
      token as string,
      date as string,
    );
    return res.status(201).json(result);
  };
}
