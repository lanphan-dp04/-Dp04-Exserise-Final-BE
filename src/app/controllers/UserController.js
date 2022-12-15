const bcrypt = require("bcrypt");
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
      const token = req.headers["authorization"];
      const tokenResult = token.split(" ").slice(1).join(" ");
      const result = jwt.verify(tokenResult, "pass");
      const _id = result._id;
      Users.findOne({
        _id: _id,
      }).then((data) => {
        return res.status(200).json(data);
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  // POST: user/create
  async create(req, res, next) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);
      const checkMail = await Users.findOne({ email: req.body.email });
      const checkPhoneNumber = await Users.findOne({
        phoneNumber: req.body.phoneNumber,
      });
      if (checkMail || checkPhoneNumber) {
        return res.status(422).json("Email or phone number already exists");
      } else {
        const data = new Users({
          userName: req.body.userName,
          password: hashedPass,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber || " ",
          avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        });
        data
          .save()
          .then(() => res.json(data))
          .catch(next);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  // GET: user/list
  async show(req, res, next) {
    const users = await Users.find({});
    try {
      res.send(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  //get user/:id/update
  async update(req, res, next) {
    const users = await Users.findById(req.params.id);
    res.send(users);
  }
  // PATCH: user/:id
  async edit(req, res, next) {
    try {
      const users = await Users.findByIdAndUpdate(req.params.id, req.body);
      await Users.save();
      res.send(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  // DELETE: user/:id/delete
  async delete(req, res, next) {
    try {
      const user = await Users.findByIdAndDelete(req.params.id, req.body);
      if (!user) res.status(404).send("No item found");
      res.status(200).send();
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new UserControllor();
