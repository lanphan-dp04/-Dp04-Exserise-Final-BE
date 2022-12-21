const Groups = require("../models/Groups");
const Notifies = require("../models/Notifies");
const Users = require("../models/Users");
class NotifiesController {
  async getNotifies(req, res, next) {
    try {
      const resNoti = await Notifies.find({
        to: req.params.id,
        isSeen: { $eq: false },
      });
      return res.json(resNoti).status(200);
    } catch (error) {
      return res.josn(error).status(500);
    }
  }
  async updateNotifies(req, res, next) {
    try {
      const resNoti = await Notifies.findOneAndUpdate(
        { _id: req.body.id },
        {
          isSeen: true,
        }
      );
      await resNoti.save();
      return res.json(resNoti).status(200);
    } catch (error) {
      return res.josn(error).status(500);
    }
  }
}

module.exports = new NotifiesController();
