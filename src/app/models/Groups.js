const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Groups = new Schema({
  nameGroup: {
    type: String,
    requited: true,
    maxLength: 255,
  },
  memberID : [{
    type: Schema.Types.ObjectId,
    ref: 'Users',
  }],
  masterID : [{
    type: Schema.Types.ObjectId,
    ref: 'Users',
  }],
},{
timestamps: true,
});

module.exports = mongoose.model("Groups", Groups,'groups');