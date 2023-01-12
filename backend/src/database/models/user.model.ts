import { INTEGER, STRING, Model } from 'sequelize';
import db from '.';
import AccountModel from './account.model';

class UserModel extends Model {
  id!: number;
  username!: string;
  password!: string;
  accountId!: number;
}

UserModel.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: STRING,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    accountId: {
      type: INTEGER,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'users',
    timestamps: false,
  },
);

UserModel.belongsTo(AccountModel, { foreignKey: 'accountId', as: 'idAccount' });
AccountModel.hasOne(UserModel, { foreignKey: 'id', as: 'idAccontId' });

export default UserModel;
