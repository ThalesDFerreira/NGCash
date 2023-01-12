import jwtDecode from 'jwt-decode';
import UserModel from '../database/models/user.model';
import AcconuntModel from '../database/models/account.model';
import { IBalance, IAccountService, IToken } from '../interfaces/interfaces';

export default class AccountService implements IAccountService {
  public getBalance = async (token: string): Promise<IBalance | { message: string }> => {
    const userModel = UserModel;
    const accountModel = AcconuntModel;
    const decoded = jwtDecode<IToken>(token);
    const findUser = await userModel.findOne({ where: { username: decoded.username } });
    if (!findUser) {
      return { message: 'Usuário não encontrado' };
    }
    const balanceUser = await accountModel.findOne({ where: { id: findUser.accountId } });
    return balanceUser as IBalance;
  };
}
