const Groups = require("../models/Groups");
const Notifies = require("../models/Notifies");
const Users = require("../models/Users");
class NotifiesController {
  async getNotifies(req, res, next) {
    const masterID = req.query.masterId;
    const dayoffID = req.query.dayoffId;
    const noti = await Notifies.findOne({
      masterID: masterID,
      dayoffID: dayoffID,
    })
    return res.json(noti)
  }
}

module.exports = new NotifiesController();