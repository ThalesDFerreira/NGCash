import { NextFunction, Request, Response } from 'express';

const password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/;
// retirado do site https://pt.stackoverflow.com/questions/373574/regex-para-senha-forte

export default class LoginMiddleware {
  validateFields = (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Response | void => {
    if (!password.test(request.body.password) || request.body.username.length < 3) {
      return response
        .status(400)
        .json({ message: 'Usuário ou senha inválidos' });
    }
    next();
  };
}
