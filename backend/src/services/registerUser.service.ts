import * as bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import AccountModel from '../database/models/account.model';
import { IRegister, IRegisterService } from '../interfaces/interfaces';

export default class RegisterService implements IRegisterService {
  public createUser = async (user: IRegister): Promise<IRegister | { message: string }> => {
    const userModel = UserModel;
    const accountModel = AccountModel;
    if (await userModel.findOne({ where: { username: user.username } })) {
      return { message: 'O usuario já existe' };
    }
    const accountUser = await accountModel.create({
      balance: 100,
    });
    const userLogin = await userModel.create({
      username: user.username,
      password: bcrypt.hashSync(user.password, 10),
      accountId: accountUser.id,
    });
    return userLogin;
  };
}
