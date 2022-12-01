const User = require("../models/Users");
const jwt = require("jsonwebtoken");

class LoginController {
  // get(req, res, next) {
  //   res.send("login 123");
  // }
  async post(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    await User.findOne({
      email: email,
      password: password,
    })
      .then((data) => {
        if (data) {
          const token = jwt.sign({ _id: data._id }, "pass");
          return res
            .json(token) 
            .status(200)
            .redirect("/");
        }
        else {
          return res
            .status(401)
            .json('error')
        }
      })
      .catch(next)
  }
}

module.exports = new LoginController();