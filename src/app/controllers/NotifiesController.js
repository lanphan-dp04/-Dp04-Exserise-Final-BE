const Groups = require("../models/Groups");
const Notifies = require("../models/Notifies");
const Users = require("../models/Users");
const axios = require("axios");
const { WebClient, ErrorCode } = require("@slack/web-api");
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);
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
  // async getSlack(req, res, next) {
  //   const conversationId = "D04FRRKT38W";
  //   try {
  //     (async () => {
  //       const result = await axios.post(
  //         `https://hooks.slack.com/services/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`,
  //         {
  //           text: "Hello world!",
  //           channel: conversationId,
  //         }
  //       );
  //     })();
  //   } catch (error) {
  //     if (error.code === ErrorCode.PlatformError) {
  //       console.log(error.data);
  //     } else {
  //       console.log("Well, that was unexpected.");
  //     }
  //   }
  // }
}

module.exports = new NotifiesController();
