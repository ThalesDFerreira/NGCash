module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "accounts",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        balance: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        timestamps: false,
      }
    );
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("accounts");
  },
};
