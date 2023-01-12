import { Request, Response } from 'express';
import LoginService from '../services/login.service';
import { ILoginService } from '../interfaces/interfaces';

export default class LoginController {
  constructor(private loginService: ILoginService = new LoginService()) {}

  public createLogin = async (req:Request, res:Response) => {
    const result = await this.loginService.createLogin(req.body);
    return res.status(201).json(result);
  };
}
