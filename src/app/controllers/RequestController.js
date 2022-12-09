const DayOff = require("../models/DayOff");
const Groups = require("../models/Groups");
const Users = require("../models/Users");
class RequestController {
  async getRequest(req, res, next) {
    try {
      const arrRequested = [];
      const requestDayOff = await DayOff.find({
        masterId: req.params.id
      })
      console.log(requestDayOff);
      await requestDayOff.forEach(dayoff =>  {
        const userId =  dayoff.userId;
        Users.find( {_id: userId})
          .then(users => {
             users.forEach(user => {
              const userName =  user.userName;
              arrRequested.push({...dayoff._doc,userName: userName })
            }) 
          })
        })
      return res.json(arrRequested)
                .status(200)
    } catch (error) {
      return res.json(error)
                .status(400)
    }
  }
}

module.exports = new RequestController();