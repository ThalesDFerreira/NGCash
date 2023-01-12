module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "transactions",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true, 
          autoIncrement: true,
          allowNull: false,
        },
        debited_account_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'accounts',
            key: 'id'
          }
        },
        credited_account_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'accounts',
            key: 'id'
          }
        },
        value: {
        type: Sequelize.INTEGER,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        timestamps: false,
      }
    );
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("transactions");
  },
};
