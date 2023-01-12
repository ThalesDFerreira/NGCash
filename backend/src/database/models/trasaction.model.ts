import { Model, INTEGER, DATE } from 'sequelize';
import db from '.';
import AccountModel from './account.model';

class TransactionModel extends Model {
  id!: number;
  debitedAccountId!: number;
  creditedAccountId!: number;
  value!: number;
  createdAt!: Date;
}

TransactionModel.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    debitedAccountId: {
      type: INTEGER,
      allowNull: false,
    },
    creditedAccountId: {
      type: INTEGER,
      allowNull: false,
    },
    value: {
      type: INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DATE,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'transactions',
    timestamps: false,
  },
);

TransactionModel.belongsTo(AccountModel, { foreignKey: 'debitedAccountId', as: 'idDebited' });
TransactionModel.belongsTo(AccountModel, { foreignKey: 'creditedAccountId', as: 'idCredited' });

AccountModel.hasMany(TransactionModel, { foreignKey: 'debitedAccountId', as: 'idDebitedId' });
AccountModel.hasMany(TransactionModel, { foreignKey: 'creditedAccountId', as: 'idCreditedId' });

export default TransactionModel;
