import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { IRegister } from '../interfaces/interfaces';

dotenv.config();
const config = { expiresIn: '24h' };

const secret: jwt.Secret = process.env.JWT_SECRET || 'jwt_secret';
const generateToken = (body: IRegister) => jwt.sign(body, secret, config);

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Autorização não Encontrada' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.body.token = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Autorização Inválida' });
  }
};

export { generateToken, validateToken };
