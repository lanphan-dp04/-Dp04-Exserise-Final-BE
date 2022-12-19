const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class LoginController {
  async post(req, res, next) {
    try {
      const email = req.body.email;
      const user = await User.findOne({
        email: email,
      });
      if (!user) {
        return res.json("Wrong credentials!").status(400);
      }
      const validated = await bcrypt.compare(req.body.password, user.password);
      !validated && res.status(400).json("Wrong credentials!");

      if (validated === true) {
        const token = await jwt.sign({ _id: user._id }, "pass");
        return res.json(token).status(200);
      } else {
        return res.json(next);
      }
    } catch (error) {
      return res.json(error).status(500);
    }
  }
}

module.exports = new LoginController();
