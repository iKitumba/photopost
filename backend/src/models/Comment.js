const { Model, DataTypes } = require("sequelize");
const crypto = require("crypto");

class Comment extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        text: DataTypes.TEXT,
      },
      {
        sequelize,
        hooks: {
          beforeCreate: async (comment, options) => {
            if (!comment.id) {
              comment.id = crypto.randomUUID();
            }
          },
        },
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    this.belongsTo(models.Post, { foreignKey: "post_id", as: "post" });
  }
}

module.exports = Comment;
