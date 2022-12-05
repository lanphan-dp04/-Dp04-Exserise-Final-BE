const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const DayOff = new Schema({
  userId: {
    type: String,
    requited: true,
    maxLength: 255,
  },
  status: {
    type: String,
    requited: true,
    maxLength: 255,
  },
  reason: {
    type: String,
    requited: true,
  },
  fromDay: {
    type: Date,
    requited: true,
  },
  fromDay: {
    type: Date,
    requited: true,
  },
  aprrovalId : {
    type: Number,
    requited: true,
  },
},{
timestamps: true,
});

module.exports = mongoose.model("DayOff", DayOff,'dayoff');