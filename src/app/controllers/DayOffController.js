const { MasterRquestSTT, RquestSTT } = require("../../utils/status");
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
              typeDayOff: req.body.typeDayOff,
              userId: userId,
              reason: req.body.reason,
              fromDay: req.body.fromDay,
              toDay: req.body.toDay,
              quantity: req.body.quantity,
              partialDay: req.body.partialDay,
              listMaster: newArrMasterId,
              countAction: 0,
            });
            try {
              data.save()
              .then((data) => {
                const arrMasters = data.listMaster.map( item => {
                    const dataNotifies = new Notifies({
                    dayoffID: data.id,
                    masterID: item,
                    status: data.status,
                    note: "",
                  });
                  return dataNotifies.save();
                })

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
      });
      return res.json(dayoff);
    } catch (error) {
      return res.status(400);
    }
  }

  async updateDayOff(req, res, next) {
    try {
      const resDayOff = await DayOff.findByIdAndUpdate({_id: req.body.dayoffId,},{
        typeDayOff: req.body.typeDayOff,
        reason: req.body.reason,
        status: RquestSTT.PENDING,
        fromDay: req.body.fromDay,
        toDay: req.body.toDay,
        quantity: req.body.quantity,
        partialDay: req.body.partialDay,
        approved: [],
        countAction: 0,
      }) 
      const newDayOff = await resDayOff.save()
      return res.json(newDayOff)
                .status(200)
    } catch (error) {
      return res.json(error)
        .status(400)
    }
  }
}

module.exports = new DayOffController();
