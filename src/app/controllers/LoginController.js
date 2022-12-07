const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class LoginController {

  async post(req, res, next) {
    try {
      const email = req.body.email;
    const user = await User.findOne({
      email: email,
    })
    !user && res.status(400).json("Wrong credentials!");

    const validated = await bcrypt.compare( req.body.password, user.password);
    !validated && res.status(400).json("Wrong credentials!");

    if(validated === true) {
      // const {password,...others}= await user._doc;  
      const token = await jwt.sign({ _id: user._id }, "pass");
        return res
            .json(token) 
            .status(200)
    }
    } catch (error) {
      return res
        .json(error) 
        .status(500)
    }
  }
}

module.exports = new LoginController();