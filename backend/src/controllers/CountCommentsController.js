const Comment = require("../models/Comment");

class CountCommentsController {
  static async index(req, res) {
    const { post_id } = req.params;
    const numberOfComments = await Comment.count({
      where: { post_id },
    });

    return res.json({ numberOfComments });
  }
}

module.exports = CountCommentsController;
