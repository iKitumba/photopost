const { Model, DataTypes } = require("sequelize");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        username: DataTypes.STRING,
        bio: DataTypes.STRING,
        avatar: DataTypes.STRING,
        password: DataTypes.STRING,
        avatar_url: {
          type: DataTypes.VIRTUAL,
          get() {
            return `http://${process.env.HOST}:${process.env.PORT}/avatars/${this.avatar}`;
          },
        },
      },
      {
        sequelize,
        hooks: {
          beforeCreate: async (user, options) => {
            user.password = await bcrypt.hash(user.password, 10);

            if (!user.id) {
              user.id = crypto.randomUUID();
            }
          },
        },
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Post, { foreignKey: "user_id", as: "post" });
  }
}

module.exports = User;
