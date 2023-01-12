import jwtDecode from 'jwt-decode';
import { Op } from 'sequelize';
import { parseISO, startOfDay, endOfDay } from 'date-fns';
import UserModel from '../database/models/user.model';
import AcconuntModel from '../database/models/account.model';
import TransactionModel from '../database/models/trasaction.model';
import {
  IBody,
  IToken,
  ITransactionService,
  ITransaction,
} from '../interfaces/interfaces';

const message1 = 'Usuário não encontrado';
const message2 = 'Nenhuma Transação Efetuada';

export default class TransactionService implements ITransactionService {
  // eslint-disable-next-line max-lines-per-function
  public createTransaction = async (
    token: string,
    body: IBody,
  ): Promise<ITransaction | { message: string }> => {
    const userModel = UserModel;
    const accountModel = AcconuntModel;
    const transactionModel = TransactionModel;
    const decoded = jwtDecode<IToken>(token);
    const findUserDebited = await userModel.findOne({
      where: { username: decoded.username },
    });
    const findUserCredited = await userModel.findOne({
      where: { username: body.username },
    });
    if (!findUserDebited || !findUserCredited) {
      return { message: message1 };
    }
    const findBalanceUserDebited = await accountModel.findOne({
      where: { id: findUserDebited.accountId },
    });
    const findBalanceUserCrebited = await accountModel.findOne({
      where: { id: findUserCredited.accountId },
    });
    if (!findBalanceUserDebited || !findBalanceUserCrebited) {
      return { message: message1 };
    }
    if (findUserDebited.username === findUserCredited.username) {
      return { message: 'Operação não permitida' };
    }
    if (findBalanceUserDebited.balance <= 0) {
      return { message: 'Saldo Insuficiente!' };
    }
    const createTransaction = await transactionModel.create({
      debitedAccountId: findUserDebited.id,
      creditedAccountId: findUserCredited.id,
      value: Number(body.value),
      createdAt: new Date(),
    });
    await accountModel.update(
      { balance: Number(findBalanceUserDebited.balance) - Number(body.value) },
      { where: { id: findBalanceUserDebited.id } },
    );
    await accountModel.update(
      { balance: Number(findBalanceUserCrebited.balance) + Number(body.value) },
      { where: { id: findBalanceUserCrebited.id } },
    );
    return createTransaction as ITransaction;
  };

  // eslint-disable-next-line max-lines-per-function
  public getTransactionCashOutAndCashIn = async (
    token: string,
  ): Promise<TransactionModel[] | { message: string }> => {
    const userModel = UserModel;
    const transactionModel = TransactionModel;
    const decoded = jwtDecode<IToken>(token);
    const findUser = await userModel.findOne({
      where: { username: decoded.username },
    });

    if (!findUser) {
      return { message: message1 };
    }
    const transactionUser = await transactionModel.findAll({
      where: {
        [Op.or]: [
          { debitedAccountId: findUser.accountId },
          { creditedAccountId: findUser.accountId },
        ],
      },
    });
    return transactionUser;
  };

  // eslint-disable-next-line max-lines-per-function
  public getTransactionCashOut = async (
    token: string,
    date: string,
  ): Promise<ITransaction[] | { message: string } | { message2: string }> => {
    const userModel = UserModel;
    const transactionModel = TransactionModel;
    const decoded = jwtDecode<IToken>(token);
    const findUser = await userModel.findOne({
      where: { username: decoded.username },
    });
    if (!findUser) {
      return { message: message1 };
    }
    if (date) {
      const parseDate = parseISO(date);
      const findDateTransactions = await transactionModel.findAll({
        where: {
          [Op.or]: [
            { debitedAccountId: findUser.accountId },
          ],
          createdAt: {
            [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)],
          },
        },
      });
      if (!findDateTransactions) return { message: message2 };
      return findDateTransactions;
    }
    const transactionsUser = await transactionModel.findAll({
      where: { debitedAccountId: findUser.accountId },
    });
    if (!transactionsUser) return { message: message2 };
    return transactionsUser;
  };

  // eslint-disable-next-line max-lines-per-function
  public getTransactionCashIn = async (
    token: string,
    date: string,
  ): Promise<ITransaction[] | { message: string } | { message2: string }> => {
    const userModel = UserModel;
    const transactionModel = TransactionModel;
    const decoded = jwtDecode<IToken>(token);
    const findUser = await userModel.findOne({
      where: { username: decoded.username },
    });
    if (!findUser) {
      return { message: message1 };
    }
    if (date) {
      const parseDate = parseISO(date);
      const findDateTransactions = await transactionModel.findAll({
        where: {
          [Op.or]: [
            { creditedAccountId: findUser.accountId },
          ],
          createdAt: {
            [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)],
          },
        },
      });
      if (!findDateTransactions) return { message: message2 };
      return findDateTransactions;
    }
    const transactionsUser = await transactionModel.findAll({
      where: { creditedAccountId: findUser.accountId },
    });
    if (!transactionsUser) return { message: message2 };
    return transactionsUser;
  };
}
