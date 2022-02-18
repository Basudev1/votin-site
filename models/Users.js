const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
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
