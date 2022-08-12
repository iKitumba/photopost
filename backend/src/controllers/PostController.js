const Post = require("../models/Post");
const User = require("../models/User");
const fs = require("fs");
const path = require("path");

class PostController {
  static async index(req, res) {
    const posts = await Post.findAll({
      attributes: ["id", "image", "image_url", "created_at"],
      order: [["created_at", "DESC"]],
      include: [
        {
          association: "user",
          attributes: ["id", "username", "avatar_url", "avatar"],
        },
      ],
    });

    return res.json(posts);
  }

  static async store(req, res) {
    const { filename: image } = req.file;
    const { user_id } = req;

    const user = await User.findByPk(user_id);

    if (!user) {
      fs.unlink(
        path.resolve(__dirname, "..", "..", "uploads", "posts", image),
        (err, rest) => {
          if (err) {
            console.log(err);
          }
        }
      );

      return res.status(404).json({ error: "User not found" });
    }

    const post = await Post.create({ image, user_id });

    return res.json(post);
  }

  static async show(req, res) {
    const { post_id } = req.params;
    const post = await Post.findByPk(post_id, {
      attributes: ["id", "image", "image_url", "created_at"],
      include: [
        {
          association: "user",
          attributes: ["id", "username", "avatar", "avatar_url"],
        },
        {
          association: "comments",
          attributes: ["id", "text", "created_at"],
          order: [["created_at", "DESC"]],
          include: {
            association: "user",
            attributes: ["id", "username", "avatar", "avatar_url"],
          },
        },
      ],
    });

    return res.json(post);
  }

  static async destroy(req, res) {
    const { post_id } = req.params;

    await Post.destroy({ where: { id: post_id } });

    return res.json();
  }
}

module.exports = PostController;
