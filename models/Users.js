const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: false,
  },
});

const Users = mongoose.model("users", UserSchema);
module.exports = Users;
