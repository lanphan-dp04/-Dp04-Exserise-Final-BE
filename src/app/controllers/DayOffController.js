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
        const arrMaster = [];
        Groups.find({
          memberID : userId,
        })
          .then(groups => {
            groups.forEach( group => {
              arrMaster.push(...group.masterID)
              console.log(arrMaster);
              const data = new DayOff({
                userId: userId,
                reason: req.body.reason,
                fromDay: req.body.fromDay,
                toDay: req.body.toDay,
                quantity: req.body.quantity,
                partialDay: req.body.partialDay,
                listMaster: arrMaster,
              })
              data
                .save()
                .then(dayoff => {
                  const dataNotifies = new Notifies({
                    dayoffID: dayoff.id,
                    masterID: arrMaster,
                    status: dayoff.status,
                    note: '',
                  })
                  dataNotifies.save()
                  return res.json(data).status(200)  
                }) 
                .catch(err => {
                  return res.json(err)
                    .status(400)
                })   
            })
          })       
          .catch(err => {
            return res.json(err)
              .status(400)
          })
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