const mongoose = require("mongoose");
const { MasterRquestSTT, RquestSTT } = require("../../utils/status");
const Schema = mongoose.Schema;


const Notifies = new Schema({
  dayoffID: {
    type: Schema.Types.ObjectId,
    ref: 'dayoff',
  },
  from : {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  status : {
    type: String,
    enum: Object.values(RquestSTT),
    requited: true,
  },
  desc: {
    type: String,
  },
  to : {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  isSeen: {
    type: Boolean,
    default: false,
    requited: true,
  },
},{
timestamps: true,
});

module.exports = mongoose.model("Notifies", Notifies,'notifies');