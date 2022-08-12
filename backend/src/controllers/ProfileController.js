const User = require("../models/User");

class ProfileController {
  static async show(req, res) {
    const { user_id } = req.params;
    const user = await User.findByPk(user_id, {
      attributes: [
        "id",
        "avatar",
        "avatar_url",
        "username",
        "bio",
        "created_at",
      ],
      include: {
        association: "post",
        attributes: ["id", "image", "image_url", "created_at"],
      },
    });

    return res.json(user);
  }
}

module.exports = ProfileController;
