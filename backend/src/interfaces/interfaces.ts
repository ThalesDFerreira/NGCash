import TransactionModel from '../database/models/trasaction.model';

export interface IRegister {
  username: string;
  password: string;
}

export interface IBalance {
  id: number;
  balance: number;
}

export interface IToken {
  username: string;
  password: string;
  exp: number;
  iat: number;
}

export interface IBody {
  username: string;
  value: number;
}

export interface ITransaction {
  id: number;
  debitedAccountId: number;
  creditedAccountId: number;
  value: number;
  createdAt: Date;
}

export interface IRegisterService {
  createUser(user: IRegister): Promise<IRegister | { message: string }>;
}

export interface ILoginService {
  createLogin(user: IRegister): Promise<string | { message: string }>;
}

export interface IAccountService {
  getBalance(token: string): Promise<IBalance | { message: string }>;
}

export interface ITransactionService {
  createTransaction(
    token: string,
    body: IBody
  ): Promise<ITransaction | { message: string }>;
  getTransactionCashOut(
    token: string,
    date: string,
  ): Promise<ITransaction[] | { message: string } | { message2: string }>;
  getTransactionCashIn(
    token: string,
    date: string,
  ): Promise<ITransaction[] | { message: string } | { message2: string }>;
  getTransactionCashOutAndCashIn(
    token: string
  ): Promise<TransactionModel[] | { message: string }>;
}
