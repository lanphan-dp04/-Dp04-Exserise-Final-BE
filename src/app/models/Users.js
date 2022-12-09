const mongoose = require("mongoose");
const { Role } = require("../../utils/role");
const Schema = mongoose.Schema;

const Users = new Schema(
  {
    userName: {
      type: String,
      requited: true,
      maxLength: 255,
    },
    password: {
      type: String,
      requited: true,
      maxLength: 255,
    },
    phoneNumber: {
      type: String,
      maxLength: 255,
    },
    email: {
      type: String,
      requited: true,
      maxLength: 255,
    },
    avatar: {
      type: String,
      maxLength: 255,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.STAFF,
      requited: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", Users, "users");
