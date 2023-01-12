import * as bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { IRegister, ILoginService } from '../interfaces/interfaces';
import { generateToken } from '../utils/jwt-function';

export default class LoginService implements ILoginService {
  public createLogin = async (user: IRegister): Promise<string | { message: string }> => {
    const userModel = UserModel;
    const findUser = await userModel.findOne({ where: { username: user.username } });
    if (!findUser) {
      return { message: 'Usuário não encontrado' };
    }
    if (bcrypt.compareSync(user.password, findUser.password)) {
      return generateToken(user);
    }
    return { message: 'Senha Incorreta' };
  };
}
