import { Request, Response } from 'express';
import AccountService from '../services/account.service';
import { IAccountService } from '../interfaces/interfaces';

export default class AccountController {
  constructor(private accountService: IAccountService = new AccountService()) {}

  public getBalance = async (req:Request, res:Response) => {
    const token = req.headers.authorization;
    const result = await this.accountService.getBalance(token as string);
    return res.status(200).json(result);
  };
}
