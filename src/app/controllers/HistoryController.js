const History = require("../models/History");

class HistoryController {
  async getHistory(req, res, next) {
    try {
      const history = await History.find({ logOffId: req.params.id });
      return res.json(history).status(200);
    } catch (error) {
      return res.json(error).status(500);
    }
  }
}

module.exports = new HistoryController();
