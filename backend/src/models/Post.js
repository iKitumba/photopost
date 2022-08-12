const { Model, DataTypes } = require("sequelize");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        image: DataTypes.STRING,
        image_url: {
          type: DataTypes.VIRTUAL,
          get() {
            return `http://${process.env.HOST}:${process.env.PORT}/files/${this.image}`;
          },
        },
      },
      {
        sequelize,
        hooks: {
          beforeCreate: async (post, options) => {
            if (!post.id) {
              post.id = crypto.randomUUID();
            }
          },
          beforeDestroy: (post, options) => {
            console.log(post);
            fs.unlinkSync(
              path.resolve(
                __dirname,
                "..",
                "..",
                "uploads",
                "posts",
                post.image
              )
            );
          },
        },
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    this.hasMany(models.Comment, { foreignKey: "post_id", as: "comments" });
  }
}

module.exports = Post;
