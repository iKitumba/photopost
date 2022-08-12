"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("posts", {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("posts");
  },
};
