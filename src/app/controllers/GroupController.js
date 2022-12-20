const { default: mongoose } = require("mongoose");
const Groups = require("../models/Groups");
const Users = require("../models/Users");
class GroupController {
  createGroup(req, res, next) {
    Users.findOne({
      _id: req.body.memberID,
    })
      .populate("_id")
      .then((user) => {
        const memberID = user._doc;
        const data = new Groups({
          nameGroup: req.body.nameGroup,
          memberID: memberID,
          masterID: req.body.masterID,
        });
        data.save().then(() => res.json(data).status(200));
      })
      .catch(next);
  }
  // POST: group/new
  async newGroup(req, res, next) {
    const checkNameGroup = await Groups.findOne({
      nameGroup: req.body.nameGroup,
    });
    if (checkNameGroup) {
      return res.status(422).json("Name Group already exists");
    } else {
      const groups = new Groups({
        nameGroup: req.body.nameGroup,
        memberID: req.body.memberID,
        masterID: req.body.masterID,
      });
      groups.save().then((doc) => {
        res.status(201).json({
          message: "create new Group succes",
          results: doc,
        });
      });
    }
  }
  // PATCH: group/update/:id
  async updateGroup(req, res, next) {
    try {
      const group = await Groups.findByIdAndUpdate(
        {
          _id: req.params.id,
        },
        {
          nameGroup: req.body.nameGroup,
          memberID: req.body.memberID,
          masterID: req.body.masterID,
        }
      );
      const newGroup = await group.save();
      return res.json(newGroup).status(200);
    } catch (error) {
      return res.status(500);
    }
  }
  // GET: group/list
  async showGroup(req, res, next) {
    const users = await Groups.find({})
      .populate("masterID")
      .populate("memberID");
    try {
      res.send(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  // GET: group/list/id
  async showOneGroup(req, res, next) {
    const users = await Groups.findOne({ _id: req.params.id })
      .populate("memberID")
      .populate("masterID");
    try {
      res.send(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  // DELETE: group/delete/:id
  async deleteGroup(req, res, next) {
    try {
      const group = await Groups.findByIdAndDelete(req.params.id, req.body);
      if (!group) res.status(404).send("No item found");
      res.status(200).send();
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new GroupController();
