const { MasterRquestSTT, RquestSTT } = require("../../utils/status");
const DayOff = require("../models/DayOff");
const Groups = require("../models/Groups");
const History = require("../models/History");
const Notifies = require("../models/Notifies");
const Users = require("../models/Users");
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
            const newArrMaster = arrMasterId.toString().split(",");
            const newArrMasterId = Array.from(new Set(newArrMaster));

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
              data.save().then(async (data) => {
                const user = await Users.findOne({ _id: data.userId });
                const dataHistory = new History({
                  logOffId: data._id,
                  status: data.status,
                  created: user.userName,
                  content: `${user.userName} requested`,
                  time: data.partialDay,
                  fromDay: data.fromDay,
                  toDay: data.toDay,
                  quantity: data.quantity,
                  reason: data.reason,
                });
                await dataHistory.save();
                data.listMaster.map((item) => {
                  const dataNotifies = new Notifies({
                    dayoffID: data.id,
                    to: item,
                    status: data.status,
                    from: data.userId,
                    desc: `${user.userName} created Log Off `,
                  });
                  return dataNotifies.save();
                });
                return res.json(data).status(200);
              });
            } catch (error) {
              return res.json(data).status(400);
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
      const resDayOff = await DayOff.findByIdAndUpdate(
        { _id: req.body.dayoffId },
        {
          typeDayOff: req.body.typeDayOff,
          reason: req.body.reason,
          status: RquestSTT.REQUESTED,
          fromDay: req.body.fromDay,
          toDay: req.body.toDay,
          quantity: req.body.quantity,
          partialDay: req.body.partialDay,
          approved: [],
          countAction: 0,
        }
      );
      const newDayOff = await resDayOff.save();

      const user = await Users.findOne({ _id: req.body.userId });

      const dataHistory = new History({
        logOffId: req.body.dayoffId,
        status: RquestSTT.UPDATED,
        created: user.userName,
        content: `${user.userName} update requested`,
        time: req.body.partialDay,
        fromDay: req.body.fromDay,
        toDay: req.body.toDay,
        quantity: req.body.quantity,
        reason: req.body.reason,
      });

      await dataHistory.save();

      newDayOff.listMaster.map((item) => {
        const dataNotifies = new Notifies({
          dayoffID: newDayOff.id,
          to: item,
          status: RquestSTT.UPDATED,
          from: newDayOff.userId,
          desc: `${user.userName} updated Log Off `,
        });
        return dataNotifies.save();
      });
      return res.json(newDayOff).status(200);
    } catch (error) {
      return res.json(error).status(400);
    }
  }

  async revertDayOff(req, res, next) {
    try {
      const dayoff = await DayOff.findOne({
        _id: req.body.dayoffId,
      });
      if (
        dayoff.status === RquestSTT.REQUESTED ||
        dayoff.status === RquestSTT.APPROVE
      ) {
        await dayoff.updateOne({
          canceled: dayoff.listMaster,
          status: RquestSTT.CANCLE,
        });
        const user = await Users.findOne({ _id: req.body.userId });
        const dataHistory = new History({
          logOffId: req.body.dayoffId,
          status: RquestSTT.CANCLE,
          created: user.userName,
          content: `${user.userName} revert requested`,
          note: req.body.note,
        });
        await dataHistory.save();
        dayoff.listMaster.map((item) => {
          const dataNotifies = new Notifies({
            dayoffID: dayoff._id,
            to: item,
            status: RquestSTT.CANCLE,
            from: dayoff.userId,
            desc: `${user.userName} reverted Log Off `,
          });
          return dataNotifies.save();
        });
        return res.json(dayoff).status(200);
      }
    } catch (error) {
      return res.json(error).status(500);
    }
  }
}

module.exports = new DayOffController();
