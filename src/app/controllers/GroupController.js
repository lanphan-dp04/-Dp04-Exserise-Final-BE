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
  // GET: group/list
  async showGroup(req, res, next) {
    const users = await Groups.find({})
      .populate("memberID")
      .populate("masterID");
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
}

module.exports = new GroupController();
