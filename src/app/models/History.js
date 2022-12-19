const mongoose = require("mongoose");
const { RquestPartial } = require("../../utils/partial");
const { RquestSTT } = require("../../utils/status");
const Schema = mongoose.Schema;


const History = new Schema({
  logOffId: {
      type: Schema.Types.ObjectId,
      ref: 'DayOff',
  },
  requesterId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  status: {
    type: String,
  },
  created: {
    type: String,
  },
  content: {
    type: String,
  },
  note: {
    type: String,
  },
  reason: {
    type: String,
  },
  fromDay: {
    type: Date,
  },
  toDay: {
    type: Date,
  },
  quantity: {
    type: Number,
  },
  time: {
    type: String,
    enum: Object.values(RquestPartial),
  },
},{
timestamps: true,
});

module.exports = mongoose.model("History", History,'history');