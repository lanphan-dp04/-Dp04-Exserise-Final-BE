const DayOff = require("../models/DayOff");
const Groups = require("../models/Groups");
const Notifies = require("../models/Notifies");
const User = require("../models/Users");
class DayOffController {
  createDayOff( req, res, next ) {
    User.findOne({
      _id: req.body.userID ,
    })
      .populate('_id')
      .then( user => {
        const userId = user.id;
        const data = new DayOff({
          userId: userId,
          reason: req.body.reason,
          fromDay: req.body.fromDay,
          toDay: req.body.toDay,
          partialDay: req.body.partialDay,
        });
        data
            .save()
            .then((res) => {
              Groups.find({
                memberID : res.userId,
              })
              .then(groups => {
                const arrMaster = [];
                groups.forEach( group => {
                  arrMaster.push(...group.masterID)
                })
                const dataNotifies = new Notifies({
                  dayoffID: res.id,
                  masterID: arrMaster,
                  status: res.status,
                  note: '',
                });
                dataNotifies.save()
              })
            })       
        return res
          .json(data)  
          .status(200)
      })
      .catch(next)
  }

  async getDayOff(req, res, next) {
    
    try {
      const dayoff = await DayOff.findOne({
        _id: req.params.id,
        status: 'Pending'
      })
      return res.json(dayoff)  } 
    catch (error) {
      return res.status(400)
    }
  }
}

module.exports = new DayOffController();