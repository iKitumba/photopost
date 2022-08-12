const Comment = require("../models/Comment");
const Post = require("../models/Post");

class CommentController {
  static async store(req, res) {
    const { post_id } = req.params;
    const { user_id } = req;
    const { text } = req.body;

    const post = await Post.findByPk(post_id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = await Comment.create({ text, user_id, post_id });

    return res.json(comment);
  }
}

module.exports = CommentController;
