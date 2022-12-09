const mongoose = require("mongoose");
const { RquestPartial } = require("../../utils/partial");
const { RquestSTT } = require("../../utils/status");
const Schema = mongoose.Schema;

const DayOff = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    // status: {
    //   type: String,
    //   enum: Object.values(RquestSTT),
    //   default: RquestSTT.PENDING,
    //   requited: true,
    // },
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
    quantity: {
      type: Number,
      requited: true,
    },
    listMaster: [
      {
        masterId: {
          type: Schema.Types.ObjectId,
          ref: "Users",
        },
        status: {
          type: String,
          enum: Object.values(RquestSTT),
          default: RquestSTT.PENDING,
          requited: true,
        },
        note: {
          default: "",
          type: String,
        },
      },
    ],
    partialDay: {
      type: String,
      enum: Object.values(RquestPartial),
      requited: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DayOff", DayOff, "dayoff");
