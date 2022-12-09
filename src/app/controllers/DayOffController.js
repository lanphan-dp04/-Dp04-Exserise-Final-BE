const DayOff = require("../models/DayOff");
const Groups = require("../models/Groups");
const Notifies = require("../models/Notifies");
const User = require("../models/Users");
class DayOffController {
  createDayOff(req, res, next) {
    User.findOne({
      _id: req.body.userID,
    })
      .populate("_id")
      .then((user) => {
        const userId = user.id;
        Groups.find({
          memberID: userId,
        })
          .then((groups) => {
            const arrMasterId = [];
            groups.forEach((group) => {
              arrMasterId.push(group.masterID);
            });
            const newArrMaster = arrMasterId.toString().split(',');
            const newArrMasterId = Array.from(new Set(newArrMaster))
         
            const data = new DayOff({
              userId: userId,
              reason: req.body.reason,
              fromDay: req.body.fromDay,
              toDay: req.body.toDay,
              quantity: req.body.quantity,
              partialDay: req.body.partialDay,
              listMaster: newArrMasterId,
            });
            try {
              data.save().then((data) => {
                const dataNotifies = new Notifies({
                  dayoffID: data.id,
                  masterID: newArrMasterId,
                  status: data.status,
                  note: "",
                });
                
                dataNotifies.save();

                return res.json(data)
                          .status(200)
              });
            } catch (error) {
              console.log(error);
            }
          })
          .catch((err) => {
            return res.json(err).status(400);
          });
      })
      .catch(next);
  }

  async getDayOff(req, res, next) {
    try {
      const dayoff = await DayOff.findOne({
        _id: req.params.id,
        status: "Pending",
      });
      return res.json(dayoff);
    } catch (error) {
      return res.status(400);
    }
  }
}

module.exports = new DayOffController();
