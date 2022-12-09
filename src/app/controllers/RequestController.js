const DayOff = require("../models/DayOff");
const Groups = require("../models/Groups");
const Users = require("../models/Users");
class RequestController {
  getRequests(req, res, next) {
    const arrRequested = [];
    DayOff.find({
      masterId: req.params.id,
    })
    .then(dayoff => {
        dayoff.forEach( data => {
          let userName = '';
          const userId = data.userId;
          Users.findOne({_id: userId})
          .then(user => {
            userName = user.userName;
            arrRequested.push({...data._doc,requester: userName} )
            return res.json(arrRequested)

          })
          console.log(arrRequested);
          return res.json(arrRequested)
        })
        
          
        //   users.forEach(user => {
        //     const userName =  user.userName;
        //     arrRequested.push(userName )
        //   })
        //   return res.json(arrRequested) 
        // })
    })
    .catch(next)
  }
  // async getRequest(req, res, next) {
  //   try {
  //     const arrRequested = [];
  //     const requestDayOff = await DayOff.find({
  //       masterId: req.params.id
  //     })
  //       await requestDayOff.forEach(dayoff =>  {
  //       const userId =  dayoff.userId;
  //        Users.find( {_id: userId})
  //         .then(users => {
  //            users.forEach(user => {
  //             const userName =  user.userName;
  //             arrRequested.push({...dayoff._doc,userName: userName })
  //           }) 
  //         })
  //       })
  //     return res.json(arrRequested)
  //               .status(200)
  //   } catch (error) {
  //     return res.json(error)
  //               .status(400)
  //   }
  // }
}

module.exports = new RequestController();