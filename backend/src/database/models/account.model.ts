import { Model, INTEGER } from 'sequelize';
import db from '.';

class AccountModel extends Model {
  id!: number;
  balance!: number;
}

AccountModel.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    balance: {
      type: INTEGER,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'accounts',
    timestamps: false,
  },
);

export default AccountModel;
