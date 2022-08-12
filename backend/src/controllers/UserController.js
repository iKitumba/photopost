const User = require("../models/User");
const bcrypt = require("bcryptjs");

const generateToken = require("../utils/generateToken");

class UserController {
  static async store(req, res) {
    const { filename: avatar } = req.file;
    const { username, bio, password } = req.body;
    const user = await User.create({ username, bio, password, avatar });

    user.password = undefined;
    const token = generateToken({ id: user.id });

    return res.json({ user, token });
  }

  static async authenticate(req, res) {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid password" });
    }

    user.password = undefined;
    const token = generateToken({ id: user.id });

    return res.json({ user, token });
  }
}

module.exports = UserController;
