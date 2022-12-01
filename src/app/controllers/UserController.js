const Users = require("../models/Users");
const jwt = require("jsonwebtoken");



class UserControllor {
  get(req, res, next) {
    Users.find({})
      .then((user) => {
        res.json(user);
      })
      .catch(next);
  }

  getUser(req, res, next) {
    try {
      const token = req.headers['authorization'];
      const tokenResult = token.split(" ").slice(1).join(" ");
      const result = jwt.verify(tokenResult, 'pass')
      const _id = result._id;
      Users.findOne({
        _id : _id,
      })
      .then((data) => {
        return res
          .status(200)
          .json(data)
      })
    }
    catch(error) {
      console.log(error)
    }
  }
}

module.exports = new UserControllor();