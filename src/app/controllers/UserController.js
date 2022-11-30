const Users = require("../models/Users");


class UserControllor {
  get(req, res, next) {
    Users.find({})
      .then((user) => {
        res.json(user);
      })
      .catch(next);
  }
}

module.exports = new UserControllor();