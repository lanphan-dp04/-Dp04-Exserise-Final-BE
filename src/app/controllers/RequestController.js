const { MasterRquestSTT, RquestSTT } = require("../../utils/status");
const DayOff = require("../models/DayOff");
const Groups = require("../models/Groups");
const History = require("../models/History");
const Notifies = require("../models/Notifies");
const Users = require("../models/Users");
class RequestController {
  async getRequests(req, res, next) {
    try {
      const arrDayOff = await DayOff.find({ listMaster: req.params.id });
      const modelDayOff = await arrDayOff.map((item) => {
        return Users.find({ _id: item.userId }, { userName: true });
      });
      const data = await Promise.all(modelDayOff);
      const arrModelUser = await data.map((item) => {
        return Object.assign({}, item);
      });
      const newArr = await arrDayOff.map((dayoff) => {
        return dayoff._doc;
      });
      const nameModelUser = arrModelUser.map((item) => {
        return item[0].userName;
      });
      const DayOffMe = await DayOff.find({ userId: req.params.id });
      const nameUser = await Users.findById({ _id: req.params.id });
      const responseDataMe = await DayOffMe.map((item, index) => ({
        ...item._doc,
        userName: nameUser.userName,
        with: "me",
      }));
      const responseData = await newArr.map((data, index) => ({
        ...data,
        userName: nameModelUser[index],
        with: nameModelUser[index],
      }));
      const responseResultData = [];
      responseResultData.push(...responseData, ...responseDataMe);
      return res.json(responseResultData).status(200);
    } catch (error) {
      return res.json(error).status(500);
    }
  }

  async getListRequest(req, res, next) {
    try {
      const resData = await DayOff.find()
      .populate({path: 'userId', select: 'userName'})
      return res.json(resData)
    } catch (error) {
      return res.json(error).status(500);
    }
  }

  async approveRequest(req, res, next) {
    try {
      const modelDayOff = await DayOff.findOne({
        _id: req.body.dayoffId,
      });
      const arrMaters = await [...modelDayOff.listMaster];
      const countAction = await modelDayOff.countAction;
      const count = +arrMaters.length - +countAction;
      if (
        count > 1 &&
        modelDayOff.status !== "Approved" &&
        modelDayOff.status !== "Rejected" &&
        modelDayOff.status !== "Request Change"
      ) {
        await modelDayOff.updateOne({
          $addToSet: { approved: req.body.masterId },
          countAction: countAction + 1,
          status: `${MasterRquestSTT.APPROVED}(${countAction + 1}/${
            arrMaters.length
          })`,
        });
      } else if (+count === +1) {
        await modelDayOff.updateOne({
          $addToSet: { approved: req.body.masterId },
          countAction: countAction + 1,
          status: MasterRquestSTT.APPROVED,
        });
      }
      const user = await Users.findOne({ _id: req.body.masterId });
      const dataHistory = new History({
        logOffId: modelDayOff._id,
        status: MasterRquestSTT.APPROVED,
        created: user.userName,
        content: `${user.userName} approved`,
      });
      await dataHistory.save();

      const dataNotifies = new Notifies({
        dayoffID: modelDayOff._id,
        from: req.body.masterId,
        status: MasterRquestSTT.APPROVED,
        to: modelDayOff.userId,
        desc: `${user.userName} approved Log Off `,
      });
      await dataNotifies.save();

      if (+count === +1) {
        const resHistory = new History({
          logOffId: req.body.dayoffId,
          status: RquestSTT.DAY_OFF,
          content: "Day Off has been created",
        });
        await resHistory.save();
      }
      return res.json(modelDayOff).status(200);
    } catch (error) {
      return res.json(error).status(500);
    }
  }

  async rejectRequest(req, res, next) {
    try {
      const modelDayOff = await DayOff.findOne({
        _id: req.body.dayoffId,
      });
      const countAction = await modelDayOff.countAction;
      await modelDayOff.updateOne({
        countAction: countAction + 1,
        status: MasterRquestSTT.REJECTED,
      });

      const user = await Users.findOne({ _id: req.body.masterId });
      await modelDayOff.updateOne({
        countAction: countAction + 1,
        status: MasterRquestSTT.REJECTED,
      });
      const dataHistory = new History({
        logOffId: modelDayOff._id,
        status: MasterRquestSTT.REJECTED,
        created: user.userName,
        content: `${user.userName} rejected`,
      });
      const dataNotifies = new Notifies({
        dayoffID: modelDayOff._id,
        from: req.body.masterId,
        status: MasterRquestSTT.REJECTED,
        to: modelDayOff.userId,
        desc: `${user.userName} rejected Log Off `,
      });
      await dataNotifies.save();

      await dataHistory.save();
      return res.json(modelDayOff).status(200);
    } catch (error) {
      return res.json(error).status(500);
    }
  }
  async changeRequest(req, res, next) {
    try {
      const modelDayOff = await DayOff.findOne({
        _id: req.body.dayoffId,
      });
      await modelDayOff.updateOne({
        status: MasterRquestSTT.REQUEST_CHANGE,
      });
      const user = await Users.findOne({ _id: req.body.masterId });
      const dataHistory = new History({
        logOffId: req.body.dayoffId,
        note: req.body.note,
        status: MasterRquestSTT.REQUEST_CHANGE,
        created: user.userName,
        content: `${user.userName} request for change`,
      });
      await dataHistory.save();
      const dataNotifies = new Notifies({
        dayoffID: modelDayOff._id,
        from: req.body.masterId,
        status: MasterRquestSTT.REQUEST_CHANGE,
        to: modelDayOff.userId,
        desc: `${user.userName} request changed Log Off `,
      });
      await dataNotifies.save();
      return res.json(modelDayOff).status(200);
    } catch (error) {
      return res.json(error).status(500);
    }
  }
  async getDetailRequests(req, res, next) {
    try {
      const resDayOff = await DayOff.findOne({
        _id: req.params.id,
      });
      const resUsers = await Users.findById({
        _id: resDayOff.userId,
      });
      const data = { ...resDayOff._doc, userName: resUsers.userName };
      return res.json(data).status(200);
    } catch (error) {
      return res.json(error).status(400);
    }
  }
}

module.exports = new RequestController();
