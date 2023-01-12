import { Request, Response } from 'express';
import RegisterService from '../services/registerUser.service';
import { IRegisterService } from '../interfaces/interfaces';

export default class RegisterController {
  constructor(private _loginService: IRegisterService = new RegisterService()) {}

  public createUser = async (req:Request, res:Response) => {
    const result = await this._loginService.createUser(req.body);
    return res.status(201).json(result);
  };
}
