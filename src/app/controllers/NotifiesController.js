const Groups = require("../models/Groups");
const Notifies = require("../models/Notifies");
const Users = require("../models/Users");
const axios = require("axios");
const { WebClient, ErrorCode } = require("@slack/web-api");
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);
class NotifiesController {
  async getNotifies(req, res, next) {
    const masterID = req.query.masterId;
    const dayoffID = req.query.dayoffId;
    const noti = await Notifies.findOne({
      masterID: masterID,
      dayoffID: dayoffID,
    });
    return res.json(noti);
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
