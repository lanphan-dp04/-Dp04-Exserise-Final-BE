const mongoose = require("mongoose");
const { RquestPartial } = require("../../utils/partial");
const { RquestSTT } = require("../../utils/status");
const Schema = mongoose.Schema;


const DayOff = new Schema({
  typeDayOff: {
    type: String,
    require: true,
  },
  userId: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
  },
  status: {
    type: String,
    enum: Object.values(RquestSTT),
    default: RquestSTT.REQUESTED,
    requited: true,
  },
  reason: {
    type: String,
    requited: true,
  },
  fromDay: {
    type: Date,
    requited: true,
  },
  toDay: {
    type: Date,
    requited: true,
  },
  countAction: {
    type: Number,
    requited: true,
  },
  approved: [{
    type: Schema.Types.ObjectId,
    ref: 'Users',
  }],
  quantity: {
    type: Number,
    requited: true,
  },
  listMaster: [{
    type: Schema.Types.ObjectId,
    ref: 'Users',
  }],
  partialDay: {
    type: String,
    enum: Object.values(RquestPartial),
    requited: true,
  },
},{
timestamps: true,
});

module.exports = mongoose.model("DayOff", DayOff,'dayoff');